import React, { useState, useEffect } from "react";
import BannerData from "./BannerData";
import "./Banner.scss";
const Banner = () => {
  let [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      let newCurrent = current + 1 < BannerData.length ? current + 1 : 0;

      setCurrent(newCurrent);
    }, 2000);
    return () => clearInterval(interval);
  }, [current]);
  let renderBanner = () => {
    return BannerData.map((i, key) => {
      return (
        <li
          className={current === key ? "BannerItem active" : "BannerItem"}
          key={key}
        >
          <img
            className={`BannerImage BannerImage_` + key}
            src={i}
            alt=""
          ></img>
        </li>
      );
    });
  };

  return (
    <div className="Banner">
      <div className="BannerSlider">
        <div className="BannerList">{renderBanner()}</div>
      </div>
    </div>
  );
};

export default Banner;
