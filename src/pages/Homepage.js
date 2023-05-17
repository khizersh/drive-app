import React from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/homepage.css";

const Homepage = () => {
  const router = useHistory();
  return (
    <div>
      <h1 onClick={() => router.push("/login")}>Home</h1>
    </div>
  );
};

export default Homepage;
