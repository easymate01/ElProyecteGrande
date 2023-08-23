import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import "./LoggingStyle.css";
const LoggingForm = ({ isHandleRegister, isLogin }) => {
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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Registration response:", data);
        navigate("/marketplace");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <>
      {/* <>
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
            <input
              id="firstname"
              className="input"
              type="text"
              placeholder=" "
              onChange={(e) => setSaveUsername(e.target.value)}
            />
            <div className="cut"></div>
            <label htmlFor="email" className="placeholder">
              Username
            </label>
          </div>
          {isHandleRegister && (
            <div className="input-container ic2">
              <input
                id="email"
                className="input"
                type="text"
                placeholder=" "
                onChange={(e) => setSaveEmail(e.target.value)}
              />
              <div className="cut cut-short"></div>
              <label htmlFor="email" className="placeholder">
                Email
              </label>
            </div>
          )}

          <div className="input-container ic2">
            <input
              id="lastname"
              className="input"
              type="password"
              placeholder=" "
              onChange={(e) => setSavePassword(e.target.value)}
            />
            <div className="cut"></div>
            <label htmlFor="lastname" className="placeholder">
              Password
            </label>
          </div>
          {isHandleRegister ? (
            <>
              <button type="text" className="submit" onClick={handleRegister}>
                Register
              </button>
              <div className="subtitle">
                <Link to="/login">Login</Link>
              </div>
            </>
          ) : (
            <>
              <button type="text" className="submit" onClick={handleLogin}>
                Login
              </button>
              <div className="subtitle">
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      </> */}
      <>
        <div className="container">
          <div className="left">
            <div className="header">
              <h2 className="animation a1">Welcome Back</h2>
              <h4 className="animation a2">
                Log in to your account using email and password
              </h4>
            </div>
            <div className="form">
              <input
                type="email"
                className="form-field animation a3"
                placeholder="Email Address"
                onChange={(e) => setSaveUsername(e.target.value)}
              />
              <input
                type="password"
                className="form-field animation a4"
                placeholder="Password"
                onChange={(e) => setSavePassword(e.target.value)}
              />
              <p className="animation a5">
                <a href="#">Forgot Password</a>
              </p>
              <button className="animation a6">LOGIN</button>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </>
    </>
  );
};

export default LoggingForm;
