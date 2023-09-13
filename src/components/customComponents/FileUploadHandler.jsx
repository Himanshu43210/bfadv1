import React from "react";
import { Button } from "react-bootstrap";

const FileUploadHandler = ({ handleFileSelect, enableFileUpload = false }) => {
  return (
    <>
      {enableFileUpload && (
        <>
          <input type="file" onChange={handleFileSelect} />
          <Button variant="success">Upload File</Button>
        </>
      )}
    </>
  );
};

export default FileUploadHandler;
