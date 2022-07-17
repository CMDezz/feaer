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
  let back = ""; //use for handle percent (add %25)
  if (url.includes("product-list-by-sex"))
    ApiUrl = "/product/getProductsBySex?sex=";
  if (url.includes("product-list-by-discount")) {
    ApiUrl = "/product/getProductsByDiscount?discount=";
    param.includes("%") ? (back = "25") : (back = ""); // them 25 vao sau cho url percent (10% == 10%25)
  }
  if (url.includes("product-list-by-cate"))
    ApiUrl = "/product/getProductsByCategory?category=";
  if (url.includes("product-list-by-tag"))
    ApiUrl = "/product/getProductsByTag?tag=";
  if (url.includes("product-list-by-collection"))
    ApiUrl = "/product/getProductsByCollection?name=";
  const baseUrl = process.env.REACT_APP_API_URL;

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let fetchUrl = [baseUrl + ApiUrl + param + back];
    console.log(fetchUrl);
    Promise.all(
      fetchUrl.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    ).then(([products]) => {
      setProductList([...products]);
      setLoading(false);
    });
  }, [param]);
  let handleFilter = (e) => {
    let pList = productList;
    let ar = [];
    switch (e.target.value) {
      case "az":
        ar = pList.sort((a, b) => a.Name.localeCompare(b.Name));
        return setProductList([...ar]);
      case "za":
        ar = pList.sort((a, b) => b.Name.localeCompare(a.Name));
        return setProductList([...ar]);
      case "increase":
        ar = pList.sort((a, b) => a.FinalPrice - b.FinalPrice);
        return setProductList([...ar]);
      case "decrease":
        ar = pList.sort((a, b) => b.FinalPrice - a.FinalPrice);
        return setProductList([...ar]);

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
