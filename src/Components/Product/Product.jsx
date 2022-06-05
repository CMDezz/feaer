import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import "./Product.scss";
const Product = (props) => {
  let productData = props.productData;
  let renderProduct = () => {
    return productData.img.map((i, k) => {
      return (
        <SwiperSlide>
          {" "}
          <img src={i} alt="" />{" "}
        </SwiperSlide>
      );
    });
  };
  let numberToCurr = (x) => {
    x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
    return x;
  };
  let salePercent = (salePrice, Price) => {
    return Math.round(100 - (salePrice * 100) / Price);
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
        </Swiper>
        {productData.salePrice && productData.salePrice > 0 ? (
          <p className="ProductSalePercent">
            Giảm {salePercent(productData.salePrice, productData.price)}%
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="ProductInfo">
        <p className="ProductName">{productData.name}</p>
        <div className="ProductPriceBox">
          {productData.salePrice && productData.salePrice > 0 ? (
            <p className="ProductSalePrice">
              {numberToCurr(productData.salePrice)}
            </p>
          ) : (
            ""
          )}
          <p className="ProductPrice">{numberToCurr(productData.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
