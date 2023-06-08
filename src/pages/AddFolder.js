import React, { useContext, useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  postAxios,
  postRequest,
  showError,
  showSuccess,
} from "../service/commonService";
import { ADD_RESOURCE, BASE_URL, SUCCESS } from "../service/constants";
import { MainContext } from "../context/MainContext";
import { DropzoneArea } from "material-ui-dropzone";
import { useDropzone } from "react-dropzone";
import "../assets/css/layout.scss";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const AddFolder = ({ data }) => {
  const { setLoading } = useContext(MainContext);
  console.log("data : ", data);
  const [file, setFile] = useState(null);
  const [reload, setReload] = useState(1);

  const [folder, setFolder] = useState({
    userId: "",
    name: "",
    description: "",
    rootFolder: false,
    isFolder: data,
    file: "",
    folderImage: "",
    children: [],
    parentId: "",
    homeParentId: "",
    resourcesCount: "",
    folderCount: "",
    addedBy: "",
    lastUpdatedBy: "",
    folderPath: "",
    fileFormat: "",
    fileSize: "",
    width: "",
    height: "",
  });

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  useEffect(() => {
    
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        setFolder({
          ...folder,
          userId: json._id,
          homeParentId: params.parent,
          parentId: params.folder ? params.folder : "",
          isFolder: data,
        });
      }
    }
  }, [reload]);

  const onChange = (e) => {
    setFolder({ ...folder, [e.target.name]: e.target.value });
  };

  const onClickAddFolder = async () => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append("data", JSON.stringify(folder));
      // formData.append("file", file);
      if (!folder.isFolder) {
        if (!file) {
          return showError({ message: "Please select file!" });
        }
        formData.append("file", file);
      }
      const data = await postAxios(BASE_URL + ADD_RESOURCE, formData);
      console.log("data : ", data);
      if (data) {
        if (data.data.status == SUCCESS) {
          showSuccess(data.data).then((r) => window.location.reload());
        } else {
          showError(data.data);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError();
    }
  };

  const onClickImage = (file) => {
    setFile(file[0]);
    const size = formatBytes(file[0]?.size, 1);
    setFolder({ ...folder, fileSize: size });
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  const onDrop = useCallback((file) => {
    setFile(file[0]);
    const size = formatBytes(file[0]?.size, 1);
    setFolder({ ...folder, fileSize: size, mimeType: file[0]?.type });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container">
      <div className="row  mx-2 p-3">
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Title</text>
            </div>
            <div className="col-7">
              <input
                name="name"
                maxlength="50"
                required="required"
                placeholder="Title*"
                type="text"
                onChange={(e) => onChange(e)}
                value={folder.name}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Description</text>
            </div>
            <div className="col-7">
              <input
                name="description"
                required="required"
                placeholder="Description"
                type="text"
                onChange={(e) => onChange(e)}
                value={folder.description}
              />
            </div>
          </div>
        </div>
        {data === false ? (
          <>
            {/* <div>
              <DropzoneArea
                acceptedFiles={[
                  "application/*",
                  "audio/*",
                  "image/*",
                  "text/*",
                  "multipart/*",
                  "video/*",
                  ".mp4"
                ]}
                // acceptedFiles={["image/* , video/*"]}
                onChange={onClickImage}
                dropzoneText="Drag images here."
                showAlerts={false}
                filesLimit={1}
              />
            </div> */}


            <div className="dropzone-wrapper" {...getRootProps()}>
              <div className="dropzone-desc">
                <i className=""><FileDownloadIcon/></i>
                {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
              </div>
              <input className="dropzone" {...getInputProps()} />
            </div>


{/* 
            <div className="drag-img" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div> */}
          </>
        ) : (
          <></>
        )}

        <div className="col-12 text-right mt-2">
          <button
            className="p-1 text-right login-btn weight-600 font-14 px-3 "
            onClick={onClickAddFolder}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFolder;
