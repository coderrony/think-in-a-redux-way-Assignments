import { useDispatch, useSelector } from "react-redux";
import BlogItem from "../../Components/BlogItem/BlogItem";
import { fetchBlogs } from "../../features/blogs/blogsSlice";
import { useEffect } from "react";
import Loading from "./../../Components/Loading/Loading";

const sortByLikesDescending = (a, b) => b.likes - a.likes;
function RightSide() {
  const dispatch = useDispatch();

  const { blogs, isLoading, isError, error } = useSelector(
    (state) => state.blogs
  );
  let blogContent = blogs;

  const { SortByValue, FilterByValue, savedBlog } = useSelector(
    (state) => state.sortFilter
  );

  if (SortByValue === "newest") {
    blogContent = blogs.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      // Compare the dates in descending order
      return dateB - dateA;
    });
  }
  if (SortByValue === "most_liked") {
    blogContent = [...blogs].sort(sortByLikesDescending);
  }
  console.log(savedBlog);

  if (FilterByValue === "saved") {
    blogContent = savedBlog;
  }

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  let content = "";
  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && !isError && blogs.length > 0) {
    content = (
      <div className="post-container" id="lws-postContainer">
        {/* {blogContent.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))} */}
        {blogContent.length > 0 ? (
          blogContent.map((blog) => <BlogItem key={blog.id} blog={blog} />)
        ) : (
          <h1
            style={{
              textAlign: "center",
              color: "red",
              width: "70vw",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            You didn't save any blog
          </h1>
        )}
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <div className="error">{error}</div>;
  }

  return <main>{content}</main>;
}

export default RightSide;
