const configureStore = require("@reduxjs/toolkit").configureStore;
const videoReducer = require("../features/video/videoSlice");
const videosByTagReducer = require("../features/videosByTags/videoByTagsSlice");

// configure store
const store = configureStore({
  reducer: {
    video: videoReducer,
    videoByTag: videosByTagReducer,
  },
});

module.exports = store;
