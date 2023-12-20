import Book from "./Book";
import { useDispatch, useSelector } from "react-redux";
import { filterAll, filterFeatured } from "../redux/search-filter/actions";
import { useEffect, useState } from "react";
import updateBook from "../redux/book/bookThunk/updateBook";
import added_book from "../redux/book/bookThunk/bookAdd";
function isObjectEmpty(books) {
  return Object.keys(books).length !== 0;
}
const nextId = (books) => {
  let maxId = -1;
  books.forEach((book) => {
    maxId = Math.max(book.id, maxId);
  });
  return maxId + 1;
};

function Body() {
  const [isChecked, setIsChecked] = useState(false);
  const [editBook, setEditBook] = useState({});
  const filterBook = useSelector((state) => state.filters);

  let books = useSelector((state) => state.books);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(editBook.featured);
  }, [editBook]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputData = new FormData(e.currentTarget);
    const bookData = {
      name: inputData.get("name"),
      author: inputData.get("author"),
      thumbnail: inputData.get("thumbnail"),
      price: inputData.get("price"),
      rating: inputData.get("rating"),
      featured: inputData.get("featured") === "on" ? true : false,
    };
    // check editBook object is empty or not. if not then call thunk function updateBook
    if (isObjectEmpty(editBook)) {
      dispatch(updateBook(editBook.id, bookData));
    } else {
      dispatch(added_book({ ...bookData, id: nextId(books) }));
    }
    setEditBook({});
    document.querySelector(".book-form").reset();
  };

  return (
    <main classNameName="py-12 2xl:px-6">
      <div classNameName="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
        <div classNameName="order-2 xl:-order-1">
          <div classNameName="flex items-center justify-between mb-12">
            <h4 classNameName="mt-2 text-xl font-bold">Book List</h4>

            <div classNameName="flex items-center space-x-4">
              <button
                // classNameName="filter-btn active-filter"
                classNameName={`filter-btn ${
                  filterBook.status === "ALL" && "active-filter"
                }`}
                id="lws-filterAll"
                onClick={() => dispatch(filterAll("ALL"))}
              >
                All
              </button>
              <button
                classNameName={`filter-btn ${
                  filterBook.status === "FEATURED" && "active-filter"
                }`}
                id="lws-filterFeatured"
                onClick={() => dispatch(filterFeatured("FEATURED"))}
              >
                Featured
              </button>
            </div>
          </div>
          <div classNameName="lws-bookContainer">
            {/* Card 1 */}
            <Book setEditBook={setEditBook} />
          </div>
        </div>
        <div>
          <div classNameName="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
            <h4 classNameName="mb-8 text-xl font-bold text-center">
              Add New Book
            </h4>

            <form classNameName="book-form" onSubmit={handleSubmit}>
              <div classNameName="space-y-2">
                <label>Book Name</label>
                <input
                  required
                  defaultValue={editBook?.name}
                  classNameName="text-input"
                  type="text"
                  id="input-Bookname"
                  name="name"
                />
              </div>

              <div classNameName="space-y-2">
                <label>Author</label>
                <input
                  required
                  defaultValue={editBook?.author}
                  classNameName="text-input"
                  type="text"
                  id="input-Bookauthor"
                  name="author"
                />
              </div>

              <div classNameName="space-y-2">
                <label>Image Url</label>
                <input
                  required
                  defaultValue={editBook?.thumbnail}
                  classNameName="text-input"
                  type="text"
                  id="input-Bookthumbnail"
                  name="thumbnail"
                />
              </div>

              <div classNameName="grid grid-cols-2 gap-8 pb-4">
                <div classNameName="space-y-2">
                  <label>Price</label>
                  <input
                    required
                    defaultValue={editBook?.price}
                    classNameName="text-input"
                    type="number"
                    id="input-Bookprice"
                    name="price"
                  />
                </div>

                <div classNameName="space-y-2">
                  <label>Rating</label>
                  <input
                    required
                    defaultValue={editBook?.rating}
                    classNameName="text-input"
                    type="number"
                    id="input-Bookrating"
                    name="rating"
                    min="1"
                    max="5"
                  />
                </div>
              </div>

              <div classNameName="flex items-center">
                <input
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  id="input-Bookfeatured"
                  type="checkbox"
                  name="featured"
                  classNameName="w-4 h-4"
                />
                <label classNameName="ml-2 text-sm">
                  {" "}
                  This is a featured book{" "}
                </label>
              </div>

              <button type="submit" classNameName="submit" id="submit">
                {isObjectEmpty(editBook) ? " Update Book" : " Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Body;
