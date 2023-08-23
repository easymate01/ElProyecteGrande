import ProductCard from "../ProductCard/ProductCard";
import React from "react";
const Dashboard = ({ allPRoducts }) => {
  return (
    <div className="app-body-main-content">
      <section className="service-section">
        <h2>All Products</h2>

        <div className="mobile-only">
          <button className="flat-button">Toggle search</button>
        </div>
        {/* --- DASHBOARD FEATURES ---*/}
        <div className="tiles">
          {allPRoducts.length > 0 &&
            allPRoducts.map((product) => (
              <React.Fragment key={product.id}>
                <ProductCard product={product} />
              </React.Fragment>
            ))}
        </div>
        <div className="service-section-footer">
          <p>
            Services are paid according to the current state of the currency and
            tariff.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
