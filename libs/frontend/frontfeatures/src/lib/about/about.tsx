import styles from './about.module.css';

export function About() {
  return (
    <div className={styles['container']}>
      <div className="d-flex flex-row mb-3">
        <div className="col-4">
          <b>Naam:</b>
        </div>
        <div className="col-8">
          Matthijs Feringa
        </div>
      </div>
      <div className="d-flex flex-row mb-3">
        <div className="col-4">
          <b>Studentnummer:</b>
        </div>
        <div className="col-8">
          2185220
        </div>
      </div>
      <div className="d-flex flex-row mb-3">
        <div className="col-4">
          <b>Opdracht omschrijving:</b>
        </div>
        <div className="col-8">
          <p>
            Applicatie waarin verschillende tv-spellen en quizzen bekeken kunnen worden.
            Per spel zijn de originele presentatoren te zien en kunnen details over het spel worden opgevraagd.
            Daarnaast is er extra informatie beschikbaar over de presentatoren.
          </p>

          <p>
            Gebruikers van de applicatie kunnen spellen samenvoegen in een eigen spellijst,
            waardoor de spellen ook zelf gespeeld kunnen worden.
            Tijdens het spelen verdien je punten, die per gebruiker worden bijgehouden.
            Hierdoor is het mogelijk om met meerdere personen spellen te spelen en scores te vergelijken.
          </p>

          <p>
            Ook kunnen spelrondes worden ingesteld door meerdere quizzen en spellen
            in een playlist te plaatsen, zodat je meerdere spellen achter elkaar speelt.
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default About;
