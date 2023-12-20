import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ROOT_URL from "../ROOT_URL";
import axios from "axios";
const initialState = {
  blog: {},
  isLoading: false,
  isError: false,
  error: "",
};
export const fetchBlog = createAsyncThunk(
  "blog/fetchBlog",
  async ({ id, isUpdate }) => {
    if (isUpdate) {
      console.log(isUpdate);
      try {
        // Fetch the existing data

        const { data } = await axios.get(`${ROOT_URL}/blogs/${id}`);

        const updatedData = { ...data, likes: data.likes + 1 };

        const updateRes = await axios.patch(
          `${ROOT_URL}/blogs/${id}`,
          updatedData
        );

        return updateRes.data;
      } catch (error) {
        return error.message;
      }
    } else {
      const { data } = await axios.get(`${ROOT_URL}/blogs/${id}`);
      return data;
    }
  }
);
const blogSlice = createSlice({
  name: "blog",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchBlog.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = "";
      state.blog = action.payload;
    });
    builder.addCase(fetchBlog.rejected, (state, action) => {
      state.blog = {};
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });
  },
});

export default blogSlice.reducer;
