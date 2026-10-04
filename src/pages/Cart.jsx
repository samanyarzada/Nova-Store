import { Link } from "react-router-dom";
import OrderSummary from "../components/OrderSummary.jsx";
import { formatPrice, formatNumber, plural, gradientFor } from "../utils.js";

export default function Cart({ items, totals, onUpdateQty, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="container page">
        <div className="empty">
          <span className="empty-emoji">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Add some of your favorite products to get started.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <div className="page-head">
        <h1>Shopping cart</h1>
        <p>{plural(items.length, "item")} in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <div key={item.id} className="card cart-item">
              <Link
                to={`/products/${item.id}`}
                className="cart-thumb"
                style={{ background: gradientFor(item.hue) }}
              >
                {item.emoji}
              </Link>

              <div className="cart-info">
                <Link to={`/products/${item.id}`} className="cart-name">
                  {item.name}
                </Link>
                <span className="cart-unit">{formatPrice(item.price)} each</span>
              </div>

              <div className="qty">
                <button
                  onClick={() => onUpdateQty(item.id, item.qty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{formatNumber(item.qty)}</span>
                <button
                  onClick={() => onUpdateQty(item.id, item.qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="cart-line-total">{formatPrice(item.price * item.qty)}</div>

              <button className="icon-btn" onClick={() => onRemove(item.id)} aria-label="Remove item">
                🗑️
              </button>
            </div>
          ))}
        </div>

        <aside>
          <OrderSummary totals={totals} />
          <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
            Proceed to checkout
          </Link>
          <Link to="/products" className="btn btn-ghost-dark btn-block">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
