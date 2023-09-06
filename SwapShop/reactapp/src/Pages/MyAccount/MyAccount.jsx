import { useEffect, useState } from "react";
import Nav from "../../Components/Navigation/Nav";
import ProductCard from "../../Components/ProductCard/ProductCard";

const MyAccount = ({ userId, isLoggedIn }) => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `https://localhost:7035/products/user/${userId}`
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
          <section className="service-section">
            {isLoggedIn ? (
              <h1>Your Listing: </h1>
            ) : (
              <h1>Please Log in first!</h1>
            )}
            <div className="tiles">
              {products.length > 0 &&
                products.map((prod) => (
                  <ProductCard
                    product={prod}
                    myAccount={true}
                    onDeleteProduct={handleDeleteProduct}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
