import React, { useEffect, useState } from "react";
import Drawer from "../components/drawer";
import { checkUser } from "../service/commonService";
import { useHistory } from "react-router-dom";
import Navbar from "./navbar";

const Weblayout = (props) => {
  const router = useHistory();
  useEffect(() => {
    let user = checkUser();
    if (!user) {
      router.push("/login");
    }

  }, []);

  return (
    <>
      {/* {props.children} */}
      {/* <Drawer >
    </Drawer> */}
      <Navbar>{props.children}</Navbar>
    </>
  );
};

export default Weblayout;
