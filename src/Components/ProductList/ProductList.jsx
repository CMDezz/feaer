import React from "react";
import Product from "./../Product/Product";
import "./ProductList.scss";

const ProductList = (props) => {
  let renderProductList = () => {
    return props.dataProductList.map((i, k) => {
      return <Product productData={i} key={k}></Product>;
    });
  };
  return <div className="ProductList">{renderProductList()}</div>;
};

export default ProductList;
