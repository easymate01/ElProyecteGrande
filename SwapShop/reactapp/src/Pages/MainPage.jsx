import React, { useState, useEffect } from "react";

import "./Main.css";
import API_BASE_URL from "../config";

import Nav from "../Components/Navigation/Nav";
import Header from "../Components/Header/Header";
import Dashboard from "../Components/Dashboard/Dashboard";
import Login from "./Login/Login";

const MainPage = () => {
  const [userData, setUserData] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/products/available`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <div className="app">
        <div className="app-body">
          <Nav />
          <div className="app-body-main-content">
            <div className="service-section">
              {loading ? (
                <div>Loading fetching data...</div>
              ) : (
                <Dashboard allPRoducts={products} isLoggedIn={isLoggedIn} />
              )}
              <footer className="service-section-footer">
                <p>
                  Services are paid according to the current state of the
                  currency and tariff.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
