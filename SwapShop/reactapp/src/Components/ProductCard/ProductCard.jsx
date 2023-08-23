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
              src="https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/337292329_621094136154998_2998947273876574098_n.jpg?stp=dst-jpg_p720x720&_nc_cat=111&ccb=1-7&_nc_sid=3b2858&_nc_ohc=htBI0y0-Q24AX8phcow&_nc_ht=scontent-vie1-1.xx&oh=00_AfAbK-sNYo6hFa1jsHfJT94HpaWO9q0VvquBt0SNz5m1eQ&oe=64EAF3F8"
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
