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
import HomeIcon from "@mui/icons-material/Home";
import Sidebar from "./Sidebar";
import SidebarSearch from "./SidebarSearch";
import FolderIcon from "@mui/icons-material/Folder";
import GridViewIcon from "@mui/icons-material/GridView";
import ShareIcon from "@mui/icons-material/Share";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SettingsIcon from "@material-ui/icons/Settings";
import FileIcon from "@mui/icons-material/InsertDriveFile";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ReplayIcon from "@mui/icons-material/Replay";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import ListView from "@mui/icons-material/ViewStreamOutlined";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { checkUser, postRequest } from "../service/commonService";
import {
  BASE_URL,
  FIND_FOLDER,
  FIND_FOLDER_BY_HOME_PARENT,
  FIND_RESOURCE_BY_ID,
  FIND_SUB_FOLDER,
  GET_RESOURCSES_BY_KEYWORD,
  SUCCESS,
} from "../service/constants";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AddFolder from "../pages/AddFolder";
import { MainContext } from "../context/MainContext";
import { TailSpin } from "react-loader-spinner";
import Folder from "./Folder";
import File from "./File";
import SortIcon from "@mui/icons-material/Sort";
import Calender from "@mui/icons-material/EventAvailable";
import PageviewIcon from "@mui/icons-material/Pageview";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";

