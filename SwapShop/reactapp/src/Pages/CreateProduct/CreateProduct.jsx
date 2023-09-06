import Dashboard from "../../Components/Dashboard/Dashboard";
import Header from "../../Components/Header/Header";
import ProductCreator from "../../Components/ProductCreater/ProductCreater";
import React from "react";

import "./ProductCreating.css";

const CreateProduct = ({ isLoggedIn, user }) => {
  const { id } = user;
  return (
    <React.Fragment>
      <div>
        <ProductCreator isLoggedIn={isLoggedIn} userId={id} />
      </div>
    </React.Fragment>
  );
};
export default CreateProduct;
