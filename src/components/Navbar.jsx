import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { formatNumber } from "../utils.js";

export default function Navbar({ cartCount }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={close}>
          <span className="logo-mark">N</span>
          <span>Nova Store</span>
        </Link>

        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={close}>
            Products
          </NavLink>
          <NavLink to="/cart" onClick={close} className="cart-link">
            <span>🛒 Cart</span>
            {cartCount > 0 && <span className="badge">{formatNumber(cartCount)}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
