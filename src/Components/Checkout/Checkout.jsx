import React, { useState, useEffect } from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useSelector, useStore, connect } from "react-redux";
import CheckoutInfo from "../CheckoutInfo/CheckoutInfo";
import "./Checkout.scss";
import { loadCart } from "../../Redux/Shop/ShopActions";

const Checkout = (props) => {
  let cart = useSelector((state) => state.shop.cart);
  const [order, setOrderForm] = useState({
    ListProducts: props.ListProducts,
    ShippingType: props.ShippingType,
    ShippingFee: props.ShippingFee,
    OrderTotal: props.OrderTotal,
  });

  let handleOrderForm = (orderForm) => {
    setOrderForm({ ...order, ...orderForm });
  };

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div className="Checkout">
      <h3 className="CheckoutTitle">NHẬP THÔNG TIN ĐƠN HÀNG</h3>
      <div className="CheckoutBox">
        <CheckoutForm data={cart} handleOrderForm={handleOrderForm}></CheckoutForm>
        <CheckoutInfo data={cart}></CheckoutInfo>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ListProducts: state.shop.cart,
    ShippingType: state.shop.shippingType,
    ShippingFee: state.shop.shippingFee,
    OrderTotal: state.shop.cartTotal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadCart: () => {
      return dispatch(loadCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
