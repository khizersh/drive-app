import React from 'react'
// import Drawer from "../components/drawer";
import Navbar from '../components/navbar'

const Weblayout = (props) => {
  return (
    <>
    {/* <Drawer >
      {props.children}
    </Drawer> */}
       <Navbar >
      {props.children}
    </Navbar>
    </>
  )
}

export default Weblayout