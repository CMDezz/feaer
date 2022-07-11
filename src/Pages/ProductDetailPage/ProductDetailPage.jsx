import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetailPage.scss";
import ProductDetail from "../../Components/ProductDetail/ProductDetail";
import SameProducts from "../../Components/SameProducts/SameProducts";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const ProductDetailPage = () => {
  window.scrollTo({ top: 0 });
  const { id } = useParams();
  const baseUrl = "http://localhost:5000/api";
  const [productDetail, setProductDetail] = useState({});
  const [sameProduct, setSameProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let fetchUrls = [baseUrl + "/product/getProductById?id=" + id];
    let fetchSameProductsUrl = baseUrl + "/product/getProductsByTagId?id=";
    Promise.all(
      fetchUrls.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    )
      .then(([product]) => {
        setProductDetail(product);
        return fetch(fetchSameProductsUrl + product.Tag[0]);
      })
      .then((res) => res.json())
      .then((product) => {
        setSameProduct(product);
      });
    setLoading(false);
  }, [id]);
  return loading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <div className="ProductDetailPage">
      <ProductDetail dataProductDetail={productDetail}></ProductDetail>
      <SameProducts dataSameProduct={sameProduct}></SameProducts>
    </div>
  );
};

export default ProductDetailPage;
