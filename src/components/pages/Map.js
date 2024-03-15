import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";
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

const Map = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

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

  const handleMapOpen = () => {
    setMapOpen(true);
  };

  const handleMapClose = () => {
    setMapOpen(false);
  };

  function formatDate(inputDate) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
  );
};

export default Map;
