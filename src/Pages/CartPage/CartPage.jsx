import React from "react";
import "./CartPage.scss";
import Cart from "./../../Components/Cart/Cart";

const CartPage = () => {
  window.scrollTo({ top: 0 });

  return (
    <div className="CartPage">
      <Cart></Cart>
    </div>
  );
};

export default CartPage;
