import React from "react";
import "./Category.scss";
const Category = (props) => {
  const dataCategory = props.dataCategory;
  return (
    <div className="Category">
      <img className="CategoryImg" src={dataCategory.img} alt="" />
      <a href="#" className="CategoryTitle">
        {dataCategory.title}
      </a>
    </div>
  );
};

export default Category;
