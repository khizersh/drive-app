import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postRequest } from "../service/commonService";
import { BASE_URL, LOGIN_USER, SUCCESS } from "../service/constants";
import swal from "sweetalert";

const Login = () => {
  const router = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onClickLogin = async (e) => {
    const data = await postRequest(BASE_URL + LOGIN_USER, user);
    if (data != null) {
      if (data.status == SUCCESS) {
        localStorage.setItem("user", JSON.stringify(data.data));
        swal({ icon: "success", title: data.message }).then(
          (r) => (window.location.href = "/")
        );
      } else {
        swal({ icon: "error", title: data.message });
      }
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container login-modal ">
      <div className="row">
        <div className="col-lg-4 offset-lg-4 col-12 ">
          <div className="card shadow py-3">
            <div className="mx-3 border-bottom-3 login-header text-yellow">
            Bienvenidos a la biblioteca digital de Grupo Hacienda Real
            </div>
            <p className="mx-3 font-14">
              Please enter your username and password in the fields below to
              login to your platform.
            </p>

            <div className="card-body">
              <input
                type="text"
                className="w-100"
                value={user.email}
                onChange={(e) => onChange(e)}
                name="email"
                placeholder="Enter email.."
              />
              <input
                type="password"
                className="w-100 mt-2 "
                value={user.password}
                onChange={(e) => onChange(e)}
                name="password"
                placeholder="Enter password.."
              />
              <div className="mt-2">
                <div className="text-grey font-14 weight-700 d-inline-block">
                  Forgot your password?
                </div>{" "}
                <div className="d-inline-block float-right">
                  <button
                    className="p-1 text-right login-btn weight-600 font-14 px-3 "
                    onClick={onClickLogin}
                  >
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
