import React from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const router = useHistory();
  return (
    <div className="container login-modal ">
      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-12 ">
          <div className="card shadow py-3">
            <div className="mx-3 border-bottom-3 login-header text-yellow">
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
              <div className="mt-2">
                <div className="text-grey font-14 weight-700 d-inline-block">
                  Forgot your password?
                </div>{" "}
                <div className="d-inline-block float-right">
                  <button className="p-1 text-right login-btn weight-600 font-14 px-3 ">
                    LOGIN
                  </button>
                </div>
              </div>
              <p className="text-center font-14 mt-5">
                Not a user yet?{" "}
                <span
                  className="mx-1 weight-600 cursor-pointer"
                  onClick={() => router.push("/register")}
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

export default Login;
