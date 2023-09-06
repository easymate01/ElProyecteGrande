import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, isLoggedIn }) => {
  const navigate = useNavigate();

  const { id } = product;

  const onView = () => {
    navigate(`/product/${id}?isLoggedIn=${isLoggedIn}`);
  };

  return (
    <article className="tile">
      <div className="tile-header">
        <div>
          <div className="image-container">
            <img
              className="product-img"
              src="https://scontent-vie1-1.xx.fbcdn.net/v/t45.5328-4/363503499_6849900495040486_2838732717185533293_n.jpg?stp=dst-jpg_p720x720&_nc_cat=110&ccb=1-7&_nc_sid=1a0e84&_nc_ohc=B1qH3E43CTQAX8KfFgO&_nc_ht=scontent-vie1-1.xx&oh=00_AfCF89xqSsXc0U2JmxNTzSBdJW8nt0bEz8G3vh-WOEyMqw&oe=64FD36F8"
            />
          </div>
          <div className="product-infos">
            <h3>
              <span>{product.name}</span>
            </h3>
            <h4>{product.category}</h4>
            <h2>{product.price} $</h2>
          </div>
          <button className="product-view-btn" onClick={onView}>
            View Product
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
