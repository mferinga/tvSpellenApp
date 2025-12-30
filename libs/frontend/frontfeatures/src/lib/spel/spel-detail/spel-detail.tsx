import styles from './spel-detail.module.css';
import { useGetSpelDetail } from './spel-detail.hook';

export function SpelDetail() {
  const id = 1;
  const { spel, loading, error } = useGetSpelDetail(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles['container']}>
      {spel ? (
        <>
          <h1>{spel.naam}</h1>
          <p>{spel.beschrijving}</p>
        </>
      ) : (
        <p>Spel not found</p>
      )}
    </div>
  );
}