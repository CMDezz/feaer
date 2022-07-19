import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import "./Product.scss";
const Product = (props) => {
  let productData = props.productData;
  let isTopSeller = false;
  let isTrending = false;
  let isNew = false;

  checkTag();
  function checkTag() {
    if (productData.Tag && productData.Tag.length > 0) {
      productData.Tag.map((tag) => {
        if (tag.Name == "Top Sellers") isTopSeller = true;
        if (tag.Name == "Xu Hướng") isTrending = true;
        if (tag.Name == "New Arrivals") isNew = true;
      });
    }
  }
  let renderProduct = () => {
    return productData.Image.map((i, k) => {
      return (
        <SwiperSlide key={k}>
          <Link to={"/product/product-detail/" + props.productData._id}>
            <img src={i} alt="" />{" "}
          </Link>
        </SwiperSlide>
      );
    });
  };
  let numberToCurr = (x) => {
    x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    return x;
  };
  let salePercent = (FinalPrice, Price) => {
    return Math.round(100 - (FinalPrice * 100) / Price);
  };
  return (
    <div className="Product">
      <div className="ProductSlide">
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="ProductSlideSwiper"
        >
          {renderProduct()}
          <div className="ProductShowMore"></div>
        </Swiper>
        {/* set product tags */}
        <div className="ProductSaleTitleBox">
          {productData.Discount && productData.Discount != "" ? (
            <p className="ProductSaleTitle ProductSaleTitleDiscount">
              {productData.Discount.Name}
            </p>
          ) : (
            ""
          )}
          {isTopSeller ? (
            <p className="ProductSaleTitle ProductSaleTitleTopSellers">
              Top Sellers
            </p>
          ) : (
            ""
          )}
          {isNew ? (
            <p className="ProductSaleTitle ProductSaleTitleNewArrivals">
              New Arrivals
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="ProductInfo">
        <Link
          to={"/product/product-detail/" + props.productData._id}
          className="ProductName"
        >
          {productData.Name}
        </Link>
        <div className="ProductPriceBox">
          {productData.Discount && productData.Discount != "" ? (
            <p className="ProductSalePrice">
              {numberToCurr(productData.FinalPrice)}
            </p>
          ) : (
            ""
          )}
          <p className="ProductPrice">{numberToCurr(productData.Price)}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
