import React, { useEffect, useState } from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import Public from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Menuu from "@mui/material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";
import { useHistory } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { saveAs } from "file-saver";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const File = ({ data, onClick, viewType }) => {
  const router = useHistory();
  const [file, setFile] = useState(null);

  console.log("file :: ", data);
  useEffect(() => {
    if (data?.mimeType?.includes("image")) {
      console.log("naturalWidth : ");
      getMeta(data.file, (err, img) => {
        console.log("img.naturalWidth :: ", img.naturalWidth);
        data["width"] = img.naturalWidth;
        data["height"] = img.naturalHeight;
        setFile(data);
      });
    } else {
      setFile(data);
    }
  }, []);

  const [onHover, setOnHover] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const onClickResource = () => {
    if (!onHover) {
      router.push("/resource-detail?id=" + file?._id);
    }
  };
  const onClickShare = () => {
    router.push("/resource-share?id=" + file?._id);
  };
  const onClickDownload = () => {
    // router.push("/resource-download?id=" + file?._id);
    saveAs(file?.file, file?.name);
  };

  return (
    <>
      {viewType == "list" ? (
        <div
          className="card folderLayputCardImage-col"
          onClick={onClickResource}
        >
          <div className="card-imgaa">
            {file?.mimeType?.includes("video") ? (
              <img src="https://drive-app.s3.amazonaws.com/c7c1feb8-a5b3-4acb-8d39-bdeae261ae7f.png" />
            ) : (
              <img src={file?.file} />
            )}
          </div>

          <div className="describation">
            <div className="_titleColumnContainer_1u6yab5">
              <div
                className="_x8ede33 file-name"
                data-id="re_single_download_action"
              >
                <div className="_truncate_title">
                  <span>happyEndTagWink_v2_COPY REMOVAL</span>
                </div>
              </div>
              <div className="_secondaryText_jnfj5l">
                <div>
                  <span className="_labelText_hq5slr">File Format:</span> Video
                  (mov)
                </div>
                <div>
                  <span className="_labelText_hq5slr">File Size:</span> 176.83
                  MB
                </div>
              </div>

              <div className="_indicators_lp6zce">
                <div className="_indicatorRow_5kaapu">
                  <a className="_linkColours_crf4gc">
                    <button className="_iconButton_10fc6mf" type="button">
                      <span className="material-icons _icon_77bp8u ">
                        <Public />
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="card-date">
            <span>6/5/2022</span>
          </div>

          <div className="_actionsColumn_13waoy8">
            <div className="actions-menu ">
              <div className="" style={{ paddingRight: 24 }}>
                <div className="_container_1892uua ">
                  <a className="_linkColours_icon">
                    <button className="_iconButton_10fc6mfw" type="button">
                      <span className="material-icons _icon_77bp8u ">
                        <OndemandVideoIcon />
                      </span>
                    </button>
                    <div className="_text_13v1tkt">Watch</div>
                  </a>
                </div>
              </div>
              <div className="" style={{ paddingRight: 24 }}>
                <div className="_container_1892uua ">
                  <a className="_linkColours_icon">
                    <button className="_iconButton_10fc6mfw" type="button">
                      <span className="material-icons _icon_77bp8u ">
                        <FileDownloadIcon />
                      </span>
                    </button>
                    <div className="_text_13v1tkt">Download</div>
                  </a>
                </div>
              </div>
              <div className="" style={{ paddingRight: 24 }}>
                <div className="_container_1892uua ">
                  <a className="_linkColours_icon">
                    <button className="_iconButton_10fc6mfw" type="button">
                      <span className="material-icons _icon_77bp8u ">
                        <MoreVertIcon />
                      </span>
                    </button>
                    <div className="_text_13v1tkt">More</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <a className="card folderLayputCardImage" onClick={onClickResource}>
          <div className="hoverDiv">
            <div className="iconActive">
              <div className="checkBox">
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} />
                </FormGroup>
              </div>
              <div className="iconMenus">
                <FileDownloadIcon
                  onMouseOver={() => setOnHover(true)}
                  onClick={(e) => onClickDownload(true)}
                  onMouseLeave={() => setOnHover(false)}
                  style={{ marginRight: "10px" }}
                />
                <ShareIcon
                  onMouseOver={() => setOnHover(true)}
                  onClick={(e) => onClickShare(true)}
                  onMouseLeave={() => setOnHover(false)}
                />
              </div>
            </div>
            <div className="eyeIcon">
              <VisibilityIcon />
            </div>
          </div>

          <div className="card-imgaa">
            {file?.mimeType?.includes("video") ? (
              <img src="https://drive-app.s3.amazonaws.com/c7c1feb8-a5b3-4acb-8d39-bdeae261ae7f.png" />
            ) : (
              <img src={file?.file} />
            )}
          </div>

          <div className="card-describation">
            <div class="_countContainer_13ovesk">
              <div class="_truncateMulti_3ywtd5">
                <span>
                  {file?.folderCount || file?.resourceCount ? (
                    <div className="_countContainer_13ovesk">
                      <div className="_truncateMulti_3ywtd5">
                        <span>
                          <i>
                            {file?.folderCount ? (
                              file?.folderCount + " Sub-Folders"
                            ) : (
                              <></>
                            )}{" "}
                            {file?.resourceCount ? (
                              file?.resourceCount + " , Resources"
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
            <div class="_bottom_f93tfg">
              <div class="_dpv7do3">
                <div class="_truncate_ww5d6d">
                  <span>{file?.name}</span>
                </div>
              </div>
              <div class="_content_c3jvop">
                <div>
                  <span>
                    {" "}
                    {file?.mimeType?.includes("video") ? (
                      "Video (mov)"
                    ) : (
                      <>{file?.width + " x " + file?.height}</>
                    )}{" "}
                    {file?.fileSize}
                  </span>
                </div>
              </div>
              <div className="_linkColours_11bsm43">
                <Public color="#4a4a4a" />
              </div>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default File;
