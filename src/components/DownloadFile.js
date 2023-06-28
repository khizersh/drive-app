import React, { useEffect, useState } from "react";
import { postAxios, postRequest, showError } from "../service/commonService";
import {
  BASE_URL,
  DOWNLOAD_IMAGE,
  FIND_RESOURCE_BY_ID,
  SUCCESS,
} from "../service/constants";
import { red } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import ConvertImage from "react-convert-image";
import { saveAs } from "file-saver";

const DownloadFile = () => {
  const [isVideo, setIsVideo] = useState(false);
  const [file, setFile] = useState(null);
  const [options, setOptions] = useState([
    // {
    //   id: "psd",
    //   title: "PSD",
    // },
    {
      id: "jpeg",
      title: "JPEG",
    },
    { id: "png", title: "PNG" },
    { id: "svg", title: "SVG" }
  ]);
  const [selectedValue, setSelectedValue] = useState("psd");
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

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  function getList() {
    return options;
  }

  function findObject() {
    return getList().find((m) => m.id === selectedValue);
  }

  const onClickLink = async () => {
    try {
      setCopyText("Downloading...")
      const base64 = await postAxios(BASE_URL + DOWNLOAD_IMAGE, {
        url: file?.file,
        format: selectedValue,
      });
      console.log("base64 : ", file);
      var a = document.createElement("a"); //Create <a>
      a.href = "data:image/png;base64," + base64.data;
      a.download = file?.name + "." + selectedValue; //File name Here
      a.click(); //Downloaded file
      setCopyText("Download")
    } catch (error) {
      console.log("error : ", error);
    }
  };

  function handleConvertedImage(url) {
    console.log(url);
  }

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
              <img className="" src={file?.file} />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="share-title-div">DOWNLOAD</div>
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
              {selectedValue == "Social" ? (
                <div>
                  <div></div>
                  <FacebookShareButton
                    url={file?.file}
                    quote={file?.description}
                    hashtag={""}
                    description={file?.description}
                    className="mr-2"
                  >
                    <FacebookIcon size={52} round={false} />{" "}
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={file?.file}
                    quote={file?.description}
                    hashtag={""}
                    description={file?.description}
                    hashtags={[""]}
                  >
                    <TwitterIcon size={52} round={false} />
                  </TwitterShareButton>
                </div>
              ) : (
                <>
                  {" "}
                  {/* <div className="link-here">{selectedValue} Link</div> */}
                  <p className="share-link">
                    {findObject(selectedValue) != null
                      ? findObject(selectedValue).link
                      : ""}
                  </p>
                  <button
                    className="copy-link-btn bg-red text-white"
                    disabled={copyText == "Downloading..." ? true : false}
                    onClick={onClickLink}
                  >
                    {copyText}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadFile;
