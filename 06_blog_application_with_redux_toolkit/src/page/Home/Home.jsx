import { useDispatch } from "react-redux";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useEffect } from "react";
import { loadSaveBlog } from "../../features/sortBlog/sortFilterSlice";
function Home() {
  const dispatch = useDispatch();

  // first time  fetch saved blog info from local storage to set sortBlog
  useEffect(() => {
    const savedBlogFromStorage = localStorage.getItem("savedBlog")
      ? JSON.parse(localStorage.getItem("savedBlog"))
      : [];
    dispatch(loadSaveBlog(savedBlogFromStorage));
  }, [dispatch]);
  return (
    <section className="wrapper">
      <LeftSide />
      <RightSide />
    </section>
  );
}

export default Home;
