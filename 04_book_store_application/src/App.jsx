import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "../src/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Body />
    </Provider>
  );
}

export default App;
