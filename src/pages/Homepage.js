import React from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/homepage.css";
import { withRouter } from "react-router";

const Homepage = () => {
  const router = useHistory();
  const onCLickFolder = (data) => {
    console.log("data : ", data);
    router.push("/folder?parent=" + data.id);
  };

  const list = [
    {
      id: "brand-asset",
      title: "Brand Assets",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/Happy_Star_CMYK.PNG",
      onClick: onCLickFolder,
    },
    {
      id: "core-product-photgraphy",
      title: "Core Product Photography",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/CORE%20PRODUCT%20PHOTOGRAPHY.png",
      onClick: onCLickFolder,
    },
    {
      id: "videos",
      title: "Videos",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/GLOBALLY%20APPROVED%20VIDEOS.png",
      onClick: onCLickFolder,
    },
    {
      id: "ltos",
      title: "LTOs",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/LTOs.png",
      onClick: onCLickFolder,
    },
    {
      id: "menu-board-panel",
      title: "Menu Board Panels",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/Happy_Star_CMYK.PNG",
      onClick: onCLickFolder,
    },
    {
      id: "social-media-asset",
      title: "Social Media Assets",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/SOCIAL%20MEDIA%20ASSETS.png",
      onClick: onCLickFolder,
    },
    {
      id: "templates",
      title: "Templates",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/LSM%20Templates.png",
      onClick: onCLickFolder,
    },
    {
      id: "recovery-playbook-assets",
      title: "Recovery Playbook & Assets",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/open.png",
      onClick: onCLickFolder,
    },
    {
      id: "regional-assets",
      title: "Regional Assets",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/INTERNAL%20ASSETS.png",
      onClick: onCLickFolder,
    },
    {
      id: "development",
      title: "Development",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/DEVELOPMENT.png",
      onClick: onCLickFolder,
    },
    {
      id: "packaging",
      title: "Packaging",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/Happy%20Star%20Packaing.png",
      onClick: onCLickFolder,
    },
    {
      id: "reference-document-forms",
      title: "Reference Documents & Forms",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/iconfinder_11_Agreement_report_form_layout_paper_4308068.png",
      onClick: onCLickFolder,
    },
  ];
  return (
    <div>
      <div
        class="row custompageviewcontent"
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
              <input type="text" class="queryPage" id="queryPage" />
              <span
                id="searchPageIcon"
                class="postfix ib-icon icon-button entypo-regular icon-search searchPageIcon"
                title="Search"
              ></span>
            </div>
            <div class="searchModuleContent" style={{ display: "none" }}></div>
          </li>
        </ul>
      </div>

      <div className="row custompageviewcontent htmlpagecontent">
        <div className="brand-theme">
          <div className="container">
            <div className="row links-row">
              {list.length ? (
                list.map((m) => (
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
