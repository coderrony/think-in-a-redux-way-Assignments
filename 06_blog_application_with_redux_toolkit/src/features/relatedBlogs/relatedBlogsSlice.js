import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ROOT_URL from "../ROOT_URL";
import axios from "axios";
const initialState = {
  relatedBlogs: [],
  isLoading: false,
  isError: false,
  error: "",
};
export const fetchRelatedBlogs = createAsyncThunk(
  "blogs/fetchRelatedBlogs",
  async ({ id, tags }) => {
    const limit = 5;
    let queryString =
      tags?.length > 0
        ? tags.map((tag) => `tags_like=${tag}`).join("&") +
          `&id_ne=${id}&_limit=${limit}`
        : `id_ne=${id}&_limit=${limit}`;
    const { data } = await axios.get(`${ROOT_URL}/blogs?${queryString}`);
    return data;
  }
);
const relatedBlogsSlice = createSlice({
  name: "relatedBlogs",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchRelatedBlogs.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchRelatedBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = "";
      state.relatedBlogs = action.payload;
    });
    builder.addCase(fetchRelatedBlogs.rejected, (state, action) => {
      state.relatedBlogs = [];
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });
  },
});

export default relatedBlogsSlice.reducer;
