import { deleted } from "../actions";

const delete_book = (bookId) => {
  return async (dispatch) => {
    await fetch(`http://localhost:9000/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    dispatch(deleted(bookId));
  };
};

export default delete_book;
