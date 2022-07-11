import React from "react";
import Product from "./../Product/Product";
import "./ProductList.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProductList = (props) => {
  let renderProductList = () => {
    return props.dataProductList.map((i, k) => {
      return <Product productData={i} key={k}></Product>;
    });
  };
  return props.isLoading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <div className="ProductList">{renderProductList()}</div>
  );
};

export default ProductList;
