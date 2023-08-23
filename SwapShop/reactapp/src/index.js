import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Login from "./Pages/Login/Login";
import Registering from "./Pages/Register/Register";
import CreateProduct from "./Pages/CreateProduct/CreateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registering />,
      },
      {
        path: "/marketplace",
        element: <MainPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/product/create",
        element: <CreateProduct />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
