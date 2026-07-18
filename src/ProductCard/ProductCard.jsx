function ProductCard({ product }) {
    return (
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", margin: "8px" }}>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <p><strong>${product.price}</strong></p>
      </div>
    );
  }
  
  export default ProductCard;