export default function Hero({ totalHotels }) {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <p className="eyebrow">Curated city stays across India</p>
        <h1>Find polished hotels for your next comfortable escape.</h1>
        <p className="hero-copy">
          Search live hotel data, compare prices, filter by rating, and open every stay for a closer look.
        </p>
        <div className="hero-stats" aria-label="Hotel highlights">
          <span>
            <strong>{totalHotels || '500+'}</strong>
            Hotels
          </span>
          <span>
            <strong>Live</strong>
            API data
          </span>
          <span>
            <strong>Fast</strong>
            Filters
          </span>
        </div>
      </div>
    </section>
  );
}
