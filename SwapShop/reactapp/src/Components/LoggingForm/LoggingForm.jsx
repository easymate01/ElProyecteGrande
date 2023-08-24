import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "./LoggingStyle.css";

const LoggingForm = ({ isHandleRegister, onLogin }) => {
  const [saveUsername, setSaveUsername] = useState("");
  const [saveEmail, setSaveEmail] = useState("");
  const [savePassword, setSavePassword] = useState("");

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
      .then((res) => res.json())
      .then((data) => {
        console.log("Registration response:", data);
        onLogin(saveUsername, data);
        navigate("/marketplace");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <>
      <div className="form">
        {!isHandleRegister ? (
          <>
            <div className="title2">Please Log In!</div>
            <div className="subtitle"></div>
          </>
        ) : (
          <>
            <div className="title2">Welcome</div>
            <div className="subtitle">Let's create your account!</div>
          </>
        )}
        <div className="input-container ic1">
          <div className="cut"></div>
          <label htmlFor="email" className="placeholder">
            Username
          </label>
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
          <label htmlFor="password" className="placeholder">
            Password
          </label>
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
          <label htmlFor="email" className="placeholder">
            Email
          </label>
        </div>

        {isHandleRegister ? (
          <>
            <button type="submit" className="submit" onClick={handleRegister}>
              Register
            </button>
            <div className="subtitle">
              <Link to="/login">Login</Link>
            </div>
          </>
        ) : (
          <>
            <button type="submit" className="submit" onClick={handleLogin}>
              Login
            </button>
            <div className="subtitle">
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LoggingForm;
