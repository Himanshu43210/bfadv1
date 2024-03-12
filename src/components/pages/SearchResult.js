import React from "react";
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import HeaderComp from "../newComponents/HeaderComp.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";
import Chatbot from "../customComponents/Chatbot.jsx";
import {
  API_BUTTON,
  API_HEADING,
  BUTTON,
  CONTAINER,
  DYNAMIC_CARD_CONTAINER,
  GET,
  GET_CARD_DATA,
  GET_MASTER_DATA_ON_HOME,
  GET_SEARCH_RESULT,
  POST,
  SEARCH_CARD,
  SELECT,
  SELECT2,
  SELECT_SLIDER,
  SELECT_SLIDER2,
  SLIDER,
  TOGGLE_BUTTON,
} from "../utils/Const.js";
import { API_ENDPOINTS } from "@/redux/utils/api.js";

export const SEARCH_RESULT = {
  name: "Search Result",
  pageClass: "search-result-screen",
  className: "klk",
  children: [
    // {
    //   type: CONTAINER,
    //   className: "actioncontainer",
    //   // location and price range filter
    //   children: [
    //     {
    //       type: SELECT,
    //       className: "select-city-button",
    //       sliceName: "filter",
    //       name: "city",
    //       defaultValue: { label: "Gurgaon", value: "Gurgaon" },
    //       options: [{ label: "Gurgaon", value: "Gurgaon" }],
    //       onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
    //       onClickApiMethod: POST,
    //     },
    //     {
    //       type: SLIDER,
    //       sliceName: "filter",
    //       className: "select-range",
    //       name: "budget",
    //       minValue: 0,
    //       maxValue: 200000000,
    //       step: 1000000,
    //       defaultValue: [20000000, 50000000],
    //     },
    //     {
    //       type: API_BUTTON,
    //       sliceName: "filter",
    //       name: "search",
    //       buttonLabel: "Search",
    //       btnClass: "sr-search-button",
    //       apiType: POST,
    //       navigate: "/searchResult",
    //       api: API_ENDPOINTS[GET_SEARCH_RESULT],
    //     },
    //   ],
    // },
    // results found heading
    // {
    //   type: API_HEADING,
    //   name: "matchFoundHeading",
    //   tag: "h2",
    //   className: "match-found-heading",
    //   dynamicDetails: {
    //     api: GET_SEARCH_RESULT,
    //     textReplace: "_TEXT_TO_REPLACE_",
    //   },
    //   text: "_TEXT_TO_REPLACE_ Matches Found",
    // },
    {
      type: CONTAINER,
      name: "cardBodyContainer",
      className: "cardBodyContainer",
      children: [
        {
          type: CONTAINER,
          className: "filter-button-div",
          // filters ...
          children: [
            {
              type: CONTAINER,
              className: "filter-button-div-overflowed",
              children: [
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "floor",
                  label: "Floors",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "First Floor", value: "1ST FLOOR" },
                    { label: "Second Floor", value: "2ND FLOOR" },
                    { label: "Third Floor", value: "3RD FLOOR" },
                    { label: "Fourth Floor", value: "4TH FLOOR" },
                    { label: "Basement + First Floor", value: "FIRSTBASEMENT" },
                  ],
                  zIndex: 95,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "location",
                  label: "Locations",
                  className: "filterChannel",
                  fetchOptionsApi: API_ENDPOINTS[GET_MASTER_DATA_ON_HOME],
                  optionKey: "sectorNumber",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "DLF Phase 1", value: "DLF PHASE 1" },
                    { label: "DLF Phase 2", value: "DLF PHASE 2" },
                    { label: "DLF Phase 3", value: "DLF PHASE 3" },
                    { label: "DLF Phase 4", value: "DLF PHASE 4" },
                    { label: "DLF Phase 5", value: "DLF PHASE 5" },
                    { label: "Sector 4", value: "SECTOR 4" },
                    { label: "Sector 5", value: "SECTOR 5" },
                    { label: "Sector 17", value: "SECTOR 17" },
                    { label: "Sector 27", value: "SECTOR 27" },
                    { label: "Sector 28", value: "SECTOR 28" },
                    { label: "Sector 38", value: "SECTOR 38" },
                    { label: "Sector 40", value: "SECTOR 40" },
                    { label: "Sector 42", value: "SECTOR 42" },
                    { label: "Sector 43", value: "SECTOR 43" },
                    { label: "Sector 45", value: "SECTOR 45" },
                    { label: "Sector 46", value: "SECTOR 46" },
                    { label: "Sector 50", value: "SECTOR 50" },
                    { label: "Sector 55", value: "SECTOR 55" },
                    { label: "Sector 57", value: "SECTOR 57" },
                    { label: "Sector 12A", value: "SECTOR 12A" },
                    { label: "Sector Southend", value: "SECTOR 57" },
                    { label: "South City 1", value: "SOUTH CITY 1" },
                    { label: "Sushant Lok 1", value: "SUSHANT LOK 1" },
                    { label: "Sushant Lok 3", value: "SUSHANT LOK 3" },
                    { label: "Nirvana Country", value: "NIRVANA COUNTRY" },
                    {
                      label: "Emaar Emerald Hills",
                      value: "EMAAR EMERALD HILLS",
                    },
                    { label: "New Colony", value: "NEW COLONY" },
                    { label: "Ardee City", value: "ARDEE CITY" },
                    { label: "Sun City", value: "SUNCITY" },
                    { label: "Rosewood City", value: "ROSEWOOD CITY" },
                    { label: "Malibu Town", value: "MALIBU TOWN" },
                    { label: "Vatika India Next", value: "VATIKA INDIA NEXT" },
                    { label: "Uppal Southend", value: "UPPAL SOUTHEND" },
                    { label: "BPTP Amstoria", value: "BPTP AMSTORIA " },
                    { label: "Anant Raj", value: "ANANT RAJ" },
                  ],
                  zIndex: 94,
                },
                {
                  type: SELECT_SLIDER,
                  sliceName: "filter",
                  name: "size",
                  buttonLabel: "Size",
                  minValue: 0.0,
                  maxValue: 1000.0,
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  step: 0.1,
                  defaultValue: [180.0, 360.0],
                  zIndex: 93,
                },
                // {
                //   type: SELECT,
                //   className: "filterbutton",
                //   sliceName: "filter",
                //   name: "city",
                //   defaultValue: { label: "Gurgaon", value: "Gurgaon" },
                //   options: [{ label: "Gurgaon", value: "Gurgaon" }],
                //   onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                //   onClickApiMethod: POST,
                // },
                {
                  type: SELECT_SLIDER2,
                  sliceName: "filter",
                  name: "budget",
                  buttonLabel: "Budget",
                  minValue: 0,
                  maxValue: 200000000,
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  step: 1000000,
                  defaultValue: [20000000, 50000000],
                  zIndex: 93,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "accommodation",
                  label: "Accommodation",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "2 BHK", value: "2 BHK" },
                    { label: "3 BHK", value: "3 BHK" },
                    { label: "4 BHK", value: "4 BHK" },
                    { label: "5 BHK", value: "5 BHK" },
                    { label: "6 BHK", value: "6 BHK" },
                  ],
                  zIndex: 92,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "possession",
                  label: "Possession",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "Ready", value: "Ready" },
                    { label: "1 Months", value: "1M" },
                    { label: "3 Months", value: "3M" },
                    { label: "6 Months", value: "6M" },
                    { label: "9 Months", value: "9M" },
                    { label: "12 Months", value: "12M" },
                  ],
                  zIndex: 91,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "facing",
                  label: "Facing",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "North", value: "North" },
                    { label: "South", value: "South" },
                    { label: "East", value: "East" },
                    { label: "West", value: "West" },
                    { label: "North-East", value: "NorthEast" },
                    { label: "North-West", value: "NorthWest" },
                    { label: "South-East", value: "SouthEast" },
                    { label: "South-West", value: "SouthWest" },
                  ],
                  zIndex: 90,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "sortBy",
                  label: "Sort By",
                  className: "filterbutton",
                  maxAllowed: 1,
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "Price High to Low", value: "Price High to Low" },
                    { label: "Price Low to High", value: "Price Low to High" },
                  ],
                  zIndex: 89,
                },
                {
                  type: TOGGLE_BUTTON,
                  className: "toogle-filter",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Park",
                  name: "parkFacing",
                },
                {
                  type: TOGGLE_BUTTON,
                  className: "toogle-filter",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Corner",
                  name: "corner",
                },
                {
                  type: BUTTON,
                  className: "toogle-filter filter_reset_btn",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Reset",
                  name: "Reset",
                  isReset: true,
                },
              ],
            },
          ],
        },
        {
          type: API_HEADING,
          name: "matchFoundHeading",
          tag: "h2",
          className: "match-found-heading",
          dynamicDetails: {
            api: GET_SEARCH_RESULT,
            textReplace: "_TEXT_TO_REPLACE_",
          },
          text: "_TEXT_TO_REPLACE_ Matches Found",
        },
        // properties list
        {
          type: DYNAMIC_CARD_CONTAINER,
          loadingApi: GET_SEARCH_RESULT,
          sliceName: "filter",
          className: "result-searchdiv",
          apiName: GET_SEARCH_RESULT,
          paginatioName: "page",
          defaultPage: 1,
          cardPerPage: 5,
          onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
          onClickApiMethod: POST,
          paginationClass: "search_pagination",
          renderComponentsInLoop: {
            type: SEARCH_CARD,
            className: "homeCards",
          },
          cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
          cardClickNavigate: "/builderFloorDetails",
          cardClickApiType: GET,
        },
      ],
    },
  ],
};

export default function SearchResult() {
  return (
    <>
      <Card className="search-result-screen">
        <HeaderComp />
        <RenderComponent jsonToRender={SEARCH_RESULT} />
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
