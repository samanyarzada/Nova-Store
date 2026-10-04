import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page">
      <div className="empty">
        <span className="empty-emoji">🧭</span>
        <h1 className="nf-code">404</h1>
        <h3>We couldn't find that page</h3>
        <p>The address may be wrong, or the page may have been removed.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Back to home
        </Link>
      </div>
    </div>
  );
}
