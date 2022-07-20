import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

import "./ProductDetailSwiper.scss";
const ProductDetailSwiper = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let renderProductDetailSlider = (images) => {
    if (images != undefined) {
      return images.map((i, key) => {
        return (
          <SwiperSlide
            key={key}
            className={key == 0 ? "swiper-slide-thumb-active" : ""}
          >
            <img src={i} alt="" />
          </SwiperSlide>
        );
      });
    }
  };
  return (
    <div className="ProductDetailSwiper">
      <div className="ProductDetailSwiperSlider">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          direction={"vertical"}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {renderProductDetailSlider(props.data)}
        </Swiper>
        <Swiper
          direction={"vertical"}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {renderProductDetailSlider(props.data)}
        </Swiper>
      </div>
      {/* <div className="ProductDetailInfo"></div> */}
    </div>
  );
};

export default ProductDetailSwiper;
