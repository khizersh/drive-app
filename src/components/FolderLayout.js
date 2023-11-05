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
import HomeIcon from "@mui/icons-material/Home";
import Sidebar from "./Sidebar";
import SidebarSearch from "./SidebarSearch";
import FolderIcon from "@mui/icons-material/Folder";
import GridViewIcon from "@mui/icons-material/GridView";
import ShareIcon from "@mui/icons-material/Share";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import Accordion from "react-bootstrap/Accordion";
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

import {
  checkPermission,
  checkUser,
  postRequest,
  showError,
  showSuccess,
} from "../service/commonService";
import Multiselect from "multiselect-react-dropdown";
import {
  ADD_OR_REMOVE_COLLECTION,
  BASE_URL,
  FIND_FOLDER,
  FIND_FOLDER_BY_HOME_PARENT,
  FIND_FOLDER_FOR_SIDEBAR,
  FIND_RESOURCE_BY_ID,
  FIND_SUB_FOLDER,
  GET_COLLECTION,
  GET_COLLECTION_BY_ID,
  GET_COLLECTION_GROUP,
  GET_RESOURCSES_BY_KEYWORD,
  GET_RESOURCSES_BY_KEYWORD_ALL,
  HOME_FOLDER_LIST,
  MY_SECRET_KEY,
  SUCCESS,
  VIEW_RESOURCE_PERMISSION,
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
import FilterComponent from "./FilterComponent";
import HomeFolderCard from "./HomeFolderCard";

const FolderLayout = () => {
  const { mainState, setLoading } = useContext(MainContext);

  const router = useHistory();
  const [show, setShow] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [view, setView] = useState("grid");
  const [showFolder, setShowFolder] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resourceId, setSesourceId] = useState("");
  const [sort, setSort] = useState("asc");
  const [isFolder, setIsFolder] = useState(true);
  const [leftOpen, setLeftOpen] = useState(true);
  const [collectionUpdated, setCollectionUpdated] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [items, setItems] = useState([]);
  const [oldCollection, setOldCollection] = useState([]);
  const [breadcrumb, setBreadcrumbs] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [searchItemSidebar, setSearchItemSidebar] = useState([]);
  const [folderKeyword, setFolderKeyword] = useState("");
  const [fileKeyword, setFileKeyword] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [resources, setResources] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [scopeSelected, setScopeSelected] = useState("all");
  const [typeSelected, setTypeSelected] = useState("all");
  const [newCollection, setNewCollection] = useState("");

  const toggleSidebar = (event) => {
    setLeftOpen(!leftOpen);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setIsFolder(data);
    setShow(true);
  };

  const onClickBreadCrum = (data) => {};

  useEffect(() => {
    const perm = checkPermission(VIEW_RESOURCE_PERMISSION);
    if (perm) {
      setBreadCrumbFunc();
  
      onClickSearch(true);
    }
  }, [params.folder]);

  useEffect(() => {
    const perm = checkPermission(VIEW_RESOURCE_PERMISSION);
    if (perm) {
      reload();
    }
  }, []);

  const onClick = async (e, item) => {
    try {
      setLoading(true);
      setCurrentFolder(item);

      const data = await postRequest(BASE_URL + FIND_SUB_FOLDER, {
        parentId: item._id,
      });

      setLoading(false);
      if (data) {
        if (data.status == SUCCESS) {
          const folderExist = data.data.find((m) => m.isFolder === true);
          if (!folderExist) {
            setShowFolder(false);
          }
          setResources([]);
          setResources(data.data);
        }
      }
      // }
 
      setLoading(false);
      router.push(
        "/folder?parent=" +
          params.parent +
          "&" +
          "folder=" +
          item._id +
          "&u=" +
          params.u
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

  const setSidebar = async (email, parentId) => {
    try {
      setItems([]);
      setLoading(true);
      const data = await postRequest(BASE_URL + FIND_FOLDER_FOR_SIDEBAR, {
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
        if (!folderCount) {
          setShowFolder(false);
        }
        setActiveFolder(obj);
        let dataArray  = []
        dataArray = data.data;
        setResources(dataArray);
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
          const perm = checkPermission(VIEW_RESOURCE_PERMISSION);
          if (perm) {
            setSidebar(json.email, params.parent);
            let email = atob(params.u);
            if (email) {
              setHomePage(email, params.parent);
            }
          }
        }
      }
    }
  };

  const onChangeSearch = (e) => {
    let value = e.target.value;
    setFileKeyword(value);
  };
  const onClickSearch = async (isSearch) => {
    // try {
    //   if(params.keyword && searchOpen){
    //     let url = window.location.origin + "/folder?keyword=" + fileKeyword;
    //     window.location.href = url;
    //   }else{
    //     setLoading(true);
    //     let userLocal = localStorage.getItem("user");
    //     if (userLocal) {
    //       var json = JSON.parse(userLocal);
    //       if (json) {
    //         if (isSearch && params.keyword) {
    //           // ::::::::::::::::: SEARCH LAYOUT ::::::::::::::::::::::::::::
    //           setSearchOpen(true);
    //           setShowFolder(false);
    //           let obj = {
    //             email: json.email,
    //             keyword: params.keyword,
    //           };
    //           const data = await postRequest(
    //             BASE_URL + GET_RESOURCSES_BY_KEYWORD_ALL,
    //             obj
    //           );
    //           if (data) {
    //             if (data.status == SUCCESS) {
    //               let array = [];
    //               data.data.map((file) => {
    //                 if (file.isFolder === false) {
    //                   array.push(file);
    //                 }
    //               });
    //               setResultCount(array.length);
    //               setResources(array);
    //               // setFilteredResources(array)
    //             }
    //           }
    //         } else if(fileKeyword){
    //           // :::::::::::::::::::::::: NORMAL LAYOUT ::::::::::::::::
    //           setSearchOpen(true);
    //           setShowFolder(false);
    //           let obj = {
    //             homeParentId: params.parent,
    //             email: json.email,
    //             keyword: fileKeyword,
    //           };
    //           const data = await postRequest(
    //             BASE_URL + GET_RESOURCSES_BY_KEYWORD,
    //             obj
    //           );
    //           if (data) {
    //             if (data.status == SUCCESS) {
    //               let array = [];
    //               data.data.map((file) => {
    //                 if (file.isFolder === false) {
    //                   array.push(file);
    //                 }
    //               });
    //               setResultCount(array.length);
    //               // setFilteredResources(array)
    //               setResources(array);
    //             }
    //           }
    //         }
  
    //         // console.log("array :: ", array);
    //         setLoading(false);
    //       }
    //     }
    //   }
     
    // } catch (error) {
    //   setLoading(false);
    // }
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

  function compareByDate(a, b) {
    if (a.createdDate < b.createdDate) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
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
  const handleSortDate = () => {
    let res = resources;
    res.sort(compareByDate);
    setResources(res);
  };

  const onChangeSearchSidebar = (e) => {
    let value = e.target.value;
    setFolderKeyword(value);
  };

  const getParentFolders = async () => {
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
            if (m.isFolder && m.name) {
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
            if (m.isFolder && m.name) {
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

  function onClickScope(data) {
    setScopeSelected(data.type);
    var filteredArray = [];
    if (data.type == "all") {
      if (typeSelected == "all") {
        filteredArray = [];
      } else {
        filteredArray = resources.filter((m) => (m.mimeType = typeSelected));
      }
    } else {
      if (typeSelected != "all") {
        filteredArray = resources.filter(
          (m) => m.mimeType && m.mimeType.includes(typeSelected) && m[data.type]
        );
      } else {
        filteredArray = resources.filter((m) => m[data.type]);
      }
    }
    setFilteredResources(filteredArray);
  }

  function onClickType(data) {
    setTypeSelected(data.type);
    var filteredArray = [];
    if (data.type == "all") {
      if (scopeSelected == "all") {
        filteredArray = [];
      } else {
        filteredArray = resources.filter((m) => m[scopeSelected]);
      }
    } else {
      if (scopeSelected != "all") {
        filteredArray = resources.filter(
          (m) =>
            m.mimeType && m.mimeType.includes(data.type) && m[scopeSelected]
        );
      } else {
        console.log("specific condition");
        filteredArray = resources.filter(
          (m) => m.mimeType && m.mimeType.includes(data.type)
        );
      }
    }
    setFilteredResources(filteredArray);
  }

  function onHideModal() {
    setShowCollection(false);
    setCollectionUpdated(false);
  }

  const onClickAddCollection = async () => {
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      setLoading(true);
      var json = JSON.parse(userLocal);
      if (json) {
        const array = oldCollection.map((m) => m.name);
        if (newCollection) {
          array.push(newCollection);
        }
        let req = {
          email: json.email,
          resourceId: resourceId,
          group: array,
        };
        const data = await postRequest(
          BASE_URL + ADD_OR_REMOVE_COLLECTION,
          req
        );
        if (data) {
          if (data.status == SUCCESS) {
            setCollectionUpdated(true);
          } else {
            showError(data);
          }
        }
      }
      setLoading(false);
    }
  };

  const onClickShowCollection = async (data) => {
    setLoading(true);
    setSesourceId(data._id);
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        const collecttionData = await postRequest(
          BASE_URL + GET_COLLECTION_GROUP,
          {
            email: json.email,
          }
        );
        console.log("collecttionData :: ", collecttionData);
        if (collecttionData) {
          const groups = collecttionData.data.map((m) => {
            return {
              name: m.group,
              id: m.group,
            };
          });
          setCollectionList(groups);
        }
        const resp = await postRequest(BASE_URL + GET_COLLECTION_BY_ID, {
          resourceId: data._id,
        });
        if (resp) {
          if (resp.status == SUCCESS) {
            const array = resp.data.group.map((m) => {
              return { name: m, id: m };
            });
            setOldCollection(array);
          }
          setShowCollection(true);
        }
        setLoading(false);
        console.log("collection data :: ", resp);
      }
    }
  };

  function onSelect(selectedList, selectedItem) {
    console.log(selectedList, " ", selectedItem);
    setOldCollection(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    console.log(selectedList, " ", removedItem);
    setOldCollection(selectedList);
  }
  function onClickHomeFolderList(data) {}

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
                style={{ position: "relative", left: "0", width: "100%" }}
              >
                {isFilter ? (
                  <div className="d-flex justify-content-between w-filter">
                    <div className="filter-text">Filtering Options</div>
                    <div
                      className="cursor-pointer"
                      onClick={() => setIsFilter(false)}
                    >
                      {" "}
                      <ClearIcon />
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            </div>

            {!searchOpen && isFilter ? (
              <div className="">
                <FilterComponent
                  onClickScope={onClickScope}
                  onClickType={onClickType}
                />
              </div>

            ) : searchItemSidebar.length ? (
              <SidebarSearch items={searchItemSidebar} />
            ) : (
              <Sidebar items={items} />
            )}

            {searchOpen && params.keyword ? (
              HOME_FOLDER_LIST(onClickHomeFolderList).map((m) => (
                <HomeFolderCard item={m} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <div id="main">
          <div className="header">
            <div
              className={`d-flex justify-content-between ${leftOpen} `}
              id="left"
            ></div>

            <div className="d-flex sideIcon">
              <div className="icon" onClick={toggleSidebar}>
                <Menu style={{ color: "#6a431a" }} />
              </div>
              <div className="folder-name mx-2">{currentFolder?.name}</div>
            </div>

            <div class="header-bar--flex">
              <div class="_inputContainer_3j3zds">
                <div class="_searchIcon_wt0fza">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                  class="_input_1ogbq7d"
                  id="searchInput"
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
                          // onClick={onClickSearch}
                        >
                          {" "}
                          {/* <SendIcon style={{ color: "#4a4a4a" }} /> */}
                          {fileKeyword != "" ? (
                            <SendIcon
                              style={{ color: "#4a4a4a" }}
                              onClick={() => onClickSearch()}
                            />
                          ) : (
                            <Tune
                              style={{ color: "#4a4a4a" }}
                              onClick={() => setIsFilter(true)}
                            />
                          )}
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
                      <HomeIcon style={{ color: "#6a431a" }} />
                    </Link>
                    {breadcrumb}
                  </Breadcrumbs>
                </Stack>
              </div>
              <div className="col-12 col-lg-5 ">
                <div className="d-flex justify-content-between">
                  {!searchOpen && activeFolder?.folderCount ? (
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
                        <FolderIcon style={{ color: "#6a431a" }} />
                        <text style={{ paddingTop: "6px" , color: "#6a431a"}}>
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

                  {!searchOpen && activeFolder?.resourcesCount ? (
                    <div className="">
                      <button
                        className="folder-btn"
                        onClick={() => setShowFolder(false)}
                        style={{ background: showFolder ? "white" : "#e0d7d7" }}
                      >
                        <FileIcon style={{ color: "#6a431a" }} />
                        <text style={{ paddingTop: "6px" , color: "#6a431a" }} >
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

                  {searchOpen ? (
                    <div className="">
                      <button
                        className="folder-btn"
                        style={{ background: "#e0d7d7" }}
                      >
                        <FileIcon style={{ color: "" }} />
                        <text style={{ paddingTop: "6px" , color: "#6a431a"}}>
                          Results{" "}
                          <span className="notification">
                            <strong>{resultCount}</strong>{" "}
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
                            color: "#6a431a",
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
                        <a
                          className="dropdown-item mr-2"
                          href="#nogo"
                          onClick={handleSortDate}
                        >
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
                            color: view == "list" ? "#6a431a" : "",
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
                            color: view == "grid" ? "#6a431a" : "",
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
                {filteredResources.length ? (
                  filteredResources.map((m) =>
                    m.isFolder
                      ? showFolder && (
                          <Folder
                            data={m}
                            onClick={onClick}
                            viewType={view}
                            onOpenPopup={onClickShowCollection}
                            onClickAdd={onClickAddCollection}
                          />
                        )
                      : !showFolder && (
                          <File
                            data={m}
                            onClick={onClick}
                            viewType={view}
                            onOpenPopup={onClickShowCollection}
                            onClickAdd={onClickAddCollection}
                          ></File>
                        )
                  )
                ) : resources.length ? (
                  resources.map((m) =>
                    m.isFolder
                      ? showFolder && (
                          <Folder
                            data={m}
                            onClick={onClick}
                            viewType={view}
                            onOpenPopup={onClickShowCollection}
                            onClickAdd={onClickAddCollection}
                          />
                        )
                      : !showFolder && (
                          <File
                            data={m}
                            onClick={onClick}
                            viewType={view}
                            onOpenPopup={onClickShowCollection}
                            onClickAdd={onClickAddCollection}
                          ></File>
                        )
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
          <Modal.Title>Add {isFolder ? "Folder" : "File"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddFolder data={isFolder} />
        </Modal.Body>
      </Modal>
      <Modal show={showCollection} onHide={onHideModal}>
        {collectionUpdated ? (
          <>
            {" "}
            <Modal.Header closeButton>
              <strong>Manage Collection(s)</strong>
            </Modal.Header>
            <Modal.Body>
              <p>Collection(s) updated successfully.</p>
              <div className="mt-3">
                <button
                  className="copy-link-btn "
                  style={{ marginRight: "10px", width: "50%" }}
                  onClick={() => router.push("/my-collection")}
                >
                  <strong>GO TO MY COLLECTION(S)</strong>
                </button>
                <button className="copy-link-btn" onClick={() => onHideModal()}>
                  <strong>BACK</strong>
                </button>
              </div>
            </Modal.Body>
          </>
        ) : (
          <>
            {" "}
            <Modal.Header closeButton>
              <strong>Add/Remove from My Collection(s)</strong>
            </Modal.Header>
            <Modal.Body>
              <div>
                <text>
                  <strong> New Collection: </strong>
                </text>
                <input
                  name="lastName"
                  maxlength="50"
                  required="required"
                  placeholder="Type a new collection name"
                  type="text"
                  onChange={(e) => setNewCollection(e.target.value)}
                  value={newCollection}
                />
              </div>
              <div>
                <text>
                  <strong> My Collection(s): </strong>
                </text>
                <Multiselect
                  options={collectionList} // Options to display in the dropdown
                  selectedValues={oldCollection} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                />
              </div>
              <div className="mt-3">
                <button
                  className="copy-link-btn "
                  style={{ marginRight: "10px" }}
                  onClick={onClickAddCollection}
                >
                  <strong>Save</strong>
                </button>
                <button
                  className="copy-link-btn"
                  onClick={() => setShowCollection(false)}
                >
                  <strong>Cancel</strong>
                </button>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default FolderLayout;
