import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './spellijst-detail.module.css';
import { useGetSpellijstDetail } from './spellijst-detail.hook';
import AddSpelModal from '../../spel/add-spel-modal/add-spel-modal';

export function SpellijstDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [showAddSpelModal, setShowAddSpelModal] = useState(false);
  const [removingSpelId, setRemovingSpelId] = useState<string | null>(null);

  if (!id) {
    return (
      <div className={styles['container']}>
        <p>Spellijst not found</p>
      </div>
    );
  }

  const { spellijst, loading, error } = useGetSpellijstDetail(id);
  const backTarget = location.state?.from || '/spellijsten';

  const refreshPage = () => {
    window.location.reload();
  };

  const handleRemoveSpel = async (spelId: string, spelNaam: string) => {
    const confirmed = window.confirm(
      `Weet je zeker dat je "${spelNaam}" uit deze spellijst wilt verwijderen?`
    );

    if (!confirmed) return;

    try {
      setRemovingSpelId(spelId);

      const response = await fetch(
        `http://localhost:3333/api/spellijsten/${id}/spellen/${spelId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Verwijderen van spel mislukt');
      }

      refreshPage();
    } catch (error) {
      console.error(error);
      alert('Verwijderen van spel mislukt');
    } finally {
      setRemovingSpelId(null);
    }
  };

  if (loading) {
    return (
      <div className={styles['container']}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['container']}>
        <p>{error}</p>
      </div>
    );
  }

  if (!spellijst) {
    return (
      <div className={styles['container']}>
        <p>Spellijst not found</p>
      </div>
    );
  }

  const spelerCount = spellijst.spelers?.length ?? 0;
  const spelCount = spellijst.spellen?.length ?? 0;
  const spelleiderId = spellijst.spelleider?._id
    ? String(spellijst.spelleider._id)
    : '';

  const existingSpelIds = spellijst.spellen.map((spel) => String(spel._id));

  return (
    <div className={styles['container']}>
      <div className={styles['hero']}>
        <div>
          <Link to={backTarget} className={styles['backLink']}>
            ← Terug
          </Link>
          <h1 className={styles['title']}>{spellijst.naam}</h1>
          <p className={styles['subtitle']}>
            {spellijst.beschrijving || 'Geen beschrijving beschikbaar.'}
          </p>
        </div>
      </div>

      <div className={styles['summaryGrid']}>
        <div className={`card shadow-sm ${styles['summaryCard']}`}>
          <div className="card-body">
            <h6 className={styles['summaryLabel']}>Spelleider</h6>
            <p className={styles['summaryValue']}>
              {spellijst.spelleider?.naam || 'Onbekend'}
            </p>
            {spellijst.spelleider?.email && (
              <small className="text-muted">{spellijst.spelleider.email}</small>
            )}
          </div>
        </div>

        <div className={`card shadow-sm ${styles['summaryCard']}`}>
          <div className="card-body">
            <h6 className={styles['summaryLabel']}>Aantal spelers</h6>
            <p className={styles['summaryValue']}>{spelerCount}</p>
          </div>
        </div>

        <div className={`card shadow-sm ${styles['summaryCard']}`}>
          <div className="card-body">
            <h6 className={styles['summaryLabel']}>Aantal spellen</h6>
            <p className={styles['summaryValue']}>{spelCount}</p>
          </div>
        </div>
      </div>

      <section className={styles['section']}>
        <div className={styles['sectionHeader']}>
          <h2 className={styles['sectionTitle']}>Betrokken spelers</h2>
        </div>

        {spelerCount > 0 ? (
          <div className={styles['userGrid']}>
            {spellijst.spelers.map((speler) => {
              const isSpelleider = String(speler._id) === spelleiderId;

              return (
                <div
                  key={String(speler._id)}
                  className={`card shadow-sm ${styles['userCard']}`}
                >
                  <div className="card-body">
                    <div className={styles['userCardTop']}>
                      <div>
                        <h5 className="card-title mb-1">{speler.naam}</h5>
                        {speler.email && (
                          <p className="card-text text-muted mb-0">
                            {speler.email}
                          </p>
                        )}
                      </div>

                      {isSpelleider && (
                        <span className="badge text-bg-primary">
                          Spelleider
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="alert alert-light border mb-0">
            Geen spelers toegevoegd aan deze spellijst.
          </div>
        )}
      </section>

      <section className={styles['section']}>
        <div className={styles['sectionHeader']}>
          <h2 className={styles['sectionTitle']}>Spellen in deze lijst</h2>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddSpelModal(true)}
          >
            Spel toevoegen
          </button>
        </div>

        {spelCount > 0 ? (
          <div className={styles['spelGrid']}>
            {spellijst.spellen.map((spel) => (
              <article
                key={String(spel._id)}
                className={`card h-100 shadow-sm ${styles['spelCard']}`}
              >
                <div className="card-body d-flex flex-column">
                  <Link
                    to={`/spellen/${spel._id}`}
                    state={{ from: location }}
                    className={styles['spelCardLink']}
                  >
                    <h4 className="card-title">{spel.naam}</h4>
                    <p className={`card-text ${styles['spelDescription']}`}>
                      {spel.beschrijving || 'Geen beschrijving beschikbaar.'}
                    </p>
                  </Link>

                  <div className="d-flex gap-2 mt-auto">
                    <Link
                      to={`/spellen/${spel._id}`}
                      state={{ from: location }}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Bekijk spel
                    </Link>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        handleRemoveSpel(String(spel._id), spel.naam)
                      }
                      disabled={removingSpelId === String(spel._id)}
                    >
                      {removingSpelId === String(spel._id)
                        ? 'Bezig...'
                        : 'Verwijder'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="alert alert-light border mb-0">
            Geen spellen in deze spellijst.
          </div>
        )}
      </section>

      <AddSpelModal
        show={showAddSpelModal}
        onClose={() => setShowAddSpelModal(false)}
        onSaved={refreshPage}
        spellijstId={id}
        existingSpelIds={existingSpelIds}
      />
    </div>
  );
}

export default SpellijstDetail;