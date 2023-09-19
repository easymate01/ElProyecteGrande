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
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
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
          <Dashboard allPRoducts={products} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </>
  );
};
export default MainPage;
