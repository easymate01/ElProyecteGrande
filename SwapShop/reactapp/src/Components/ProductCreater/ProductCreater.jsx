import { useState } from "react";
import "./Product.css";

import { Outlet, Link } from "react-router-dom";

const ProductCreator = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  const handelAddProduct = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7035/create/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Createing Product response:", data);
      })
      .catch((error) => {
        console.error("Createing Product error:", error);
      });
  };
  return (
    <div className="form-container">
      <div className="nice-form-group">
        <div>
          <h1>Create Item For Sale</h1>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="nice-form-group">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="nice-form-group">
          <input
            type="text"
            placeholder="Price in $"
            value={price === 0 ? "" : price}
            onChange={(e) => {
              const inputPrice = e.target.value;
              // Remove the dollar sign before setting the state
              setPrice(inputPrice.replace(/\$/g, ""));
            }}
          />
        </div>

        <div className="nice-form-group">
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="bottom-container">
          <button type="submit" onClick={handelAddProduct}>
            Add Product
          </button>
        </div>
      </div>

      <div>
        <p className="small-desc">
          Marketplace items are public and can be seen by anyone on or off
          Facebook. Items like animals, drugs, weapons, counterfeits, and other
          items that infringe intellectual property aren't allowed on
          Marketplace. See our Commerce Policies.
        </p>
      </div>
    </div>
  );
};
export default ProductCreator;
