import React from "react";
import Checkout from "../../Components/Checkout/Checkout";

const CheckoutPage = () => {
  window.scrollTo({ top: 0 });

  return (
    <div className="CheckoutPage">
      <Checkout></Checkout>
    </div>
  );
};

export default CheckoutPage;
