import { useState } from "react";

import API_BASE_URL from "../../config";

import "./ProductCreater.css";

const ProductCreator = ({ isLoggedIn, user }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [created, setCreated] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);

  const readFileAsBase64AndCompress = (file, maxWidth, maxHeight, quality) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const originalImageBase64 = reader.result.split(",")[1];

        // Create an HTML image element to manipulate the image
        const img = new Image();
        img.src = `data:image/jpeg;base64,${originalImageBase64}`;

        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions while maintaining aspect ratio
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          // Create a canvas to draw the resized image
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          // Draw the resized image on the canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas content back to base64 with compression
          canvas.toBlob(
            (blob) => {
              const compressedImage = new File([blob], file.name, {
                type: "image/jpeg", // Adjust the MIME type if needed
                lastModified: Date.now(),
              });

              const readerCompressed = new FileReader();
              readerCompressed.readAsDataURL(compressedImage);
              readerCompressed.onload = () => {
                const compressedImageBase64 =
                  readerCompressed.result.split(",")[1];
                resolve(compressedImageBase64);
              };
            },
            "image/jpeg", // Adjust the MIME type if needed
            quality // Adjust the quality (0-1) to control compression level
          );
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (imageFile) {
      try {
        // Read the image file
        const imageBase64 = await readFileAsBase64AndCompress(imageFile);
        setImageFile(imageBase64);
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
          setLoading(false);
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

  if (loading) {
    return (
      <div className="form-container">
        <div className="nice-form-group">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="form-container">
          <div className="form-section">
            <div className="creater-left">
              <div className="nice-form-group">
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
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setImageFile(selectedFile);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setImage(e.target.result);
                    };
                    reader.readAsDataURL(selectedFile);
                  }}
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
            <div className="creater-right">
              <div className="preview-section">
                <div className="border-2">
                  <h3>Preview Section</h3>
                  <div className="preview">
                    <div className="img-panel">
                      {image ? (
                        <img
                          src={`${image}`}
                          className="img-content"
                          alt="Image-preview"
                        />
                      ) : (
                        <div className="img-content">image preview</div>
                      )}
                    </div>
                    <div className="data-panel">
                      <h3 className="p-title">{name ? name : "Title"}</h3>
                      <h4>Details: </h4>
                      <p>{description ? description : "Small description"}</p>
                      <p>Price: {price} $</p>
                      <p>Category: {category}</p>
                    </div>
                  </div>
                </div>
              </div>
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
