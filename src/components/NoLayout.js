import React from "react";
import "../assets/css/nolayout.css"

const NoLayout = (props) => {
  return <div className="noLayout">{props.children}</div>;
};

export default NoLayout;
