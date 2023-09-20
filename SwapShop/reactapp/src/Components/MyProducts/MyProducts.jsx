import { useNavigate } from "react-router-dom";
import "./myProducts.css";
import { useState } from "react";

const MyProductCard = ({
  product,
  isLoggedIn,
  myAccount,
  onDeleteProduct,
  user,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { id: productId } = product;

  const onEdit = () => {
    navigate(`/product/edit/`);
  };

  const onDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://localhost:7035/product/delete/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deleting Product response:", data);
        onDeleteProduct(productId);
        setLoading(false);
      });
  };

  const onSold = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://localhost:7035/product/sold/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.userToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deleting Product response:", data);
        setLoading(false);
      });
  };

  return (
    <div className="product-card-2">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="image-column">
            <img
              className="product-image"
              src={`data:image/jpeg;base64,${product.imageBase64}`}
              alt={product.name}
            />
          </div>
          <div className="text-column">
            <h3>
              <span>{product.name}</span>
            </h3>
            <h4>{product.category}</h4>
            <h2>{product.price} $</h2>
          </div>
          <div className="button-column">
            <button className="product-button edit-btn" onClick={onEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
              </svg>
            </button>
            <button className="product-button delet-btn" onClick={onDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash2"
                viewBox="0 0 16 16"
              >
                <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z" />
              </svg>
            </button>
            <button className="product-button sold-btn" onClick={onSold}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
              </svg>{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProductCard;
