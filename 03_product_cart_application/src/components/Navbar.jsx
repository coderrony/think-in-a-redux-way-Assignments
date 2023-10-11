import React from "react";
import logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { page_toggle } from "../redux/carts/actions";

function Navbar() {
  const Carts = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  let totalCartItems = 0;
  Carts.carts.map((cart) => (totalCartItems += cart.quantity));

  const toggleHandle = () => {
    dispatch(page_toggle());
  };

  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <a href="index.html">
          <img src={logo} alt="LWS" className="max-w-[140px]" />
        </a>

        <div className="flex gap-4">
          <a href="#home" className="navHome" id="lws-home">
            {" "}
            Home{" "}
          </a>
          <a href="#" className="navCart" id="lws-cart" onClick={toggleHandle}>
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
            <span id="lws-totalCart">{totalCartItems}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
