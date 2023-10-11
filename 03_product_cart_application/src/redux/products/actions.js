import {
  ADD_PRODUCT,
  PRODUCT_QUANTITY_DECREMENT,
  PRODUCT_QUANTITY_INCREMENT,
} from "./actionsType";

export const add_product = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};
export const product_quantity_decrement = (id) => {
  return {
    type: PRODUCT_QUANTITY_DECREMENT,
    payload: id,
  };
};
export const product_quantity_increment = (
  id,
  incrementType,
  quantity = null
) => {
  return {
    type: PRODUCT_QUANTITY_INCREMENT,
    payload: { id, incrementType, quantity },
  };
};
