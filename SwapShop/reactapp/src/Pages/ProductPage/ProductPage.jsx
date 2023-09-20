import { useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import API_BASE_URL from "../../config";

import "./ProductPage.css";

const ProductPage = ({ user }) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleContactSeller = () => {
    if (isLoggedIn) {
      console.log("you can contact with the seller...");
    } else {
      console.log("please login first!");
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
                <h4>{product.category}</h4>
                <h1>Price: {product.price}$</h1>
                <p>{product.description}</p>
              </div>
              <button onClick={handleContactSeller}>Contact with seller</button>
              <button>Wishlist</button>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};
export default ProductPage;
