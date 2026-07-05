export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && (
        <button className="primary-button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </section>
  );
}
