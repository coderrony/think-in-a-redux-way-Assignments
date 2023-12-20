import React from "react";
import Tag from "../../Components/BlogItem/Tag";
import { Link } from "react-router-dom";
function RelatedPostItem({ post }) {
  console.log(post);
  return (
    <div className="card">
      <Link to={`/post/${post.id}`}>
        <img src={post.image} className={post.title} alt="" />
      </Link>
      <div className="p-4">
        <Link
          to={`/post/${post.id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {post.title}
        </Link>
        <div className="mb-0 tags">
          {post.tags.map((item, index) => (
            <Tag key={index} item={item} />
          ))}
        </div>
        <p>2010-03-27</p>
      </div>
    </div>
  );
}

export default RelatedPostItem;
