import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Field from "../components/Field.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import { formatPrice, formatNumber } from "../utils.js";

const states = [
  "California",
  "Colorado",
  "Florida",
  "Illinois",
  "Massachusetts",
  "New York",
  "Texas",
  "Washington",
];

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  zip: "",
  address: "",
  payment: "card",
  terms: false,
};

// Each validator returns an error message, or "" when the value is valid
const validators = {
  fullName: (v) =>
    v.trim().length >= 5 && v.trim().split(/\s+/).length >= 2
      ? ""
      : "Please enter your first and last name",
  phone: (v) => {
    const digits = v.replace(/\D/g, "");
    const onlyAllowed = /^[+\d\s\-()]+$/.test(v.trim());
    return onlyAllowed && digits.length >= 10 && digits.length <= 15
      ? ""
      : "Enter a valid phone number (e.g. 555 123 4567)";
  },
  email: (v) =>
    v.trim() === "" || /^\S+@\S+\.\S+$/.test(v.trim()) ? "" : "Enter a valid email address",
  city: (v) => (v.trim().length >= 2 ? "" : "Please enter your city"),
  state: (v) => (v ? "" : "Please select your state"),
  zip: (v) => (/^\d{5}$/.test(v.trim()) ? "" : "ZIP code must be 5 digits"),
  address: (v) => (v.trim().length >= 10 ? "" : "Address must be at least 10 characters"),
  terms: (v) => (v ? "" : "You must accept the terms and conditions"),
};

export default function Checkout({ items, totals, onPlaceOrder }) {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  // An empty cart sends the visitor back to the cart page
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  // Errors are derived from the current values on every render
  const errors = {};
  Object.keys(validators).forEach((key) => {
    errors[key] = validators[key](values[key]);
  });

  // Only show an error after the field was touched (or the form was submitted)
  const shownError = (name) => (touched[name] ? errors[name] : "");

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setValues({ ...values, [name]: type === "checkbox" ? checked : value });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Mark every field as touched so all errors become visible
    const allTouched = {};
    Object.keys(validators).forEach((key) => (allTouched[key] = true));
    setTouched(allTouched);

    const hasError = Object.values(errors).some((msg) => msg !== "");
    if (hasError) return;

    onPlaceOrder(values);
    navigate("/success");
  }

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: shownError(name) ? "invalid" : "",
  });

  return (
    <div className="container page">
      <div className="page-head">
        <h1>Checkout</h1>
        <p>Enter your shipping and payment details</p>
      </div>

      <div className="checkout-layout">
        <form className="card form-card" onSubmit={handleSubmit} noValidate>
          <h3>Shipping details</h3>

          <div className="form-grid">
            <Field label="Full name *" name="fullName" error={shownError("fullName")}>
              <input {...inputProps("fullName")} placeholder="e.g. Alex Johnson" />
            </Field>

            <Field label="Phone number *" name="phone" error={shownError("phone")}>
              <input {...inputProps("phone")} placeholder="555 123 4567" inputMode="tel" />
            </Field>

            <Field
              label="Email (optional)"
              name="email"
              error={shownError("email")}
              hint="We'll send your receipt here"
            >
              <input {...inputProps("email")} type="email" placeholder="name@example.com" />
            </Field>

            <Field label="City *" name="city" error={shownError("city")}>
              <input {...inputProps("city")} placeholder="e.g. Austin" />
            </Field>

            <Field label="State *" name="state" error={shownError("state")}>
              <select {...inputProps("state")}>
                <option value="">Select a state...</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="ZIP code *" name="zip" error={shownError("zip")}>
              <input {...inputProps("zip")} placeholder="5 digits" inputMode="numeric" maxLength={5} />
            </Field>
          </div>

          <Field label="Street address *" name="address" error={shownError("address")}>
            <textarea
              {...inputProps("address")}
              rows="3"
              placeholder="Street, apartment, suite, unit..."
            />
          </Field>

          <h3 className="form-subtitle">Payment method</h3>
          <div className="radio-group">
            <label className={`radio-card ${values.payment === "card" ? "selected" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={values.payment === "card"}
                onChange={handleChange}
              />
              <span>
                <strong>Pay online</strong>
                <small>Secure payment by credit or debit card</small>
              </span>
            </label>
            <label className={`radio-card ${values.payment === "cod" ? "selected" : ""}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={values.payment === "cod"}
                onChange={handleChange}
              />
              <span>
                <strong>Cash on delivery</strong>
                <small>Pay when your order arrives</small>
              </span>
            </label>
          </div>

          <div className={`checkbox-row ${shownError("terms") ? "has-error" : ""}`}>
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={values.terms}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>I accept the store's terms and conditions</span>
            </label>
            {shownError("terms") && <span className="field-error">{shownError("terms")}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Place order — {formatPrice(totals.total)}
          </button>
        </form>

        <aside>
          <OrderSummary totals={totals} />
          <div className="card mini-items">
            <h3>Items in your order</h3>
            {items.map((item) => (
              <div key={item.id} className="mini-item">
                <span>{item.emoji}</span>
                <span className="mini-name">{item.name}</span>
                <span>× {formatNumber(item.qty)}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
