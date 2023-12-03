const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");
const initialState = {
  loading: false,
  videos: [],
  error: "",
};

const fetchVideoByTags = createAsyncThunk(
  "videoBy/tags",
  async (tag1, tag2) => {
    const { data } = await axios.get(
      `http://localhost:9000/videos?tags_like=${tag1}&tags_like=${tag2}`
    );

    return data;
  }
);

const VideoByTagsSlice = createSlice({
  name: "videoByTag",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideoByTags.pending, (state, action) => {
      state.loading = true;
      state.videos = [];
      state.error = "";
    });
    builder.addCase(fetchVideoByTags.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchVideoByTags.rejected, (state, action) => {
      state.loading = false;
      state.videos = [];
      state.error = action.error.message;
    });
  },
});

module.exports = VideoByTagsSlice.reducer;
module.exports.fetchVideoByTags = fetchVideoByTags;
