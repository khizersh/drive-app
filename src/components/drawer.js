import React from 'react';
import "../assets/css/drawer.css";

const drawer = (props) => {
  return (
<>
<input type="checkbox" id="drawer-toggle" name="drawer-toggle"/>
   <label for="drawer-toggle" id="drawer-toggle-label"></label>
   <header>yaha navbar aega</header>
   <nav id="drawer">
      <ul>
         <li><a href="#">Menu Item</a></li>
         <li><a href="#">Menu Item</a></li>
         <li><a href="#">Menu Item</a></li>
         <li><a href="#">Menu Item</a></li>
      </ul>
   </nav>
   <div id="page-content">
      {props.children}
   </div></>
  )
}

export default drawer