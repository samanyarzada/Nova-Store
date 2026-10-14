import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { products, categories } from "../data/products.js";

const features = [
  { icon: "🚚", title: "Fast shipping", text: "Free delivery on orders over $150" },
  { icon: "🛡️", title: "Authentic products", text: "100% genuine, quality-checked items" },
  { icon: "🔒", title: "Secure payment", text: "Pay safely with trusted payment providers" },
  { icon: "💬", title: "24/7 support", text: "We're here every day of the week" },
];

export default function Home({ onAdd }) {
  const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubscribed(true);
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-badge">✨ New season sale is live</span>
            <h1>
              Everything you need,
              <br />
              <span className="gradient-text">quality and delivered fast</span>
            </h1>
            <p>
              From everyday tech to home essentials — a hand-picked collection of the best products
              with guaranteed authenticity and quick delivery.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-light btn-lg">
                Shop now
              </Link>
              <Link to="/products?category=electronics" className="btn btn-ghost btn-lg">
                Browse electronics
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>12,000+</strong>
                <span>Happy customers</span>
              </div>
              <div>
                <strong>4.8 ★</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>48 hours</strong>
                <span>Nationwide delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orb orb-1">🎧</div>
            <div className="orb orb-2">👟</div>
            <div className="orb orb-3">⌚</div>
            <div className="orb orb-4">☕</div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="features">
          {features.map((f) => (
            <div key={f.title} className="feature">
              <span className="feature-icon">{f.icon}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Shop by category</h2>
        </div>
        <div className="category-grid">
          {categories
            .filter((c) => c.id !== "all")
            .map((c) => (
              <Link key={c.id} to={`/products?category=${c.id}`} className="category-tile">
                <span className="category-emoji">{c.emoji}</span>
                <span>{c.label}</span>
              </Link>
            ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Top rated products</h2>
          <Link to="/products" className="link-more">
            View all →
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="newsletter">
          <div>
            <h2>Get deals before everyone else</h2>
            <p>Enter your email and we'll send you the latest offers and new arrivals.</p>
          </div>

          {subscribed ? (
            <div className="newsletter-done">✓ You're subscribed. Thank you!</div>
          ) : (
            <form onSubmit={handleSubscribe} noValidate className="newsletter-form">
              <div className="newsletter-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? "invalid" : ""}
                />
                <button type="submit" className="btn btn-accent">
                  Subscribe
                </button>
              </div>
              {error && <span className="newsletter-error">{error}</span>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
