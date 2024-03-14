import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

function MapModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "4px",
        }}
      >
        <img
          src={imageUrl}
          alt="Modal Image"
          style={{
            width: "600px",
          }}
        />
      </div>
    </div>
  );
}

const AddMaps = () => {
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
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "https://bfservices.trainright.fit/api/content/findAll?page=0&limit=10";
        const response = await axios.get(apiUrl);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModalOpen = () => {
    setModal(true);
  };
  function formatDate(inputDate) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }
  const handleMapOpen = () => {
    setMapOpen(true);
  };
  const handleMapClose = () => {
    setMapOpen(false);
  };
  console.log(data?.result);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h2
          style={{
            fontWeight: 600,
            fontSize: 24,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          WELCOME TO BUILDERFLOOR.COM
        </h2>
        {modal === true && (
          <div style={{ border: "solid gray 1px", padding: 20 }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: 20,
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              Add Maps
            </p>
            <div>
              <input
                type="text"
                onChange={handleHeadingChange}
                style={{ margin: "0 10px", padding: 2 }}
                placeholder="Enter heading..."
              />
              {/* <input
                type="text"
                onChange={handleCategoryChange}
                style={{ margin: "0px 10px", padding: 2 }}
                placeholder="Enter category..."
              /> */}
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
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                UPLOAD
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
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
            All Maps
          </p>
          <button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "right",
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
            onClick={handleModalOpen}
          >
            Add Map
          </button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
                backgroundColor: "#fff",
                marginBottom: "40px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                      backgroundColor: "#004E55",
                      color: "#fff",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                      backgroundColor: "#004E55",
                      color: "#fff",
                    }}
                  >
                    Heading
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                      backgroundColor: "#004E55",
                      color: "#fff",
                    }}
                  >
                    Map
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                      backgroundColor: "#004E55",
                      color: "#fff",
                    }}
                  >
                    Created At
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                      backgroundColor: "#004E55",
                      color: "#fff",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.result?.map(
                  (item) =>
                    item.category === "map" && (
                      <tr key={item._id} style={{ backgroundColor: "white" }}>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                          }}
                        >
                          {item.category}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                          }}
                        >
                          {item.heading}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                          }}
                        >
                          <FaMapMarkerAlt
                            onClick={handleMapOpen}
                            style={{ color: "#004E55", cursor: "pointer" }}
                          />

                          {mapOpen === true && (
                            <MapModal
                              isOpen={mapOpen}
                              onClose={handleMapClose}
                              imageUrl={item.file}
                            />
                          )}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                          }}
                        >
                          {formatDate(item.createdAt)}
                        </td>
                        <td
                          style={{
                            border: "1px solid #ddd",
                            padding: "8px",
                            textAlign: "left",
                          }}
                        ></td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )}
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
      </div>
    </div>
  );
};
export default AddMaps;
