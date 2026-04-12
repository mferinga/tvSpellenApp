import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './spel-detail.module.css';
import { useGetSpelDetail } from './spel-detail.hook';
import EditSpelModal from '../edit-spel-modal/edit-spel-modal';
import AddPresentatorModal from '../../presentator/add-presentator-modal';

export function SpelDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddPresentatorModal, setShowAddPresentatorModal] = useState(false);

  if (!id) {
    return (
      <div className={styles['container']}>
        <p>Spel not found</p>
      </div>
    );
  }

  const { spel, loading, error } = useGetSpelDetail(id);
  const backTarget = location.state?.from || '/spellen';

  const refreshPage = () => {
    window.location.reload();
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

  if (!spel) {
    return (
      <div className={styles['container']}>
        <p>Spel not found</p>
      </div>
    );
  }

  const existingPresentatorIds = (spel.presentators ?? []).map((p) =>
    String(p._id)
  );

  return (
    <div className={styles['container']}>
      <div className={styles['hero']}>
        <div>
          <Link to={backTarget} className={styles['backLink']}>
            ← Terug
          </Link>
          <h1 className={styles['title']}>{spel.naam || 'Onbekend spel'}</h1>
          <p className={styles['subtitle']}>
            {spel.beschrijving || 'Geen beschrijving beschikbaar.'}
          </p>
        </div>

        <div className={styles['heroActions']}>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setShowAddPresentatorModal(true)}
          >
            Presentator toevoegen
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowEditModal(true)}
          >
            Spel bewerken
          </button>
        </div>
      </div>

      <div className={styles['contentGrid']}>
        <section className={`card shadow-sm ${styles['mainCard']}`}>
          <div className="card-body">
            <h2 className={styles['sectionTitle']}>Beschrijving</h2>
            <p className={styles['description']}>
              {spel.beschrijving || 'Geen beschrijving beschikbaar.'}
            </p>

            <h2 className={`${styles['sectionTitle']} mt-4`}>Uitleg</h2>
            <p className={styles['description']}>
              {spel.uitleg || 'Geen uitleg beschikbaar.'}
            </p>

            <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
              <h2 className={styles['sectionTitle']} style={{ marginBottom: 0 }}>
                Presentatoren
              </h2>
            </div>

            {spel.presentators && spel.presentators.length > 0 ? (
              <div className={styles['presentatorGrid']}>
                {spel.presentators.map((presentator) => (
                  <div
                    key={String(presentator._id)}
                    className={`card shadow-sm ${styles['presentatorCard']}`}
                  >
                    <div className="card-body">
                      <h5 className="card-title mb-2">{presentator.naam}</h5>

                      {presentator.geboortedatum && (
                        <p className="text-muted mb-2">
                          <strong>Geboortedatum:</strong>{' '}
                          {new Date(
                            presentator.geboortedatum
                          ).toLocaleDateString('nl-NL')}
                        </p>
                      )}

                      {presentator.bio && (
                        <p className="card-text mb-0">{presentator.bio}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles['description']}>
                Geen presentatoren gekoppeld aan dit spel.
              </p>
            )}
          </div>
        </section>

        <aside className={styles['sideColumn']}>
          <div className={`card shadow-sm ${styles['infoCard']}`}>
            <div className="card-body">
              <h6 className={styles['infoLabel']}>Naam</h6>
              <p className={styles['infoValue']}>{spel.naam || 'Niet ingevuld'}</p>
            </div>
          </div>

          <div className={`card shadow-sm ${styles['infoCard']}`}>
            <div className="card-body">
              <h6 className={styles['infoLabel']}>Originele naam</h6>
              <p className={styles['infoValue']}>
                {spel.originleNaam || 'Niet ingevuld'}
              </p>
            </div>
          </div>

          <div className={`card shadow-sm ${styles['infoCard']}`}>
            <div className="card-body">
              <h6 className={styles['infoLabel']}>Teams</h6>
              <p className={styles['infoValue']}>{spel.teams ? 'Ja' : 'Nee'}</p>
            </div>
          </div>

          <div className={`card shadow-sm ${styles['infoCard']}`}>
            <div className="card-body">
              <h6 className={styles['infoLabel']}>Teamgrootte</h6>
              <p className={styles['infoValue']}>
                {spel.teamgrootte ?? 'Niet ingevuld'}
              </p>
            </div>
          </div>

          <div className={`card shadow-sm ${styles['infoCard']}`}>
            <div className="card-body">
              <h6 className={styles['infoLabel']}>Spel ID</h6>
              <p className={styles['idValue']}>
                {spel._id || 'Niet beschikbaar'}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <EditSpelModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSaved={refreshPage}
        spelId={String(spel._id)}
        initialValues={{
          naam: spel.naam,
          beschrijving: spel.beschrijving,
          uitleg: spel.uitleg,
          orgineleNaam: spel.originleNaam,
          teams: spel.teams,
          teamgrootte: spel.teamgrootte,
        }}
      />

      <AddPresentatorModal
        show={showAddPresentatorModal}
        onClose={() => setShowAddPresentatorModal(false)}
        onSaved={refreshPage}
        spelId={String(spel._id)}
        existingPresentatorIds={existingPresentatorIds}
      />
    </div>
  );
}

export default SpelDetail;