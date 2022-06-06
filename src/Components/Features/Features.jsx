import React from "react";
import "./Features.scss";

const Features = (props) => {
  return (
    <div
      className={
        "Features " + (props.dataFeatures.reverse === true ? "reverse" : "")
      }
    >
      <div className="FeaturesMedia">
        <img src={props.dataFeatures.img} alt="" />
      </div>
      <div className="FeaturesInfo">
        <h4 className="FeaturesTitle">{props.dataFeatures.title}</h4>
        <p className="FeaturesDesc">{props.dataFeatures.desc}</p>
      </div>
    </div>
  );
};

export default Features;
