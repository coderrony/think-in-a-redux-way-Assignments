import { combineReducers } from "redux";
import cartReducer from "./carts/cartReducer";
import productReducer from "./products/productReducer";

const rootReducer = combineReducers({
  carts: cartReducer,
  products: productReducer,
});

export default rootReducer;
