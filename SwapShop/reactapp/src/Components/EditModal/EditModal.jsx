import React, { useState } from "react";
import "./modal.css";

const EditProductModal = ({ isOpen, onClose, product, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    console.log(editedProduct);
  };

  const handleSave = () => {
    // onUpdate(editedProduct);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Product</h2>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder={product.name}
              value={editedProduct.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="text"
              name="imageBase64"
              value={editedProduct.imageBase64}
              onChange={handleChange}
            />
          </div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
