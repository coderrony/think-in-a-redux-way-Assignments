const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  loading: false,
  video: {},
  error: "",
};

const fetchVideo = createAsyncThunk("video/fetchVideo", async () => {
  const { data } = await axios.get("http://localhost:9000/videos");

  return data;
});

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state, action) => {
      state.loading = true;
      state.video = {};
      state.error = "";
    });
    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
      state.error = "";
    });
    builder.addCase(fetchVideo.rejected, (state, action) => {
      state.loading = false;
      state.video = {};
      state.error = action.error.message;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
