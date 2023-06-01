import React,{useState , useEffect} from "react";

const FileDetail = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    
    useEffect(() => {
     
    }, [])
    
  return <div>FileDetail</div>;
};

export default FileDetail;
