
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import "./App.css";

function App() {

  // PRODUCTS
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // OTHER FORMS
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showStockForm, setShowStockForm] = useState(false);

  // DASHBOARD
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  // LOAD DASHBOARD
  const loadDashboard = async () => {
    try {
      const response = await fetch(
        "https://inventory-management-backend-1-eco4.onrender.comagement-backend-001z.onrender.com/dashboard"
      );

      const data = await response.json();

      setTotalProducts(data.totalProducts);
      setTotalStock(data.totalStock);
      setLowStock(data.lowStock);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // HOME PAGE
  const Home = () => (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h1>
          Inventory Management System
        </h1>
      </header>

      {/* MENU */}
      <div className="menu">

        {/* ADD PRODUCT */}
        <Link
          to="/add"
          className="menu-button"
        >
          Add Product
        </Link>

        {/* VIEW PRODUCTS */}
        <button
          onClick={async () => {

            const response = await fetch(
              "https://inventory-management-backend-1-eco4.onrender.comagement-backend-001z.onrender.com/products"
            );

            const data = await response.json();

            setProducts(data);
            setSearchTerm("");

          }}
        >
          View Products
        </button>

        {/* SEARCH PRODUCT */}
        <button
          onClick={() => {

            const name = prompt(
              "Enter product name to search:"
            );

            if (name) {
              setSearchTerm(name);
            }

          }}
        >
          Search Product
        </button>

        {/* UPDATE PRODUCT */}
        <button
          onClick={() =>
            setShowUpdateForm(true)
          }
        >
          Update Product
        </button>

        {/* DELETE PRODUCT */}
        <button
          onClick={() =>
            setShowDeleteForm(true)
          }
        >
          Delete Product
        </button>

        {/* UPDATE STOCK */}
        <button
          onClick={() =>
            setShowStockForm(true)
          }
        >
          Update Stock
        </button>

        {/* LOW STOCK */}
        <button
          onClick={async () => {

            const response = await fetch(
              "https://inventory-management-backend-1-eco4.onrender.comagement-backend-001z.onrender.com/low-stock"
            );

            const data = await response.json();

            setProducts(data);
            setSearchTerm("");

          }}
        >
          Low Stock
        </button>

      </div>

      {/* UPDATE PRODUCT FORM */}
      {showUpdateForm && (

        <div className="form-box">

          <h2>Update Product</h2>

          <input
            type="number"
            placeholder="Product ID"
            id="updateId"
          />

          <input
            type="text"
            placeholder="New Product Name"
            id="updateProduct"
          />

          <input
            type="text"
            placeholder="New Category"
            id="updateCategory"
          />

          <input
            type="number"
            placeholder="New Price"
            id="updatePrice"
          />

          <input
            type="number"
            placeholder="New Quantity"
            id="updateQuantity"
          />

          <button
            onClick={async () => {

              const id =
                document.getElementById(
                  "updateId"
                ).value;

              const product =
                document.getElementById(
                  "updateProduct"
                ).value;

              const category =
                document.getElementById(
                  "updateCategory"
                ).value;

              const price =
                document.getElementById(
                  "updatePrice"
                ).value;

              const quantity =
                document.getElementById(
                  "updateQuantity"
                ).value;

              const response = await fetch(
                "https://inventory-management-backend-1-eco4.onrender.comagement-backend-001z.onrender.com/update-product",
                {
                  method: "PUT",

                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify({
                    id,
                    product,
                    category,
                    price,
                    quantity
                  })
                }
              );

              const result =
                await response.text();

              alert(result);

              setShowUpdateForm(false);

              loadDashboard();

            }}
          >
            Update
          </button>

          <button
            onClick={() =>
              setShowUpdateForm(false)
            }
          >
            Cancel
          </button>

        </div>
      )}

      {/* DELETE PRODUCT FORM */}
      {showDeleteForm && (

        <div className="form-box">

          <h2>Delete Product</h2>

          <input
            type="number"
            placeholder="Product ID"
            id="deleteId"
          />

          <button
            onClick={async () => {

              const id =
                document.getElementById(
                  "deleteId"
                ).value;

              const response = await fetch(
                "https://inventory-management-backend-1-eco4.onrender.comagement-backend-001z.onrender.com/delete-product",
                {
                  method: "DELETE",

                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify({
                    id
                  })
                }
              );

              const result =
                await response.text();

              alert(result);

              setShowDeleteForm(false);

              loadDashboard();

            }}
          >
            Delete
          </button>

          <button
            onClick={() =>
              setShowDeleteForm(false)
            }
          >
            Cancel
          </button>

        </div>
      )}

      {/* UPDATE STOCK FORM */}
      {showStockForm && (

        <div className="form-box">

          <h2>Update Stock</h2>

          <input
            type="number"
            placeholder="Product ID"
            id="stockId"
          />

          <input
            type="number"
            placeholder="New Quantity"
            id="stockQuantity"
          />

          <button
            onClick={async () => {

              const id =
                document.getElementById(
                  "stockId"
                ).value;

              const quantity =
                document.getElementById(
                  "stockQuantity"
                ).value;

              const response = await fetch(
                "https://inventory-management-backend-1-eco4.onrender.comagement-backend-001z.onrender.com/update-stock",
                {
                  method: "PUT",

                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify({
                    id,
                    quantity
                  })
                }
              );

              const result =
                await response.text();

              alert(result);

              setShowStockForm(false);

              loadDashboard();

            }}
          >
            Update
          </button>

          <button
            onClick={() =>
              setShowStockForm(false)
            }
          >
            Cancel
          </button>

        </div>
      )}

      {/* DASHBOARD */}
      <section className="dashboard">

        <div className="card">

          <h2>Total Products</h2>

          <p>
            {totalProducts}
          </p>

        </div>

        <div className="card">

          <h2>Total Stock</h2>

          <p>
            {totalStock}
          </p>

        </div>

        <div className="card">

          <h2>Low Stock</h2>

          <p>
            {lowStock}
          </p>

        </div>

      </section>

      {/* PRODUCTS TABLE */}
      <section className="products">

        <h2>
          Products
        </h2>

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>

            </tr>

          </thead>

          <tbody>

            {products
              .filter((item) =>
                item.product
                  .toLowerCase()
                  .includes(
                    searchTerm.toLowerCase()
                  )
              )
              .map((item) => (

                <tr key={item.id}>

                  <td>
                    {item.id}
                  </td>

                  <td>
                    {item.product}
                  </td>

                  <td>
                    {item.category}
                  </td>

                  <td>
                    ₹{item.price}
                  </td>

                  <td>
                    {item.quantity}
                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </section>

    </div>
  );

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/add"
          element={<AddProduct />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
