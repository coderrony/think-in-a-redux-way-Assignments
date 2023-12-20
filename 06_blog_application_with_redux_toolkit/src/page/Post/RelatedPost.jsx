import { useEffect } from "react";
import { fetchRelatedBlogs } from "../../features/relatedBlogs/relatedBlogsSlice";
import { useDispatch, useSelector } from "react-redux";
import RelatedPostItem from "./RelatedPostItem";
function RelatedPost({ blog }) {
  const { tags, id } = blog;
  const dispatch = useDispatch();
  const { relatedBlogs } = useSelector((state) => state.relatedBlogs);
  useEffect(() => {
    dispatch(fetchRelatedBlogs({ id: id, tags: tags }));
  }, [dispatch, id, tags]);
  console.log(relatedBlogs);
  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      <div className="space-y-4 related-post-container">
        {relatedBlogs.map((post) => (
          <RelatedPostItem key={post.id} post={post} />
        ))}
      </div>
    </aside>
  );
}

export default RelatedPost;
