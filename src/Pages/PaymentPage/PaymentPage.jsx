import React from "react";
import CheckoutPayment from "../../Components/CheckoutPayment/CheckoutPayment";
import CheckoutInfo from "../../Components/CheckoutInfo/CheckoutInfo";
import { useSelector } from "react-redux";
import "./PaymentPage.scss";
const PaymentPage = () => {
  window.scrollTo({ top: 0 });

  const cart = useSelector((state) => state.shop.cart);

  return (
    <div className="PaymentPage">
      <CheckoutPayment></CheckoutPayment>
      <CheckoutInfo data={cart}></CheckoutInfo>
    </div>
  );
};

export default PaymentPage;
