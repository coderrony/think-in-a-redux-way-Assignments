import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export const jobsFetch = createAsyncThunk("job/fetchJobs", async () => {
  const { data } = await axios.get("jobs");

  return data;
});
export const jobsAdd = createAsyncThunk("job/addJob", async (jobData) => {
  const { data } = await axios.post("jobs", jobData);
  return data;
});
export const jobsEdit = createAsyncThunk("job/editJob", async (jobEditData) => {
  const { data } = await axios.put(`jobs/${jobEditData.id}`, jobEditData);
  return data;
});
export const jobsDelete = createAsyncThunk("job/deleteJob", async (id) => {
  const { data } = await axios.delete(`jobs/${id}`);
  return data;
});
const initialState = {
  isLoading: false,
  jobs: [],
  isError: false,
  error: "",
  editing: {},
  selectedType: "All Available",
  searchQuery: "",
  filterJobs: "",
};
const jobsSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    jobEditing: (state, action) => {
      state.editing = action.payload;
    },
    jobUnEditing: (state) => {
      state.editing = {};
    },
    jobTypeSelect: (state, action) => {
      state.selectedType = action.payload;
    },
    jobSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    jobsFilter: (state, action) => {
      state.filterJobs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(jobsFetch.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(jobsFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
    });
    builder.addCase(jobsFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.jobs = [];
      state.isError = true;
      state.error = action?.error.message;
    });
    builder.addCase(jobsAdd.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(jobsAdd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs.push(action.payload);
    });
    builder.addCase(jobsAdd.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action?.error.message;
    });
    builder.addCase(jobsEdit.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(jobsEdit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = state.map((job) =>
        job.id === action.payload.id ? action.payload : job
      );
    });
    builder.addCase(jobsEdit.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action?.error.message;
    });
    builder.addCase(jobsDelete.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(jobsDelete.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = state.jobs.filter((j) => j.id !== action.meta.arg);
    });
    builder.addCase(jobsDelete.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action?.error.message;
    });
  },
});

export default jobsSlice.reducer;

export const {
  jobEditing,
  jobUnEditing,
  jobTypeSelect,
  jobSearch,
  jobsFilter,
} = jobsSlice.actions;
