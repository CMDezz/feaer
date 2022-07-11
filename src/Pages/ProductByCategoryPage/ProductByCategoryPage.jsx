import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FiHome } from "react-icons/fi";

import ProductList from "../../Components/ProductList/ProductList";
import "./ProductByCategoryPage.scss";

const ProductByCategoryPage = () => {
  window.scrollTo({ top: 0 });
  let { param } = useParams();
  let url = window.location.pathname;
  let ApiUrl = "";
  if (url.includes("product-list-by-cate"))
    ApiUrl = "/product/getProductsByCategory?category=";
  if (url.includes("product-list-by-tag"))
    ApiUrl = "/product/getProductsByTag?tag=";
  const baseUrl = "http://localhost:5000/api";

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let fetchUrl = [baseUrl + ApiUrl + param];
    Promise.all(
      fetchUrl.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    ).then(([products]) => {
      setProductList(products);
      setLoading(false);
    });
  }, []);
  let handleFilter = (e) => {
    let pList = productList;
    switch (e.target.value) {
      case "az":
        return setProductList([
          ...pList.sort((a, b) => a.Name.localeCompare(b.Name)),
        ]);
      case "za":
        return setProductList([
          ...pList.sort((a, b) => b.Name.localeCompare(a.Name)),
        ]);
      case "increase":
        return setProductList([
          ...pList.sort((a, b) => a.FinalPrice - b.FinalPrice),
        ]);
      case "decrease":
        return setProductList([
          ...pList.sort((a, b) => b.FinalPrice - a.FinalPrice),
        ]);

      default:
        break;
    }
  };

  return (
    <div className="ProductByCategoryPage">
      <div className="BackgroundBanner">
        <h3 className="BackgroundBannerTitle">{param}</h3>
      </div>
      <div className="ProductByCategoryPageActions">
        <div className="navigateLinks">
          <Link to="/">
            <FiHome> </FiHome> Trang Chủ
          </Link>
          <HiArrowNarrowRight></HiArrowNarrowRight>
          <Link to={"/product/product-list/" + param}>{param}</Link>
        </div>
        <div className="FilterAndSort">
          <div className="Sort">
            <select
              name="SortProduct"
              id="SortProduct"
              onChange={(e) => handleFilter(e)}
            >
              <option value="">Sắp Xếp Theo</option>
              <option value="az">Tên A-Z</option>
              <option value="za">Tên Z-A</option>
              <option value="increase">Giá Tăng Dần</option>
              <option value="decrease">Giá Giảm Dần</option>
            </select>
          </div>
        </div>
      </div>
      <ProductList
        isLoading={loading}
        dataProductList={productList}
      ></ProductList>
    </div>
  );
};

export default ProductByCategoryPage;
