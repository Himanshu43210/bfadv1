import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCancel, MdEdit, MdDelete } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { Table, Button } from "react-bootstrap";
import { Troubleshoot } from "@mui/icons-material";

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

  const handleModalClose = () => {
    setModal(false);
  };

  const handleEditModalOpen = () => {
    setEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditModal(false);
  };

  function formatDate(inputDate) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }
  const handleDocumentOpen = () => {
    setDocumentOpen(true);
  };
  const handleDocumentClose = () => {
    setDocumentOpen(false);
  };

  const handleEdit = (id) => {
    axios
      .put("https://bfservices.trainright.fit/api/content/update" + id)
      .then(() => window.location.reload())
      .catch((err) => console.log(err, "Can't update data!"));
  };

  const handleDelete = (id) => {
    axios
      .delete(
        "https://bfservices.trainright.fit/api/content/deleteById?id=" + id
      )
      .then(() => window.location.reload())
      .catch((err) => console.log(err, "Can't delete data!"));
  };
  return (
    <div
      style={{
        width: "100vw",
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
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "solid gray 1px",
                padding: 20,
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyItems: "center",
                  width: "100%",
                }}
              >
                <MdCancel onClick={handleModalClose} />
              </div>
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "right",
                  marginBottom: "10px",
                }}
              >
                {" "}
                <input
                  type="text"
                  onChange={handleHeadingChange}
                  style={{
                    margin: "0 10px",
                    padding: "6px",
                    borderBottom: "2px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                  }}
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
              </div>
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
        {editModal === true && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(5px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "solid gray 1px",
                padding: 20,
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyItems: "center",
                  width: "100%",
                }}
              >
                <MdCancel onClick={handleEditModalClose} />
              </div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                  textAlign: "center",
                  marginBottom: 40,
                }}
              >
                Edit Document
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "right",
                  marginBottom: "10px",
                }}
              >
                {" "}
                <input
                  type="text"
                  onChange={handleHeadingChange}
                  style={{
                    margin: "0 10px",
                    padding: "6px",
                    borderBottom: "2px solid black",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                  }}
                  placeholder="New heading..."
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
              </div>
              <button
                onClick={handleEdit}
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
                SUBMIT
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
            Manage Documents
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
            Add Document
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
                    Document
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
                    item.category === "document" && (
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
                          <IoDocument
                            onClick={handleDocumentOpen}
                            style={{
                              color: "#004E55",
                              cursor: "pointer",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          {documentOpen === true && (
                            <MapModal
                              isOpen={documentOpen}
                              onClose={handleDocumentClose}
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
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 10,
                            }}
                          >
                            <Button
                              className="row_action_btn edit_btn ListingEditbtn"
                              onClick={handleEditModalOpen}
                              variant="success"
                            >
                              <MdEdit size={20} />
                            </Button>
                            <Button
                              className="row_action_btn delete_btn ListingDeletebtn"
                              variant="danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              <FaRegTrashAlt size={20} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          )}
          <div
            style={{
              position: "fixed",
              bottom: "60px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <CustomRouteButton
              component={{
                type: ROUTE_BUTTON,
                className: "admin-route-button",
                label: "Back",
                name: "Go to Dashboard",
                route: "/admin",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
