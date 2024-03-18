import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CustomRouteButton from "../customComponents/RouteButton";
import { ROUTE_BUTTON } from "../utils/Const";
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../customComponents/Footer";
import ScrollToTop from "../customComponents/ScrollToTop";
import Chatbot from "../customComponents/Chatbot";
import HeaderComp from "../newComponents/HeaderComp";
import Image from "next/image";
import { FcFile } from "react-icons/fc";
import { useReactToPrint } from "react-to-print";

const Map = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [currentMap, setCurrentMap] = useState("");

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
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMapOpen = (id) => {
    setMapOpen(true);
    setCurrentMap(id);
  };

  const handleMapClose = () => {
    setMapOpen(false);
    setCurrentMap("");
  };

  console.log(currentMap);
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
          <div>
            <ul className="flex justify-start gap-4">
              {data?.result?.map(
                (item) =>
                  item.category === "map" && (
                    <div>
                      <li
                        className={`cursor-pointer text-xl ${
                          currentMap === item._id ? "underline" : ""
                        }`}
                        onClick={() => handleMapOpen(item._id)}
                      >
                        {item.heading.toUpperCase()}
                      </li>
                    </div>
                  )
              )}
            </ul>
            {data?.result?.map(
              (item) =>
                item.category === "map" &&
                mapOpen === true &&
                item._id === currentMap && (
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
                      <button className="px-6 py-2 bg-[#006D77] text-white border-none rounded-md cursor-pointer shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                        Share
                      </button>
                      <a href={item.file} download>
                        <button className="px-6 py-2 bg-[#006D77] text-white border-none rounded-md cursor-pointer shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                          Download
                        </button>
                      </a>
                      <button
                        className="px-6 py-2 bg-[#006D77] text-white border-none rounded-md cursor-pointer shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                        onClick={handlePrint}
                      >
                        Print
                      </button>
                      <button
                        className="px-6 py-2 bg-[#006D77] text-white border-none rounded-md cursor-pointer shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                        onClick={handleMapClose}
                      >
                        Close
                      </button>
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

export default Map;
