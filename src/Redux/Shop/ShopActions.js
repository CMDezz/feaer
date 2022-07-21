import * as actionTypes from "./ShopTypes";

export const addToCart = (product) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: product,
  };
};

export const deleteFromCart = (product) => {
  return {
    type: actionTypes.DELETE_FROM_CART,
    payload: product,
  };
};

export const adjustQty = (product) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: product,
  };
};

export const setCartInfo = (shippingType, shippingFee, cartTotal) => {
  return {
    type: actionTypes.SET_CART_INFO,
    payload: {
      shippingType,
      shippingFee,
      cartTotal,
    },
  };
};

export const emptyCart = () => {
  return {
    type: actionTypes.EMPTY_CART,
  };
};

export const loadCart = () => {
  return {
    type: actionTypes.LOAD_CART,
  };
};
