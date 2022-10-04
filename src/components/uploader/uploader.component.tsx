import React from "react";
import { v4 as uuidv4 } from "uuid";
import Mime from "mime";
import axios from "axios";

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
    let type = file.type;
    let nof;
    let format = getFileType(file.name);
    if (!format) return;
    if (type === "") {
      let tempType = Mime.getType(file.name);
      if (!tempType)
        type = JSON.parse(JSON.stringify(CONTENT_TYPE_FORMAT))[format];
      else type = tempType;
      if (!type) type = `text/${format}`;
    }
    nof = "kirill/" + uuidv4() + `.${format}`;
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
  };

  return (
    <div>
      <Dropzone dropStuff={drop} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default Uploader;
