import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

import "./Product.scss";
const Product = (props) => {
  let productData = props.productData;
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
  let salePercent = (SalePrice, Price) => {
    return Math.round(100 - (SalePrice * 100) / Price);
  };
  return (
    <div className="Product">
      <div className="ProductSlide">
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {renderProduct()}
          <div className="ProductShowMore"></div>
        </Swiper>
        {productData.SalePrice && productData.SalePrice > 0 ? (
          <p className="ProductSaleTitle">{productData.Discount.Name}</p>
        ) : (
          ""
        )}
      </div>
      <div className="ProductInfo">
        <Link
          to={"/product/product-detail/" + props.productData._id}
          className="ProductName"
        >
          {productData.Name}
        </Link>
        <div className="ProductPriceBox">
          {productData.SalePrice && productData.SalePrice > 0 ? (
            <p className="ProductSalePrice">
              {numberToCurr(productData.SalePrice)}
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
