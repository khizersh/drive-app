import React, { useEffect, useState } from "react";
import { postRequest, showError } from "../service/commonService";
import { BASE_URL, FIND_RESOURCE_BY_ID, SUCCESS } from "../service/constants";

const ShareFile = () => {
  const [isVideo, setIsVideo] = useState(false);
  const [file, setFile] = useState(null);
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  useEffect(async () => {
    findData();
  }, []);

  const findData = async () => {
    if (params.id) {
      var fileData = null;
      const data = await postRequest(BASE_URL + FIND_RESOURCE_BY_ID, {
        id: params.id,
      });
      if (data) {
        if (data.status == SUCCESS) {
          if (!data.data.isFolder) {
            fileData = data.data;

            setIsVideo(false);
            if (data?.mimeType?.includes("image")) {
              setIsVideo(false);
            } else {
              setIsVideo(true);
              setFile(fileData);
            }
          }
        } else {
          showError(data.data);
        }
      } else {
        showError();
      }
    }
  };

  return <div>ShareFile</div>;
};

export default ShareFile;
