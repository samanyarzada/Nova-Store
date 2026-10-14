import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="logo logo-light">
            <span className="logo-mark">N</span>
            <span>Nova Store</span>
          </div>
          <p className="footer-text">
            A practice store built with React: useState, props, routing and form validation.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <Link to="/products?category=electronics">Electronics</Link>
          <Link to="/products?category=fashion">Fashion</Link>
          <Link to="/products?category=home">Home &amp; Kitchen</Link>
        </div>
      </div>
      <div className="footer-bottom">© Nova Store — a learning project</div>
    </footer>
  );
}
