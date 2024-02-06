import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { jobSearch, jobTypeSelect, jobsFilter } from "../../features/jobSlice";

function JobActions() {
  const dispatch = useDispatch();

  const handleSelectType = (type) => {
    dispatch(jobSearch(""));
    dispatch(jobsFilter(""));
    dispatch(jobTypeSelect(type));
  };
  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleSelectType("All Available")}
              href="/jobs"
              className="main-menu "
              id="lws-alljobs-menu"
            >
              <i className="fa-solid fa-briefcase"></i>
              <span> All Available Jobs</span>
            </button>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <button
                  onClick={() => handleSelectType("Internship")}
                  className="sub-menu menu-active"
                  href="/jobs/internship"
                  id="lws-internship-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  Internship
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSelectType("Full Time")}
                  className="sub-menu"
                  href="/jobs/fulltime"
                  id="lws-fulltime-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                  Full Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSelectType("Remote")}
                  className="sub-menu"
                  href="/jobs/remote"
                  id="lws-remote-menu"
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                  Remote
                </button>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to={"add"}
              href="/jobs"
              className="main-menu"
              id="lws-addJob-menu"
            >
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default JobActions;
