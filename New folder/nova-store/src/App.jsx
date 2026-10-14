import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Success from "./pages/Success.jsx";
import NotFound from "./pages/NotFound.jsx";
import { products } from "./data/products.js";
import { calcTotals } from "./utils.js";
import useTheme from "./hooks/useTheme.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Main app state: the cart is stored as [{ id, qty }]
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [theme, toggleTheme] = useTheme();

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  function addToCart(id, qty = 1) {
    const product = products.find((p) => p.id === id);
    const existing = cart.find((i) => i.id === id);

    if (existing) {
      const newQty = Math.min(existing.qty + qty, product.stock);
      setCart(cart.map((i) => (i.id === id ? { ...i, qty: newQty } : i)));
    } else {
      setCart([...cart, { id, qty: Math.min(qty, product.stock) }]);
    }
    showToast(`"${product.name}" added to your cart`);
  }

  function updateQty(id, qty) {
    const product = products.find((p) => p.id === id);
    if (qty < 1 || qty > product.stock) return;
    setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function removeFromCart(id) {
    setCart(cart.filter((i) => i.id !== id));
  }

  // Full cart items (product info combined with quantity)
  const cartItems = cart.map((i) => ({ ...products.find((p) => p.id === i.id), qty: i.qty }));
  const totals = calcTotals(cartItems);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function placeOrder(customer) {
    setLastOrder({
      code: Math.floor(100000 + Math.random() * 900000),
      customer,
      items: cartItems,
      totals,
    });
    setCart([]);
  }

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar cartCount={cartCount} theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Routes>
          <Route path="/" element={<Home onAdd={addToCart} />} />
          <Route path="/products" element={<Products onAdd={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetail onAdd={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                items={cartItems}
                totals={totals}
                onUpdateQty={updateQty}
                onRemove={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout items={cartItems} totals={totals} onPlaceOrder={placeOrder} />}
          />
          <Route path="/success" element={<Success order={lastOrder} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <Toast message={toast} />
    </div>
  );
}
