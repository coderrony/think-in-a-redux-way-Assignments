import { sortItem, filterItem } from "../../features/sortBlog/sortFilterSlice";
import { useDispatch, useSelector } from "react-redux";

function LeftSide() {
  const dispatch = useDispatch();
  const { FilterByValue } = useSelector((state) => state.sortFilter);

  return (
    <div className="sidebar-items">
      <div className="sidebar-content">
        <h4>Sort</h4>
        <select
          name="sort"
          id="lws-sort"
          className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
          onChange={(e) => dispatch(sortItem(e.target.value))}
        >
          <option value="">Default</option>
          <option value="newest">Newest</option>
          <option value="most_liked">Most Liked</option>
        </select>
      </div>
      <div className="sidebar-content">
        <h4>Filter</h4>
        <div className="radio-group">
          <div>
            <input
              value={"all"}
              onClick={(e) => dispatch(filterItem(e.target.value))}
              type="radio"
              name="filter"
              id="lws-all"
              checked={FilterByValue === "all"}
              className="radio"
            />
            <label>All</label>
          </div>
          <div>
            <input
              value={"saved"}
              onClick={(e) => dispatch(filterItem(e.target.value))}
              checked={FilterByValue === "saved"}
              type="radio"
              name="filter"
              id="lws-saved"
              className="radio"
            />
            <label>Saved</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
