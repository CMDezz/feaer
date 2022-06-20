import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Pagination } from "swiper/core";
import "./ProductDetail.scss";
import "swiper/css";

import "swiper/css/pagination";
// SwiperCore.use([Pagination]);
import { Pagination } from "swiper";

const ProductDetail = (props) => {
  var menu = ["Slide 1", "Slide 2", "Slide 3"];

  // el: ".swiper-pagination",
  // type: "custom",
  // renderCustom: function (swiper, current, total) {
  //   var customPaginationHtml = "";
  //   for (var i = 0; i < total; i++) {
  //     //Determine which pager should be activated at this time
  //     if (i == current - 1) {
  //       customPaginationHtml +=
  //         '<span class="swiper-pagination-customs swiper-pagination-customs-active"></span>';
  //     } else {
  //       customPaginationHtml +=
  //         '<span class="swiper-pagination-customs"></span>';
  //     }
  //   }
  //   return customPaginationHtml;
  // },
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
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderCustom: function (index, className) {
              return (
                '<span class="' + className + '">' + menu[index] + "</span>"
              );
            },
          }}
        >
          {renderProductDetailSlider()}
          <div className="swiper-pagination swiper-pagination-timeline-page" />
        </Swiper>
      </div>
      <div className="ProductDetailInfo"></div>
    </div>
  );
};

export default ProductDetail;
