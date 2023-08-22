import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const navigate = useNavigate();

  //   const onView = () => {
  //     navigate(`/product/${id}`, { state: product });
  //   };

  return (
    <article className="tile">
      <div className="tile-header">
        <div>
          <img className="product-img" src="" />
          <h3>
            <span>{}</span>
            <span>{}</span>
          </h3>
          <button>view</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
