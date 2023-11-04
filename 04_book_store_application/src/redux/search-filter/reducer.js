import {
  FILTER_ALL,
  FILTER_FEATURED,
  FILTER_SEARCH,
  FILTER_SEARCH_CLEAR,
} from "./actionTypes";

const initializeState = {
  status: "ALL",
};

const reducer = (state = initializeState, action) => {
  switch (action.type) {
    case FILTER_ALL:
      return { ...state, status: action.payload };
    case FILTER_FEATURED:
      return { ...state, status: action.payload };
    case FILTER_SEARCH:
      return { ...state, books: action.payload };
    case FILTER_SEARCH_CLEAR:
      return { status: "ALL" };
    default:
      return state;
  }
};

export default reducer;
