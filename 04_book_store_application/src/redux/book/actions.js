import { ADDED, DELETED, LOADED, EDIT_BOOK } from "./actionTypes";

export const added = (book) => {
  return { type: ADDED, payload: book };
};
export const deleted = (bookId) => {
  return { type: DELETED, payload: bookId };
};
export const loaded = (books) => {
  return { type: LOADED, payload: books };
};
export const edit_Book = (book) => {
  return { type: EDIT_BOOK, payload: book };
};
