import { Outlet, Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="app-body-navigation">
      <nav className="navigation">
        <li className="ph-browsers">
          <Link to="/">Home</Link>
        </li>

        <li className="ph-check-square">
          <Link to="/">My Orders</Link>
        </li>

        <li className="ph-swap">
          <Link to="/">Explore</Link>
        </li>

        <li className="ph-globe">
          <Link to="/">Add Products</Link>
        </li>

        <li className="ph-clipboard-text">
          <Link to="/">Chat</Link>
        </li>
      </nav>
      <footer className="footer">
        <h1>
          Almeria<small>©</small>
        </h1>
        <div>
          Almeria ©<br />
          All Rights Reserved 2021
        </div>
      </footer>
    </div>
  );
};
export default Nav;
