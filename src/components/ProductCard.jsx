import { Link } from "react-router-dom";
import Rating from "./Rating.jsx";
import { categories } from "../data/products.js";
import { formatPrice, formatNumber, gradientFor } from "../utils.js";

export default function ProductCard({ product, onAdd }) {
  const categoryLabel = categories.find((c) => c.id === product.category)?.label;

  return (
    <article className="card product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-thumb"
        style={{ background: gradientFor(product.hue) }}
      >
        <span className="product-emoji">{product.emoji}</span>
        {product.stock <= 5 && (
          <span className="tag tag-warn">Only {formatNumber(product.stock)} left</span>
        )}
      </Link>

      <div className="product-body">
        <span className="product-category">{categoryLabel}</span>
        <h3 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <Rating value={product.rating} reviews={product.reviews} />

        <div className="product-foot">
          <span className="price">{formatPrice(product.price)}</span>
          <button className="btn btn-primary btn-sm" onClick={() => onAdd(product.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
