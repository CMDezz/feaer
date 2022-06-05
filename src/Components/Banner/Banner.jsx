import React, { useState, useEffect } from "react";
import "./Banner.scss";
const Banner = (props) => {
  let [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      let newCurrent = current + 1 < props.dataBanner.length ? current + 1 : 0;

      setCurrent(newCurrent);
    }, 2000);
    return () => clearInterval(interval);
  }, [current]);
  let renderBanner = () => {
    return props.dataBanner.map((i, key) => {
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
