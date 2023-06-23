import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import TableFileListView from "./TableFileListView";
import { postRequest, showError } from "../service/commonService";
import { TailSpin } from "react-loader-spinner";
import {
  ADD_OR_REMOVE_COLLECTION,
  BASE_URL,
  GET_COLLECTION_BY_ID,
  GET_COLLECTION_GROUP,
  SUCCESS,
} from "../service/constants";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import { MainContext } from "../context/MainContext";
import TableFileGridView from "./TableFileGridView";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CollectionTable = ({ list }) => {
  const { mainState, setLoading } = useContext(MainContext);
  const router = useHistory();
  const [viewType, setViewType] = useState("list");
  const [show, setShow] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [resourceId, setSesourceId] = useState("");
  const [collectionUpdated, setCollectionUpdated] = useState(false);
  const [oldCollection, setOldCollection] = useState([]);
  const [rowCount, setRowCount] = useState(10);

  const [collectionList, setCollectionList] = useState([]);
  const [scopeSelected, setScopeSelected] = useState("all");
  const [typeSelected, setTypeSelected] = useState("all");
  const [newCollection, setNewCollection] = useState("");

  function onSelect(selectedList, selectedItem) {
    setOldCollection(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    setOldCollection(selectedList);
  }

  function onHideModal() {
    setShowCollection(false);
    setCollectionUpdated(false);
  }

  function onClickCheckboxAll() {
  }

  const onClick = async (item) => {
    try {
      router.push("/resource-detail?id=" + item?._id);
    } catch (error) {}
  };

  const onClickAddCollection = async () => {
    let userLocal = localStorage.getItem("user");
    setLoading(true);
    if (userLocal) {
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
    setSesourceId(data._id);
    let userLocal = localStorage.getItem("user");
    if (userLocal) {
      setLoading(true);
      var json = JSON.parse(userLocal);
      if (json) {
        try {
          const collecttionData = await postRequest(
            BASE_URL + GET_COLLECTION_GROUP,
            {
              email: json.email,
            }
          );
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
              setShowCollection(true);
            }
          }
        } catch (error) {}

        setLoading(false);
      }
    }
  };

  const handleChangeRow = (event) => {
    setRowCount(event.target.value);
  };

  return (
    <>
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
      <div className="container-fluid border-grey">
        <div className="row bg-yellow border-bottom-black">
          <div className="col-8 d-flex justify-content-start my-1">
            <div className="border-black">
              <Checkbox
                className="mr-5 "
                onClick={(e) => onClickCheckboxAll()}
                size="small"
              />
            </div>
            <div className="border-black">
              <ArrowDropDownIcon className="cursor-pointer" />
            </div>
            <h6 style={{ marginLeft: "10px", paddingTop: "7px" }}>
              My Collections(s)
            </h6>
          </div>
          {/* <div className="dropdown-collection">
          <div className="d-flex justify-content-between">
          <FileDownloadRoundedIcon />
          <text>Download Selected</text>
          </div>
        </div> */}
          <div className="col-4 d-flex justify-content-end my-2">
            <div
              className="border-black px-4"
              onClick={() => setViewType("list")}
            >
              <FormatListBulletedIcon />
            </div>
            <div
              className="border-black px-4"
              onClick={() => setViewType("grid")}
            >
              <GridViewRoundedIcon />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around">
          <div>Title</div>
          <div>Actions</div>
          <div>Type</div>
        </div>
        <div className={`${viewType === "grid" ? "row" : ""}`}>
          {list && list?.length
            ? list.map((m, ind) =>
                rowCount > ind ? (
                  viewType == "list" ? (
                    <TableFileListView
                      data={m.resource}
                      onClick={onClick}
                      viewType={viewType}
                      onOpenPopup={onClickShowCollection}
                      onClickAdd={onClickAddCollection}
                    />
                  ) : (
                    <TableFileGridView
                      data={m.resource}
                      onClick={onClick}
                      viewType={viewType}
                      onOpenPopup={onClickShowCollection}
                      onClickAdd={onClickAddCollection}
                    />
                  )
                ) : (
                  <></>
                )
              )
            : ""}
        </div>
      </div>
      <div className="border-grey">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Row</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={rowCount}
            label="Age"
            onChange={handleChangeRow}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </div>

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

export default CollectionTable;
