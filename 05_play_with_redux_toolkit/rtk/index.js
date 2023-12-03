const store = require("./app/store");
const { fetchVideo } = require("./features/video/videoSlice");
const {
  fetchVideoByTags,
} = require("./features/videosByTags/videoByTagsSlice");

// subscribe to state changes
store.subscribe(() => {
  console.log(store.getState());
});

// disptach actions
store.dispatch(fetchVideo());
store.dispatch(fetchVideoByTags("javascript", "react"));
