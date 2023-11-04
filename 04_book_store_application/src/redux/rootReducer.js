import bookReducer from "./book/reducer";
import filterReducer from "./search-filter/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  books: bookReducer,
  filters: filterReducer,
});

export default rootReducer;
