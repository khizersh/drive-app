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

    console.log("safasfa : ", user);
  }, []);

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
            <Link to="/admin/permission">User Permission</Link>
          </li>
        </ul>
      </nav>
      <div id="page-content">{props.children}</div>
    </>
  );
};

export default DashbboardLayout;
