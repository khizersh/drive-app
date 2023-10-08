import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Modal } from "react-bootstrap";
import ShareIcon from "@mui/icons-material/Share";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { saveAs } from "file-saver";
import { red } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  checkPermission,
  checkResourcePermission,
  postRequest,
  showError,
} from "../service/commonService";
import {
  BASE_URL,
  DELETE_RESOURCE,
  DELETE_RESOURCE_PERMISSION,
  DOWNLOAD_RESOURCE_PERMISSION,
  EDIT_RESOURCE,
  FIND_RESOURCE_BY_ID,
  SUCCESS,
  UPDATE_RESOURCE_PERMISSION,
  UPDATE_RESOURCE_PERMISSIONS,
  VIEW_RESOURCE_PERMISSION,
} from "../service/constants";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import ReactPlayer from "react-player/youtube";
import { Player } from "video-react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export const LeftPart = forwardRef(({}, ref) => {
  const router = useHistory();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copyText, setCopyText] = useState("Edit");
  const [show, setShow] = useState(false);
  const [isFolder, setIsFolder] = useState(true);
  const [resource, setResource] = useState({
    name: "",
    id: "",
    userId: "",
  });

  const onChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  const [file, setFile] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const onClickBreadCrum = (data) => {};

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  useEffect(async () => {
    findData();
  }, []);

  const findData = async () => {
    if (params.id) {
      var fileData = null;
      const data = await postRequest(
        BASE_URL + FIND_RESOURCE_BY_ID,
        {
          id: params.id,
        },
        VIEW_RESOURCE_PERMISSION
      );
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

            setResource({ id: fileData.name, name: fileData.name });
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
          showError(data);
        }
      } else {
        showError();
      }
    }
  };

  const onClickShare = () => {
    router.push("/resource-share?id=" + file?._id + "&u=" + params.u );
  };

  const onClickDelete = () => {
    let resoursePermission = checkResourcePermission(DELETE_RESOURCE_PERMISSION , file?._id  , params.u ); 
    if(!resoursePermission){
      return showError({message : "Invalid Permission!"});
     }
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let userLocal = localStorage.getItem("user");
        if (userLocal) {
          var json = JSON.parse(userLocal);
          if (json) {
            let obj = {
              userId: json._id,
              id: file._id,
            };
            const data = await postRequest(
              BASE_URL + DELETE_RESOURCE,
              obj,
              DELETE_RESOURCE_PERMISSION
            );
            if (data) {
              if (data.status == SUCCESS) {
                swal(data.message, {
                  icon: "success",
                });
              } else {
                showError(data);
              }
            }
          }
        }
      }
    });
  };
  const onClickDownload = () => {

    let resoursePermission = checkResourcePermission(DOWNLOAD_RESOURCE_PERMISSION , file?._id  , params.u ); 
    if(!resoursePermission){
      return showError({message : "Invalid Permission!"});
     }

    const permit = checkPermission(DOWNLOAD_RESOURCE_PERMISSION);
    if (permit) {
      if (file?.mimeType.includes("image")) {
        router.push("/resource-download?id=" + file?._id);
      } else {
        saveAs(file?.file, file?.name);
      }
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

  const handleClose = () => setShow(false);

  const onEdit = async () => {

    let resoursePermission = checkResourcePermission(UPDATE_RESOURCE_PERMISSIONS , file?._id  , params.u ); 
    if(!resoursePermission){
      return showError({message : "Invalid Permission!"});
     }
    setCopyText("SAVING...");
    if (resource.name) {
      let userLocal = localStorage.getItem("user");
      if (userLocal) {
        const json = JSON.parse(userLocal);
        if (json) {
          let obj = {
            id: file._id,
            userId: json._id,
            name: resource.name,
          };
          const data = await postRequest(BASE_URL + EDIT_RESOURCE, obj);
          if (data) {
            if (data.status == SUCCESS) {
              swal(data.message, {
                icon: "success",
              });
              setCopyText("Edit");
            } else {
              showError(data);
            }
          }
        }
      }
      setCopyText("Edit");
    } else {
      showError({ message: "Enter name!" });
      setCopyText("Edit");
    }
  };

  return (
    <>
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
              <div
                style={{ marginLeft: "10px" }}
                className="cursor-pointer"
                onClick={() => setShow(true)}
              >
                <EditIcon />
              </div>
              <div
                style={{ marginLeft: "10px" }}
                className="cursor-pointer"
                onClick={onClickDelete}
              >
                <DeleteIcon />
              </div>
            </div>
          </div>
          <div className="css-qozap3-LeftContainerContent e10r0o571">
            <div className="_container_8oa4ch">
              {file?.mimeType.includes("video") ? (
                file?.file && <Player playsInline src={file?.file} />
              ) : file?.mimeType.includes("pdf") ? (
                <img
                  className="detail-bg"
                  src={"https://drive-app.s3.amazonaws.com/28e55324-f5c7-462b-85d6-14216911ca06.png"}
                  alt={file?.name}
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add {isFolder ? "Folder" : "File"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row  mx-2 p-3">
              <div className="col-12 my-3">
                <p>Title</p>
                <input
                  name="name"
                  maxlength="50"
                  value={resource.name}
                  required="required"
                  placeholder="Title*"
                  type="text"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-12">
                <button
                  className="copy-link-btn bg-yellow text-white"
                  disabled={copyText == "SAVING..." ? true : false}
                  onClick={onEdit}
                >
                  {copyText}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
});
