import { useState } from "react";
import logo from "../images/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  filterSearch,
  filterSearchClear,
} from "../redux/search-filter/actions";
const search = (books, query) => {
  return books.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.author.toLowerCase().includes(query.toLowerCase())
  );
};
function Navbar() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const [query, setQuery] = useState("");

  if (query.length !== 0) {
    const searchResult = search(books, query);

    if (searchResult.length !== 0) {
      dispatch(filterSearch(searchResult));
    }
  } else {
    dispatch(filterSearchClear());
  }

  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <img src={logo} width="150px" className="object-contain" />

        <ul className="hidden md:flex items-center space-x-6">
          <li className="font-semibold cursor-pointer">Book Store</li>
          <li className="cursor-pointer">Wishlist</li>
          <li className="cursor-pointer">My Collection</li>
        </ul>

        <form className="flex items-center">
          <div className="group relative rounded-md bg-white">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Filter books..."
              className="search"
              id="lws-searchBook"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
