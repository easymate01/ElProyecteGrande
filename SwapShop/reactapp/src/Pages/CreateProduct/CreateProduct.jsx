import Dashboard from "../../Components/Dashboard/Dashboard";
import Header from "../../Components/Header/Header";
import ProductCreator from "../../Components/ProductCreater/ProductCreater";
import React from "react";

import "./ProductCreating.css";

const CreateProduct = () => {
  return (
    <React.Fragment>
      <div>
        <ProductCreator />
      </div>
    </React.Fragment>
  );
};
export default CreateProduct;
