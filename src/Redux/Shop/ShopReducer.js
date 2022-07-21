import * as actionTypes from "./ShopTypes";

const INITIAL_STATE = {
  cart: [], //cart empty
  shippingType: "Standard",
  shippingFee: 0,
  cartTotal: 0,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  let product, cart, cartInfo;
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
        cart: state.cart.filter(
          (item) =>
            item._id != product._id || item.sizePicked != product.sizePicked
        ),
      };
    case actionTypes.ADJUST_QTY:
      product = action.payload;
      let index = state.cart.findIndex(
        (x) => x._id === product._id && x.sizePicked === product.sizePicked
      );
      state.cart[index] = product;
      return { ...state };
    case actionTypes.SET_CART_INFO:
      cartInfo = action.payload;
      return {
        ...state,
        shippingFee: cartInfo.shippingFee,
        shippingType: cartInfo.shippingType,
        cartTotal: cartInfo.cartTotal,
      };
    case actionTypes.EMPTY_CART:
      return {
        ...state,
        cart: [], //cart empty
        shippingType: "Standard",
        shippingFee: 0,
        cartTotal: 0,
      };
    case actionTypes.LOAD_CART:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default shopReducer;
