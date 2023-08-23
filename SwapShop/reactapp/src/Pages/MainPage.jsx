import Header from "../Components/Header/Header";
import Nav from "../Components/Navigation/Nav";
import React, { useState, useEffect } from "react";

import "./Main.css";
import Dashboard from "../Components/Dashboard/Dashboard";
import SideBar from "../Components/Sidebar";

const MainPage = () => {
  const [users, setUsers] = useState("");
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://localhost:7035/products");
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
        <Header />
        <div className="app-body">
          <Nav />
          <Dashboard allPRoducts={products} />
          <SideBar />
        </div>
      </div>
    </>
  );
};
export default MainPage;
