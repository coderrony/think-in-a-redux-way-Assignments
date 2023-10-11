import {
  ADD_PRODUCT,
  PRODUCT_QUANTITY_DECREMENT,
  PRODUCT_QUANTITY_INCREMENT,
} from "./actionsType";
const initializer = [
  {
    id: 1,
    product_name: "Spring and summershoes",
    category: "Mens shoes",
    image_url: "https://picsum.photos/500/300?random=1",
    price: 400,
    quantity: 3,
  },
  {
    id: 2,
    product_name: "Women Winter Clothes",
    category: "Tops",
    image_url: "https://picsum.photos/500/300?random=2",
    price: 1000,
    quantity: 0,
  },
  {
    id: 3,
    product_name: "Stainless Steel Water Bottle",
    category: "Kitchen & Dining",
    image_url: "https://picsum.photos/500/300?random=3",
    price: 800,
    quantity: 4,
  },
];

const nextId = (state) => {
  const maxId = state.reduce(
    (maxId, product) => Math.max(maxId, product.id),
    1
  );
  return maxId + 1;
};

const productReducer = (state = initializer, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, { ...action.payload, id: nextId(state) }];
    case PRODUCT_QUANTITY_DECREMENT:
      return state.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );

    case PRODUCT_QUANTITY_INCREMENT:
      switch (action.payload.incrementType) {
        case "increment":
          return state.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          );
        case "delete":
          return state.map((product) =>
            product.id === action.payload.id
              ? {
                  ...product,
                  quantity: product.quantity + action.payload.quantity,
                }
              : product
          );
        default:
          return state;
      }
    default:
      return state;
  }
};

export default productReducer;
