import JobBoardAction from "./JobBoardAction";
import Job from "../job_page/Job";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { jobsFetch } from "../../features/jobSlice";

// show jobs according to selectedType
const showJobs = (jobs, selectedType) => {
  let jobList = [];
  if (selectedType === "Remote") {
    jobList = jobs.filter((job) => job.type === "Remote");
  } else if (selectedType === "Internship") {
    jobList = jobs.filter((job) => job.type === "Internship");
  } else if (selectedType === "Full Time") {
    jobList = jobs.filter((job) => job.type === "Full Time");
  } else {
    jobList = jobs;
  }
  return jobList;
};
// jobs searching by job title
const searchJobs = (jobs, query) => {
  return jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );
};
// jobs filter
const sortByDescending = (a, b) => Number(b.salary) - Number(a.salary);
const sortByAscending = (a, b) => Number(a.salary) - Number(b.salary);
const filterByJobs = (jobs, filterValue) => {
  let jobsFilter = [];

  if (filterValue === "low_to_high") {
    jobsFilter = [...jobs].sort(sortByAscending);
  } else if (filterValue === "high_to_low") {
    jobsFilter = [...jobs].sort(sortByDescending);
  }
  return jobsFilter;
};
function JobBoard() {
  const { isLoading, isError, jobs, selectedType, searchQuery, filterJobs } =
    useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(jobsFetch());
  }, [dispatch]);

  let content = null;
  if (isLoading) content = <h2 className="something-wrong">Loading...</h2>;
  if (!isLoading && !isError && jobs.length > 0) {
    // show jobs on display base on user select job type like internship
    const jobsList = showJobs(jobs, selectedType);
    if (jobsList.length === 0) {
      content = (
        <h2 className="something-wrong ">
          No {selectedType} Jobs are available 😧!
        </h2>
      );
    } else {
      content = jobsList.map((job) => <Job key={job.id} job={job} />);
    }
    // show jobs on display base on user search query
    console.log(searchQuery);
    if (searchQuery !== "") {
      const queryJobs = searchJobs(jobs, searchQuery);

      if (queryJobs.length === 0) {
        content = (
          <p className="something-wrong">
            {" "}
            Search results {searchQuery} not found 😔{" "}
          </p>
        );
      } else {
        content = queryJobs.map((job) => <Job key={job.id} job={job} />);
      }
    }
    // show jobs on display base on user filter by salary hight or low

    if (filterJobs !== "") {
      const filter = filterByJobs(jobs, filterJobs);
      content = filter.map((job) => <Job key={job.id} job={job} />);
      console.log(filter);
    }
  }
  if (!isLoading && !isError && jobs.length === 0)
    content = <p className="something-wrong">No Jobs are available!</p>;

  if (isError) {
    content = <p className="error">Something is wrong!!! </p>;
  }

  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <JobBoardAction />
        <div className="jobs-list">{content}</div>
      </main>
    </div>
  );
}

export default JobBoard;
