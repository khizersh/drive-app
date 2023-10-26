import React, { useState, useEffect } from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import Public from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import MoreVert from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menuu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  BASE_URL,
  DELETE_FOLDER_WITH_SUBFOLDER,
  DELETE_RESOURCE,
  DELETE_RESOURCE_PERMISSION,
  SUCCESS,
  VIEW_RESOURCE_PERMISSION,
} from "../service/constants";
import {
  checkResourcePermission,
  postRequest,
  showError,
} from "../service/commonService";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";

const Folder = ({ data, onClick, viewType }) => {
  const router = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [onHover, setOnHover] = React.useState(false);
  const [resource, setResource] = React.useState(data);
  const open = Boolean(anchorEl);
  const [showDiv, setShowDiv] = useState(false);

  const onClickResource = () => {
    if (!onHover) {
      onClick("", resource);
    }
  };

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const onClickShare = () => {
    router.push("/folder-share?id=" + resource?._id + "&u=" + params.u);
  };
  const onClickDelete = () => {
    let resoursePermission = checkResourcePermission(
      DELETE_RESOURCE_PERMISSION,
      resource?._id,
      params.u,
      resource
    );
    if (!resoursePermission) {
      return showError({ message: "Invalid Permission!" });
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
              id: resource._id,
            };
            const data = await postRequest(
              BASE_URL + DELETE_FOLDER_WITH_SUBFOLDER,
              obj,
              DELETE_RESOURCE_PERMISSION
            );
            if (data) {
              if (data.status == SUCCESS) {
                swal(data.message, {
                  icon: "success",
                }).then((m) => {
                  window.location.reload();
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

  return (
    <>
      {/* {checkResourcePermission(VIEW_RESOURCE_PERMISSION, data._id, params.u) ? ( */}
      {true ? (
        viewType == "list" ? (
          <a className="card folderLayputCard-col" onClick={onClickResource}>
            <div className="card-body">
              <div className="iconActive">
                <ShareIcon
                  style={{ color: " rgb(200, 16, 46)", marginRight: "10px" }}
                  onClick={() => onClickShare()}
                />
                <DeleteIcon
                  style={{ color: " rgb(200, 16, 46)" }}
                  onClick={() => onClickDelete()}
                />
                {/* <Button
                  id="basic-button"
                  aria-controls={onHover ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={onHover ? "true" : undefined}
                  onMouseOver={() => setOnHover(true)}
                  onClick={(e) => setOnHover(true)}
                >
                  <MoreVert style={{ color: " rgb(200, 16, 46)" }} />
                </Button>
                {onHover ? (
                  <div onMouseLeave={() => setOnHover(false)}>
                    <div className="card shadow showDiv" onClick={() => onClickShare()}>
                      <p className="text-left mb-0 " >
                        <ShareIcon /> Share{" "}
                      </p>
                    </div>
                    <div className="card shadow showDiv" onClick={() => onClickShare()}>
                      <p className="text-left mb-0 " >
                        <ShareIcon /> Share{" "}
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )} */}
              </div>

              <div className="" onClick={onClickResource}>
                <img src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
              </div>

              <div className="card-describation ms-2">
                <div class="_truncate_ww5d6d">
                  <span> {resource.name}</span>
                </div>

                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span>
                      {resource.folderCount || resource.resourceCount ? (
                        <div className="_countContainer_13ovesk">
                          <div className="_truncateMulti_3ywtd5">
                            <span>
                              <i>
                                {resource.folderCount ? (
                                  resource.folderCount + " Sub-Folders"
                                ) : (
                                  <></>
                                )}{" "}
                                {resource.resourcesCount ? (
                                  " , " + resource.resourcesCount + " Resources"
                                ) : (
                                  <></>
                                )}
                              </i>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                </div>
                <div className="_linkColours_11bsm43">
                  <Public color="#4a4a4a" />
                </div>
              </div>
            </div>
          </a>
        ) : (
          <a className="card folderLayputCard 12" onClick={onClickResource}>
            <div className="card-body">
              <div className="hoverDiv">
                <div className="iconActive">
                  <Button
                    id="basic-button"
                    aria-controls={onHover ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={onHover ? "true" : undefined}
                    onMouseOver={() => setOnHover(true)}
                    onClick={(e) => setOnHover(true)}
                  >
                    <MoreVert style={{ color: " rgb(200, 16, 46)" }} />
                  </Button>
                  {onHover ? (
                    <div
                      className="row   "
                      onMouseLeave={() => setOnHover(false)}
                    >
                      <div
                        className="col-12 card shadow showDiv col-lg-6 offset-lg-6"
                        onClick={() => onClickShare()}
                      >
                        <p className="text-left mb-0 ">
                          <ShareIcon /> Share{" "}
                        </p>
                      </div>
                      <div
                        className="col-12 card shadow showDiv col-lg-6 offset-lg-6"
                        onClick={() => onClickDelete()}
                      >
                        <p className="text-left mb-0 ">
                          <DeleteIcon /> Delete{" "}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="card-img" onClick={onClickResource}>
                <img
                  // src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png"
                  src={require("../assets/images/folder-img.png")}
                />
              </div>

              <div className="card-describation">
                <div class="_truncate_ww5d6d">
                  <span> {resource.name}</span>
                </div>

                <div class="_countContainer_13ovesk">
                  <div class="_truncateMulti_3ywtd5">
                    <span>
                      {resource.folderCount || resource.resourceCount ? (
                        <div className="_countContainer_13ovesk">
                          <div className="_truncateMulti_3ywtd5">
                            <span>
                              <i>
                                {resource.folderCount ? (
                                  resource.folderCount + " Sub-Folders"
                                ) : (
                                  <></>
                                )}{" "}
                                {resource.resourcesCount ? (
                                  " , " + resource.resourcesCount + " Resources"
                                ) : (
                                  <></>
                                )}
                              </i>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </span>
                  </div>
                </div>
                <div className="_linkColours_11bsm43">
                  <Public color="#4a4a4a" />
                </div>
              </div>
            </div>
          </a>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default Folder;
