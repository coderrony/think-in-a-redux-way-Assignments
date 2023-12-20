import { useParams } from "react-router-dom";
import MainPost from "./MainPost";
import RelatedPost from "./RelatedPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBlog } from "../../features/blog/blogSlice";
function Post() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { blog } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlog({ id: postId, isUpdate: false }));
  }, [dispatch, postId]);

  return (
    <section className="post-page-container">
      <MainPost id={postId} blog={blog} />
      <RelatedPost blog={blog} />
    </section>
  );
}

export default Post;
