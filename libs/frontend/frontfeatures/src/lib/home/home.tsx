import { useState } from 'react';
import SpelList from '../spel/spel-list/spel-list';
import CreateSpellijstModal from '../spellijst/createSpellijst/createSpellijst';
import styles from './home.module.css';

export function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleCreated = (newSpellijst: any) => {
    console.log('Created:', newSpellijst);
  };

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

      <button
        className="btn btn-primary mb-2"
        onClick={() => setShowModal(true)}
      >
        Create Spellijst
      </button>

      <div className="d-flex justify-content-between">
        <SpelList />
      </div>

      <CreateSpellijstModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreated={handleCreated}
      />
    </div>


  );
}

export default Home;
