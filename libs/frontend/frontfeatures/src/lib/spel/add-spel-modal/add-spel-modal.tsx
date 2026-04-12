import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useGetAllSpellen } from '../spel-list/spelListHook';

type AddSpelModalProps = {
  show: boolean;
  onClose: () => void;
  onSaved?: () => void;
  spellijstId?: string;
  existingSpelIds?: string[];
};

type CreateSpelForm = {
  naam: string;
  beschrijving: string;
  uitleg: string;
  orgineleNaam: string;
  teams: boolean;
  teamGrootte: string;
};

const initialForm: CreateSpelForm = {
  naam: '',
  beschrijving: '',
  uitleg: '',
  orgineleNaam: '',
  teams: false,
  teamGrootte: '',
};

export default function AddSpelModal({
  show,
  onClose,
  onSaved,
  spellijstId,
  existingSpelIds = [],
}: AddSpelModalProps) {
  const { spellen, loading, error } = useGetAllSpellen();
  const [selectedSpelIds, setSelectedSpelIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'existing' | 'new'>(
    spellijstId ? 'existing' : 'new'
  );
  const [formData, setFormData] = useState<CreateSpelForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const isAttachMode = useMemo(() => !!spellijstId, [spellijstId]);

  const resetState = () => {
    setSelectedSpelIds([]);
    setFormData(initialForm);
    setSaveError('');
    setSaving(false);
    setActiveTab(spellijstId ? 'existing' : 'new');
  };

  const closeAndReset = () => {
    resetState();
    onClose();
  };

  const toggleSpelSelection = (spelId: string) => {
    setSelectedSpelIds((prev) =>
      prev.includes(spelId)
        ? prev.filter((id) => id !== spelId)
        : [...prev, spelId]
    );
  };

  const isAlreadyInSpellijst = (spelId: string) => {
    return existingSpelIds.includes(spelId);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }));
  };

  const addExistingToSpellijst = async () => {
    if (!spellijstId || selectedSpelIds.length === 0) {
      return;
    }

    const response = await fetch(
      `http://localhost:3333/api/spellijsten/${spellijstId}/spellen`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spelIds: selectedSpelIds,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Toevoegen van bestaande spellen mislukt');
    }
  };

  const createStandaloneSpel = async () => {
    const response = await fetch('http://localhost:3333/api/spel', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        naam: formData.naam,
        beschrijving: formData.beschrijving,
        uitleg: formData.uitleg,
        orgineleNaam: formData.orgineleNaam || undefined,
        teams: formData.teams,
        teamGrootte: formData.teamGrootte ? Number(formData.teamGrootte) : undefined,
      }),
    });

    if (!response.ok) {
      throw new Error('Aanmaken van spel mislukt');
    }
  };

  const createAndAddToSpellijst = async () => {
    if (!spellijstId) return;

    const response = await fetch(
      `http://localhost:3333/api/spellijsten/${spellijstId}/spellen/create`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          naam: formData.naam,
          beschrijving: formData.beschrijving,
          uitleg: formData.uitleg,
          orgineleNaam: formData.orgineleNaam || undefined,
          teams: formData.teams,
          teamGrootte: formData.teamGrootte ? Number(formData.teamGrootte) : undefined,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Aanmaken en toevoegen van spel mislukt');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);

    try {
      if (activeTab === 'existing') {
        await addExistingToSpellijst();
      } else {
        if (isAttachMode) {
          await createAndAddToSpellijst();
        } else {
          await createStandaloneSpel();
        }
      }

      closeAndReset();
      onSaved?.();
    } catch (error) {
      console.error(error);
      setSaveError(
        error instanceof Error ? error.message : 'Er ging iets mis'
      );
    } finally {
      setSaving(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {isAttachMode ? 'Spel toevoegen aan spellijst' : 'Nieuw spel aanmaken'}
                </h5>
                <button type="button" className="btn-close" onClick={closeAndReset} />
              </div>

              <div className="modal-body">
                {isAttachMode && (
                  <div className="mb-4">
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className={`btn ${
                          activeTab === 'existing'
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => setActiveTab('existing')}
                      >
                        Bestaande spellen
                      </button>
                      <button
                        type="button"
                        className={`btn ${
                          activeTab === 'new'
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                        }`}
                        onClick={() => setActiveTab('new')}
                      >
                        Nieuw spel maken
                      </button>
                    </div>
                  </div>
                )}

                {saveError && (
                  <div className="alert alert-danger">
                    {saveError}
                  </div>
                )}

                {activeTab === 'existing' && isAttachMode ? (
                  <div>
                    <label className="form-label">Selecteer één of meer spellen</label>

                    {loading && <p>Spellen laden...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && (
                      <div
                        className="border rounded p-3"
                        style={{ maxHeight: '320px', overflowY: 'auto' }}
                      >
                        {spellen.length === 0 ? (
                          <p className="mb-0">Geen spellen beschikbaar</p>
                        ) : (
                          spellen.map((spel) => {
                            const spelId = String(spel._id);
                            const alreadyAdded = isAlreadyInSpellijst(spelId);

                            return (
                              <div className="form-check mb-3" key={spelId}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`existing-spel-${spelId}`}
                                  checked={
                                    alreadyAdded || selectedSpelIds.includes(spelId)
                                  }
                                  disabled={alreadyAdded}
                                  onChange={() => toggleSpelSelection(spelId)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`existing-spel-${spelId}`}
                                >
                                  <strong>{spel.naam}</strong>
                                  <br />
                                  <small className="text-muted">
                                    {spel.beschrijving || 'Geen beschrijving beschikbaar.'}
                                  </small>
                                  {alreadyAdded && (
                                    <>
                                      <br />
                                      <small className="text-success fw-semibold">
                                        Al toegevoegd
                                      </small>
                                    </>
                                  )}
                                </label>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Naam</label>
                      <input
                        className="form-control"
                        name="naam"
                        value={formData.naam}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Beschrijving</label>
                      <textarea
                        className="form-control"
                        name="beschrijving"
                        value={formData.beschrijving}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Uitleg</label>
                      <textarea
                        className="form-control"
                        name="uitleg"
                        value={formData.uitleg}
                        onChange={handleChange}
                        rows={5}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Originele naam</label>
                      <input
                        className="form-control"
                        name="orgineleNaam"
                        value={formData.orgineleNaam}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">teamGrootte</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        name="teamGrootte"
                        value={formData.teamGrootte}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="teams"
                          name="teams"
                          checked={formData.teams}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="teams">
                          Dit spel wordt in teams gespeeld
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeAndReset}
                >
                  Annuleren
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    saving ||
                    (activeTab === 'existing' &&
                      isAttachMode &&
                      selectedSpelIds.length === 0)
                  }
                >
                  {saving
                    ? 'Bezig...'
                    : activeTab === 'existing'
                    ? 'Toevoegen'
                    : isAttachMode
                    ? 'Aanmaken en toevoegen'
                    : 'Spel aanmaken'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={closeAndReset} />
    </>
  );
}