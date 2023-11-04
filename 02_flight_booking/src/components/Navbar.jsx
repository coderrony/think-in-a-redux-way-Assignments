import React from "react";
import logo from "../assets/img/lws-logo.svg"; // Import the image
// ./img/lws-logo.svg
function Navbar() {
  return (
    <header id="header">
      <div classNameName="container">
        <img src={logo} alt="logo" classNameName="logo" />
        <div classNameName="flex items-center">
          <a classNameName="text-white min-w-[50px] font-medium" href="#">
            Home
          </a>
          <button classNameName="log-btn btn">Login</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
