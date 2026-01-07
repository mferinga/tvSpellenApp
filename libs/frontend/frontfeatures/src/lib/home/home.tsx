import SpelList from '../spel/spel-list/spel-list';
import styles from './home.module.css';

export function Home() {
  return (

    <div className={styles['content']}>
      <div className="row mb-3">
        <div className='d-flex justify-content-center'>
          <div className={styles['titleBar']}>
            <h4>
              TV Spellen Applicatie
            </h4>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <SpelList />
      </div>
    </div>


  );
}

export default Home;
