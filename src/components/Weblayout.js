import React, { useEffect, useState } from "react";
import Drawer from "../components/drawer";
import { checkUser } from "../service/commonService";
import { useHistory } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

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
      <NavbarComponent>{props.children}</NavbarComponent>
    </>
  );
};

export default Weblayout;
