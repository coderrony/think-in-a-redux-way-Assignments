import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";

import Post from "./page/Post/Post";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
