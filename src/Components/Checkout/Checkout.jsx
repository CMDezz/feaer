import React from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useSelector } from "react-redux";
import CheckoutInfo from "../CheckoutInfo/CheckoutInfo";
import "./Checkout.scss";

const Checkout = () => {
  const cart = useSelector((state) => state.shop.cart);

  return (
    <div className="Checkout">
      <h3 className="CheckoutTitle">NHẬP THÔNG TIN ĐƠN HÀNG</h3>
      <div className="CheckoutBox">
        <CheckoutForm></CheckoutForm>
        <CheckoutInfo data={cart}></CheckoutInfo>
      </div>
    </div>
  );
};

export default Checkout;
