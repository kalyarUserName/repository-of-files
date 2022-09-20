import React, { FormEvent, useRef } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import { IConfig } from "react-aws-s3-typescript/dist/types";

import { s3ClientCofig } from "../../utils/constants";

const UploadComponent = () => {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = async (event: FormEvent<HTMLFormElement>) => {
    if (!fileInput.current || !fileInput.current.files) return;

    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name;
    const S3 = new ReactS3Client(s3ClientCofig as IConfig);
    console.log("S3", S3);
    S3.listFiles().then((response) => console.log("listFiles =>", response));
    try {
      const res = await S3.uploadFile(file, newFileName);
      console.log(res);
      if (res.status === 204) {
        console.log("success upload");
      } else {
        console.log("fail upload");
      }
    } catch (error) {
      console.error("Some error", error);
    }
    console.log(fileInput.current);
  };

  return (
    <div>
      <form className="upload-steps" onSubmit={handleClick}>
        <label>
          Upload file:
          <input type="file" ref={fileInput} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadComponent;
