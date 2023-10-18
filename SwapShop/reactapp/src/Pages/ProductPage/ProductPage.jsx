import { useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import API_BASE_URL from "../../config";

import "./ProductPage.css";

const ProductPage = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSeller, setShowSeller] = useState(false);

  const location = useLocation();
  const isLoggedIn = new URLSearchParams(location.search).get("isLoggedIn");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/product/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.userToken}`,
          },
        });

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const onOpen = () => {
    if (isLoggedIn) {
      setShowSeller(!showSeller);
    }
  };

  const onClose = () => {
    if (isLoggedIn) {
      setShowSeller(!showSeller);
    }
  };
  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <React.Fragment>
          <div className="product-modal">
            <div className="product-page-card">
              <div className="photo">
                <img src={`data:image/jpeg;base64,${product.imageBase64}`} />
              </div>
              <div className="description">
                <Link to="/marketplace">All Products</Link>
                <h2>{product.name}</h2>
                <h4>category: {product.category}</h4>
                <h1>Price: {product.price}$</h1>
                <p>Description: {product.description}</p>
              </div>
              <button onClick={onOpen}>Show Seller Information</button>
              <button>Wishlist</button>
            </div>
            <div className={`modal ${showSeller ? "open" : ""}`}>
              <div className="seller-infos">
                <span className="close" onClick={onClose}>
                  &times;
                </span>
                {showSeller && <div>This is the infos</div>}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};
export default ProductPage;
