import React from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import Public from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import MoreVert from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menuu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Folder = ({ data , onClick}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const onClickResource = () => {
    onClick("",data)
  }

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

        <div className="card-img" onClick={onClickResource}>
          <img src="https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/logo/35ace8e6e6b1001500f95f6791f8d28b.png" />
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

export default Folder;
