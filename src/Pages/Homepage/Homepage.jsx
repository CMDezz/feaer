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
import TabProductList from "../../Components/TabProductList/TabProductList";

const Homepage = () => {
  window.scrollTo({ top: 0 });

  const baseApiUrl = "http://localhost:5000/api";
  const [newestProduct, setNewestProduct] = useState([]);
  const [topSellerProducts, setTopSellerProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const Features1 = HomepageData.features[0];
  const Features2 = HomepageData.features[1];

  useEffect(() => {
    const fetchUrl = [
      baseApiUrl + "/product/getNewestProducts",
      baseApiUrl + "/product/getTopSellerProducts",
      baseApiUrl + "/product/getProductsBytag?tag=Xu%20Hướng",
      baseApiUrl + "/collection",
    ];
    Promise.all(
      fetchUrl.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    ).then(
      ([newestProduct, topSellerProducts, trendingProducts, collection]) => {
        setNewestProduct(newestProduct);
        setTopSellerProducts(topSellerProducts);
        setTrendingProducts(trendingProducts);

        setCollection(collection.slice(0, 2));

        setIsLoading(false); // Hide loading screen
      }
    );
  }, []);

  return (
    <div className="Homepage">
      <HeroSection dataHeroSection={HomepageData.heroSection}></HeroSection>
      <TabProductList
        tab1={{ name: "Sản Phẩm Mới", data: newestProduct }}
        tab2={{ name: "Bán Chạy Nhất", data: topSellerProducts }}
        tab3={{ name: "Xu Hướng", data: trendingProducts }}
        isLoading={isLoading}
      ></TabProductList>
      <Collection dataCollection={collection}></Collection>
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
