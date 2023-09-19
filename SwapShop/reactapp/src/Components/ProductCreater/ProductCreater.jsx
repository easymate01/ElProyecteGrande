import { useState } from "react";

import API_BASE_URL from "../../config";

import "./Product.css";

const ProductCreator = ({ isLoggedIn, user }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [created, setCreated] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handelAddProduct = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/create/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.userToken}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
        userId: user.userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Createing Product response:", data);
        setCreated(true);
      })
      .catch((error) => {
        console.error("Createing Product error:", error);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="form-container">
          <div className="nice-form-group">
            <div>
              <h1>Create Item For Sale</h1>
              {created && <h3>Product created. ✅</h3>}
              <input
                type="text"
                placeholder="Item name"
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

            <div className="nice-form-group img-upload">
              <input
                placeholder="Image"
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            <div className="bottom-container">
              <>
                <button type="submit" onClick={handelAddProduct}>
                  Add Product
                </button>
              </>
            </div>
          </div>

          <div>
            <p className="small-desc">
              Marketplace items are public and can be seen by anyone on or off
              Facebook. Items like animals, drugs, weapons, counterfeits, and
              other items that infringe intellectual property aren't allowed on
              Marketplace. See our Commerce Policies.
            </p>
          </div>
        </div>
      ) : (
        <div className="nice-form">
          <div className="form-container">
            <div>You have to login before create a product...</div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductCreator;
