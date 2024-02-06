import { useDispatch, useSelector } from "react-redux";
import { jobSearch, jobsFilter } from "../../features/jobSlice";

function JobBoardAction() {
  const { selectedType, searchQuery, filterJobs } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  const handleSearchQuery = (e) => {
    dispatch(jobsFilter(""));
    dispatch(jobSearch(e.target.value));
  };
  const handleJobFilter = (e) => {
    dispatch(jobSearch(""));
    dispatch(jobsFilter(e.target.value));
  };
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">{selectedType} Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            onChange={handleSearchQuery}
            value={searchQuery}
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
          />
        </div>
        <select
          value={filterJobs}
          onChange={handleJobFilter}
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
        >
          <option value="">Default</option>
          <option value="low_to_high">Salary (Low to High)</option>
          <option value="high_to_low">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
}

export default JobBoardAction;
