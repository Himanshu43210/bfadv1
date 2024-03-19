import React from "react";

const MapDocumentPage = () => {
  return (
    <div className="px-6">
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
                Add Maps
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
      </div>
      <div>
        <div>
          <p
            style={{
              fontWeight: 600,
              fontSize: 20,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Manage Maps
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
          <div className="">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table
                style={{
                  borderCollapse: "collapse",
                  marginTop: "20px",
                  backgroundColor: "#fff",
                  width: "100%",
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
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "#004E55",
                                cursor: "pointer",
                              }}
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
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <Button
                                className="row_action_btn edit_btn ListingEditbtn"
                                onClick={() => handleEdit(item._id)}
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
          </div>
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

export default MapDocumentPage;