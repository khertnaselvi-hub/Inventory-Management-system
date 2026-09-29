import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addProduct = async () => {
    try {
      const response = await fetch(
        "https://inventory-management-backend-001z.onrender.com/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            product,
            category,
            price,
            quantity
          })
        }
      );

      const result = await response.text();

      alert(result);

      if (response.ok) {
        setProduct("");
        setCategory("");
        setPrice("");
        setQuantity("");

        navigate("/");
      }
    } catch (error) {
      alert("Unable to connect to backend");
      console.error(error);
    }
  };

  return (
    <div className="form-box">
      <h2>Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br />

      <button onClick={addProduct}>
        Add
      </button>

      <button onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
}

export default AddProduct;