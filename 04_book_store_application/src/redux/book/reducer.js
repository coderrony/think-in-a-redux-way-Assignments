import { ADDED, DELETED, LOADED, EDIT_BOOK } from "./actionTypes";
const initialState = [
  {
    name: "Slow Horses (Deluxe Edition)",
    author: "Mick Herron",
    thumbnail:
      "https://m.media-amazon.com/images/I/51Ga5GuElyL._SX331_BO1,204,203,200_.jpg",
    price: 14,
    rating: 3,
    featured: false,
    id: 1,
  },
  {
    name: "Slow Horses (Deluxe Edition)",
    author: "Mick Herron",
    thumbnail: "https://picsum.photos/500/300?random=1",
    price: 14,
    rating: 5,
    featured: false,
    id: 2,
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return action.payload;
    case ADDED:
      return [...state, action.payload];
    case DELETED:
      return state.filter((book) => book.id !== action.payload);
    case EDIT_BOOK:
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );

    default:
      return state;
  }
};

export default reducer;
