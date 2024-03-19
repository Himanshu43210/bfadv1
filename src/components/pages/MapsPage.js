import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";
import { Button } from "react-bootstrap";
import EditMapDocumentModal from "../customComponents/EditMapDocumentModal";
import AddMapDocumentModal from "../customComponents/AddMapDocumentModal";
import MapDocumentTable from "../customComponents/MapDocumentTable";
import { API_DOMAIN } from "@/redux/utils/api";

const MapPage = () => {
  const [heading, setHeading] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  // const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

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
      formData.append("category", "map");
      const apiUrl = "https://bfservices.trainright.fit/api/content/create";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
      setModal(false);
      fetchData();
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

  const handleMapOpen = () => {
    setMapOpen(true);
  };
  const handleMapClose = () => {
    setMapOpen(false);
  };

  return (
    <div className="px-6">
      <div>
        <h2 className="text-center font-bold text-2xl mt-4">
          WELCOME TO BUILDERFLOOR.COM
        </h2>
        {modal === true && (
          <AddMapDocumentModal
            handleHeadingChange={handleHeadingChange}
            handleModalClose={handleModalClose}
            handleUpload={handleUpload}
            handleFileChange={handleFileChange}
            title={"Add Map"}
          />
        )}
      </div>
      <div>
        <div>
          <p className="text-center font-bold text-lg mb-4">Manage Maps</p>
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
              Add Map
            </Button>
          </div>
          <div className="">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <MapDocumentTable
                data={data?.result}
                handleDocumentOpen={handleMapOpen}
                handleDocumentClose={handleMapClose}
                documentOpen={mapOpen}
                category={"map"}
                fetchData={fetchData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
