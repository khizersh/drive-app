import React, { useEffect, useState , } from "react";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import Public from "@mui/icons-material/Public";
import ShareIcon from "@mui/icons-material/Share";
import MoreVert from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Menuu from "@mui/material/Menu";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from "@mui/icons-material/Description";
import { useHistory } from "react-router-dom";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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
    
    <a className="card folderLayputCardImage" onClick={onClickResource}>
        <div className="hoverDiv">
          <div className="iconActive">


              <div className="checkBox">

              <FormGroup>
      <FormControlLabel  control={<Checkbox />} />
    </FormGroup>

              </div>
              <div className="iconMenus">
                  <FileDownloadIcon />
                  <MoreVert />

              </div>
          </div>
          <div className="eyeIcon">
            <VisibilityIcon />
          </div>
        </div>

        <div className="card-img">
          <img src="https://cdn.intelligencebank.com/us/thumbnail/Dnn9/fe227fe87635b7a1ec08e6abbf18ff5f/original/Drink_Straight_CokeGlass_022017" />
        </div>

        <div className="card-describation">

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
          <div class="_bottom_f93tfg">
            <div class="_dpv7do3">
              <div class="_truncate_ww5d6d">
                <span>C_Drink_Coffee_Coldbrew_Vanilla_011819</span>
                </div>
                </div>
                <div class="_content_c3jvop">
                  <div>
                    <span>4326 x 6707, Photoshop (psd), 69.46 MB</span>
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
