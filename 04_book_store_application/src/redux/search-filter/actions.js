import {
  FILTER_ALL,
  FILTER_FEATURED,
  FILTER_SEARCH,
  FILTER_SEARCH_CLEAR,
} from "./actionTypes";

export const filterAll = (status) => {
  return { type: FILTER_ALL, payload: status };
};
export const filterFeatured = (status) => {
  return { type: FILTER_FEATURED, payload: status };
};
export const filterSearch = (data) => {
  return { type: FILTER_SEARCH, payload: data };
};
export const filterSearchClear = () => {
  return { type: FILTER_SEARCH_CLEAR };
};
