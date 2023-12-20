import React from "react";
import logo from "../assets/img/lws-logo.svg"; // Import the image
// ./img/lws-logo.svg
function Navbar() {
  return (
    <header id="header">
      <div classNameNameName="container">
        <img src={logo} alt="logo" classNameNameName="logo" />
        <div classNameNameName="flex items-center">
          <a classNameNameName="text-white min-w-[50px] font-medium" href="#">
            Home
          </a>
          <button classNameNameName="log-btn btn">Login</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
