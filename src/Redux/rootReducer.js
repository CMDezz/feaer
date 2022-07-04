import { combineReducers } from "redux";
import shopReducer from "./Shop/ShopReducer";

const rootReducer = combineReducers({
  shop: shopReducer,
});

export default rootReducer;
