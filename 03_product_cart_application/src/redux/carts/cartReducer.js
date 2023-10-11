import { ADD_CART, PAGE_TOGGLE, CART_QUANTITY_DECREMENT } from "./actionsType";

const initializer = {
  cartToggle: false,
  carts: [
    // {
    //   id: 1,
    //   product_name: "Spring and summershoes",
    //   category: "Mens shoes",
    //   image_url: "https://picsum.photos/500/300?random=1",
    //   price: 400,
    //   quantity: 1,
    // },
  ],
};

const cartReducer = (state = initializer, action) => {
  switch (action.type) {
    case ADD_CART:
      let cart_found = false;

      const cart_query = state.carts.map((cart) => {
        if (cart.id === action.payload.id) {
          cart_found = true;
          return {
            ...cart,
            quantity: cart.quantity + 1,
          };
        } else {
          return cart;
        }
      });

      if (!cart_found) {
        cart_query.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return { ...state, carts: cart_query };
    case PAGE_TOGGLE:
      return { ...state, cartToggle: !state.cartToggle };
    case CART_QUANTITY_DECREMENT:
      switch (action.payload.cartType) {
        case "decrement":
          return {
            ...state,
            carts: state.carts.map((cart) =>
              cart.id === action.payload.id
                ? { ...cart, quantity: cart.quantity - 1 }
                : cart
            ),
          };
        case "delete":
          return {
            ...state,
            carts: state.carts.filter((cart) => cart.id !== action.payload.id),
          };
        default:
          return state;
      }

    default:
      return state;
  }
};

export default cartReducer;
