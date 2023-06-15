import React, { useEffect, useState } from "react";
import Public from "@mui/icons-material/Public";
import { useHistory } from "react-router-dom";
import { saveAs } from "file-saver";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const TableFileListView = ({
  data,
  onClick,
  viewType,
  onOpenPopup,
  onClickAdd,
}) => {
  const router = useHistory();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (data?.mimeType?.includes("image")) {
      getMeta(data.file, (err, img) => {
        data["width"] = img.naturalWidth;
        data["height"] = img.naturalHeight;
        setFile(data);
      });
    } else {
      setFile(data);
    }
  }, []);

  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  const [onHover, setOnHover] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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
    saveAs(file?.file, file?.name);
  };
  const onClickAddCollection = () => {
    onOpenPopup(file);
  };

  return (
    <div className="card folderLayputCardImage-col">
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
              <span>{file?.name}</span>
            </div>
          </div>
          <div className="_secondaryText_jnfj5l">
            <div>
              <span className="_labelText_hq5slr">File Format:</span>{" "}
              {file?.mimeType}
            </div>
            <div>
              <span className="_labelText_hq5slr">File Size:</span>{" "}
              {file?.fileSize}
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
        <span>{file?.createdDate}</span>
      </div>

      <div className="_actionsColumn_13waoy8">
        <div className="actions-menu ">
          <div
            className=""
            onClick={() => onClick(file)}
            style={{ paddingRight: 24 }}
          >
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
                    <FileDownloadIcon
                      onClick={(e) => onClickDownload(true)}
                    />
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
                    <LibraryAddIcon
                      onClick={(e) => onClickAddCollection(true)}
                    />
                  </span>
                </button>
                <div className="_text_13v1tkt">Collection</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFileListView;
