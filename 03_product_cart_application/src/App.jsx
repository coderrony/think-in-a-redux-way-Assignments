import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Carts from "./components/Carts";

import { useSelector } from "react-redux";

function App() {
  const cart_toggle = useSelector((state) => state.carts.cartToggle);

  return (
    <>
      <Navbar />
      {cart_toggle ? <Carts /> : <Products />}
    </>
  );
}

export default App;
