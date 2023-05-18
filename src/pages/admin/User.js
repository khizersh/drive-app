import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const User = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Muhammad",
      lastName: "Khizer",
      email: "khizer@gmail.com",
      company: "popshop",
      jobTitle: "vela",
      contact: "21321321",
    },
    {
      firstName: "Muhammad",
      lastName: "Khizer",
      email: "khizer@gmail.com",
      company: "popshop",
      jobTitle: "vela",
      contact: "21321321",
    },
    {
      firstName: "Muhammad",
      lastName: "Khizer",
      email: "khizer@gmail.com",
      company: "popshop",
      jobTitle: "vela",
      contact: "21321321",
    },
    {
      firstName: "Muhammad",
      lastName: "Khizer",
      email: "khizer@gmail.com",
      company: "popshop",
      jobTitle: "vela",
      contact: "21321321",
    },
    {
      firstName: "Muhammad",
      lastName: "Khizer",
      email: "khizer@gmail.com",
      company: "popshop",
      jobTitle: "vela",
      contact: "21321321",
    },
    {
      firstName: "Muhammad",
      lastName: "Khizer",
      email: "khizer@gmail.com",
      company: "popshop",
      jobTitle: "vela",
      contact: "21321321",
    },
  ]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, []);

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
                    ? users.map((m) => (
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                          <td>@mdo</td>
                          <td>@mdo</td>
                          <td>@mdo</td>
                          <td>
                            <span className="mx-1" onClick={handleShow}>Detail  | </span>
                            <span>Approve</span>
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
          <Modal.Title>Modal heading</Modal.Title>
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
      </Modal>
    </>
  );
};

export default User;
