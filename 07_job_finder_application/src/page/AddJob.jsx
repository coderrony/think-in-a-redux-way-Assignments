import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { jobSearch, jobsAdd, jobsFilter } from "../features/jobSlice";

const defaultData = {
  title: "",
  type: "",
  salary: "",
  deadline: "",
};
function AddJob() {
  const [formData, setFormData] = useState(defaultData);
  const dispatch = useDispatch();

  const handleForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(jobSearch(""));
    dispatch(jobsFilter(""));
    dispatch(jobsAdd(formData));
    setFormData(defaultData);
    toast.success("Added Successfully ");
  };

  return (
    <div className="lg:pl-[14rem] mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <h1 className="mb-10 text-center lws-section-title">Add New Job</h1>

        <div className="max-w-3xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="fieldContainer">
              <label className="text-sm font-medium text-slate-300">
                Job Title
              </label>
              <select
                onChange={handleForm}
                id="lws-JobTitle"
                name="title"
                value={formData.title}
                required
              >
                <option value="" hidden selected>
                  Select Job
                </option>
                <option>Software Engineer</option>
                <option>Software Developer</option>
                <option>Full Stack Developer</option>
                <option>MERN Stack Developer</option>
                <option>DevOps Engineer</option>
                <option>QA Engineer</option>
                <option>Product Manager</option>
                <option>Social Media Manager</option>
                <option>Senior Executive</option>
                <option>Junior Executive</option>
                <option>Android App Developer</option>
                <option>IOS App Developer</option>
                <option>Frontend Developer</option>
                <option>Frontend Engineer</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label>Job Type</label>
              <select
                value={formData.type}
                onChange={handleForm}
                id="lws-JobType"
                name="type"
                required
              >
                <option value="" hidden selected>
                  Select Job Type
                </option>
                <option>Full Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobSalary">Salary</label>
              <div className="flex border rounded-md shadow-sm border-slate-600">
                <span className="input-tag">BDT</span>
                <input
                  value={formData.salary}
                  onChange={handleForm}
                  type="number"
                  name="salary"
                  id="lws-JobSalary"
                  required
                  className="!rounded-l-none !border-0"
                  placeholder="Enter Salary"
                />
              </div>
            </div>

            <div className="fieldContainer">
              <label>Deadline</label>
              <input
                value={formData.deadline}
                onChange={handleForm}
                type="date"
                name="deadline"
                id="lws-JobDeadline"
                required
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddJob;
