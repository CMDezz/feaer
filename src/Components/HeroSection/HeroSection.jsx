import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./HeroSection.scss";

import { MdOutlineLocalShipping } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { TbBackhoe } from "react-icons/tb";

const HeroSection = (props) => {
  let renderSwiper = () => {
    return props.dataHeroSection.map((i, key) => {
      return (
        <SwiperSlide>
          <img src={i} alt="" key={key} />
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="HeroSection">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {renderSwiper()}
      </Swiper>
      <ul className="HeroSectionPromo">
        <li className="HeroSectionPromoItem">
          <MdOutlineLocalShipping />
          Freeship Toàn Quốc
        </li>
        <li className="HeroSectionPromoItem">
          <FiPackage />
          Đóng Hộp Miễn Phí
        </li>
        <li className="HeroSectionPromoItem">
          <TbBackhoe />
          Miễn Phí Đổi Trả
        </li>
      </ul>
    </div>
  );
};

export default HeroSection;
