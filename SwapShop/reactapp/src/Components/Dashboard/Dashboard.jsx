import ProductCard from "../ProductCard/ProductCard";

const Dashboard = () => {
  return (
    <div className="app-body-main-content">
      <section className="service-section">
        <h2>All Products</h2>

        <div className="mobile-only">
          <button className="flat-button">Toggle search</button>
        </div>
        {/* --- DASHBOARD FEATURES ---*/}
        <div className="tiles">
          <ProductCard />
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
