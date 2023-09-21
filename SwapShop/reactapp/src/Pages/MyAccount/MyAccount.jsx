import { useCallback, useEffect, useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import ProductCard from "../../Components/ProductCard/ProductCard";
import API_BASE_URL from "../../config";
import MyProductCard from "../../Components/MyProducts/MyProducts";
import { Outlet, Link } from "react-router-dom";

const MyAccount = ({ user, isLoggedIn }) => {
  const [products, setProduct] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const availableProducts = products.filter((prod) => prod.isAvailable);

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
        const unavailableProducts = data.filter((prod) => !prod.isAvailable);
        // Populate unavailableProducts after fetching data
        setSoldProducts(unavailableProducts);
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

  const handleOnSoldProduct = (productId) => {
    const updatedAvailableProducts = availableProducts.filter(
      (product) => product.id !== productId
    );
    const soldProduct = availableProducts.find(
      (product) => product.id === productId
    );
    const unavailableProducts = products.filter((prod) => !prod.isAvailable);
    setProduct(updatedAvailableProducts);
    setSoldProducts([...unavailableProducts, soldProduct]);
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
            {loading ? (
              <div>Loading the data...</div>
            ) : (
              <>
                {" "}
                <div className="tile-card">
                  {availableProducts.length > 0 ? (
                    availableProducts.map((prod) => (
                      <MyProductCard
                        key={prod.id}
                        product={prod}
                        myAccount={true}
                        handleOnSoldProduct={handleOnSoldProduct}
                        onDeleteProduct={handleDeleteProduct}
                        user={user}
                      />
                    ))
                  ) : (
                    <>
                      <div> - You have no available products! </div>
                      <>
                        <Link to="/product/create"> Create Product</Link>
                      </>
                    </>
                  )}
                </div>
                <h1>Sold Items: </h1>
                <div className="tile-card">
                  {soldProducts.length > 0 &&
                    soldProducts.map((prod) => (
                      <MyProductCard
                        key={prod.id}
                        product={prod}
                        myAccount={true}
                        onDeleteProduct={handleDeleteProduct}
                        user={user}
                        isSold={true}
                        handleOnSoldProduct={handleOnSoldProduct}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
