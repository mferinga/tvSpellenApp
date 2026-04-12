import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useGetAllPresentators } from './presentator-list.hook';

type AddPresentatorModalProps = {
  show: boolean;
  onClose: () => void;
  onSaved?: () => void;
  spelId: string;
  existingPresentatorIds?: string[];
};

type CreatePresentatorForm = {
  naam: string;
  geboortedatum: string;
  bio: string;
};

const initialForm: CreatePresentatorForm = {
  naam: '',
  geboortedatum: '',
  bio: '',
};

export default function AddPresentatorModal({
  show,
  onClose,
  onSaved,
  spelId,
  existingPresentatorIds = [],
}: AddPresentatorModalProps) {
  const { presentators, loading, error } = useGetAllPresentators();
  const [selectedPresentatorIds, setSelectedPresentatorIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'existing' | 'new'>('existing');
  const [formData, setFormData] = useState<CreatePresentatorForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const hasSpel = useMemo(() => !!spelId, [spelId]);

  const resetState = () => {
    setSelectedPresentatorIds([]);
    setFormData(initialForm);
    setSaveError('');
    setSaving(false);
    setActiveTab('existing');
  };

  const closeAndReset = () => {
    resetState();
    onClose();
  };

  const togglePresentatorSelection = (presentatorId: string) => {
    setSelectedPresentatorIds((prev) =>
      prev.includes(presentatorId)
        ? prev.filter((id) => id !== presentatorId)
        : [...prev, presentatorId]
    );
  };

  const isAlreadyAdded = (presentatorId: string) => {
    return existingPresentatorIds.includes(presentatorId);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExistingToSpel = async () => {
    const response = await fetch(
      `http://localhost:3333/api/spel/${spelId}/presentators`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          presentatorIds: selectedPresentatorIds,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Toevoegen van bestaande presentators mislukt');
    }
  };

  const createAndAddToSpel = async () => {
    const response = await fetch(
      `http://localhost:3333/api/spel/${spelId}/presentators/create`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          naam: formData.naam,
          geboortedatum: formData.geboortedatum || undefined,
          bio: formData.bio || undefined,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Aanmaken en toevoegen van presentator mislukt');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);

    try {
      if (activeTab === 'existing') {
        await addExistingToSpel();
      } else {
        await createAndAddToSpel();
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

  if (!show || !hasSpel) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Presentator toevoegen</h5>
                <button type="button" className="btn-close" onClick={closeAndReset} />
              </div>

              <div className="modal-body">
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
                      Bestaande presentators
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
                      Nieuwe presentator
                    </button>
                  </div>
                </div>

                {saveError && <div className="alert alert-danger">{saveError}</div>}

                {activeTab === 'existing' ? (
                  <div>
                    <label className="form-label">Selecteer één of meer presentators</label>

                    {loading && <p>Presentators laden...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {!loading && !error && (
                      <div
                        className="border rounded p-3"
                        style={{ maxHeight: '320px', overflowY: 'auto' }}
                      >
                        {presentators.length === 0 ? (
                          <p className="mb-0">Geen presentators beschikbaar</p>
                        ) : (
                          presentators.map((presentator) => {
                            const presentatorId = String(presentator._id);
                            const alreadyAdded = isAlreadyAdded(presentatorId);

                            return (
                              <div className="form-check mb-3" key={presentatorId}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`existing-presentator-${presentatorId}`}
                                  checked={
                                    alreadyAdded ||
                                    selectedPresentatorIds.includes(presentatorId)
                                  }
                                  disabled={alreadyAdded}
                                  onChange={() =>
                                    togglePresentatorSelection(presentatorId)
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`existing-presentator-${presentatorId}`}
                                >
                                  <strong>{presentator.naam}</strong>
                                  {presentator.bio && (
                                    <>
                                      <br />
                                      <small className="text-muted">
                                        {presentator.bio}
                                      </small>
                                    </>
                                  )}
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
                      <label className="form-label">Geboortedatum</label>
                      <input
                        type="date"
                        className="form-control"
                        name="geboortedatum"
                        value={formData.geboortedatum}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeAndReset}>
                  Annuleren
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    saving ||
                    (activeTab === 'existing' &&
                      selectedPresentatorIds.length === 0)
                  }
                >
                  {saving
                    ? 'Bezig...'
                    : activeTab === 'existing'
                    ? 'Toevoegen'
                    : 'Aanmaken en toevoegen'}
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