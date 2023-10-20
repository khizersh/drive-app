import React, { useEffect, useState } from "react";
import "../assets/css/drawer.css";
import { Link } from "react-router-dom";
import { checkAdmin, checkUser } from "../service/commonService";
import { useHistory } from "react-router-dom";

const DashbboardLayout = (props) => {
  const router = useHistory();
  useEffect(() => {
    let user = checkAdmin();
    if (!user) {
      window.location.href = "/login"
      // router.push("/login");
    }

  }, []);

  return (
    <>
      <input type="checkbox" id="drawer-toggle" name="drawer-toggle" />
    <header>
      <label for="drawer-toggle" id="drawer-toggle-label"></label>
      <h2>Home</h2>
    </header>
      <nav id="drawer">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Link to="/admin/user">User</Link>
          </li>
          <li>
            <Link to="/admin/permission">User Permission</Link>
          </li>
        </ul>
      </nav>
      <div id="page-content">{props.children}</div>
    </>
  );
};

export default DashbboardLayout;
