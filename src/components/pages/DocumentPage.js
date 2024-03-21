import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";
import { Button } from "react-bootstrap";
import EditMapDocumentModal from "../customComponents/EditMapDocumentModal";
import AddMapDocumentModal from "../customComponents/AddMapDocumentModal";
import MapDocumentTable from "../customComponents/MapDocumentTable";
import { API_DOMAIN } from "@/redux/utils/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const DocumentPage = () => {
  const [heading, setHeading] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };

  // const handleCategoryChange = (event) => {
  //   setCategory(event.target.value);
  // };

  const fetchData = async () => {
    try {
      const apiUrl = `${API_DOMAIN}content/findAll?page=0&limit=10`;
      const response = await axios.get(apiUrl);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file");
        return;
      }
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("file", selectedFile);
      formData.append("category", "document");
      const apiUrl = "https://bfservices.trainright.fit/api/content/create";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
      setModal(false);
      fetchData();
      toast.success("Document added successfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleDocumentOpen = () => {
    setDocumentOpen(true);
  };
  const handleDocumentClose = () => {
    setDocumentOpen(false);
  };

  return (
    <div className="px-6">
      <div>
        <h2 className="text-center font-bold text-2xl mt-20">
          WELCOME TO BUILDERFLOOR.COM
        </h2>
        {modal === true && (
          <AddMapDocumentModal
            handleHeadingChange={handleHeadingChange}
            handleModalClose={handleModalClose}
            handleUpload={handleUpload}
            handleFileChange={handleFileChange}
            title={"Add Document"}
          />
        )}
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <div>
        <div>
          <p className="text-center font-bold text-lg mb-4 my-6">
            Manage Documents
          </p>
          <div className="flex justify-between items-center">
            <CustomRouteButton
              component={{
                type: ROUTE_BUTTON,
                className: "admin-route-button",
                label: "Back",
                name: "Go to Dashboard",
                route: "/admin",
              }}
            />
            <Button
              className={`ol_open_btn signin_btn`}
              onClick={handleModalOpen}
              variant="success"
            >
              Add Document
            </Button>
          </div>
          <div className="">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <MapDocumentTable
                data={data?.result}
                handleDocumentOpen={handleDocumentOpen}
                handleDocumentClose={handleDocumentClose}
                documentOpen={documentOpen}
                category={"document"}
                fetchData={fetchData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
