import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
  const navigate = useNavigate();

  //   const onView = () => {
  //     navigate(`/product/${id}`, { state: product });
  //   };

  return (
    <article  className="tile">
      <div className="tile-header">
        <div>
          <img className="product-img" src="" />
          <h3>
            <span>{product.name}</span>
            <span>{product.description}</span>
            <span>{product.category}</span>
          </h3>
          <h2>{product.price}</h2>
          <button>view</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
