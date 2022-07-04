import React, { useState, useEffect } from "react";
import HomepageData from "./HomepageData";
import "./Homepage.scss";
//components
import HeroSection from "../../Components/HeroSection/HeroSection";
import ProductList from "../../Components/ProductList/ProductList";
import Collection from "../../Components/Collection/Collection";
import Features from "../../Components/Features/Features";
import CategoryList from "../../Components/CategoryList/CategoryList";
import SameProducts from "../../Components/SameProducts/SameProducts";

const Homepage = () => {
  window.scrollTo({ top: 0 });

  const baseApiUrl = "http://localhost:5000/api";
  const [newestProduct, setNewestProduct] = useState([]);
  const [topSellerProducts, setTopSellerProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);

  const [activatedTab, setActivatedTab] = useState(1);
  const Features1 = HomepageData.features[0];
  const Features2 = HomepageData.features[1];

  useEffect(() => {
    const fetchUrl = [
      baseApiUrl + "/product/getNewestProducts",
      baseApiUrl + "/product/getTopSellerProducts",
      baseApiUrl + "/product/getProductsBytag?tag=Xu%20Hướng",
    ];
    Promise.all(
      fetchUrl.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    ).then(([newestProduct, topSellerProducts, trendingProducts]) => {
      setNewestProduct(newestProduct);
      setTopSellerProducts(topSellerProducts);
      setTrendingProducts(trendingProducts);
    });
  }, []);

  let renderProductTabItems = () => {
    let dataProductList = [];
    if (activatedTab == 0) {
      dataProductList = newestProduct;
    } else if (activatedTab == 1) {
      dataProductList = topSellerProducts;
    } else if (activatedTab == 2) {
      dataProductList = trendingProducts;
    }
    return <ProductList dataProductList={dataProductList}></ProductList>;
  };
  return (
    <div className="Homepage">
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
      <Features dataFeatures={Features1}></Features>
      <Features dataFeatures={Features2}></Features>
      <CategoryList dataCategory={HomepageData.category}></CategoryList>
      <div className="Maybe">
        <h4 className="MaybeTitle">Có Thể Bạn Sẽ Thích</h4>
        {/* <ProductList dataProductList={HomepageData.maybe}></ProductList> */}
      </div>
    </div>
  );
};

export default Homepage;
