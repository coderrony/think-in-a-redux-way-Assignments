import { edit_Book } from "../actions";

const updateBook = (id, book) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify(book),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    dispatch(edit_Book(data));
    console.log(data);
  };
};

export default updateBook;
