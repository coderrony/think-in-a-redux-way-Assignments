import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../features/blog/blogSlice";
import Tag from "../../Components/BlogItem/Tag";
import { addBlog, RemoveBlog } from "../../features/sortBlog/sortFilterSlice";
import { loadSaveBlog } from "../../features/sortBlog/sortFilterSlice";
function MainPost({ blog }) {
  const dispatch = useDispatch();

  const { savedBlog } = useSelector((state) => state.sortFilter);

  // first time  fetch saved blog info from local storage to set sortBlog
  useEffect(() => {
    const savedBlogFromStorage = localStorage.getItem("savedBlog")
      ? JSON.parse(localStorage.getItem("savedBlog"))
      : [];
    dispatch(loadSaveBlog(savedBlogFromStorage));
  }, [dispatch]);

  const handleLike = () => {
    dispatch(fetchBlog({ id: blog.id, isUpdate: true }));
  };
  const isSaved = savedBlog.some((obj) => obj.id === blog.id);

  const style = isSaved ? "active save-btn" : " save-btn";

  const handleSaved = () => {
    if (isSaved) {
      dispatch(RemoveBlog(blog.id));
    } else {
      dispatch(addBlog(blog));
    }
  };
  return (
    <main className="post">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {blog.title}
        </h1>
        <div className="tags" id="lws-singleTags">
          {blog?.tags?.map((value, index) => (
            <Tag key={index} item={value} />
          ))}
        </div>
        <div className="btn-group">
          <button
            className="like-btn"
            id="lws-singleLinks"
            onClick={handleLike}
          >
            <i className="fa-regular fa-thumbs-up"></i> {blog.likes}
          </button>
          {/* active */}
          <button
            className={style}
            id="lws-singleSavedBtn"
            onClick={handleSaved}
          >
            <i className="fa-regular fa-bookmark"></i> Saved
          </button>
        </div>
        <div className="mt-6">
          <p>{blog.description}</p>
        </div>
      </div>
    </main>
  );
}

export default MainPost;
