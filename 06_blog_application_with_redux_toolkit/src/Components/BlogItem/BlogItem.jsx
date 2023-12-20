import Tag from "./Tag";
import { Link } from "react-router-dom";
function BlogItem({ blog }) {
  const { title, image, tags, createdAt, likes, id } = blog;

  return (
    <div className="lws-card">
      <Link to={`/post/${id}`}>
        <img src={image} className="lws-card-image" alt={title} />
      </Link>
      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p className="lws-likeCount">
            <i
              className="fa-regular fa-thumbs-up"
              style={{ marginRight: "5px" }}
            ></i>
            {likes}
          </p>
        </div>
        <Link to={`/post/${id}`} className="lws-postTitle">
          {" "}
          {title}
        </Link>
        <div className="lws-tags">
          {tags?.map((t, i) => (
            <Tag key={i} item={t} />
          ))}
        </div>

        <div className="flex gap-2 mt-4 ">
          <span className="lws-badge "> Saved </span>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
