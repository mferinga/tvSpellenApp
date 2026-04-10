import {
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import { ISpel, IUser } from '@org/data-api';
import { useGetAllSpellen } from '../../spel/spel-list/spelListHook';
import { useGetAllUsers } from '../../user/userHook'; 


type Spellijst = {
  id?: string;
  naam: string;
  beschrijving: string;
  spelIds?: string[];
  spelerIds: string[];
};

type CreateSpellijstModalProps = {
  show: boolean;
  onClose: () => void;
  onCreated?: (spellijst: Spellijst) => void;
};

export default function CreateSpellijstModal({
  show,
  onClose,
  onCreated,
}: CreateSpellijstModalProps) {
  const { spellen, loadingSpellen, spellenError } = useGetAllSpellen();

  const { users, loading: loadingUsers, error: usersError } = useGetAllUsers();

  const [formData, setFormData] = useState<Spellijst>({
    naam: '',
    beschrijving: '',
    spelIds: [],
    spelerIds: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSelection = (
    id: string,
    field: 'spelIds' | 'spelerIds'
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((item) => item !== id)
        : [...prev[field], id],
    }));
  };

  const handleSpelToggle = (spelId: string) => {
    setFormData((prev) => {
      const selected = prev.spelIds ?? [];

      return {
        ...prev,
        spelIds: selected.includes(spelId)
          ? selected.filter((id) => id !== spelId)
          : [...selected, spelId],
      };
    });
  };

  const resetForm = () => {
    setFormData({
      naam: '',
      beschrijving: '',
      spelIds: [],
      spelerIds: [],
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3333/api/spellijsten',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create spellijst');
      }

      const data: Spellijst = await response.json();

      resetForm();
      onCreated?.(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Nieuwe Spellijst</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                />
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Naam</label>
                  <input
                    type="text"
                    className="form-control"
                    name="naam"
                    value={formData.naam}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Beschrijving</label>
                  <textarea
                    className="form-control"
                    name="beschrijving"
                    value={formData.beschrijving}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Selecteer spellen
                  </label>

                  {loadingSpellen && <p>Spellen laden...</p>}

                  {spellenError && (
                    <p className="text-danger">
                      Fout bij laden van spellen: {spellenError}
                    </p>
                  )}

                  {!loadingSpellen && !spellenError && (
                    <div
                      className="border rounded p-3"
                      style={{
                        maxHeight: '250px',
                        overflowY: 'auto',
                      }}
                    >
                      {spellen.length === 0 ? (
                        <p className="mb-0">
                          Geen spellen beschikbaar
                        </p>
                      ) : (
                        spellen.map((spel: ISpel) => (
                          <div
                            className="form-check"
                            key={spel._id}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`spel-${spel._id}`}
                              checked={
                                formData.spelIds?.includes(spel._id) ??
                                false
                              }
                              onChange={() =>
                                handleSpelToggle(spel._id)
                              }
                            />

                            <label
                              className="form-check-label"
                              htmlFor={`spel-${spel._id}`}
                            >
                              {spel.naam}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Selecteer spelers</label>

                  {loadingUsers && <p>Spelers laden...</p>}
                  {usersError && (
                    <p className="text-danger">{usersError}</p>
                  )}

                  {!loadingUsers && !usersError && (
                    <div className="border rounded p-3">
                      {users.map((user: IUser) => (
                        <div className="form-check" key={user._id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`user-${user._id}`}
                            checked={formData.spelerIds.includes(user._id)}
                            onChange={() =>
                              toggleSelection(user._id, 'spelerIds')
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`user-${user._id}`}
                          >
                            {user.naam}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      />
    </>
  );
}