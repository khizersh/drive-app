import React, { useContext, useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  checkResourcePermission,
  getRequest,
  postAxios,
  postRequest,
  showError,
  showSuccess,
} from "../service/commonService";
import {
  ADD_FOLDER_PERMISSION,
  ADD_RESOURCE,
  ADD_RESOURCE_PERMISSION,
  ALL_PERMISSIONS,
  BASE_URL,
  GET_ALL,
  SUCCESS,
  UPDATE_RESOURCE_PERMISSION,
  UPDATE_RESOURCE_PERMISSION_ALL,
} from "../service/constants";
import { MainContext } from "../context/MainContext";
import { DropzoneArea } from "material-ui-dropzone";
import { useDropzone } from "react-dropzone";
import "../assets/css/layout.scss";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Multiselect from "multiselect-react-dropdown";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

const AddFolder = ({ data }) => {
  const { setLoading } = useContext(MainContext);
  const [file, setFile] = useState(null);
  const [reload, setReload] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allUser, setAllUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const [oldUserList, setOldUserList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [value, setValue] = React.useState("1");
  const [allUserPermission, setAllUserPermission] = React.useState({
    resourceId: " ",
    permissionList: [],
    exceptList: [],
  });

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

  const [fileName, setFileName] = useState("");

  useEffect(() => {
    let user = getCurrentUser();
    if (user) {
      setFolder(user);
      getUSers();
    }
  }, [reload]);

  function getCurrentUser() {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        let obj = {
          ...folder,
          userId: json._id,
          homeParentId: params.parent,
          parentId: params.folder ? params.folder : "",
          isFolder: data,
        };
        return obj;
      }
    }
    return null;
  }

  const onChange = (e) => {
    if (e.target.name == "name") {
      localStorage.setItem("name", e.target.value);
    }
    if (e.target.name == "description") {
      localStorage.setItem("description", e.target.value);
    }
    setFolder({ ...folder, [e.target.name]: e.target.value });
  };

  const onClickAddFolder = async () => {
    setLoading(true);
    setIsLoading(true);
    try {
      var formData = new FormData();
      formData.append("data", JSON.stringify(folder));
      if (!folder.isFolder) {
        if (!file) {
          return showError({ message: "Please select file!" });
        }
        formData.append("file", file);
        if (
          !checkResourcePermission(
            ADD_RESOURCE_PERMISSION,
            params.folder ? params.folder : params.parent,
            params.u,
            folder
          )
        ) {
          return showError({ message: "Invalid Permission!" });
        }
      } else {
        if (
          !checkResourcePermission(
            ADD_FOLDER_PERMISSION,
            params.folder ? params.folder : params.parent,
            params.u,
            folder
          )
        ) {
          return showError({ message: "Invalid Permission!" });
        }
      }

      const response = await postAxios(
        BASE_URL + ADD_RESOURCE,
        formData,
        file ? ADD_RESOURCE_PERMISSION : ADD_FOLDER_PERMISSION
      );
      if (response) {
        if (response.data.status == SUCCESS) {
          if (allUser) {
            let request = allUserPermission;
            request.resourceId = response.data.resourceId;
            await postRequest(
              BASE_URL + UPDATE_RESOURCE_PERMISSION_ALL,
              request
            );
          }
          showSuccess(response.data).then((r) => window.location.reload());

          // let json = setRequestBodyPermission(response.data.resourceId);
          // if (allUserPermission.permissionList.length) {
          //   let exceptList = json.map((m) => m.email);
          //   let request = allUserPermission;
          //   request.resourceId = response.data.resourceId;
          //   request.exceptList = exceptList;
          //   await postRequest(
          //     BASE_URL + UPDATE_RESOURCE_PERMISSION_ALL,
          //     request
          //   );
          // }
          // await postRequest(BASE_URL + UPDATE_RESOURCE_PERMISSION, json);
          // showSuccess(response.data).then((r) => window.location.reload());
        } else {
          showError(response.data);
        }
      }
      setLoading(false);
      setIsLoading(false);
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
    setIsLoading(true);
    let name = localStorage.getItem("name");
    let description = localStorage.getItem("description");
    setFile(file[0]);
    const size = formatBytes(file[0]?.size, 1);
    let user = getCurrentUser();
    if (user) {
      setFolder({
        ...user,
        name: name,
        description: description,
        fileSize: size,
        mimeType: file[0]?.type,
      });
    }

    setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setIsLoading(false);
          return 100;
        } else {
          return prevProgress + 10;
        }
      });
    }, 200);

    setFileName(file[0].name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function onSelect(selectedList, selectedItem) {
    setOldUserList(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    setOldUserList(selectedList);
  }

  function onClickUserPermission(user, permission) {
    let finalPermissions = permissionList;
    let userPerm = permissionList.find((perm) => perm.email == user);
    if (userPerm) {
      let permissionExist = userPerm?.permissions?.find((p) => p == permission);
      if (permissionExist) {
        userPerm.permissions = userPerm.permissions.filter(
          (m) => m != permission
        );
      } else {
        userPerm.permissions.push(permission);
      }

      finalPermissions.map((final) => {
        if (final.email == userPerm.email) {
          final = userPerm;
        }
      });
    } else {
      finalPermissions.push({
        email: user,
        resourceId: "",
        permissions: [permission],
      });
    }

    setPermissionList(finalPermissions);
  }

  function onClickAllUserPermission(permissions) {
    let finalPermissions = allUserPermission;
    let isExist = finalPermissions.permissionList.find(
      (perm) => perm === permissions
    );

    if (isExist) {
      finalPermissions.permissionList = finalPermissions.permissionList.filter(
        (perm) => perm != permissions
      );
    } else {
      finalPermissions.permissionList.push(permissions);
    }

    setAllUserPermission(finalPermissions);
  }

  function setRequestBodyPermission(resourceId) {
    let finals = permissionList.map((m) => {
      m.resourceId = resourceId;
      return m;
    });
    return finals;
  }

  const getUSers = async () => {
    try {
      const data = await getRequest(BASE_URL + GET_ALL);
      if (data != null) {
        if (data.status == SUCCESS) {
          let userList = data.data.map((m) => {
            return {
              id: m.email,
              name: m.email,
            };
          });
          setUserList(userList);
        }
      }
    } catch (error) {
      showError();
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              />
            </div>
          </div>
        </div>
        {/* <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                <Tab label="General Roles" value="1" className="mr-2" />
                <Tab label="Specific Roles" value="2" />
              </TabList>
            </Box>
            <TabPanel value="2">
              {" "}
             
            </TabPanel>
            <TabPanel value="1">
              {" "}
            
            </TabPanel>
          </TabContext>
        </Box> */}
        <div className="col-6 form-check permission-div">
          {" "}
          <input
            className="form-check-input"
            type="checkbox"
            onClick={() => setAllUser(!allUser)}
          />
          <label class="form-check-label" for="flexCheckDefault">
            ALL USER
          </label>
        </div>
        {allUser ? (
          <div className="col-12 my-3">
            <div className="row m-0 mt-2">
              {ALL_PERMISSIONS.map((perm) => (
                <div className="col-6 form-check permission-div">
                  {" "}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={allUser}
                    onClick={() => onClickAllUserPermission(perm)}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    {perm}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* SPECIFIC ROLE
        <div className="col-12 my-3">
          <div className="row ">
            <text>
              <strong> Select User: </strong>
            </text>
            <Multiselect
              options={userList} // Options to display in the dropdown
              selectedValues={oldUserList} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <div className="row">
            {oldUserList.length
              ? oldUserList.map((user) => (
                  <div>
                    <p className="mt-2 mb-0 ml-0">{user.name} : </p>
                    <div className="row m-0">
                      {ALL_PERMISSIONS.map((perm) => (
                        <div className="col-6 form-check permission-div">
                          {" "}
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onClick={() => onClickUserPermission(user.id, perm)}
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            {perm}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div> */}
        {data === false ? (
          <>
            <div
              className="dropzone-wrapper cursor-pointer"
              {...getRootProps()}
            >
              <div className="dropzone-desc">
                <i className="">
                  <FileDownloadIcon />
                </i>
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>
                    <strong>Choose a file</strong> or drag it here
                  </p>
                )}
                <p className="text-red fileName">{fileName} </p>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress variant="determinate" value={progress} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {`${Math.round(progress)}%`}
                    </Typography>
                  </Box>
                </Box>
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
            className={`p-1 text-right login-btn weight-600 font-14 px-3   ${
              isLoading ? "bg-grey" : ""
            }`}
            disabled={isLoading ? true : false}
            onClick={onClickAddFolder}
          >
            {isLoading ? "Uploading ..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFolder;
