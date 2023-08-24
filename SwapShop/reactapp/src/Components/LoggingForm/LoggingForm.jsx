import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import React from "react";

import "./LoggingStyle.css";

const LoggingForm = ({ isHandleRegister, onLogin }) => {
  const [saveUsername, setSaveUsername] = useState("");
  const [saveEmail, setSaveEmail] = useState("");
  const [savePassword, setSavePassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering...");

    fetch(`https://localhost:7035/create/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: saveUsername,
        email: saveEmail,
        password: savePassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Registration response:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in...");
    fetch(`https://localhost:7035/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: saveUsername,
        password: savePassword,
        email: saveEmail,
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
        const userId = data;
        onLogin(saveUsername, userId);
        navigate("/marketplace");
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

        {isHandleRegister ? (
          <React.Fragment>
            <button type="submit" className="submit" onClick={handleRegister}>
              Register
            </button>
            <div className="link-account">
              <Link to="/login">Login</Link>
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
