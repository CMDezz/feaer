import React, { useState, useEffect } from "react";
import HomepageData from "./HomepageData";
import "./Homepage.scss";
//components
import Banner from "./../Components/Banner/Banner";
import Header from "./../Components/Header/Header";
import HeroSection from "./../Components/HeroSection/HeroSection";
import ProductList from "./../Components/ProductList/ProductList";
import Collection from "../Components/Collection/Collection";

const Homepage = () => {
  const [activatedTab, setActivatedTab] = useState(1);
  const [newProducts, setNewProducts] = useState(HomepageData.newProducts);
  const [topSellerProducts, setTopSellerProducts] = useState(
    HomepageData.topSellerProducts
  );
  const [trendingProductss, setTrendingProducts] = useState(
    HomepageData.trendingProducts
  );

  let renderProductTabItems = () => {
    let dataProductList = [];
    if (activatedTab == 0) {
      dataProductList = newProducts;
    } else if (activatedTab == 1) {
      dataProductList = topSellerProducts;
    } else if (activatedTab == 2) {
      dataProductList = trendingProductss;
    }
    return <ProductList dataProductList={dataProductList}></ProductList>;
  };

  return (
    <div className="Homepage">
      <Banner dataBanner={HomepageData.banner}></Banner>
      <Header></Header>
      <HeroSection dataHeroSection={HomepageData.heroSection}></HeroSection>
      <div className="HomepageProductList">
        <ul className="HomepageTab">
          <li
            className={
              "HomepageTabItem " + (activatedTab === 0 ? "active" : "")
            }
            onClick={() => setActivatedTab(0)}
          >
            Sản Phẩm Mới
          </li>
          <li
            className={
              "HomepageTabItem " + (activatedTab === 1 ? "active" : "")
            }
            onClick={() => setActivatedTab(1)}
          >
            Bán Chạy Nhất
          </li>
          <li
            className={
              "HomepageTabItem " + (activatedTab === 2 ? "active" : "")
            }
            onClick={() => setActivatedTab(2)}
          >
            Xu Hướng
          </li>
        </ul>
        <div className="HomepageTabProducts">{renderProductTabItems()}</div>
        <a href="#" className="btnViewAll">
          Xem Tất Cả
        </a>
      </div>
      <Collection dataCollection={HomepageData.collection}></Collection>
    </div>
  );
};

export default Homepage;
