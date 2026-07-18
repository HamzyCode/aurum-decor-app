import { useState } from 'react';
import { products } from './products';
import ProductCard from './ProductCard';

function App() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = filter === "All"
    ? products
    : products.filter(p => p.category === filter);

  return (
    <div>
      <h1>Aurum Decor Catalog</h1>

      <div>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;