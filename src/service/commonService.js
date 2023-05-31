import swal from "sweetalert";
import { ADMIN_ROLE, USER_ROLE } from "./constants";
import axios from "axios";

export async function postRequest(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonData = await response.json();
  return jsonData;
}


export const postAxios = async (url, data) => {
  try {
    return await axios.post(url, data);
  } catch (error) {
    console.log(error);
  }
};
export async function getRequest(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}

export function showError(response) {
  if (response) {
    swal({ title: response.message, icon: "error", timer: 3000 });
  } else {
    swal({ title: "Something went wrong!", icon: "error", timer: 3000 });
  }
}
export function showSuccess(response) {
  if (response) {
    swal({ title: response.message, icon: "success", timer: 3000 });
  } else {
    swal({ title: "Success", icon: "success", timer: 3000 });
  }
}
export function checkUser() {
  var user = localStorage.getItem("user");
  if (user) {
    var json = JSON.parse(user);
    if (json) {
      return true;
    }
  } else {
    return false;
  }
}
export function checkAdmin() {
  var user = localStorage.getItem("user");
  if (user) {
    var json = JSON.parse(user);
    if (json.role == ADMIN_ROLE) {
      return true;
    }
  } else {
    return false;
  }
}
