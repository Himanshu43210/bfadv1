import axios from "axios";
import React, { useState } from "react";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";

const AddDocuments = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const apiUrl = "https://bfservices.trainright.fit/api/content/create";

      await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p
        style={{
          fontWeight: 600,
          fontSize: 20,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Add Documents
      </p>
      <div style={{ marginBottom: "40px" }}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ margin: "10px 0" }}
        />
        <button
          onClick={handleUpload}
          style={{
            padding: "10px 30px",
            backgroundColor: "#004E55",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          Upload
        </button>
      </div>
      <CustomRouteButton
        component={{
          type: ROUTE_BUTTON,
          className: "admin-route-button",
          label: "Go to Dashboard",
          name: "Go to Dashboard",
          route: "/admin",
        }}
      />
    </div>
  );
};

export default AddDocuments;
