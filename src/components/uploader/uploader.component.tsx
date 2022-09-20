import React from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import http from "../../utils/API";

import { useDropzone } from "react-dropzone";

import Dropzone from "../dragzone/dragzone.component";
import { API_ENDPOINT, CONTENT_TYPE_FORMAT } from "../../utils/constants";

const Uploader = () => {
  const drop = useDropzone();
  const { acceptedFiles } = drop;

  const getFileType = (nameOfFile: string) => {
    if (nameOfFile === "") return;
    const format = nameOfFile.split(".").pop();
    if (!format) return;
    return format.toLowerCase();
  };

  const getDataOfFile = (file: File) => {
    const type = file.type;
    let nof;
    // if (user.isAuth)
    // nof = user.name+uuidv4()+`.${file.type} else
    nof = "kirill/" + uuidv4() + `.${getFileType(file.name)}`;
    return { type: type, nof: nof };
  };

  const handleSubmit = async () => {
    if (!acceptedFiles[0]) return;
    acceptedFiles.map(async (uploadingFile) => {
      const response = await axios({
        method: "post",
        url: API_ENDPOINT,
        data: getDataOfFile(uploadingFile),
        headers: { "Content-Type": "application/json", Accept: "*/*" },
      });
      console.log("RESPONSE =>", response);
      const uploadURL = response.data.uploadURL;
      const result = await axios({
        method: "PUT",
        url: uploadURL,
        headers: { "Content-Type": uploadingFile.type },
        data: uploadingFile,
      });
      console.log("result =>", result);
    });

    // axios
    //   .post(
    //     "https://3ryndvoemj.execute-api.us-east-2.amazonaws.com/prod"
    //
    //     // { nof: "kirill/777.jpg", type: "jpg" },
    //     // {
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     Accept: "application/json",
    //     //   },
    //     // }
    //   )
    //   .then((response) => {
    //     console.log("response", JSON.stringify(response));
    //   })
    //   .catch((error: Error) => {
    //     console.error(error);
    //   });
    // axios
    //   .post(API_ENDPOINT, getDataOfFile(acceptedFiles[0]))
    //   .then((response: any) => {
    //     console.log("response", response);
    //   })
    //   .catch((error: Error) => {
    //     console.error(error);
    //   });
  };

  return (
    <div>
      <Dropzone dropStuff={drop} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default Uploader;
