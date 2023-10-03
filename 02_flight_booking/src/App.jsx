import { InputData, Navbar, DisplayData } from "./components";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <InputData />
      <DisplayData />
    </Provider>
  );
}

export default App;
