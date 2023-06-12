import React, { useEffect, useState, useContext } from "react";
import { postRequest, showError } from "../service/commonService";
import { BASE_URL, FIND_RESOURCE_BY_ID, SUCCESS } from "../service/constants";
import { red } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { MainContext } from "../context/MainContext";
import Col12 from "../components/Col12";
import Col6 from "../components/Col6";

const Collection = () => {
  const [isVideo, setIsVideo] = useState(false);
  const { setLoading, mainState } = useContext(MainContext);
  const [file, setFile] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Internal");
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
          if (!data.data.isFolder) {
            fileData = data.data;

            setIsVideo(false);
            if (data?.mimeType?.includes("image")) {
              setIsVideo(false);
            } else {
              setIsVideo(true);
              setFile(fileData);
            }
          }
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

  function getList() {
    var array = [
      {
        id: "Internal",
        title: "Internal Link",
        link: window.location.origin + "/resource-detail?id=" + file?._id,
      },
      {
        id: "Public",
        title: "Public Link",
        link: file?.file,
      },
      { id: "Social", title: "Social Link" },
    ];
    return array;
  }

  function findObject() {
    return getList().find((m) => m.id === selectedValue);
  }

  function onClickLink() {
    console.log("origin  :: " + window.location.origin);
    if (findObject(selectedValue)) {
      navigator.clipboard.writeText(findObject(selectedValue).link);
    }
  }

  return (
    <>
      <Col12 />
      <Col6 />
    </>
  );
};

export default Collection;
