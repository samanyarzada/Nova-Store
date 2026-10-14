import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { products, categories } from "../data/products.js";
import { plural } from "../utils.js";

export default function Products({ onAdd }) {
  // The category lives in the URL (?category=home)
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");

  function selectCategory(id) {
    setParams(id === "all" ? {} : { category: id });
  }

  const query = search.trim().toLowerCase();

  let result = products.filter((p) => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  if (sort === "cheap") result = [...result].sort((a, b) => a.price - b.price);
  if (sort === "expensive") result = [...result].sort((a, b) => b.price - a.price);
  if (sort === "popular") result = [...result].sort((a, b) => b.reviews - a.reviews);
  if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);

  function resetFilters() {
    setSearch("");
    setSort("popular");
    setParams({});
  }

  return (
    <div className="container page">
      <div className="page-head">
        <h1>Products</h1>
        <p>{plural(result.length, "product")} found</p>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="select">
          <option value="popular">Most popular</option>
          <option value="rating">Highest rated</option>
          <option value="cheap">Price: low to high</option>
          <option value="expensive">Price: high to low</option>
        </select>
      </div>

      <div className="chips">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`chip ${category === c.id ? "active" : ""}`}
            onClick={() => selectCategory(c.id)}
          >
            <span>{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      {result.length > 0 ? (
        <div className="product-grid">
          {result.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <span className="empty-emoji">🔎</span>
          <h3>No products found</h3>
          <p>Try a different search term or category.</p>
          <button className="btn btn-primary" onClick={resetFilters}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
