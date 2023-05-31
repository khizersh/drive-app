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
import ReplayIcon from "@mui/icons-material/Replay";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { checkUser, postRequest } from "../service/commonService";
import {
  BASE_URL,
  FIND_FOLDER,
  FIND_FOLDER_BY_HOME_PARENT,
  FIND_SUB_FOLDER,
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
  const [isFolder, setIsFolder] = useState(true);
  const [leftOpen, setLeftOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [resources, setResources] = useState([]);
  const toggleSidebar = (event) => {
    setLeftOpen(!leftOpen);
  };

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setIsFolder(data);
    setShow(true);
  };

  const onClick = async (e, item) => {
    try {
      setLoading(true);
      // if (item.folderCount) {
        const data = await postRequest(BASE_URL + FIND_SUB_FOLDER, {
          parentId: item._id,
        });
        setLoading(false);
        if (data) {
          if (data.status == SUCCESS) {
            setResources(data.data);
          }
        }
      // }
      setLoading(false);
      router.push(
        "/folder?parent=" + params.parent + "&" + "folder=" + item._id
      );
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, [leftOpen]);

  const setSidebar = async (email, parentId) => {
    try {
      setLoading(true);
      const data = await postRequest(BASE_URL + FIND_FOLDER_BY_HOME_PARENT, {
        email: email,
        homeParentId: parentId,
        isFolder: true,
      });
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

  const setHomePage = async (email, parentId) => {
    setLoading(true);
    const data = await postRequest(BASE_URL + FIND_FOLDER_BY_HOME_PARENT, {
      email: email,
      homeParentId: parentId,
      isFolder: false,
    });
    setLoading(false);
    if (data) {
      if (data.status == SUCCESS) {
        setResources(data.data);
      }
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

  const reload = () => {
    let user = checkUser();
    if (!user && !params.parent) {
      router.push("/login");
    } else {
      let userLocal = localStorage.getItem("user");
      if (userLocal) {
        var json = JSON.parse(userLocal);
        if (json) {
          setSidebar(json.email, params.parent);
          setHomePage(json.email, params.parent);
        }
      }
    }
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
                <button
                  className="btn-folder mx-2"
                  onClick={() => handleShow(true)}
                >
                  <CreateNewFolderIcon /> Add Folder
                </button>
                <button
                  className="btn-folder"
                  onClick={() => handleShow(false)}
                >
                  <UploadFileIcon /> Add File
                </button>
                <button className="btn-folder mx-2" onClick={() => reload()}>
                  <ReplayIcon /> Reload
                </button>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                {resources.length ? (
                  resources.map((m) => (
                    <div className="col-4">
                      <div className="card shadow">{m.name}</div>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFolder data={isFolder} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FolderLayout;
