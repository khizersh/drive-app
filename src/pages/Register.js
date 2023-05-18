import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";

const Register = () => {
  const router = useHistory();
  const [selected, setSelected] = useState("CA");

  const onClickLogin = () => {
    console.log("hello");
    router.push("/login");
  };
  return (
    <div className="container login-modal ">
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-12 ">
          <div className="card shadow py-3">
            <div className="mx-3 border-bottom-3 login-header text-yellow">
              Welcome to CKE Digital Libraryasfdads
            </div>
            <p className="mx-3 font-14">
              Please complete the form below to request access to CKE Digital
              Library.
            </p>

            <div className="card-body">
              <div className="container">
                <div className="row register-form">
                  <div className="col-12 col-lg-6 ">
                    <input
                      name="firstname"
                      maxlength="50"
                      required="required"
                      id="firstname"
                      placeholder="First Name *"
                      type="text"
                      value=""
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <input
                      name="firstname"
                      maxlength="50"
                      required="required"
                      id="firstname"
                      placeholder="Last Name *"
                      type="text"
                      value=""
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <input
                      name="firstname"
                      maxlength="50"
                      required="required"
                      id="firstname"
                      placeholder="Email *"
                      type="text"
                      value=""
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <input
                      name="firstname"
                      maxlength="50"
                      required="required"
                      id="firstname"
                      placeholder="Password *"
                      type="password"
                      value=""
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <input
                      name="firstname"
                      maxlength="50"
                      required="required"
                      id="firstname"
                      placeholder="Company *"
                      type="text"
                      value=""
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <input
                      name="firstname"
                      maxlength="50"
                      required="required"
                      id="firstname"
                      placeholder="Job Title *"
                      type="text"
                      value=""
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
                      name="firstname"
                      maxlength="50"
                      required="required"
                      id="firstname"
                      className="textbox-flag"
                      placeholder="Contact *"
                      type="text"
                      value=""
                    />
                  </div>
                  <div className="col-12 col-lg-6"></div>
                </div>
              </div>

              <div className="mt-2 mx-3">
                <div className="text-grey font-14 weight-700 d-inline-block">
                  Resend Verification Link?
                </div>{" "}
                <div className="d-inline-block float-right">
                  <button className="p-1 text-right login-btn weight-600 font-14 px-3 ">
                    REGISTER
                  </button>
                </div>
              </div>
              <p className="text-center font-14 mt-5">
                Not a user yet?{" "}
                <span
                  className="mx-1 weight-600 cursor-pointer"
                  onClick={onClickLogin}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
