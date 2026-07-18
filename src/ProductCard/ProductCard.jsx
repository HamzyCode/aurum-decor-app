function ProductCard({ product, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image">[ product photo ]</div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${product.price}</p>
        <button className="delete-btn" onClick={() => onDelete(product.id)}>Remove</button>
      </div>
    </div>
  );
}

export default ProductCard;