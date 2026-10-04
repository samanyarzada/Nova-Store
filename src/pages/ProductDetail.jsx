import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { products, categories } from "../data/products.js";
import { formatPrice, formatNumber, gradientFor } from "../utils.js";

export default function ProductDetail({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container page">
        <div className="empty">
          <span className="empty-emoji">😕</span>
          <h3>This product doesn't exist</h3>
          <Link to="/products" className="btn btn-primary">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function buyNow() {
    onAdd(product.id, qty);
    navigate("/cart");
  }

  return (
    <div className="container page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`}>{category.label}</Link>
        <span>/</span>
        <strong>{product.name}</strong>
      </nav>

      <div className="detail">
        <div className="detail-visual" style={{ background: gradientFor(product.hue) }}>
          <span className="detail-emoji">{product.emoji}</span>
        </div>

        <div className="detail-info">
          <span className="product-category">{category.label}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} reviews={product.reviews} />

          <p className="detail-desc">{product.description}</p>

          <ul className="feature-list">
            {product.features.map((f) => (
              <li key={f}>
                <span className="check">✓</span> {f}
              </li>
            ))}
          </ul>

          <div className="detail-price">{formatPrice(product.price)}</div>

          <p className={product.stock <= 5 ? "stock low" : "stock"}>
            {product.stock <= 5
              ? `Only ${formatNumber(product.stock)} left in stock`
              : "In stock"}
          </p>

          <div className="buy-row">
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{formatNumber(qty)}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => onAdd(product.id, qty)}>
              Add to cart
            </button>
            <button className="btn btn-outline btn-lg" onClick={buyNow}>
              Buy now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Related products</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
