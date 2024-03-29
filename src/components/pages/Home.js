import React from "react";

import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import HeaderComp, { FILTER } from "../newComponents/HeaderComp.jsx";
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import {
  API_BUTTON,
  CONTAINER,
  DYNAMIC_CARD_CONTAINER,
  GET,
  GET_CARD_DATA,
  GET_HOME_SCREEN_DATA,
  GET_SEARCH_RESULT,
  HEADING,
  HOME_CARD,
  POST,
  SELECT,
  SLIDER,
} from "../utils/Const.js";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";
import Chatbot from "../customComponents/Chatbot.jsx";
import Heading from "../customComponents/Heading.jsx";
import Banner from "../customComponents/Banner.jsx";

const HOME_SCREEN = {
  name: "Home Screen",
  pageClass: "home-screen",
  children: [
    {
      type: CONTAINER,
      className: "homeselect",
      children: [
        {
          type: SELECT,
          className: "select-city-button",
          sliceName: "filter",
          name: "city",
          defaultValue: { label: "Gurgaon", value: "Gurgaon" },
          options: [{ label: "Gurgaon", value: "Gurgaon" }],
        },
        {
          type: SLIDER,
          sliceName: "filter",
          className: "select-range",
          name: "budget",
          minValue: 0,
          maxValue: 200000000,
          step: 1000000,
          defaultValue: [20000000, 50000000],
        },
        {
          type: API_BUTTON,
          sliceName: "filter",
          name: "search",
          buttonLabel: "Search",
          btnClass: "home-search-button",
          apiType: POST,
          navigate: "/searchResult",
          api: API_ENDPOINTS[GET_SEARCH_RESULT],
          searchWithQueryParams: true,
        },
      ],
    },
    {
      type: HEADING,
      name: "homeScreenHeading",
      tag: "h2",
      className: "home-screen-card-section-heading",
      text: "Explore Top Builder Floor to Match Your Choice",
    },
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_HOME_SCREEN_DATA,
      className: "default-home-cards",
      apiName: GET_HOME_SCREEN_DATA,
      loadMore: "Load More",
      defaultPage: 0,
      defaultLimit: 20,
      apiType: GET,
      api: API_ENDPOINTS[GET_HOME_SCREEN_DATA],
      renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
      cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
      cardClickNavigate: "/builderFloorDetails",
      addQueryParam: "{title}-{id}",
      cardClickApiType: GET,
    },
  ],
};

export default function Home() {
  return (
    <>
      <Card className="home-screen">
        <HeaderComp />
        <div className={`component_wrapper ${"header"}`}>
          <AutoFetchApi
            component={{
              api: API_ENDPOINTS[GET_HOME_SCREEN_DATA],
              className: "header",
              params: { sortType: "desc" },
            }}
            url={API_ENDPOINTS[GET_HOME_SCREEN_DATA]}
            method={GET}
            params={{ sortType: "desc" }}
          />
        </div>
        <div className={`component_wrapper ${"home-page-banner"}`}>
          <Banner
            component={{
              name: "homeImageBanner",
              className: "home-page-banner",
              text: "Start Exploring Your Dream ",
              spanText: "Builder Floor now",
              bgImage:
                "https://thumbs.dreamstime.com/b/mumbai-capital-india-mumbai-india-december-mumbai-financial-commercial-entertainment-capital-india-december-112388360.jpg",
              // searchBar: true
            }}
          />
        </div>
        <RenderComponent jsonToRender={HOME_SCREEN} />
        <div
          className={`component_wrapper ${"home-screen-card-section-bottom"}`}
        >
          <Heading
            component={{
              name: "homeScreenBottom",
              tag: "h2",
              className: "home-screen-card-section-bottom",
              text: "We are your trusted partner in finding your dream builder floor in Gurgaon",
            }}
          />
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
