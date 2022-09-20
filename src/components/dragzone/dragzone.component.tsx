import React, { FC } from "react";
import { DropzoneState } from "react-dropzone";

import "./dragzone.styles.scss";

type DragzoneProps = {
  dropStuff: DropzoneState;
};

const Dragzone: FC<DragzoneProps> = ({ dropStuff }) => {
  const { acceptedFiles, getRootProps, getInputProps } = dropStuff;

  const filesMap = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div className="dragzone-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{filesMap}</ul>
      </aside>
    </div>
  );
};

export default Dragzone;
