import React, { useState } from "react";
import "./ProductDetail.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const ProductDetail = (props) => {
  let renderProductDetailSlider = () => {
    if (props.dataProductDetail.ImageDetail != undefined) {
      return props.dataProductDetail.ImageDetail.map((i) => {
        return (
          <SwiperSlide>
            <img src={i} alt="" />
          </SwiperSlide>
        );
      });
    }
  };
  return (
    <div className="ProductDetail">
      <div className="ProductDetailSlider">
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          height={"600"}
          modules={[Pagination]}
          className="mySwiper"
        >
          {renderProductDetailSlider()}
        </Swiper>
      </div>
      <div className="ProductDetailInfo"></div>
    </div>
  );
};

export default ProductDetail;
