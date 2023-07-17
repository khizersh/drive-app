import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import {
  getRequest,
  postRequest,
  showError,
  showSuccess,
} from "../../service/commonService";
import {
  BASE_URL,
  DELETE_USER,
  NOT_VERIFIED_USER,
  SUCCESS,
  APPROVE_USER,
  FIND_USER,
  UPDATE_USER,
  ALL_PERMISSIONS,
  GET_ALL,
  FIND_BY_EMAIL,
  UPDATE_PERMISSION,
} from "../../service/constants";
import swal from "sweetalert";
import EditIcon from "@mui/icons-material/Edit";
import ApproveIcon from "@mui/icons-material/DoneOutline";
import PermissionIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Multiselect from "multiselect-react-dropdown";

const Permission = () => {
  const [users, setUsers] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [selectedPermissionList, setSelectedPermissionList] = useState([]);
  const [existingPermission, setExistingPernission] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    contact: "",
    linkedIn: "",
    skypeName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postCode: "",
    country: "",
    summary: "",
    contactName: "",
    purpose: "",
    skills: "",
  });

  useEffect(() => {
    getUSers();
  }, [reload]);

  const getUSers = async () => {
    try {
      const data = await getRequest(BASE_URL + GET_ALL);
      if (data != null) {
        if (data.status == SUCCESS) {
          setUsers(data.data);
        }
      }
    } catch (error) {
      showError();
    }
  };

  const getAndSetPermission = async (userData) => {
    setSelectedUser(userData);
    const array = ALL_PERMISSIONS.map((m) => {
      return { name: m, id: m };
    });
    if (userData) {
      const permssionArray = userData?.permissions?.map((m) => {
        return {
          name: m,
          id: m,
        };
      });
      if (permssionArray) {
        setSelectedPermissionList(permssionArray);
        setExistingPernission(permssionArray);
      }
      setShow(true);
    }
    setPermissionList(array);
  };

  const onClickEdit = async () => {
    try {
      setIsLoading(true);
      const perm = selectedPermissionList.map((m) => m.name);
      let obj = {
        email: selectedUser.email,
        permissions: perm,
      };
        const data = await postRequest(BASE_URL + UPDATE_PERMISSION, obj);
        if (data) {
          if (data.status == SUCCESS) {
            setShow(false);
            showSuccess(data)
            setReload(!reload)
          }else{
            showError(data)
          }
        }
      setIsLoading(false);
    } catch (error) {
      showError();
    }
  };
  const onEditPermission = async (user) => {
    try {
      getAndSetPermission(user);
    } catch (error) {
      showError();
    }
  };

  function onSelect(selectedList, selectedItem) {
    setSelectedPermissionList(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    setSelectedPermissionList(selectedList);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Company</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length
                    ? users.map((m, ind) => (
                        <tr>
                          <th scope="row">{ind + 1}</th>
                          <td>{m.firstName}</td>
                          <td>{m.lastName}</td>
                          <td>{m.email}</td>
                          <td>{m.company}</td>
                          <td>{m.jobTitle}</td>
                          <td>{m.contact}</td>
                          <td>
                            <Button
                              variant="success"
                              onClick={() => onEditPermission(m)}
                            >
                              Permission <PermissionIcon />
                            </Button>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Update Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Multiselect
              options={permissionList} // Options to display in the dropdown
              selectedValues={existingPermission} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />{" "}
          </div>
          <div className="my-2">
            <button
              className={`p-1 text-right login-btn weight-600 font-14 px-3   ${
                isLoading ? "bg-grey" : ""
              }`}
              disabled={isLoading ? true : false}
              onClick={onClickEdit}
            >
              {isLoading ? "Uploading ..." : "Save"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Permission;
