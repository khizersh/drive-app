import React, { useState, useEffect, useContext } from "react";
import Drawer from "../components/drawer";
import "../assets/css/layout.css";
import "../assets/css/layout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ArrowRight from "@mui/icons-material/ArrowRight";
import Camera from "@mui/icons-material/Camera";
import Menu from "@mui/icons-material/Menu";
import Tune from "@mui/icons-material/Tune";
import Public from "@mui/icons-material/Public";
import Accordion from "react-bootstrap/Accordion";
import Sidebar from "./Sidebar";
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { checkUser, postRequest } from "../service/commonService";
import {
  BASE_URL,
  FIND_FOLDER,
  FIND_FOLDER_BY_HOME_PARENT,
  FIND__SUB_FOLDER,
  SUCCESS,
} from "../service/constants";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AddFolder from "../pages/AddFolder";
import { MainContext } from "../context/MainContext";
import { TailSpin } from "react-loader-spinner";

const FolderLayout = () => {
  const { mainState, setLoading } = useContext(MainContext);

  const router = useHistory();
  const [show, setShow] = useState(false);
  const [leftOpen, setLeftOpen] = useState(true);
  const [items, setItems] = useState([]);
  const toggleSidebar = (event) => {
    setLeftOpen(!leftOpen);
  };

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClick = async (e, item) => {
    try {
      router.push("/folder?parent=" + params.parent + "&" + "folder=" + item._id);
      if (item.folderCount) {
        const data = await postRequest(BASE_URL + FIND__SUB_FOLDER, {
          parentId: item.id,
        });
        console.log("data : ", data, item);
        if (data) {
          if (data.status == SUCCESS) {
            let tempArray = [];
            tempArray = items;
            await tempArray.map((m) => {
              if (m.id === item.id) {
                let subArray = data.data.map((n) => {
                  return mapDataToSidebar(n);
                });
                m["items"] = subArray;
              }
            });
            if (tempArray.length) {
              setItems(tempArray);
            }
          }
        }
      }
      router.push("/folder?parent=" + params.parent + "&" + "folder=" + item._id);
    } catch (error) {}
  };

  useEffect(() => {
    let user = checkUser();
    if (!user && !params.parent) {
      router.push("/login");
    } else {
      let userLocal = localStorage.getItem("user");
      if (userLocal) {
        var json = JSON.parse(userLocal);
        if (json) {
          setSidebar(json.email, params.parent);
        }
      }
    }
  }, [leftOpen ]);

  const setSidebar = async (email, parentId) => {
    try {
      setLoading(true);
      const data = await postRequest(BASE_URL + FIND_FOLDER_BY_HOME_PARENT, {
        email: email,
        homeParentId: parentId,
      });
      console.log("data : ", data);
      if (data) {
        if (data.status == SUCCESS) {
          renderMenu(data.data);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const mapDataToSidebar = (data) => {
    return {
      id: data._id,
      name: data.name,
      label: data.name,
      description: data.description,
      Icon: Public,
      folderCount: data.folderCount,
      resourceCount: data.resourcesCount,
      onClick: onClick,
    };
  };

  var finalMenu = [];

  const renderMenu = (menu) => {
    while (menu.length > 0) {
      menu.forEach((menuItem) => {
        menuItem.children = [];

        if (!menuItem.parentId) {
          const index = menu.indexOf(menuItem);
          if (index !== -1) {
            menu.splice(index, 1);
          }
          menuItem.opacity = 0;
          menuItem.Icon = Public;
          menuItem.onClick = onClick;
          finalMenu.push(menuItem);
        } else {
          const father = menuItem.parentId;
          menuItem.onClick = onClick;
          menuItem.Icon = Public;

          serachFather(finalMenu, father, menuItem, menu);
        }
      });
    }
    finalMenu.sort(function (a, b) {
      return a.sortingOrder - b.sortingOrder;
    });

    finalMenu.map((sidebar) => {
      sidebar.children.sort(function (a, b) {
        return a.sortingOrder - b.sortingOrder;
      });
    });

    setItems(finalMenu);
  };

  const serachFather = (menuArray, father, menuItem, menu) => {
    menuArray.forEach((menuPainted) => {
      if (menuPainted._id === father) {
        menuItem.opacity = menuPainted.opacity + 1;
        menuPainted.children.push(menuItem);

        const index = menu.indexOf(menuItem);
        if (index !== -1) {
          menu.splice(index, 1);
        }
      } else {
        serachFather(menuPainted.children, father, menuItem, menu);
      }
    });
  };

  return (
    <>
      <div className="">
        <TailSpin
          height="100"
          width="100"
          color="#e7a444"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="loader-div"
          visible={mainState.isLoading}
          // visible={true}
        />
      </div>
      <div id="layout">
        <div id="left" className={leftOpen ? "open" : "closed"}>
          <div className={`sidebar ${leftOpen ? "open" : "closed"}`}>
            <Sidebar items={items} />
          </div>
        </div>

        <div id="main">
          <div className="header">
            <div class="d-flex" id="left" className={leftOpen}>
              <div className="icon" onClick={toggleSidebar}>
                <Menu />
                {/* &equiv; */}
              </div>
              <p class="ms-3 mb-0 menuText"> Resources</p>
            </div>

            <div class="header-bar--flex">
              <div class="_inputContainer_3j3zds">
                <div class="_searchIcon_wt0fza">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                  class="_input_1ogbq7d"
                  placeholder="What are you looking for?"
                  spellcheck="true"
                  value=""
                />
                <span class="_noCancelIcon_cvqqax"></span>
                <div class="_noCancelIcon_cvqqaxww">
                  <div class="_container_1892uua ">
                    <a class="_linkColours_11bsm43">
                      <button
                        class="_iconButton_1i1401z"
                        tabindex="0"
                        type="button"
                      >
                        <span class="material-icons " color="#4a4a4a">
                          {" "}
                          <Tune style={{ color: "#4a4a4a" }} />
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="d-flex justify-content-end mt-2 ">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button className="btn-folder mx-2" onClick={handleShow}>
                  <CreateNewFolderIcon /> Add Folder
                </button>
                <button className="btn-folder">
                  <UploadFileIcon /> Add File
                </button>
              </div>
            </div>
            <h3>Main content</h3>
            <br />
            <p>
              Nam accumsan eleifend metus at imperdiet. Mauris pellentesque
              ipsum nisi, et fringilla leo blandit sed. In tempor, leo sit amet
              fringilla imperdiet, ipsum enim sagittis sem, non molestie nisi
              purus consequat sapien. Proin at velit id elit tincidunt iaculis
              ac ac libero. Vivamus vitae tincidunt ex. Duis sit amet lacinia
              massa. Quisque lobortis tincidunt metus ut commodo. Sed euismod
              quam gravida condimentum commodo.
            </p>
            <br />
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFolder />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FolderLayout;
