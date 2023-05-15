import React from 'react'
import Drawer from "../components/drawer";

const Weblayout = (props) => {
  return (
    <>
    <Drawer >
      {props.children}
    </Drawer>
    </>
  )
}

export default Weblayout