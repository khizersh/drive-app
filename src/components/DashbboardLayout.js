import React from "react";
import "../assets/css/drawer.css";
import { Link } from "react-router-dom";

const DashbboardLayout = (props) => {
  return (
    <>
      <input type="checkbox" id="drawer-toggle" name="drawer-toggle" />
      <label for="drawer-toggle" id="drawer-toggle-label"></label>
      <header>Header</header>
      <nav id="drawer">
        <ul>
          <li>
            <Link to="/admin/user">User</Link>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
      <div id="page-content">{props.children}</div>
    </>
  );
};

export default DashbboardLayout;
