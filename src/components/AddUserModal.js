import swal from "sweetalert";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postRequest } from "../service/commonService";
import { BASE_URL, REGISTER_USER, SUCCESS } from "../service/constants";
import ReactFlagsSelect from "react-flags-select";

const AddUserModal = () => {
  const router = useHistory();
  const [selected, setSelected] = useState("CA");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    jobTitle: "",
    contact: "",
  });

  const onClickLogin = () => {
    router.push("/login");
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onClickRegister = async (e) => {
    const data = await postRequest(BASE_URL + REGISTER_USER, user);
    if (data != null) {
      if (data.status == SUCCESS) {
        swal({ icon: "success", title: data.message }).then((m) =>
          window.location.reload()
        );
      } else {
        swal({ icon: "error", title: data.message });
      }
    }
  };
  return (
    <div className="card-body">
      <div className="container">
        <div className="row register-form">
          <div className="col-12 col-lg-6 ">
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
          <div className="col-12 col-lg-6">
            <input
              name="lastName"
              maxlength="50"
              required="required"
              id="firstname"
              onChange={(e) => onChange(e)}
              placeholder="Last Name *"
              type="text"
              value={user.lastName}
            />
          </div>
          <div className="col-12 col-lg-6">
            <input
              name="email"
              maxlength="50"
              required="required"
              onChange={(e) => onChange(e)}
              id="firstname"
              placeholder="Email *"
              type="text"
              value={user.email}
            />
          </div>
          <div className="col-12 col-lg-6">
            <input
              name="password"
              onChange={(e) => onChange(e)}
              maxlength="50"
              required="required"
              id="firstname"
              placeholder="Password *"
              type="password"
              value={user.password}
            />
          </div>
          <div className="col-12 col-lg-6">
            <input
              name="company"
              maxlength="50"
              required="required"
              onChange={(e) => onChange(e)}
              id="firstname"
              placeholder="Company *"
              type="text"
              value={user.company}
            />
          </div>
          <div className="col-12 col-lg-6">
            <input
              name="jobTitle"
              maxlength="50"
              required="required"
              onChange={(e) => onChange(e)}
              id="firstname"
              placeholder="Job Title *"
              type="text"
              value={user.jobTitle}
            />
          </div>
          <div className="col-12 col-lg-6 mt-1 w-100">
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
              placeholder="Contact *"
              type="text"
              value={user.contact}
            />
          </div>
          <div className="col-12 col-lg-6"></div>
        </div>
      </div>

      <div className="mt-2 mx-3">
        <div className="d-inline-block float-right">
          <button
            className="p-1 text-right login-btn weight-600 font-14 px-3 "
            onClick={onClickRegister}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
