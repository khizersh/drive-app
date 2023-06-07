import React, { useState } from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import Public from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import MoreVert from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menuu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Folder = ({ data, onClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [onHover, setOnHover] = React.useState(false);
  const open = Boolean(anchorEl);
  const [showDiv, setShowDiv] = useState(false);

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    setShowDiv(true);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const onMouseOver = () => {
    setOnHover(true);
  };
  const onMouseLeave = () => {
    setOnHover(false);
  };

  const onClickResource = () => {
    if (!onHover) {
      onClick("", data);
    }
  };

  return (
    <a className="card folderLayputCard" onClick={onClickResource}>
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
              <div className="row   " onMouseLeave={() => setOnHover(false)}>
                <div className="col-12 card shadow showDiv col-lg-6 offset-lg-6">
                  <p className="text-left mb-0 ">
                    <ShareIcon /> Share{" "}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
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
                          {data.resourcesCount ? (
                           " , " + data.resourcesCount + " Resources"
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