const FolderLayout = () => {
  const { mainState, setLoading } = useContext(MainContext);

  const router = useHistory();
  const [show, setShow] = useState(false);
  const [view, setView] = useState("grid");
  const [showFolder, setShowFolder] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("asc");
  const [isFolder, setIsFolder] = useState(true);
  const [leftOpen, setLeftOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [breadcrumb, setBreadcrumbs] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [searchItemSidebar, setSearchItemSidebar] = useState([]);
  const [folderKeyword, setFolderKeyword] = useState("");
  const [fileKeyword, setFileKeyword] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);

  const [resources, setResources] = useState([]);
  const toggleSidebar = (event) => {
    setLeftOpen(!leftOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setIsFolder(data);
    setShow(true);
  };

  const onClickBreadCrum = (data) => {
    console.log("data crum :: ", data);
  };

  useEffect(() => {
    setBreadCrumbFunc();
  }, [params.folder]);

  const onClick = async (e, item) => {
    try {
      console.log("clickkkkk ::: ", item);
      setLoading(true);
      setCurrentFolder(item);

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

  const setBreadCrumbFunc = async () => {
    try {
      if (params.folder) {
        setLoading(true);
        const data = await postRequest(BASE_URL + FIND_RESOURCE_BY_ID, {
          id: params.folder,
        });
        if (data) {
          if (data.status == SUCCESS) {
            setLoading(false);
            setActiveFolder(data.data);
            let folderArray = [];
            folderArray = data.data.folderPath?.map((m) => {
              return {
                name: m.name,
                id: m.id,
                href:
                  "/folder?parent=" + params.parent + "&" + "folder=" + m.id,
                onClick: onClickBreadCrum,
              };
            });
            if (folderArray.length) {
              let arrayy = folderArray.map((bread, index) =>
                index == folderArray.length - 1 ? (
                  <Typography key={index} color="text.primary">
                    {bread.name}
                  </Typography>
                ) : (
                  <Link
                    underline="hover"
                    key={index}
                    color="inherit"
                    href={bread.href}
                    // onClick={bread.onClick}
                  >
                    {bread.name}
                  </Link>
                )
              );
              setBreadcrumbs(arrayy);
            }
          }
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const setSidebar = async (email, parentId) => {
    try {
      setItems([]);
      setLoading(true);
      const data = await postRequest(BASE_URL + FIND_FOLDER_BY_HOME_PARENT, {
        email: email,
        homeParentId: parentId,
        isFolder: true,
      });
      if (data) {
        if (data.status == SUCCESS) {
          const itemArray = await renderMenu(data.data);
          setItems(itemArray);
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
    const parentIdContain = params.folder ? true : false;
    var data = null;

    if (parentIdContain) {
      data = await postRequest(BASE_URL + FIND_SUB_FOLDER, {
        parentId: params.folder,
      });
    } else {
      data = await postRequest(BASE_URL + FIND_FOLDER_BY_HOME_PARENT, {
        email: email,
        homeParentId: parentId,
        isFolder: false,
      });
    }
    setLoading(false);
    if (data) {
      if (data.status == SUCCESS) {
        const fileCount = data.data.filter((m) => m.isFolder == false).length;
        const folderCount = data.data.length - fileCount;
        let obj = {
          resourcesCount: fileCount,
          folderCount: folderCount,
        };
        setActiveFolder(obj);
        setResources(data.data);
      }
    }
  };

  var finalMenu = [];

  const renderMenu = async (menu) => {
    try {
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
        return a.name - b.name;
      });

      finalMenu.map((sidebar) => {
        sidebar.children.sort(function (a, b) {
          return a.name - b.name;
        });
      });

      return finalMenu;
    } catch (error) {
      console.log("error : ", error);
    }
  };

  var array = [];
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

  const onChangeSearch = (e) => {
    let value = e.target.value;
    setFileKeyword(value);
  };
  const onClickSearch = async () => {
    try {
      setLoading(true);
      let userLocal = localStorage.getItem("user");
      if (userLocal) {
        var json = JSON.parse(userLocal);
        if (json) {
          let obj = {
            homeParentId: params.parent,
            email: json.email,
            keyword: fileKeyword,
          };
          const data = await postRequest(
            BASE_URL + GET_RESOURCSES_BY_KEYWORD,
            obj
          );
          if (data) {
            if (data.status == SUCCESS) {
              let array = [];
              data.data.map((file) => {
                if (file.isFolder === false) {
                  array.push(file);
                }
              });
              setResources(array);
            }
          }

          console.log("array :: ", array);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  function compareNameAsc(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  function compareNameDesc(a, b) {
    if (a.name < b.name) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  }

  const handleSortAlphabetical = () => {
    let res = resources;
    if (sort == "asc") {
      setSort("desc");
      res.sort(compareNameDesc);
      setResources(res);
    } else {
      res.sort(compareNameAsc);
      setSort("asc");
      setResources(res);
    }
  };

  const onChangeSearchSidebar = (e) => {
    let value = e.target.value;
    setFolderKeyword(value);
  };

  const onClickSidebarSearc = async () => {
    try {
      setLoading(true);
      let userLocal = localStorage.getItem("user");
      if (userLocal) {
        var json = JSON.parse(userLocal);
        if (json) {
          let obj = {
            homeParentId: params.parent,
            email: json.email,
            keyword: folderKeyword,
          };
          const data = await postRequest(
            BASE_URL + GET_RESOURCSES_BY_KEYWORD,
            obj
          );

          const array = data.data.map((m) => {
            if (m.isFolder) {
              return {
                ...m,
                onClick: onClick,
                Icon: Public,
              };
            }
          });
          setSearchItemSidebar(array);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  function resetSidebar() {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        setFolderKeyword("");
        setSearchItemSidebar([]);
        setSidebar(json.email, params.parent);
      }
    }
  }
  function resetMainMenu() {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        setFileKeyword("");
        setSearchItem([]);
        setHomePage(json.email, params.parent);
      }
    }
  }

  const menuClass = `dropdown-menu${sortOpen ? " show" : ""}`;
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
            <div className="w-100">
              <div
                class="header-bar--flex"
                style={{ position: "relative", left: "-50%" }}
              >
                <div class="_inputContainer_3j3zds">
                  <div class="_searchIcon_wt0fza">
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{}} />
                  </div>
                  <input
                    class="_input_1ogbq7d"
                    placeholder="Search Folder(s)"
                    spellcheck="true"
                    value={folderKeyword}
                    onChange={(e) => onChangeSearchSidebar(e)}
                  />
                  {folderKeyword ? (
                    <span className="cursor-pointer" onClick={resetSidebar}>
                      <ClearIcon />
                    </span>
                  ) : (
                    <></>
                  )}
                  <span class="_noCancelIcon_cvqqax"></span>
                  <div class="_noCancelIcon_cvqqaxww">
                    <div class="_container_1892uua ">
                      <a class="_linkColours_11bsm43">
                        <button
                          class="_iconButton_1i1401z"
                          tabindex="0"
                          type="button"
                        >
                          <span
                            class="material-icons "
                            color="#4a4a4a"
                            onClick={onClickSidebarSearc}
                          >
                            {" "}
                            <SendIcon style={{ color: "#4a4a4a" }} />
                          </span>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {searchItemSidebar.length ? (
              <SidebarSearch items={searchItemSidebar} />
            ) : (
              <Sidebar items={items} />
            )}
          </div>
        </div>

        <div id="main">
          <div className="header">
            <div
              className={`d-flex justify-content-between ${leftOpen} `}
              id="left"
            >
              <div className="icon" onClick={toggleSidebar}>
                <Menu style={{ color: "rgb(200, 16, 46)" }} />
              </div>
              <div className="folder-name">{currentFolder?.name}</div>
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
                  value={fileKeyword}
                  onChange={(e) => onChangeSearch(e)}
                />
                {fileKeyword ? (
                  <span className="cursor-pointer" onClick={resetMainMenu}>
                    <ClearIcon />
                  </span>
                ) : (
                  <></>
                )}
                <span class="_noCancelIcon_cvqqax"></span>
                <div class="_noCancelIcon_cvqqaxww">
                  <div class="_container_1892uua ">
                    <a class="_linkColours_11bsm43">
                      <button
                        class="_iconButton_1i1401z"
                        tabindex="0"
                        type="button"
                      >
                        <span
                          class="material-icons "
                          color="#4a4a4a"
                          onClick={onClickSearch}
                        >
                          {" "}
                          <SendIcon style={{ color: "#4a4a4a" }} />
                          {/* <Tune style={{ color: "#4a4a4a" }} /> */}
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid sortingDiv">
            <div className="row ">
              <div className="col-12 col-lg-7">
                {" "}
                <Stack spacing={2}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                  >
                    <Link
                      underline="hover"
                      color="inherit"
                      href={"/folder?parent=" + params.parent}
                    >
                      <HomeIcon style={{ color: "rgb(200, 16, 46)" }} />
                    </Link>
                    {breadcrumb}
                  </Breadcrumbs>
                </Stack>
              </div>
              <div className="col-12 col-lg-5 ">
                <div className="d-flex justify-content-between">
                  {activeFolder?.folderCount ? (
                    <div className="">
                      <button
                        className="folder-btn"
                        onClick={() => setShowFolder(true)}
                        style={{
                          background: showFolder
                            ? "#e0d7d7"
                            : "rgb(249, 249, 249)",
                        }}
                      >
                        <FolderIcon />
                        <text style={{ paddingTop: "6px" }}>
                          Folders{" "}
                          <span className="notification">
                            <strong>{activeFolder.folderCount}</strong>{" "}
                          </span>
                        </text>
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                  {activeFolder?.resourcesCount ? (
                    <div className="">
                      <button
                        className="folder-btn"
                        onClick={() => setShowFolder(false)}
                        style={{ background: showFolder ? "white" : "#e0d7d7" }}
                      >
                        <FileIcon style={{ color: "" }} />
                        <text style={{ paddingTop: "6px" }}>
                          Resources{" "}
                          <span className="notification">
                            <strong>{activeFolder.resourcesCount}</strong>{" "}
                          </span>
                        </text>
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="ml-3">
                    <div
                      className="cursor-pointer"
                      onMouseLeave={() => setSortOpen(false)}
                      onMouseEnter={() => setSortOpen(true)}
                    >
                      <div className="ml-2 ">
                        <SortIcon
                          style={{
                            color: "rgb(200, 16, 46)",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                      <div
                        className={menuClass}
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          className="dropdown-item mr-2"
                          onClick={handleSortAlphabetical}
                        >
                          <SortByAlphaIcon /> Alphabetical
                        </a>
                        <a className="dropdown-item mr-2" href="#nogo">
                          <Calender /> Date Created
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="cursor-pointer">
                      <span className="ml-3" onClick={() => setView("list")}>
                        <ListView
                          style={{
                            color: view == "list" ? "rgb(200, 16, 46)" : "",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="cursor-pointer">
                      <span className="ml-3" onClick={() => setView("grid")}>
                        <GridViewIcon
                          style={{
                            color: view == "grid" ? "rgb(200, 16, 46)" : "",
                          }}
                        />
                      </span>
                    </div>
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
              <div className="row folderRow">
                {resources.length ? (
                  resources.map((m) =>
                    m.isFolder
                      ? showFolder && <Folder data={m} onClick={onClick} />
                      : !showFolder && <File data={m} onClick={onClick}></File>
                  )
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
