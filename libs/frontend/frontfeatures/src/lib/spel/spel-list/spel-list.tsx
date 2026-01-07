import { useGetAllSpellen } from './spelListHook';
import styles from './spel-list.module.css';

export function SpelList() {
  const { spellen, loading, error } = useGetAllSpellen();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles['spelGrid']}>
      {spellen.map((spel) => (
        <div className={styles['spelCard']}>
          <div className="card h-75 border-2 shadow-sm">
            <div className="card-body d-flex flex-column">
              <div className={styles['spelCardBody']}>
                <h4 className="card-title">{spel.naam}</h4>
                <p className="card-text">{spel.beschrijving}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export default SpelList;
