import { useParams, useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();

  // Access the passed data using location.state
  const product = location.state;

  console.log(product);

  return (
    <div class="product-card">
      <Link to="/marketplace">All Products</Link>

      <div class="photo">
        <img src={product.image} />
      </div>
      <div class="description">
        <h2>{product.title}</h2>
        <h4>{product.category}</h4>
        <h1>{product.price}$</h1>
        <p>{product.description}</p>
        <button>Add to Cart</button>
        <button>Wishlist</button>
      </div>
    </div>
  );
};
export default ProductPage;
