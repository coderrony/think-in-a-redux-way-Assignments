import { ADD_CART, PAGE_TOGGLE, CART_QUANTITY_DECREMENT } from "./actionsType";

export const add_cart = (cart) => {
  return {
    type: ADD_CART,
    payload: cart,
  };
};
export const page_toggle = () => {
  return {
    type: PAGE_TOGGLE,
  };
};
export const cart_quantity_decrement = (id, cartType) => {
  return {
    type: CART_QUANTITY_DECREMENT,
    payload: {
      id,
      cartType,
    },
  };
};
