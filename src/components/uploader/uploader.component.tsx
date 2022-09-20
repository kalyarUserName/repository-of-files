import React from "react";
import { v4 as uuidv4 } from "uuid";

import { useDropzone } from "react-dropzone";

import Dropzone from "../dragzone/dragzone.component";
import { API_ENDPOINT, CONTENT_TYPE_FORMAT } from "../../utils/constants";

const Uploader = () => {
  const drop = useDropzone();
  const { acceptedFiles } = drop;
  const axios = require("axios").default;

  const getContentType = (fileType: string) => {
    if (fileType === "") return;
    let var1 = JSON.parse(JSON.stringify(CONTENT_TYPE_FORMAT))[fileType];
    console.log("fileType", fileType, "var1", var1);
    return var1 ? var1 : "text/plain";
  };
  const getDataOfFile = (file: File) => {
    const type = getContentType(file.type);
    let nof;
    // if (user.isAuth)
    // nof = user.name+uuidv4()+`.${file.type} else
    nof = uuidv4() + `.${file.type}`;
    return { type: type, nof: nof };
  };

  const handleSubmit = async () => {
    // console.log(acceptedFiles);
    //
    // console.log("request", {
    //   method: "POST",
    //   url: API_ENDPOINT,
    //   data: getDataOfFile(acceptedFiles[0]),
    // });
    console.log("acceptedFiles", acceptedFiles);
    // const response = await axios({
    //   method: "POST",
    //   url: API_ENDPOINT,
    //   data: getDataOfFile(acceptedFiles[0]),
    // });
    // console.log("RESPONSE", response);
  };

  return (
    <div>
      <Dropzone dropStuff={drop} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default Uploader;
