import React, { useEffect, useState } from "react";
import {
  checkPermission,
  postAxios,
  postRequest,
  showError,
} from "../service/commonService";
import {
  BASE_URL,
  DOWNLOAD_IMAGE,
  DOWNLOAD_IMAGE_WITH_SIZE,
  DOWNLOAD_RESOURCE_PERMISSION,
  FIND_RESOURCE_BY_ID,
  SUCCESS,
} from "../service/constants";
import { red } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { saveAs } from "file-saver";
import swal from "sweetalert";

const DownloadFile = () => {
  const [isVideo, setIsVideo] = useState(false);
  const [file, setFile] = useState(null);
  const [singleDownload, setSingleDownload] = useState(true);
  const [options, setOptions] = useState([
    {
      id: "jpeg",
      title: "JPEG",
    },
    { id: "png", title: "PNG" },
    { id: "jpg", title: "JPG" },
    { id: "gif", title: "GIF" },
    { id: "tiff", title: "TIFF" },
  ]);
  const [dimensions, setDimensions] = useState([
    {
      id: "small",
      title: "Small",
      dimension: "",
    },
    { id: "medium", title: "Medium", dimension: "" },
    { id: "large", title: "Large", dimension: "" },
  ]);
  const [selectedValue, setSelectedValue] = useState("psd");
  const [selectedDimension, setSelectedDimension] = useState("");
  const [copyText, setCopyText] = useState("Download");

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  useEffect(async () => {
    findData();
  }, []);

  const findData = async () => {
    if (params.id) {
      var fileData = null;
      const data = await postRequest(BASE_URL + FIND_RESOURCE_BY_ID, {
        id: params.id,
      });
      if (data) {
        if (data.status == SUCCESS) {
          if (!data.data.isFolder) {
            fileData = data.data;

            const updatedFormat = getList().map((m) => {
              if (fileData?.mimeType?.includes(m.id)) {
                setSelectedValue(m.id);
                return {
                  ...m,
                  title: m.title + " (Original)",
                };
              }
              return m;
            });
            setOptions(updatedFormat);

            setIsVideo(false);
            if (data?.data?.mimeType?.includes("image")) {
              setIsVideo(false);
              getMeta(fileData.file, (err, img) => {
                fileData["width"] = img.naturalWidth;
                fileData["height"] = img.naturalHeight;
                let array = [
                  {
                    id: "small",
                    title: "Small",
                    width: Number(fileData["width"]) * 0.25,
                    height: Number(fileData["height"]) * 0.25,
                    dimension:
                      Number(fileData["width"]) * 0.25 +
                      " x " +
                      Number(fileData["height"]) * 0.25 +
                      " px, 25%",
                  },
                  {
                    id: "medium",
                    title: "Medium",
                    dimension:
                      Number(fileData["width"]) * 0.5 +
                      " x " +
                      Number(fileData["height"]) * 0.5 +
                      " px, 50%",
                    width: Number(fileData["width"]) * 0.5,
                    height: Number(fileData["height"]) * 0.5,
                  },
                  {
                    id: "large",
                    title: "Large",
                    width: Number(fileData["width"]) * 0.75,
                    height: Number(fileData["height"]) * 0.75,
                    dimension:
                      Number(fileData["width"]) * 0.75 +
                      " x " +
                      Number(fileData["height"]) * 0.75 +
                      " px, 75%",
                  },
                ];
                setDimensions(array);
              });

              setFile(fileData);
            } else {
              setIsVideo(true);
            }
          }
        } else {
          showError(data.data);
        }
      } else {
        showError();
      }
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeDimension = (event) => {
    setSelectedDimension(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const controlDimensionProps = (item) => ({
    checked: selectedDimension === item,
    onChange: handleChangeDimension,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  function getList() {
    return options;
  }

  function getDimensions() {
    return dimensions;
  }

  function findObject() {
    return getList().find((m) => m.id === selectedValue);
  }

  const onClickLink = async () => {
    try {
      const approved = checkPermission(DOWNLOAD_RESOURCE_PERMISSION);
      if (approved) {
        setCopyText("Downloading...");
        const base64 = await postAxios(
          BASE_URL + DOWNLOAD_IMAGE_WITH_SIZE,
          {
            url: file?.file,
            format: selectedValue,
          }
        );

        var a = document.createElement("a"); //Create <a>
        a.href = "data:image/png;base64," + base64.data;
        a.download = file?.name + "." + selectedValue; //File name Here
        a.click(); //Downloaded file
        setCopyText("Download");
      } else {
        swal({ title: "Invalid Permission!", icon: "error" });
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const onClickPresetDownload = async () => {
    try {
      const approved = checkPermission(DOWNLOAD_RESOURCE_PERMISSION);

      if(approved){
        setCopyText("Downloading...");
        const selected = dimensions.find((dim) => dim.id === selectedDimension);
        if (selected) {
          const base64 = await postAxios(BASE_URL + DOWNLOAD_IMAGE_WITH_SIZE, {
            url: file?.file,
            format: selectedValue,
            width: selected.width,
            height: selected.height,
          });
          var a = document.createElement("a");
          a.href = "data:image/png;base64," + base64.data;
          a.download = file?.name + "." + selectedValue;
          a.click();
        } else {
          swal({ icon: "error", title: "Please select dimension!" });
        }
        setCopyText("Download");
      }else{
        swal({ title: "Invalid Permission!", icon: "error" });
      }
   
    } catch (error) {
      console.log("error : ", error);
    }
  };

  function handleConvertedImage(url) {
    console.log(url);
  }

  const getMeta = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="">
          <h2 className="share-file-name">{file?.name}</h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="card leftDiv">
              <img className="" src={file?.file} width={'100%'}/>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-around ">
              <div
                className={`cursor-pointer ${
                  singleDownload ? "share-title-div" : ""
                }`}
                onClick={() => setSingleDownload(true)}
              >
                SINGLE DOWNLOAD
              </div>
              <div
                className={`cursor-pointer ${
                  !singleDownload ? "share-title-div" : ""
                }`}
                onClick={() => setSingleDownload(false)}
              >
                PRESET DOWNLOAD
              </div>
            </div>
            {singleDownload ? (
              <div className="card p-3">
                <p>
                  <strong>File Format</strong>
                </p>
                {getList().length ? (
                  getList().map((m) => (
                    <div style={{ marginTop: "0px" }}>
                      {" "}
                      <Radio
                        {...controlProps(m.id)}
                        sx={{
                          color: red[900],
                          "&.Mui-checked": {
                            color: red[900],
                          },
                        }}
                      />{" "}
                      <text style={{ fontSize: "15px", fontWeight: "600" }}>
                        {m.title}
                      </text>
                    </div>
                  ))
                ) : (
                  <></>
                )}

                <hr />
                <button
                  className="copy-link-btn bg-red text-white"
                  disabled={copyText == "Downloading..." ? true : false}
                  onClick={onClickLink}
                >
                  {copyText}
                </button>
              </div>
            ) : (
              <div className="card p-3">
                <p>
                  <strong>File Format</strong>
                </p>
                {getList().length ? (
                  getList().map((m) => (
                    <div style={{ marginTop: "0px" }}>
                      {" "}
                      <Checkbox
                        {...controlProps(m.id)}
                        sx={{
                          color: red[900],
                          "&.Mui-checked": {
                            color: red[900],
                          },
                        }}
                      />{" "}
                      <text style={{ fontSize: "15px", fontWeight: "600" }}>
                        {m.title}
                      </text>
                    </div>
                  ))
                ) : (
                  <></>
                )}
                <hr />
                <p>
                  <strong>Image Dimensions</strong>
                </p>
                {getDimensions().length ? (
                  getDimensions().map((m) => (
                    <div style={{ marginTop: "0px" }}>
                      {" "}
                      <Checkbox
                        {...controlDimensionProps(m.id)}
                        sx={{
                          color: red[900],
                          "&.Mui-checked": {
                            color: red[900],
                          },
                        }}
                      />{" "}
                      <text style={{ fontSize: "15px", fontWeight: "600" }}>
                        {m.title} ({m.dimension})
                      </text>
                    </div>
                  ))
                ) : (
                  <></>
                )}
                <hr />
                <button
                  className="copy-link-btn bg-red text-white"
                  disabled={copyText == "Downloading..." ? true : false}
                  onClick={onClickPresetDownload}
                >
                  {copyText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadFile;
