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
} from "../../service/constants";
import swal from "sweetalert";
import EditIcon from "@mui/icons-material/Edit";
import ApproveIcon from "@mui/icons-material/DoneOutline";
import PermissionIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Multiselect from "multiselect-react-dropdown";
import AddUserModal from "../../components/AddUserModal";

const User = () => {
  const [users, setUsers] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [selectedPermissionList, setSelectedPermissionList] = useState([]);
  const [ePermission, setEPernission] = useState([]);
  const [selected, setSelected] = useState("CA");
  const [show, setShow] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showPermission, setShowPermission] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseAddUser = () => setShowAddUser(false);
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
    getAndSetPermission();
  }, []);

  const getUSers = async () => {
    try {
      const data = await getRequest(BASE_URL + NOT_VERIFIED_USER);
      if (data != null) {
        if (data.status == SUCCESS) {
          setUsers(data.data);
        }
      }
    } catch (error) {
      showError();
    }
  };

  const getAndSetPermission = () => {
    const array = ALL_PERMISSIONS.map((m) => {
      return { name: m, id: m };
    });
    setPermissionList(array);
  };
  const verifyUser = async (email) => {
    try {
      const data = await postRequest(BASE_URL + APPROVE_USER, { email });
      if (data) {
        if (data.status == SUCCESS) {
          showSuccess(data);
        } else {
          showError(data);
        }
      }
    } catch (error) {
      showError();
    }
  };
  const onEdit = async (email) => {
    try {
      const data = await postRequest(BASE_URL + FIND_USER, { email });
      if (data) {
        if (data.status == SUCCESS) {
          setUser(data.data);
          setShow(true);
        }
      }
    } catch (error) {
      showError();
    }
  };
  const onEditPermission = async (email) => {
    try {
      setShowPermission(true);
      setShow(true);

      // const data = await postRequest(BASE_URL + FIND_USER, { email });
      // if (data) {
      //   if (data.status == SUCCESS) {
      //     setUser(data.data)
      //     setShow(true);
      //   }
      // }
    } catch (error) {
      showError();
    }
  };

  const onDelete = async (email) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let body = { email };
        const data = await postRequest(BASE_URL + DELETE_USER, body);
        if (data != null) {
          if (data.status == SUCCESS) {
            swal({ title: data.message, icon: "success" });
          }
        }
      }
    });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickUpdate = async () => {
    const data = await postRequest(BASE_URL + UPDATE_USER, user);
    if (data != null) {
      if (data.status == SUCCESS) {
        swal({ icon: "success", title: data.message }).then((m) => {
          setShow(false);
          window.location.reload();
        });
      } else {
        showError(data);
      }
    }
  };

  function onSelect(selectedList, selectedItem) {
    setSelectedPermissionList(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    setSelectedPermissionList(selectedList);
  }

  function userDetailModal() {
    return (
      <div className="row  mx-2 p-3">
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>FirstName</text>
            </div>
            <div className="col-7">
              <input
                name="firstName"
                maxlength="50"
                required="required"
                placeholder="First Name *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.firstName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>LastName</text>
            </div>
            <div className="col-7">
              <input
                name="lastName"
                maxlength="50"
                required="required"
                placeholder="Last Name *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.lastName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Email *</text>
            </div>
            <div className="col-7">
              <input
                name="email"
                maxlength="50"
                required="required"
                placeholder="Email *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.email}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Job Title</text>
            </div>
            <div className="col-7">
              <input
                name="jobTitle"
                maxlength="50"
                required="required"
                placeholder="Job Title"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.jobTitle}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Company</text>
            </div>
            <div className="col-7">
              <input
                name="company"
                maxlength="50"
                required="required"
                placeholder="Company"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.company}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Country *</text>
            </div>
            <div className="col-7">
              <ReactFlagsSelect
                selected={selected}
                showSelectedLabel={false}
                fullWidth={false}
                selectedSize={11}
                className="flag"
                onSelect={(code) => setSelected(code)}
              />
              <input
                name="contact"
                maxlength="50"
                required="required"
                id="firstname"
                className="textbox-flag"
                onChange={(e) => onChange(e)}
                placeholder="Country *"
                type="text"
                value={user.country}
              />
            </div>
          </div>
        </div>

        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>LinkedIn</text>
            </div>
            <div className="col-7">
              <input
                name="linkedIn"
                maxlength="50"
                required="required"
                placeholder="LinkedIn*"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.linkedIn}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>SkypeName *</text>
            </div>
            <div className="col-7">
              <input
                name="skypeName"
                maxlength="50"
                required="required"
                placeholder="SkypeName"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.skypeName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Address 1</text>
            </div>
            <div className="col-7">
              <input
                name="address1"
                maxlength="50"
                required="required"
                placeholder="Address 1"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.address1}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Address 2</text>
            </div>
            <div className="col-7">
              <input
                name="address2"
                maxlength="50"
                required="required"
                placeholder="First Name *"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.address2}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>City</text>
            </div>
            <div className="col-7">
              <input
                name="city"
                maxlength="50"
                required="required"
                placeholder="City"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.city}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>State</text>
            </div>
            <div className="col-7">
              <input
                name="state"
                maxlength="50"
                required="required"
                placeholder="State"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.state}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Postal Code</text>
            </div>
            <div className="col-7">
              <input
                name="postCode"
                maxlength="50"
                required="required"
                placeholder="Postal Code"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.postCode}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Contact</text>
            </div>
            <div className="col-7">
              <input
                name="contact"
                maxlength="50"
                required="required"
                placeholder="Contact"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.contact}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Summary</text>
            </div>
            <div className="col-7">
              <input
                name="summary"
                maxlength="50"
                required="required"
                placeholder="Summary"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.summary}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Contact Name</text>
            </div>
            <div className="col-7">
              <input
                name="contactName"
                maxlength="50"
                required="required"
                placeholder="Summary"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.contactName}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Purpose</text>
            </div>
            <div className="col-7">
              <input
                name="purpose"
                maxlength="50"
                required="required"
                placeholder="Purpose"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.purpose}
              />
            </div>
          </div>
        </div>
        <div className="col-12 my-3">
          <div className="row ">
            <div className="col-5">
              <text>Skills</text>
            </div>
            <div className="col-7">
              <input
                name="skills"
                maxlength="50"
                required="required"
                placeholder="Skills"
                type="text"
                onChange={(e) => onChange(e)}
                value={user.skills}
              />
            </div>
          </div>
        </div>
        <div className="col-12 text-center mt-2">
          <button
            className="p-1 text-right login-btn weight-600 font-14 px-3 "
            onClick={onClickUpdate}
          >
            SAVE
          </button>
        </div>
      </div>
    );
  }

  function openAddUserPopup() {
    setShowAddUser(true);
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <button
              className="float-right my-3 p-1 text-right text-white login-btn weight-600 font-14 px-3 "
              onClick={openAddUserPopup}
            >
              ADD USER
            </button>
          </div>
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
                              variant="danger"
                              onClick={() => onDelete(m.email)}
                            >
                              <DeleteIcon />
                              {/* Delete */}
                            </Button>
                            <Button
                              variant="success"
                              onClick={() => verifyUser(m.email)}
                            >
                              <ApproveIcon />
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => onEdit(m.email)}
                            >
                              <EditIcon />
                            </Button>
                            {/* <Button
                              variant="secondary"
                              onClick={() => onEditPermission(m.email)}
                            >
                              <PermissionIcon />
                            </Button> */}
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
          <Modal.Title>
            {" "}
            {showPermission ? <>Update Permission </> : <>User Detail</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showPermission ? (
            <div>
              <Multiselect
                options={permissionList} // Options to display in the dropdown
                selectedValues={ePermission} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />{" "}
            </div>
          ) : (
            userDetailModal()
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showAddUser} onHide={handleCloseAddUser}>
        <Modal.Header closeButton>
          <Modal.Title>ADD USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUserModal />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default User;
