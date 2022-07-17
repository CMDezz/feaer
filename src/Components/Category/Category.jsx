import React from "react";
import "./Category.scss";
import { Link } from "react-router-dom";
const Category = (props) => {
  const dataCategory = props.dataCategory;
  let url = "";
  dataCategory.type == "category"
    ? (url = "/product/product-list-by-cate/")
    : (url = "/product/product-list-by-tag/");
  return (
    <div className="Category">
      <Link to={url + dataCategory.name}>
        <img className="CategoryImg" src={dataCategory.img} alt="" />
      </Link>
      <Link to={url + dataCategory.name} className="CategoryTitle">
        {dataCategory.title}
      </Link>
    </div>
  );
};

export default Category;
