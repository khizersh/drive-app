// export const BASE_URL = "http://localhost:3001/";
export const BASE_URL = "https://drive-app-backend.onrender.com/";
export const REGISTER_USER = "user/signup";
export const UPDATE_USER = "user/update";
export const FIND_USER = "user/find";
export const LOGIN_USER = "user/login";
export const NOT_VERIFIED_USER = "user/get-unverified";
export const GET_ALL = "user/get-all";
export const FIND_BY_EMAIL = "user/find";
export const UPDATE_PERMISSION = "user/updatePermission";
export const UPDATE_RESOURCE_PERMISSION = "user/updateResourcePermission";
export const UPDATE_RESOURCE_PERMISSION_ALL = "user/updateResourcePermissionAll";
export const DELETE_USER = "user/delete";
export const APPROVE_USER = "user/approve";
export const FIND_FOLDER = "folder/getResourceByUser";
export const DOWNLOAD_IMAGE = "folder/downloadImage";
export const DOWNLOAD_IMAGE_WITH_SIZE = "folder/downloadImageWithSize";
export const FIND_FOLDER_BY_HOME_PARENT = "folder/getResourcesByRootParent";
export const FIND_SUB_FOLDER = "folder/getResourceByFolder";
export const FIND_RESOURCE_BY_ID = "folder/getResourceById";
export const ADD_RESOURCE = "folder/upload";
export const GET_RESOURCSES_BY_KEYWORD = "folder/getResourceByKeyword";
export const GET_RESOURCSES_BY_KEYWORD_ALL = "folder/getResourceByKeywordAll";
export const ADD_OR_REMOVE_COLLECTION = "collection/updateList";
export const GET_COLLECTION_BY_ID = "collection/getCollectionById";
export const GET_COLLECTION = "collection/getAll";
export const GET_COLLECTION_GROUP = "collection/getAllCollectionGroup";
export const GET_ALL_BY_EMAIL = "collection/getAllByEmail";
export const DELETE_RESOURCE = "folder/delete";
export const DELETE_FOLDER_WITH_SUBFOLDER = "folder/deleteFolderAndSubResource";
export const EDIT_RESOURCE = "folder/edit";

export const ADD_RESOURCE_PERMISSION = "ADD_RESOURCE";
export const VIEW_RESOURCE_PERMISSION = "VIEW_RESOURCE";
export const DELETE_RESOURCE_PERMISSION = "DELETE_RESOURCE";
export const DOWNLOAD_RESOURCE_PERMISSION = "DOWNLOAD_RESOURCE";
export const ADD_FOLDER_PERMISSION = "ADD_FOLDER";
export const ALL_PERMISSION = "ALL";
export const UPDATE_RESOURCE_PERMISSIONS = "UPDATE_RESOURCE";

export const ALL_PERMISSIONS = [
  "ADD_RESOURCE",
  "VIEW_RESOURCE",
  "DELETE_RESOURCE",
  "ADD_FOLDER",
  "DOWNLOAD_RESOURCE",
  "ALL",
  "UPDATE_RESOURCE"
];

export const HOME_FOLDER_LIST = (onCLickFolder) => {
  return [
    {
      id: "brand-asset",
      title: "Brand Assets",
      image:
        // "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/Happy_Star_CMYK.PNG",
        // "https://drive-app.s3.amazonaws.com/d5b5226a-1bdf-41c2-b4f6-369975209190.png",
        "https://drive-app.s3.amazonaws.com/903f8d0f-6dc6-4071-a7c0-641328e9e5d9.png",
      onClick: onCLickFolder,
    },
    {
      id: "core-product-photgraphy",
      title: "Core Product Photography",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/CORE%20PRODUCT%20PHOTOGRAPHY.png",
      onClick: onCLickFolder,
    },
    {
      id: "videos",
      title: "Videos",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/GLOBALLY%20APPROVED%20VIDEOS.png",
      onClick: onCLickFolder,
    },
    {
      id: "ltos",
      title: "LTOs",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/LTOs.png",
      onClick: onCLickFolder,
    },
    {
      id: "menu-board-panel",
      title: "Menu Board Panels",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/MENUBOARD%20PANEL.png",
      onClick: onCLickFolder,
    },
    {
      id: "social-media-asset",
      title: "Social Media Assets",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/SOCIAL%20MEDIA%20ASSETS.png",
      onClick: onCLickFolder,
    },
    {
      id: "templates",
      title: "Templates",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/LSM%20Templates.png",
      onClick: onCLickFolder,
    },
    {
      id: "recovery-playbook-assets",
      title: "Recovery Playbook & Assets",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/open.png",
      onClick: onCLickFolder,
    },
    {
      id: "regional-assets",
      title: "Regional Assets",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/INTERNAL%20ASSETS.png",
      onClick: onCLickFolder,
    },
    {
      id: "development",
      title: "Development",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/DEVELOPMENT.png",
      onClick: onCLickFolder,
    },
    {
      id: "packaging",
      title: "Packaging",
      image:
        // "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/Happy%20Star%20Packaing.png",
        "https://drive-app.s3.amazonaws.com/d944cb03-4702-472e-b8d7-a4cbea531f57.png",
      onClick: onCLickFolder,
    },
    {
      id: "reference-document-forms",
      title: "Reference Documents & Forms",
      image:
        "https://www.ckelibrary.com/uploads/05d4fd0517e6f7e1ee5ef12e9086f9e5/custom/images/iconfinder_11_Agreement_report_form_layout_paper_4308068.png",
      onClick: onCLickFolder,
    },
  ];
};

export const USER_ROLE = "user";
export const ADMIN_ROLE = "admin";
export const SUCCESS = "0000";
export const ERROR = "9999";
export const MY_SECRET_KEY = "myHiddenGem";
