import Dashboard from "../../Components/Dashboard/Dashboard";
import Header from "../../Components/Header/Header";
import ProductCreator from "../../Components/ProductCreater/ProductCreater";
import React from "react";

import "./ProductCreating.css";

const CreateProduct = ({ isLoggedIn, userId }) => {
  return (
    <React.Fragment>
      <div>
        <ProductCreator isLoggedIn={isLoggedIn} userId={userId} />
      </div>
    </React.Fragment>
  );
};
export default CreateProduct;
