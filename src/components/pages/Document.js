import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";
import Footer from "../customComponents/Footer";
import ScrollToTop from "../customComponents/ScrollToTop";
import Chatbot from "../customComponents/Chatbot";
import HeaderComp from "../newComponents/HeaderComp";
import { useReactToPrint } from "react-to-print";
import { Button } from "react-bootstrap";

const Document = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [documentOpen, setDocumentOpen] = useState(true);
  const [currentDocument, setCurrentDocument] = useState("");

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "https://bfservices.trainright.fit/api/content/findAll?page=0&limit=10";
        const response = await axios.get(apiUrl);
        const filteredData = response?.data?.result.filter(
          (item) => item.category === "document"
        );
        setData(filteredData);
        setLoading(false);
        if (filteredData.length > 0) {
          setCurrentDocument(filteredData[0]._id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDocumentOpen = (id) => {
    setDocumentOpen(true);
    setCurrentDocument(id);
  };

  const handleDocumentClose = () => {
    setDocumentOpen(false);
    setCurrentDocument("");
  };

  console.log(currentDocument);
  return (
    <div>
      <HeaderComp />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 100px",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: 20,
            textAlign: "center",
            marginBottom: 40,
            marginTop: 40,
          }}
        >
          All Documents
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul className="flex justify-start gap-4">
              {data?.map((item) => (
                <div>
                  <li
                    className={`cursor-pointer text-xl ${
                      currentDocument === item._id ? "underline" : ""
                    }`}
                    onClick={() => handleDocumentOpen(item._id)}
                  >
                    {item.heading.toUpperCase()}
                  </li>
                </div>
              ))}
            </ul>
            {data?.map(
              (item) =>
                documentOpen === true &&
                item._id === currentDocument && (
                  <div>
                    <img
                      width={600}
                      height={600}
                      ref={printRef}
                      src={item.file}
                      alt=""
                      className="my-10"
                    />

                    <div className="flex gap-4">
                      <Button className={`ol_open_btn signin_btn`}>
                        Share
                      </Button>

                      <a href={item.file} download>
                        <Button className={`ol_open_btn signin_btn`}>
                          Download
                        </Button>
                      </a>
                      <Button
                        className={`ol_open_btn signin_btn`}
                        onClick={handlePrint}
                      >
                        Print
                      </Button>
                      <Button
                        className={`ol_open_btn signin_btn`}
                        onClick={handleDocumentClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
        <div className="mt-20">
          <CustomRouteButton
            component={{
              type: ROUTE_BUTTON,
              className: "admin-route-button",
              label: "Back",
              name: "Go to Dashboard",
              route: "/",
            }}
          />
        </div>
      </div>
      <div className={`component_wrapper`}>
        <Footer />
      </div>
      <div className={`component_wrapper`}>
        <ScrollToTop />
      </div>
      <div className={`component_wrapper`}>
        <Chatbot />
      </div>
    </div>
  );
};

export default Document;
