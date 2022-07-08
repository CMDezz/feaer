import React, { useState } from "react";
import ProductList from "../ProductList/ProductList";

const TabProductList = (props) => {
  const [activatedTab, setActivatedTab] = useState(1);
  let renderProductTabItems = () => {
    let dataProductList = [];
    if (activatedTab == 0) {
      dataProductList = props.tab1.data;
    } else if (activatedTab == 1) {
      dataProductList = props.tab2.data;
    } else if (activatedTab == 2) {
      dataProductList = props.tab3.data;
    }
    return <ProductList dataProductList={dataProductList}></ProductList>;
  };
  return (
    <div className="TabProductList">
      <div className="HomepageProductList">
        <ul className="HomepageTab">
          <li
            className={
              "HomepageTabItem " + (activatedTab === 0 ? "active" : "")
            }
            onClick={() => setActivatedTab(0)}
          >
            {props.tab1.name}
          </li>
          <li
            className={
              "HomepageTabItem " + (activatedTab === 1 ? "active" : "")
            }
            onClick={() => setActivatedTab(1)}
          >
            {props.tab2.name}
          </li>
          <li
            className={
              "HomepageTabItem " + (activatedTab === 2 ? "active" : "")
            }
            onClick={() => setActivatedTab(2)}
          >
            {props.tab3.name}
          </li>
        </ul>
        <div className="HomepageTabProducts">{renderProductTabItems()}</div>
        <a href="#" className="btnViewAll">
          Xem Tất Cả
        </a>
      </div>
    </div>
  );
};

export default TabProductList;
