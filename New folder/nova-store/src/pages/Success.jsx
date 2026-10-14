import { Link, Navigate } from "react-router-dom";
import { formatPrice, formatNumber } from "../utils.js";

export default function Success({ order }) {
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const { code, customer, items, totals } = order;

  return (
    <div className="container page">
      <div className="card success-card">
        <div className="success-icon">✓</div>
        <h1>Order placed!</h1>
        <p className="success-sub">
          Your order number is <strong>#{code}</strong>
        </p>

        <div className="success-grid">
          <div>
            <h4>Recipient</h4>
            <p>{customer.fullName}</p>
            <p>{customer.phone}</p>
          </div>
          <div>
            <h4>Shipping address</h4>
            <p>
              {customer.address}, {customer.city}, {customer.state} {customer.zip}
            </p>
          </div>
          <div>
            <h4>Payment</h4>
            <p>{customer.payment === "card" ? "Paid online" : "Cash on delivery"}</p>
          </div>
        </div>

        <ul className="success-items">
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.emoji} {item.name} × {formatNumber(item.qty)}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
          <li className="success-total">
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </li>
        </ul>

        <Link to="/products" className="btn btn-primary btn-lg">
          Back to the store
        </Link>
      </div>
    </div>
  );
}
