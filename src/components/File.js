import React, { useEffect, useState , } from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import Public from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import MoreVert from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menuu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DescriptionIcon from "@mui/icons-material/Description";
import { useHistory } from "react-router-dom";

const File = ({ data, onClick }) => {

  const router = useHistory();
  useEffect(() => {
    console.log("data :: ", data);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const onClickResource = () => {
    router.push("/resource-detail")

  };

  return (
    <a className="card folderLayputCard" onClick={onClickResource}>
      <div className="card-body">
        <div className="hoverDiv">
          <div className="iconActive">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </Button>
            <Menuu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose1}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose1}>
                <ShareIcon />
                <text className="ml-2">Share Folder Link</text>
              </MenuItem>
            </Menuu>
          </div>
        </div>

        <div className="card-img">
          <img src={data.file} />
        </div>

        <div className="card-describation">
          <div class="_truncate_ww5d6d">
            <span> {data.name}</span>
          </div>

          <div class="_countContainer_13ovesk">
            <div class="_truncateMulti_3ywtd5">
              <span>
                {data.folderCount || data.resourceCount ? (
                  <div className="_countContainer_13ovesk">
                    <div className="_truncateMulti_3ywtd5">
                      <span>
                        <i>
                          {data.folderCount ? (
                            data.folderCount + " Sub-Folders"
                          ) : (
                            <></>
                          )}{" "}
                          {data.resourceCount ? (
                            data.resourceCount + " , Resources"
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
  );
};

export default File;
