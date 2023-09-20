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

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageBase64 = reader.result.split(",")[1];
        resolve(imageBase64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (imageFile) {
      try {
        // Read the image file
        const imageBase64 = await readFileAsBase64(imageFile);

        // Send the product data including the imageBase64 to the backend
        const productData = {
          name: name,
          description: description,
          price: price,
          category: category,
          userId: user.userId,
          imageBase64: imageBase64,
        };

        // Make the API POST request here
        const response = await fetch(`${API_BASE_URL}/create/product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.userToken}`,
          },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Creating Product response:", data);
          setCreated(true);
        } else {
          console.error(
            "Creating Product error:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error reading image or making the request:", error);
      }
    } else {
      console.error("No image selected");
    }
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
                <button type="submit" onClick={handleAddProduct}>
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
