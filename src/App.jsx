import './App.css';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(products.filter(p => p.id !== id)));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price || !category) return;

    fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), category }),
    })
      .then(res => res.json())
      .then(newProduct => {
        setProducts([...products, newProduct]);
        setName(""); setPrice(""); setCategory("");
      });
  };

  if (loading) return <p style={{textAlign:"center", marginTop:"100px"}}>Loading products...</p>;
  if (error) return <p style={{textAlign:"center", marginTop:"100px"}}>Error: {error}</p>;

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <div>
      <div className="header">
        <div className="logo">AURUM DECOR</div>
      </div>

      <div className="hero">
        <h1>Elevate Your Space</h1>
        <p>Custom laser-cut wall art & décor</p>
      </div>

      <form className="add-form" onSubmit={handleAdd}>
        <input placeholder="Product name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <button type="submit">Add Product</button>
      </form>

      <div className="filters">
        {categories.map(cat => (
          <button key={cat} className={filter === cat ? "active" : ""} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>

      <div className="footer">© Aurum Decor — aurumdecor.shop</div>
    </div>
  );
}

export default App;