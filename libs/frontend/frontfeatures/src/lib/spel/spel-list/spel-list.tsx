import { Link, useLocation } from 'react-router-dom';
import { useGetAllSpellen } from './spelListHook';
import styles from './spel-list.module.css';

export function SpelList() {
  const { spellen, loading, error } = useGetAllSpellen();
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
          <h1 className={styles['title']}>Spellen</h1>
          <p className={styles['subtitle']}>
            Bekijk alle beschikbare spellen en open een spel voor meer details.
          </p>
        </div>
      </div>

      {spellen.length > 0 ? (
        <div className={styles['spelGrid']}>
          {spellen.map((spel) => (
            <Link
              key={String(spel._id)}
              to={`/spellen/${spel._id}`}
              state={{ from: location }}
              className={styles['spelCardLink']}
            >
              <article className={`card shadow-sm h-100 ${styles['spelCard']}`}>
                <div className="card-body d-flex flex-column">
                  <div className={styles['cardTop']}>
                    <h4 className="card-title mb-2">{spel.naam}</h4>
                    <p className={`card-text ${styles['description']}`}>
                      {spel.beschrijving || 'Geen beschrijving beschikbaar.'}
                    </p>
                  </div>

                  <div className="mt-auto pt-3">
                    <span className={`btn btn-outline-primary btn-sm ${styles['fakeButton']}`}>
                      Bekijk spel
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="alert alert-light border mb-0">
          Er zijn nog geen spellen beschikbaar.
        </div>
      )}
    </div>
  );
}

export default SpelList;