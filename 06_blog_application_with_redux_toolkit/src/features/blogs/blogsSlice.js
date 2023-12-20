import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ROOT_URL from "../ROOT_URL";
import axios from "axios";
const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
  error: "",
};
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const { data } = await axios.get(`${ROOT_URL}/blogs`);
  return data;
});
const blogsSlice = createSlice({
  name: "blogs",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = "";
      state.blogs = action.payload;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.blogs = [];
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });
  },
});

export default blogsSlice.reducer;
