import React, { useEffect, useState, useContext } from "react";
import { postRequest, showError } from "../service/commonService";
import {
  BASE_URL,
  FIND_RESOURCE_BY_ID,
  GET_ALL_BY_EMAIL,
  GET_COLLECTION,
  SUCCESS,
} from "../service/constants";
import { red } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { MainContext } from "../context/MainContext";
import Col12 from "../components/Col12";
import Col6 from "../components/Col6";
import Chip from "@mui/material/Chip";
import Badge from "react-bootstrap/Badge";
import Stack from "@mui/material/Stack";
import CollectionTable from "../components/CollectionTable";

const Collection = () => {
  const [isVideo, setIsVideo] = useState(false);
  const { setLoading, mainState } = useContext(MainContext);
  const [json, setJson] = useState(null);
  const [selectedPill, setSelectedPill] = useState("");
  const [pills, setPills] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Internal");
  const [copyText, setCopyText] = useState("Copy Link");

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  useEffect(async () => {
    findData();
  }, []);

  const findData = async () => {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        setLoading(true);
        const data = await postRequest(BASE_URL + GET_COLLECTION, {
          email: json.email,
        });

        if (data) {
          if (data.status == SUCCESS) {
            const pills = Object.keys(data.data);
            setPills(pills);
            setJson(data.data);
            setLoading(false);
          } else {
            showError(data.data);
          }
        } else {
          showError();
        }
        setLoading(false);
      }
    }
  };

  const onClickPill = (data) => {
    setSelectedPill(data);
    console.log("json[data] :: ", json[data]);
    setFiles(json[data]);
  };
  const onClickAll = async () => {
    setSelectedPill("all");
    try {
      let userLocal = localStorage.getItem("user");
      if (userLocal) {
        var json = JSON.parse(userLocal);
        if (json) {
          const data = await postRequest(BASE_URL + GET_ALL_BY_EMAIL, {
            email: json.email,
          });
          if (data) {
            if (data.status == SUCCESS) {
              setFiles(data.data);
            }
          }
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="container-fluid">
        <h5 className="text-yellow mt-2">My Collection(s)</h5>
        <hr />
        <p className="weight-400">My Collections</p>

        <div className="row ">
          <div className="col-12 d-flex ">
            {/* <p className="pill">Pill one</p> */}
            <Badge
              bg="light"
              pill
              text="dark"
              onClick={() => onClickAll()}
              className={`px-3 mx-2 pill ${
                selectedPill == "all" ? "selected-pill" : ""
              }`}
            >
              All My Collections(s)
            </Badge>
            {pills.length ? (
              pills.map((pill) => (
                <Badge
                  bg="light"
                  pill
                  text="dark"
                  onClick={() => onClickPill(pill)}
                  className={`px-3 mx-2 pill ${
                    selectedPill == pill ? "selected-pill" : ""
                  }`}
                >
                  {pill}
                </Badge>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="container-fluid">
            <CollectionTable list={files} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
