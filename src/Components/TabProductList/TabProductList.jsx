import React, { useState } from "react";
import ProductList from "../ProductList/ProductList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const TabProductList = (props) => {
  const [activatedTab, setActivatedTab] = useState(1);
  let viewAllUrl = "";
  let renderProductTabItems = () => {
    let dataProductList = [];
    if (activatedTab == 0) {
      dataProductList = props.tab1.data.slice(0, 8);
      viewAllUrl = "/product/product-list-by-tag/New%20Arrivals";
    } else if (activatedTab == 1) {
      dataProductList = props.tab2.data.slice(0, 8);
      viewAllUrl = "/product/product-list-by-tag/Top%20Sellers";
    } else if (activatedTab == 2) {
      dataProductList = props.tab3.data.slice(0, 8);
      viewAllUrl = "/product/product-list-by-tag/Xu%20Hướng";
    }
    return <ProductList dataProductList={dataProductList}></ProductList>;
  };
  return !props.isLoading ? (
    <div className="TabProductList">
      <div className="HomepageProductList">
        <ul className="HomepageTab">
          <li
            className={
              "HomepageTabItem " + (activatedTab === 0 ? "active" : "")
            }
            onClick={() => setActivatedTab(0)}
          >
            <p>{props.tab1.name}</p>
          </li>
          <li
            className={
              "HomepageTabItem " + (activatedTab === 1 ? "active" : "")
            }
            onClick={() => setActivatedTab(1)}
          >
            <p>{props.tab2.name}</p>
          </li>
          <li
            className={
              "HomepageTabItem " + (activatedTab === 2 ? "active" : "")
            }
            onClick={() => setActivatedTab(2)}
          >
            <p> {props.tab3.name}</p>
          </li>
        </ul>
        <div className="HomepageTabProducts">{renderProductTabItems()}</div>
        {}
        <Link to={viewAllUrl} className="btnViewAll">
          Xem Tất Cả
        </Link>
      </div>
    </div>
  ) : (
    <LoadingSpinner></LoadingSpinner>
  );
};

export default TabProductList;
