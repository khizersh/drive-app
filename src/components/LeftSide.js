import React, { forwardRef, useImperativeHandle,useState, useRef, useEffect, useCallback } from 'react';
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { postRequest, showError } from "../service/commonService";
import { BASE_URL, FIND_RESOURCE_BY_ID, SUCCESS } from "../service/constants";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import ReactPlayer from "react-player/youtube";
import { Player } from "video-react";

const LeftSide = () => {


  const [file, setFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const onClickBreadCrum = (data) => {
    console.log("data crum :: ", data);
  };

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  useEffect(async () => {
    findData();
  }, []);

  const findData = async () => {
    if (params.id) {
      var fileData = null;
      const data = await postRequest(BASE_URL + FIND_RESOURCE_BY_ID, {
        id: params.id,
      });
      if (data) {
        if (data.status == SUCCESS) {
          if (!data.data.isFolder) {
            fileData = data.data;

            let folderArray = [];
            folderArray = data.data.folderPath?.map((m) => {
              return {
                name: m.name,
                id: m.id,
                href:
                  "/folder?parent=" + params.parent + "&" + "folder=" + m.id,
                onClick: onClickBreadCrum,
              };
            });

            setIsVideo(false);
            if (data?.mimeType?.includes("image")) {
              setIsVideo(false);
              getMeta(data.data.file, (err, img) => {
                fileData["width"] = img.naturalWidth;
                fileData["height"] = img.naturalHeight;
                setFile(fileData);
              });
            } else {
              setIsVideo(true);
              setFile(fileData);
            }
            if (folderArray.length) {
              let arrayy = folderArray.map((bread, index) =>
                index == folderArray.length - 1 ? (
                  <Typography key={index} color="text.primary">
                    {bread.name}
                  </Typography>
                ) : (
                  <Link
                    underline="hover"
                    key={index}
                    color="rgb(200, 16, 46)"
                    href={bread.href}
                    // onClick={bread.onClick}
                  >
                    <strong>
                      <u>{bread.name}</u>{" "}
                    </strong>
                  </Link>
                )
              );

              setBreadcrumbs(arrayy);
            }
          }
        } else {
          showError(data.data);
        }
        console.log("fileData :: " + data);
      } else {
        showError();
      }
    }
  };


  return <div className="css-1q84ldw-d e1vmnjjl6">

<div className="css-yj4l3y-LeftContainer e10r0o572">
  <div className="css-u9qt4x-ContainerHeader e10r0o573">
    <div className="css-1xusefk-StyledCheckbox e10r0o570">
      <span
        className="jss50 jss72 jss68 jss62 jss67 css-1siuk2u-f e1cxn8ur0"
        data-id="RE_Info_Preview_Select_Resource"
      >
        <span className="jss77">
          <span />
          <input
            className="jss71"
            type="checkbox"
            data-indeterminate="false"
            defaultValue=""
          />
        </span>
        <span className="jss78" />
      </span>
    </div>
    <div className="css-tynm26-ActionMenuContainer ed9irzr1">
      <div>
        <GetAppIcon />
      </div>
      <div style={{ marginLeft: "10px" }}>
        <ShareIcon />
      </div>
    </div>
  </div>
  <div className="css-qozap3-LeftContainerContent e10r0o571">
    <div className="_container_8oa4ch">
      {console.log("file?.file : ", isVideo)}

      {file?.mimeType.includes("video") ? (
        file?.file && (
          <Player playsInline src={file?.file} />
        )
      ) : (
        <img
          className="detail-bg"
          src={file?.file}
          alt={file?.name}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      )}
    </div>
  </div>
</div>
  

  </div>;
};

export default LeftSide;