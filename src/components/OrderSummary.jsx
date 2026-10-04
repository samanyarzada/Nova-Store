import { formatPrice, FREE_SHIPPING_LIMIT } from "../utils.js";

export default function OrderSummary({ totals }) {
  const { subtotal, shipping, total } = totals;
  const remaining = FREE_SHIPPING_LIMIT - subtotal;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100);

  return (
    <div className="card summary">
      <h3>Order summary</h3>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
      </div>

      <div className="summary-row summary-total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      <div className="shipping-bar">
        <div className="shipping-track">
          <div className="shipping-fill" style={{ width: `${progress}%` }} />
        </div>
        <small>
          {remaining > 0
            ? `${formatPrice(remaining)} away from free shipping`
            : "🎉 This order ships free"}
        </small>
      </div>
    </div>
  );
}
