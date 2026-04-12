import { useState } from 'react';
import CreateSpellijstModal from '../spellijst/createSpellijst/createSpellijst';
import SpellijstList from '../spellijst/spellijst-list/spellijst-list';
import styles from './home.module.css';

export function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleCreated = (newSpellijst: any) => {
    console.log('Created:', newSpellijst);
  };

  return (
    <div className={styles['container']}>
      <section className={styles['hero']}>
        <div className={styles['heroContent']}>
          <span className={styles['heroBadge']}>TV Spellen</span>
          <h1 className={styles['title']}>TV Spellen Applicatie</h1>
          <p className={styles['subtitle']}>
            Beheer spellijsten, bekijk spellen en stel eenvoudig een nieuwe
            spellijst samen voor jouw spelavond.
          </p>

          <div className={styles['heroActions']}>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Nieuwe spellijst maken
            </button>
          </div>
        </div>
      </section>

      <section className={styles['section']}>
        <div className={styles['sectionHeader']}>
          <div>
            <h2 className={styles['sectionTitle']}>Recente spellijsten</h2>
            <p className={styles['sectionSubtitle']}>
              Open een spellijst om de spellen en betrokken spelers te bekijken.
            </p>
          </div>
        </div>

        <SpellijstList />
      </section>

      <CreateSpellijstModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}

export default Home;