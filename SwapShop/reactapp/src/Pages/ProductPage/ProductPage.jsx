import { useParams, useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();

  // Access the passed data using location.state
  const product = location.state;

  return (
    <div class="product-card">
      <div class="photo"></div>

      <div class="description">
        <Link to="/marketplace">All Products</Link>
        <h2>{product.name}</h2>
        <h4>{product.category}</h4>
        <h1>{product.price}$</h1>
        <p>{product.description}</p>
        <button>Contact with seller</button>
        <button>Wishlist</button>
      </div>
    </div>
  );
};
export default ProductPage;
