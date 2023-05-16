import React from "react";

const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-12">
          <div className="card shadow">
            <div className="mx-3 border-bottom-3 login-header">
              Welcome to CKE Digital Library
            </div>
            <p className="mx-3 font-14">
              Please enter your username and password in the fields below to
              login to your platform.
            </p>

            <div className="card-body">
              <input
                type="text"
                className="w-100"
                placeholder="Enter email.."
              />
              <input
                type="password"
                className="w-100 mt-2 "
                placeholder="Enter password.."
              />
              <div className="d-flex justify-content-end">
                <div className="text-grey font-14 weight-700">
                  Forgot your password?
                </div>{" "}
                <div>
                  <button className="p-1 text-right login-btn weight-600 font-14 px-3">
                    LOGIN
                  </button>
                </div>
              </div>
              <p className="text-center font-14">
                Not a user yet?{" "}
                <span className="mx-1 weight-600">Register</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
