import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type SpelFormData = {
  naam: string;
  beschrijving: string;
  uitleg: string;
  orgineleNaam: string;
  teams: boolean;
  teamGrootte: string;
};

type EditSpelModalProps = {
  show: boolean;
  onClose: () => void;
  onSaved?: () => void;
  spelId: string;
  initialValues: {
    naam: string;
    beschrijving: string;
    uitleg: string;
    orgineleNaam?: string;
    teams?: boolean;
    teamGrootte?: number;
  };
};

export default function EditSpelModal({
  show,
  onClose,
  onSaved,
  spelId,
  initialValues,
}: EditSpelModalProps) {
  const [formData, setFormData] = useState<SpelFormData>({
    naam: '',
    beschrijving: '',
    uitleg: '',
    orgineleNaam: '',
    teams: false,
    teamGrootte: '',
  });

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (show) {
      setFormData({
        naam: initialValues.naam ?? '',
        beschrijving: initialValues.beschrijving ?? '',
        uitleg: initialValues.uitleg ?? '',
        orgineleNaam: initialValues.orgineleNaam ?? '',
        teams: initialValues.teams ?? false,
        teamGrootte:
          initialValues.teamGrootte !== undefined &&
          initialValues.teamGrootte !== null
            ? String(initialValues.teamGrootte)
            : '',
      });
      setSaveError('');
    }
  }, [show, initialValues]);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);

    try {
      const response = await fetch(`http://localhost:3333/api/spel/${spelId}`, {
        method: 'PUT',
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
        throw new Error('Opslaan van spel mislukt');
      }

      onClose();
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
                <h5 className="modal-title">Spel bewerken</h5>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>

              <div className="modal-body">
                {saveError && <div className="alert alert-danger">{saveError}</div>}

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
                        id="edit-teams"
                        name="teams"
                        checked={formData.teams}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="edit-teams">
                        Dit spel wordt in teams gespeeld
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Annuleren
                </button>

                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Bezig...' : 'Opslaan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}