export default function LoadingSkeleton() {
  return (
    <section className="hotel-grid" aria-label="Loading hotels">
      {Array.from({ length: 8 }, (_, index) => (
        <article className="hotel-card skeleton-card" key={index}>
          <div className="skeleton-media" />
          <div className="card-content">
            <span className="skeleton-line wide" />
            <span className="skeleton-line short" />
            <span className="skeleton-line" />
            <span className="skeleton-line" />
          </div>
        </article>
      ))}
    </section>
  );
}
