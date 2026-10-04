import { formatNumber } from "../utils.js";

export default function Rating({ value, reviews }) {
  const full = Math.round(value);

  return (
    <div className="rating">
      <span className="stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= full ? "star on" : "star"}>
            ★
          </span>
        ))}
      </span>
      <span className="rating-value">{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="rating-count">({formatNumber(reviews)} reviews)</span>
      )}
    </div>
  );
}
