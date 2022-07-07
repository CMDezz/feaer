import React, { useState } from "react";
import "./CheckoutPayment.scss";

const CheckoutPayment = () => {
  const [paymentActivated, setPaymentActivated] = useState("COD");
  let handlePayment = (e) => {
    setPaymentActivated(e.target.value);
  };
  return (
    <div className="CheckoutPayment" onChange={(e) => handlePayment(e)}>
      <h4 className="CheckoutPaymentTitle">PHƯƠNG THỨC THANH TOÁN</h4>
      <div className="CheckoutPaymentContain">
        <div className="CheckoutPaymentBox">
          <input
            type="radio"
            className="CheckoutPaymentRadio"
            name="CheckoutPayment"
            value="COD"
            id="CheckoutPaymentCod"
            defaultChecked={paymentActivated == "COD"}
          />
          <label htmlFor="CheckoutPaymentCod" className="CheckoutPaymentLabel">
            Thanh toán khi nhận hàng
          </label>
        </div>
        <p
          className={
            paymentActivated == "COD"
              ? "CheckoutPaymentDesc activated"
              : "CheckoutPaymentDesc"
          }
        >
          Sản phẩm sẽ được giao đến địa chỉ của bạn, bạn sẽ thanh toán khi nhận
          được sản phẩm.
        </p>
      </div>
      <div className="CheckoutPaymentContain">
        <div className="CheckoutPaymentBox">
          <input
            type="radio"
            className="CheckoutPaymentRadio"
            name="CheckoutPayment"
            value="BANKING"
            id="CheckoutPaymentBanking"
            defaultChecked={paymentActivated == "BANKING"}
          />
          <label
            htmlFor="CheckoutPaymentBanking"
            className="CheckoutPaymentLabel"
          >
            Thanh toán bằng chuyển khoản
          </label>
        </div>
        <p
          className={
            paymentActivated == "BANKING"
              ? "CheckoutPaymentDesc activated"
              : "CheckoutPaymentDesc"
          }
        >
          Nhân viên tư vấn sẽ liên hệ và hướng dẫn bạn chuyển khoản trong thời
          gian sớm nhất!
        </p>
      </div>
    </div>
  );
};

export default CheckoutPayment;
