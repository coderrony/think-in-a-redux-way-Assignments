import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../features/blogs/blogsSlice";
import sortFilterReducer from "../features/sortBlog/sortFilterSlice";
import blogReducer from "../features/blog/blogSlice";
import relatedBlogsReducer from "../features/relatedBlogs/relatedBlogsSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    blog: blogReducer,
    sortFilter: sortFilterReducer,
    relatedBlogs: relatedBlogsReducer,
  },
});
