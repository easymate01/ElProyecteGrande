import { useEffect, useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import ProductCard from "../../Components/ProductCard/ProductCard";
import API_BASE_URL from "../../config";
import MyProductCard from "../../Components/MyProducts/MyProducts";
import { Outlet, Link } from "react-router-dom";

const MyAccount = ({ user, isLoggedIn }) => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const availableProducts = products.filter((prod) => prod.isAvailable);
  const unavailableProducts = products.filter((prod) => !prod.isAvailable);

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
              <h1>Available Products: </h1>
            ) : (
              <h1>Please Log in first!</h1>
            )}
            <div className="tile-card">
              {availableProducts.length > 0 ? (
                availableProducts.map((prod) => (
                  <MyProductCard
                    key={prod.id}
                    product={prod}
                    myAccount={true}
                    onDeleteProduct={handleDeleteProduct}
                    user={user}
                  />
                ))
              ) : (
                <>
                  <div>- You have no available products! </div>
                  <>
                    <Link to="/product/create"> Create Product</Link>
                  </>
                </>
              )}
            </div>
            <h1>Sold Items: </h1>
            <div className="tile-card">
              {unavailableProducts.length > 0 &&
                unavailableProducts.map((prod) => (
                  <MyProductCard
                    key={prod.id}
                    product={prod}
                    myAccount={true}
                    onDeleteProduct={handleDeleteProduct}
                    user={user}
                    isSold={true}
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
