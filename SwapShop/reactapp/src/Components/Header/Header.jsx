import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header-logo">
        <div className="logo">
          <span className="logo-icon">
            <img src="https://assets.codepen.io/285131/almeria-logo.svg" />
          </span>
          <h1 className="logo-title">
            <span>Jófogás</span>
            <span>Copy</span>
          </h1>
        </div>
      </div>

      <div className="app-header-navigation">
        <div className="tabs">
          <Link to="/">All Products</Link>

          <Link to="/">Trending Products</Link>

          <Link to="/">Account</Link>

          <Link to="/">Business</Link>
          <Link to="/">System</Link>
        </div>
      </div>

      <div className="app-header-actions">
        <button className="user-profile">
          <span>{}</span>
          <span>
            <img src="" />
          </span>
        </button>
        <div className="app-header-actions-buttons">
          <button className="icon-button large">
            <i className="ph-magnifying-glass"></i>
          </button>
          <button className="icon-button large">
            <i className="ph-bell"></i>
          </button>
        </div>
      </div>
      <div className="app-header-mobile">
        <button className="icon-button large">
          <i className="ph-list"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
