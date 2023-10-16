import swal from "sweetalert";
import { ADMIN_ROLE, ALL_PERMISSION, ERROR, USER_ROLE } from "./constants";
import axios from "axios";

export async function postRequest(url = "", data = {}, permission) {
  let userLocal = localStorage.getItem("user");
  let user = null;
  if (userLocal) {
    var json = JSON.parse(userLocal);
    if (json) {
      user = json;
    }
  }
  const permissionExist = user?.permissions?.find(
    (m) => m == permission || m == ALL_PERMISSION
  );

  if (permission) {
    if (permissionExist) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      return jsonData;
    } else {
      return { status: ERROR, message: "Invalid Permission" };
    }
  } else {
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
}

export const postAxios = async (url, data, permission) => {
  try {
    let userLocal = localStorage.getItem("user");
    let user = null;
    if (userLocal) {
      var json = JSON.parse(userLocal);
      if (json) {
        user = json;
      }
    }

    const permissionExist = user?.permissions?.find(
      (m) => m == permission || m == ALL_PERMISSION
    );

    if (permission) {
      if (permissionExist) {
        return await axios.post(url, data);
      } else {
        return {
          data: {
            status: ERROR,
            message: "Invalid Permission",
          },
        };
      }
    } else {
      return await axios.post(url, data);
    }
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

export function checkPermission(permission) {
  let userLocal = localStorage.getItem("user");
  let user = null;
  if (userLocal) {
    var json = JSON.parse(userLocal);
    if (json) {
      user = json;
    }
  }

  const permissionExist = user?.permissions?.find(
    (m) => m == permission || m == ALL_PERMISSION
  );
  if (permission) {
    if (permissionExist) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function checkResourcePermission(
  permission,
  resourceId,
  userId,
  resourceObj
) {
  let userLocal = localStorage.getItem("user");

  let user = null;
  if (userLocal) {
    var json = JSON.parse(userLocal);
    if (json) {
      user = json;
    }
  }

  let decUserId = atob(userId);
  
  if (resourceObj.userId == user._id) {
    return true;
  }
  console.log(" permissionsss :: ", user?.resourcePermissions);

  var permissionExist = false;

  user?.resourcePermissions?.map((userPerm) => {
    if (userPerm.resourceId == resourceId) {
      let specificPerm = userPerm.permissions.find(
        (perm) => perm === permission
      );
      let generalPerm = userPerm.permissions.find(
        (perm) => perm === ALL_PERMISSION
      );
      if (specificPerm || generalPerm) {
        permissionExist = true;
      }
    }
  });

  if (permission) {
    if (permissionExist) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function showSuccess(response) {
  if (response) {
    return swal({ title: response.message, icon: "success", timer: 3000 });
  } else {
    return swal({ title: "Success", icon: "success", timer: 3000 });
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
