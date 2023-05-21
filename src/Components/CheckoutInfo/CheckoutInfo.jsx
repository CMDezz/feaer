import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CheckoutInfo.scss";

const CheckoutInfo = (props) => {
  let Products = props.data;
  let shippingType = useSelector((state) => state.shop.shippingType);

  let numToPrice = (x) => {
    return x.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  };
  let handleTempPrice = () => {
    let tempPrice = 0;
    Products.map((p) => {
      tempPrice += p.FinalPrice * p.qty;
    });
    return tempPrice;
  };
  let handleShippingFee = () => {
    if (shippingType == "Standard") return 0;
    if (shippingType == "Fast") return 15000;
  };
  let handleTotalPrice = () => {
    return handleTempPrice() + handleShippingFee();
  };
  let handleNext = (e) => {
    let warnArr = document.getElementsByClassName("warn");
    if (warnArr.length > 0) {
      e.preventDefault();
    }else{

    }
  };

  let handleCheckoutInfoProducts = () => {
    return Products.map((p, k) => {
      return (
        <div key={k} className="CheckoutInfoProduct">
          <div className="CheckoutInfoProductImage">
            <img src={p.Image[0]} alt="" />
            <span className="CheckoutInfoProductQty">{p.qty}</span>
          </div>
          <div className="CheckoutInfoProductDetail">
            <p className="CheckoutInfoProductName">{p.Name}</p>
            <p className="CheckoutInfoProductSize">Size: {p.sizePicked}</p>
            <div className="CheckoutInfoProductPrice">
              <span>Giá: </span>
              {p.Discount && p.Discount != "" ? (
                <p className="CheckoutInfoProductPriceSale">
                  {numToPrice(p.FinalPrice)}
                </p>
              ) : (
                ""
              )}
              <p className="CheckoutInfoProductPriceBase">
                {numToPrice(p.Price)}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="CheckoutInfo">
      <h4 className="CheckoutInfoTitle">CHI TIẾT GIỎ HÀNG</h4>
      <div className="CheckoutInfoProducts">{handleCheckoutInfoProducts()}</div>
      <div className="CheckoutInfoPrice">
        <p className="CheckoutInfoTempPrice">
          TẠM TÍNH: <span>{numToPrice(handleTempPrice())}</span>
        </p>
        <p className="CheckoutInfoShippingFee">
          PHÍ VẬN CHUYỂN: <span>{numToPrice(handleShippingFee())}</span>
        </p>
      </div>
      <div className="CheckoutInfoTotal">
        <p>
          TỔNG TIỀN:<span>{numToPrice(handleTotalPrice())}</span>
        </p>
      </div>
      <div className="CheckoutInfoActions">
        {/* <a
          // to={
          //   window.location.pathname == "/checkout/shipping"
          //     ? "/checkout/payment"
          //     : "/checkout/thankyou"
          // }
          className="CheckoutInfoActionsNext"
          onClick={(e) => handleNext(e)}
        >
          TIẾP THEO
        </a> */}
        <button form='CheckoutFormBox' type="submit">Tiếp theo</button>

        <Link to="/cart" className="CheckoutInfoActionsBack">
          QUAY LẠI
        </Link>
      </div>
    </div>
  );
};

export default CheckoutInfo;
