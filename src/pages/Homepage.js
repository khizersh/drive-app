import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/homepage.css";
import { withRouter } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { HOME_FOLDER_LIST, MY_SECRET_KEY } from "../service/constants";
import CryptoJS from "crypto-js";

const Homepage = () => {
  const router = useHistory();
  const [fileKeyword, setFileKeyword] = useState("");

  const onCLickFolder = (data) => {
    let email = getEncryptedEmail();
    router.push("/folder?parent=" + data.id + "&u=" + email);
  };

  function getEncryptedEmail() {
    let email = null;

    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        let str = json.email;
        email = btoa(str);
        
      }
    }

    return email;
  }

  const onClickSearch = async () => {
    try {
      let userLocal = localStorage.getItem("user");
      if (userLocal) {
        var json = JSON.parse(userLocal);
        if (json) {
          if (fileKeyword) {
            router.push("folder?keyword=" + fileKeyword);
          }
        }
      }
    } catch (error) {}
  };

  return (
    <div>
      <div
        class="custompageviewcontent"
        data-uuid="d0d2f0949d26d15db6f852c0c1cf9594"
      >
        <ul class="search">
          <li>
            <div class="searchTitle title">
              <div class="searchContainer">
                <div class="titleContainer">
                  Welcome to the CKE Digital Library
                </div>
              </div>
            </div>
            <div class="searchInput">
              <input
                type="text"
                class="queryPage"
                id="queryPage"
                onChange={(e) => setFileKeyword(e.target.value)}
              />
              <span
                id="searchPageIcon"
                class="postfix ib-icon icon-button entypo-regular icon-search searchPageIcon"
                title="Search"
              >
                <SearchIcon
                  onClick={() => onClickSearch()}
                  style={{
                    color: "white",
                    paddingTop: "8px",
                    fontSize: "35px",
                  }}
                />
              </span>
            </div>
            <div class="searchModuleContent" style={{ display: "none" }}></div>
          </li>
        </ul>
      </div>

      <div className="custompageviewcontent htmlpagecontent">
        <div className="brand-theme">
          <div className="container">
            <div className="row links-row">
              {HOME_FOLDER_LIST(onCLickFolder).length ? (
                HOME_FOLDER_LIST(onCLickFolder).map((m) => (
                  <div
                    className="col-md-3 col-sm-6 lr-col"
                    onClick={() => onCLickFolder(m)}
                  >
                    <a className="lr-link active" href="#" target="_parent">
                      <span className="lr-title">{m.title}</span>
                      <span className="img-holder">
                        <img alt="" src={m.image} />
                      </span>
                    </a>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Homepage);
