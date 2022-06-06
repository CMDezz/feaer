import React from "react";
import "./CategoryList.scss";
import Category from "./../Category/Category";
const CategoryList = (props) => {
  const Categories = props.dataCategory;
  return (
    <div className="CategoryList">
      <h4 className="CategoryListTitle">Danh Mục Đáng Chú Ý</h4>

      <div className="CategoryListItem">
        {Categories.map((i, k) => {
          return <Category dataCategory={i} key={k}></Category>;
        })}
      </div>
    </div>
  );
};

export default CategoryList;
