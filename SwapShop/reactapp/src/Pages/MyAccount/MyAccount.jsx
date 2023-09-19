import { useEffect, useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import ProductCard from "../../Components/ProductCard/ProductCard";
import API_BASE_URL from "../../config";
import MyProductCard from "../../Components/MyProducts/MyProducts";

const MyAccount = ({ user, isLoggedIn }) => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/products/user/${user.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.userToken}`,
            },
          }
        );

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const handleDeleteProduct = (deletedProductId) => {
    // Filter out the deleted product from the list
    const updatedProducts = products.filter(
      (product) => product.id !== deletedProductId
    );
    setProduct(updatedProducts);
  };

  return (
    <section>
      <div className="app">
        <div className="app-body">
          <Nav></Nav>
          <div className="app-body-main-content">
            {isLoggedIn ? (
              <h1>Your Listing: </h1>
            ) : (
              <h1>Please Log in first!</h1>
            )}
            <div className="tile-card">
              {products.length > 0 &&
                products.map((prod) => (
                  <MyProductCard
                    key={prod.id}
                    product={prod}
                    myAccount={true}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
