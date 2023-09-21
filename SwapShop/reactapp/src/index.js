import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
import reportWebVitals from "./reportWebVitals";

import MainPage from "./Pages/MainPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Login from "./Pages/Login/Login";
import Registering from "./Pages/Register/Register";
import CreateProduct from "./Pages/CreateProduct/CreateProduct";
import Header from "./Components/Header/Header";
import MyAccount from "./Pages/MyAccount/MyAccount";
import AdminPage from "./Pages/AdminPage/AdminPage";

const App = () => {
  const userId = Cookies.get("userId");
  const userName = Cookies.get("userUserName");
  const userToken = Cookies.get("userToken");
  const userEmail = Cookies.get("userEmail");

  const [isLoggedIn, setIsLoggedIn] = React.useState(userId ? true : false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("userId");
    Cookies.remove("userUserName");
    Cookies.remove("userToken");
    Cookies.remove("userEmail");
    Cookies.remove("Role");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
        />
      ),
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/login",
          element: <Login onLogin={handleLogin} />,
        },
        {
          path: "/register",
          element: <Registering />,
        },
        {
          path: "/marketplace",
          element: <MainPage isLoggedIn={userId} />,
        },
        {
          //needs token
          path: "/product/:id",
          element: <ProductPage user={{ userToken, userId }} />,
        },
        {
          //need to create editing product
          path: "/product/edit",
          element: <Registering />,
        },
        {
          //needs token
          path: "/marketplace/you/account",
          element: (
            <MyAccount user={{ userToken, userId }} isLoggedIn={isLoggedIn} />
          ),
        },
        {
          //needs token
          path: "/product/create",
          element: (
            <CreateProduct
              isLoggedIn={isLoggedIn}
              user={{ userToken, userId }}
            />
          ),
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals();
