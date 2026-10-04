export default function Toast({ message }) {
  return (
    <div className={`toast ${message ? "show" : ""}`} role="status" aria-live="polite">
      <span className="toast-icon">✓</span>
      <span>{message}</span>
    </div>
  );
}
