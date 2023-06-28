import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { saveAs } from "file-saver";
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
import { useHistory } from "react-router-dom";

export const RightSide = forwardRef(({}, ref) => {
  const router = useHistory();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // useEffect(() => {
  //   if (file?.mimeType?.includes("image")) {
  //     getMeta(file.file, (err, img) => {
  //       file["width"] = img.naturalWidth;
  //       file["height"] = img.naturalHeight;
  //       setFile(data);
  //     });
  //   } else {
  //     setFile(data);
  //   }
  // }, []);

  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  const [file, setFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const onClickBreadCrum = (data) => {
    console.log("data crum :: ", data);
  };

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

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

  const onClickShare = () => {
    router.push("/resource-share?id=" + file?._id);
  };
  const onClickDownload = () => {
    if (file?.mimeType.includes("image")) {
      router.push("/resource-download?id=" + file?._id);
    } else {
      saveAs(file?.file, file?.name);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      collapse: () => setIsCollapsed(true),
      expand: () => setIsCollapsed(false),
      isCollapsed: isCollapsed,
    }),
    [isCollapsed]
  );

  return (
    <div className="css-v86hxw-d e1vmnjjl6">
      <div className="css-yj4l3y-LeftContainer e10r0o572">
        <div className="css-u9qt4x-ContainerHeader e10r0o573">
          <div className="css-1xusefk-StyledCheckbox e10r0o570"></div>
          <div className="css-tynm26-ActionMenuContainer ed9irzr1">
            <div onClick={onClickDownload} className="cursor-pointer">
              <GetAppIcon />
            </div>
            <div
              style={{ marginLeft: "10px" }}
              className="cursor-pointer"
              onClick={onClickShare}
            >
              <ShareIcon />
            </div>
          </div>
        </div>
        <div className="css-qozap3-LeftContainerContent e10r0o571">
          <div className="_container_8oa4ch">
            {file?.mimeType.includes("video") ? (
              file?.file && <Player playsInline src={file?.file} />
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
    </div>
  );
});
