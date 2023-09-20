import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Outlet, Link } from "react-router-dom";
import React from "react";
import jwtDecode from "jwt-decode";

import API_BASE_URL from "../../config";
import "./LoggingStyle.css";

const LoggingForm = ({ isHandleRegister, onLogin }) => {
  const [saveUsername, setSaveUsername] = useState("");
  const [saveEmail, setSaveEmail] = useState("");
  const [savePassword, setSavePassword] = useState("");
  const [error, setError] = useState();
  const [tokens, setTokens] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering...");
    console.log({ saveUsername, saveEmail, savePassword });
    fetch(`${API_BASE_URL}/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: saveEmail,
        username: saveUsername,
        password: savePassword,
      }),
    })
      .then((res) => {
        if (res.status !== 201) {
          console.log("Registration error:", res);
        } else if (res.status === 400) {
          console.log(
            "Username or email is already taken, or password is not valid."
          );
        }
        return res.json();
      })
      .then((data) => {
        console.log("Registration response:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error.message);
        // Handle the error and display a user-friendly message if needed
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in...");
    fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: saveEmail,
        password: savePassword,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json(); // Parse the response body as JSON
        } else {
          console.log("An error occurred:", res);
          setError(res);
        }
      })
      .then((data) => {
        const { id, email, userName, token } = data;

        Cookies.set("userId", id, { expires: 10 });
        Cookies.set("userEmail", email, { expires: 10 });
        Cookies.set("userUserName", userName, { expires: 10 });
        Cookies.set("userToken", token, { expires: 10 });

        setTokens(token);
        const decodedToken = jwtDecode(token);

        if (
          decodedToken &&
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] === "Admin"
        ) {
          // User is an admin
          console.log("User is an admin.");
          Cookies.set("Role", "Admin");
          navigate("/admin");
          onLogin();
        } else {
          // User is not an admin
          Cookies.set("Role", "User");
          navigate("/marketplace");
        }
        onLogin();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <>
      <div className="form">
        {!isHandleRegister ? (
          <>
            <div className="title2">Please Log In!</div>
          </>
        ) : (
          <>
            <div className="title2">Welcome,</div>
            <div className="subtitle">Let's create your account!</div>
          </>
        )}
        {isHandleRegister ? (
          <div className="input-container ic1">
            <div className="cut"></div>
            <input
              id="firstname"
              className="input"
              type="text"
              placeholder="full name"
              onChange={(e) => setSaveUsername(e.target.value)}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="input-container ic2">
          <input
            id="email"
            className="input"
            type="text"
            placeholder="email"
            onChange={(e) => setSaveEmail(e.target.value)}
          />
          <div className="cut cut-short"></div>
        </div>

        <div className="input-container ic2">
          <input
            id="lastname"
            className="input"
            type="password"
            placeholder="password"
            onChange={(e) => setSavePassword(e.target.value)}
          />
          <div className="cut"></div>
        </div>

        {isHandleRegister ? (
          <React.Fragment>
            <button type="submit" className="submit" onClick={handleRegister}>
              Register
            </button>
            <div className="link-account">
              If you already have an account, you can log in here:
              <Link to="/login"> Login</Link>
            </div>
          </React.Fragment>
        ) : (
          <>
            <button type="submit" className="submit" onClick={handleLogin}>
              Login
            </button>
            {error != null && <h1>ERROR: {error.status}</h1>}
            <div className="link-account">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LoggingForm;
