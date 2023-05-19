import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
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
} from "../../service/constants";
import swal from "sweetalert";
// import Button from "react-bootstrap/Button";

const User = () => {
  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getUSers();
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
                              variant="danger"
                              onClick={() => onDelete(m.email)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="success"
                              onClick={() => verifyUser(m.email)}
                            >
                              Approve
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

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default User;
