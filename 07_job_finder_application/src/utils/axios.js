import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://react-job-finder.onrender.com/",
});

export default axiosInstance;
