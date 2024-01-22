import React from "react";

import { Card } from "react-bootstrap";
import { HOME_SCREEN } from "../../ScreenJson.js";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import HeaderComp from "../newComponents/HeaderComp.jsx";
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import { GET, GET_HOME_SCREEN_DATA } from "../utils/Const.js";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";
import Chatbot from "../customComponents/Chatbot.jsx";
import Heading from "../customComponents/Heading.jsx";
import Banner from "../customComponents/Banner.jsx";

export default function Home() {
  return (
    <>
      <Card className="home-screen">
        <HeaderComp />
        <div className={`component_wrapper ${'header'}`}>
          <AutoFetchApi component={{
            api: API_ENDPOINTS[GET_HOME_SCREEN_DATA],
            className: "header",
            params: { sortType: "desc" }
          }}
            url={API_ENDPOINTS[GET_HOME_SCREEN_DATA]} method={GET} params={{ sortType: "desc" }}
          />
        </div>
        <div className={`component_wrapper ${'home-page-banner'}`}>
          <Banner component={{
            name: "homeImageBanner",
            className: "home-page-banner",
            text: "Start Exploring Your Dream ",
            spanText: "Builder Floor now",
            bgImage:
              "https://thumbs.dreamstime.com/b/mumbai-capital-india-mumbai-india-december-mumbai-financial-commercial-entertainment-capital-india-december-112388360.jpg",
            // searchBar: true
          }} />
        </div>
        <RenderComponent jsonToRender={HOME_SCREEN} />
        <div className={`component_wrapper ${'home-screen-card-section-bottom'}`}>
          <Heading component={{
            name: "homeScreenBottom",
            tag: "h2",
            className: "home-screen-card-section-bottom",
            text: "We are your trusted partner in finding your dream builder floor in Gurgaon",
          }} />
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
      </Card>
    </>
  );
}
