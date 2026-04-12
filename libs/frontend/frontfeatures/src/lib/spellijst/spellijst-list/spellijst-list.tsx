import { Link, useLocation } from 'react-router-dom';
import { useGetAllSpellijsten } from './spellijst-list.hook';
import styles from './spellijst-list.module.css';

export function SpellijstList() {
  const { spellijsten, loading, error } = useGetAllSpellijsten();
  const location = useLocation();

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

  return (
    <div className={styles['container']}>
      <div className={styles['hero']}>
        <div>
          <h1 className={styles['title']}>Spellijsten</h1>
          <p className={styles['subtitle']}>
            Bekijk alle spellijsten en open een lijst om de spellen en betrokken
            spelers te zien.
          </p>
        </div>
      </div>

      {spellijsten.length > 0 ? (
        <div className={styles['spellijstGrid']}>
          {spellijsten.map((spellijst) => {
            const spelerCount = spellijst.spelers?.length ?? 0;
            const spelCount = spellijst.spellen?.length ?? 0;
            const spelleiderNaam =
              typeof spellijst.spelleider === 'object' &&
              spellijst.spelleider !== null &&
              'naam' in spellijst.spelleider
                ? spellijst.spelleider.naam
                : undefined;

            return (
              <Link
                key={String(spellijst._id)}
                to={`/spellijsten/${spellijst._id}`}
                state={{ from: location }}
                className={styles['spellijstCardLink']}
              >
                <article className={`card shadow-sm h-100 ${styles['spellijstCard']}`}>
                  <div className="card-body d-flex flex-column">
                    <div className={styles['cardTop']}>
                      <h4 className="card-title mb-2">{spellijst.naam}</h4>
                      <p className={`card-text ${styles['description']}`}>
                        {spellijst.beschrijving || 'Geen beschrijving beschikbaar.'}
                      </p>
                    </div>

                    <div className={styles['metaRow']}>
                      <span className={styles['metaBadge']}>
                        {spelCount} spel{spelCount !== 1 ? 'len' : ''}
                      </span>
                      <span className={styles['metaBadge']}>
                        {spelerCount} speler{spelerCount !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {spelleiderNaam && (
                      <p className={styles['spelleiderText']}>
                        <strong>Spelleider:</strong> {spelleiderNaam}
                      </p>
                    )}

                    <div className="mt-auto pt-3">
                      <span className={`btn btn-outline-primary btn-sm ${styles['fakeButton']}`}>
                        Bekijk spellijst
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-light border mb-0">
          Er zijn nog geen spellijsten beschikbaar.
        </div>
      )}
    </div>
  );
}

export default SpellijstList;