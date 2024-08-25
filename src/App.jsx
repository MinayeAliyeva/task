import { useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState({ productName: "", productPrice: 0 });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? parseFloat(value) : value,
    }));
  };

  const addProduct = () => {
    if (product.productName && product.productPrice > 0) {
      setProducts((prev) => [...prev, product]);
      setProduct({ productName: "", productPrice: 0 });
    }
  };

  const deleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPrice = products.reduce(
    (total, item) => total + item.productPrice,
    0
  );

  return (
    <div className="App">
      <label>Product Name</label>
      <input
        type="text"
        onChange={handleChange}
        name="productName"
        value={product.productName}
      />
      <label>Product Price</label>
      <input
        type="number"
        onChange={handleChange}
        name="productPrice"
        value={product.productPrice}
      />
      <button onClick={addProduct}>Add Product</button>

      <h2>Product List</h2>
      <ul>
        {products.map((item, index) => (
          <li key={index}>
            {item.productName} - ${item.productPrice.toFixed(2)}
            <button onClick={() => deleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Total Price:${totalPrice.toFixed(2)}</h3>
    </div>
  );
}

export default App;
