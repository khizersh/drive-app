import React from "react";
import { Player } from "video-react";

const Image = (file) => {
  return (
    <>
      <img
        className="detail-bg"
        src={file?.file}
        alt="C_Drink_Coffee_Coldbrew_Vanilla_011819.psd"
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </>
  );
};

export default Image;
