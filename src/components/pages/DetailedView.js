import React from "react";

import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import dynamic from 'next/dynamic'
import HeaderComp from "../newComponents/HeaderComp.jsx";
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import { DYNAMIC_CARD_CONTAINER, GET, GET_CARD_DATA, GET_SIMILAR_PROPERTY_DATA, HOME_CARD } from "../utils/Const.js";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import DetailDataCard from "../customComponents/DetailedDataCard.jsx";
import Line from "../customComponents/Line.jsx";
import Heading from "../customComponents/Heading.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";
import Chatbot from "../customComponents/Chatbot.jsx";

export const CARD_DETAILS_SCREEN = {
  name: "Card Detail Screen",
  pageClass: "property_page detail-screen",
  children: [
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_SIMILAR_PROPERTY_DATA,
      className: "default-home-cards similar_options_list",
      apiName: GET_SIMILAR_PROPERTY_DATA,
      renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
      defaultLimit: 4,
      cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
      cardClickNavigate: "/builderFloorDetails",
      addQueryParam: "{title}-{id}",
      cardClickApiType: GET,
    },
  ],
};

function comp() {
  return (
    <>
      <Card className="property_page detail-screen">
        <HeaderComp />
        <div className={`component_wrapper ${'header'}`}>
          <AutoFetchApi component={{
            api: API_ENDPOINTS[GET_SIMILAR_PROPERTY_DATA],
            className: "header",
          }} url={API_ENDPOINTS[GET_SIMILAR_PROPERTY_DATA]} method={GET} />
        </div>
        <div className={`component_wrapper ${'property_images_container'}`}>
          <DetailDataCard component={{
            name: "detailedViewImage",
            loadingApi: GET_CARD_DATA,
            className: "property_images_container",
            apiSliceName: GET_CARD_DATA,
            whatsappText: `Hi! I saw a property {link} on BuilderFloor.com and I am interested in it. Is it available?`,
            icons: {
              sectorNumber: "/icons/location.png",
              size: "/icons/area.png",
              accommodation: "/icons/home.png",
              floor: "/icons/stairs.png",
              facing: "/icons/compass.png",
              possession: "/icons/check.png",
              parkFacing: "/icons/park.png",
              corner: "/icons/right.png",
            },
          }} />
        </div>
        <div className={`component_wrapper ${'property_details_divider'}`}>
          <Line />
        </div>
        <div className={`component_wrapper ${'explore_similar_options_heading'}`}>
          <Heading component={{
            className: "explore_similar_options_heading",
            text: "Explore similar options to match your choice"
          }} />
        </div>
        {/* <div className={`component_wrapper ${'default-home-cards similar_options_list'}`}>
          <DynamicCardContainer
            component={{
              loadingApi: GET_SIMILAR_PROPERTY_DATA,
              className: "default-home-cards similar_options_list",
              apiName: GET_SIMILAR_PROPERTY_DATA,
              renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
              defaultLimit: 4,
              cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
              cardClickNavigate: "/builderFloorDetails",
              addQueryParam: "{title}-{id}",
              cardClickApiType: GET,
            }}
            handleValueChange={handleValueChange}
            onLoadMore={handleLoadMore}
          />
        </div> */}
        <RenderComponent jsonToRender={CARD_DETAILS_SCREEN} />
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

const DetailedView = dynamic(() => Promise.resolve(comp), { ssr: false })

export default DetailedView;