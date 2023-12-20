import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SortByValue: "",
  FilterByValue: "all",
  savedBlog: [],
};

export const sortFilterSlice = createSlice({
  name: "sortFilter",
  initialState,
  reducers: {
    sortItem: (state, action) => {
      state.SortByValue = action.payload;
    },
    filterItem: (state, action) => {
      state.FilterByValue = action.payload;
    },
    loadSaveBlog: (state, action) => {
      state.savedBlog = action.payload;
    },
    addBlog: (state, action) => {
      state.savedBlog.push(action.payload);
      localStorage.setItem("savedBlog", JSON.stringify(state.savedBlog));
    },
    RemoveBlog: (state, action) => {
      let getIndex = null;

      state.savedBlog.map((blog, index) => {
        if (blog.id === action.payload) {
          getIndex = index;
          return;
        }
      });

      if (getIndex !== null) {
        state.savedBlog.splice(getIndex, 1);
        localStorage.setItem("savedBlog", JSON.stringify(state.savedBlog));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { sortItem, loadSaveBlog, filterItem, addBlog, RemoveBlog } =
  sortFilterSlice.actions;

export default sortFilterSlice.reducer;
