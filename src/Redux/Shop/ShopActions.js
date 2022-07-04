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
