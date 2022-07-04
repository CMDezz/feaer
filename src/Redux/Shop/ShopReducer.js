import * as actionTypes from "./ShopTypes";

const INITIAL_STATE = {
  cart: [], //cart empty
};

const shopReducer = (state = INITIAL_STATE, action) => {
  let product, cart;
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      product = action.payload;
      let sizeInCart = state.cart.find((item) =>
        item._id === product._id && item.sizePicked === product.sizePicked
          ? true
          : false
      );
      return {
        ...state,
        cart: sizeInCart
          ? state.cart.map((item) =>
              item._id === product._id && item.sizePicked === product.sizePicked
                ? { ...item, qty: item.qty + product.qty }
                : item
            )
          : [...state.cart, product],
      };
    case actionTypes.DELETE_FROM_CART:
      product = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item._id != product._id),
      };
    case actionTypes.ADJUST_QTY:
      product = action.payload;
      console.log(product);
      let index = state.cart.findIndex((x) => x._id === product._id);
      state.cart[index] = product;
      return { ...state };
    default:
      return state;
  }
};

export default shopReducer;
