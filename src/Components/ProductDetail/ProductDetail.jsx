import React from "react";
import ProductDetailSwiper from "../ProductDetailSwiper/ProductDetailSwiper";
import ProductDetailInfo from "../ProductDetailInfo/ProductDetailInfo";
import "./ProductDetail.scss";
const ProductDetail = (props) => {
  return (
    <div className="ProductDetail">
      <div className="ProductDetailSlider">
        <ProductDetailSwiper
          data={props.dataProductDetail.ImageDetail}
        ></ProductDetailSwiper>
      </div>
      <div className="ProductDetailInfomation">
        <ProductDetailInfo data={props.dataProductDetail}></ProductDetailInfo>
      </div>
    </div>
  );
};

export default ProductDetail;
