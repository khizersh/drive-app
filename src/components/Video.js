import React from "react";
import { Player } from "video-react";

const Video = (file) => {
  return (
    <>
      <Player playsInline src={file?.file} />
    </>
  );
};

export default Video;
