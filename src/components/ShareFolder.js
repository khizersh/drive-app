import React, { useEffect, useState, useContext } from "react";
import { postRequest, showError } from "../service/commonService";
import { BASE_URL, FIND_RESOURCE_BY_ID, SUCCESS } from "../service/constants";
import { brown, red } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { MainContext } from "../context/MainContext";

const ShareFolder = () => {
  const [isVideo, setIsVideo] = useState(false);
  const { setLoading, mainState } = useContext(MainContext);
  const [file, setFile] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Link");
  const [copyText, setCopyText] = useState("Copy Link");

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  useEffect(async () => {
    findData();
  }, []);

  const findData = async () => {
    if (params.id) {
      setLoading(true);
      var fileData = null;
      const data = await postRequest(BASE_URL + FIND_RESOURCE_BY_ID, {
        id: params.id,
      });

      if (data) {
        if (data.status == SUCCESS) {
          setFile(data.data);
          setLoading(false);
        } else {
          showError(data.data);
        }
      } else {
        showError();
      }
      setLoading(false);
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

  var folderURl =
    window.location.origin +
    `/folder?parent=${file?.homeParentId}${
      file?._id ? "&folder=" + file?._id : ""
    }&u=${params.u}`;
  function getList() {
    var array = [
      {
        id: "Link",
        title: "Internal Link",
        link: folderURl,
      },
      { id: "Social", title: "Social Link" },
    ];
    return array;
  }

  function findObject() {
    return getList().find((m) => m.id === selectedValue);
  }

  function onClickLink() {
    if (findObject(selectedValue)) {
      navigator.clipboard.writeText(findObject(selectedValue).link);
    }
  }

  return (
    <>
      <div className="container">
        <div className="">
          <h2 className="share-file-name" style={{ paddingLeft: "0px" }}>
            {file?.name}
          </h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="card leftDiv">
              <img
                className=""
                src={require("../assets/images/folder-img.png")}
                width={"30%"}
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="share-title-div">SHARE</div>
            <div className="card p-3">
              <p>
                <strong> Share Type</strong>
              </p>
              {getList().length ? (
                getList().map((m) => (
                  <div style={{ marginTop: "0px" }}>
                    {" "}
                    <Radio
                      {...controlProps(m.id)}
                      sx={{
                        color: brown[700],
                        "&.Mui-checked": {
                          color: brown[700],
                        },
                      }}
                    />{" "}
                    <text style={{ fontSize: "15px" }}>{m.title}</text>
                  </div>
                ))
              ) : (
                <></>
              )}

              <hr />
              {selectedValue == "Social" ? (
                <div>
                  <div></div>
                  {console.log(folderURl , file)}
                  <FacebookShareButton
                    url={folderURl}
                    quote={file?.description}
                    hashtag={""}
                    description={file?.description}
                    className="mr-2"
                  >
                    <FacebookIcon size={52} round={false} />{" "}
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={folderURl}
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
                  <div className="link-here">{selectedValue}</div>
                  <p className="share-link">
                    {findObject(selectedValue) != null
                      ? findObject(selectedValue).link
                      : ""}
                  </p>
                  <button className="copy-link-btn" onClick={onClickLink}>
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

export default ShareFolder;
