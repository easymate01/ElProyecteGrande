import { useState } from "react";
import "./Product.css";

const ProductCreator = ({ isLoggedIn, user }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [created, setCreated] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  console.log(user.userToken);
  const handelAddProduct = (e) => {
    e.preventDefault();

    fetch(`https://localhost:7035/create/product`, {
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
        userId: user.id,
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
    <div className="form-container">
      <div className="nice-form-group">
        <div>
          <h1>Create Item For Sale</h1>
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
          {isLoggedIn ? (
            <>
              <button type="submit" onClick={handelAddProduct}>
                Add Product
              </button>
              {created && <h3>Product created. ✅</h3>}
            </>
          ) : (
            <>
              <h3>You have to be loged in!</h3>
              <button>Login</button>
            </>
          )}
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
