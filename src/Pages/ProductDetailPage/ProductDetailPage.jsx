import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetailPage.scss";
import ProductDetail from "../../Components/ProductDetail/ProductDetail";

const ProductDetailPage = () => {
  const { id } = useParams();
  const baseUrl = "http://localhost:5000/api";
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    let fetchUrls = [baseUrl + "/product/getProductById?id=" + id];
    Promise.all(
      fetchUrls.map((url) => {
        return fetch(url).then((res) => res.json());
      })
    ).then(([product]) => {
      setProductDetail(product);
    });
  }, []);
  return (
    <div className="ProductDetail">
      <ProductDetail dataProductDetail={productDetail}></ProductDetail>
    </div>
  );
};

export default ProductDetailPage;
