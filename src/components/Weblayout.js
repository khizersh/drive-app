import React, { useEffect, useState } from "react";
import Drawer from "../components/drawer";
import { checkUser } from "../service/commonService";
import { useHistory } from "react-router-dom";

const Weblayout = (props) => {
  const router = useHistory();
  useEffect(() => {
    let user = checkUser();
    if (!user) {
      router.push("/login");
    }

    console.log("safasfa : ", user);
  }, []);

  return (
    <>
      <Drawer>{props.children}</Drawer>
    </>
  );
};

export default Weblayout;
