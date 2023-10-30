
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import MenuState from "../customComponents/MenuState.jsx";
import Header from "../customComponents/Header.jsx";
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import DetailedDataCard from "../customComponents/DetailedDataCard.jsx";
import Line from "../customComponents/Line.jsx";
import Heading from "../customComponents/Heading.jsx";
import DynamicCardContainer from "../customComponents/DynamicCardContainer.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";

                export default function PropertyDetailScreen() {
                      const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs
  const dispatch = useDispatch();
  // const sliceData = useSelector((state) => state[component.sliceName]);
  const [sliceData, setSliceData] = useState({});

  const getData = (payload, component) => {
    console.log('++++++++++ payload : get data ++++++++++', payload, component.paginatioName || component.name);
    const page = (component.paginatioName || component.name) !== "page" ? sliceData.page : 0;
    let reqPayload = {};
    if (payload == null) {
      reqPayload = {
        budget: sliceData?.budget,
        city: sliceData?.city,
        page: page,
      };
    } else {
      reqPayload = {
        ...sliceData,
        [component.paginatioName || component.name]: (typeof payload === "object")
          ? Array.isArray(payload)
            ? payload
            : payload.value
          : payload,
      };
    }
    const markForDeletion = [];
    Object.keys(reqPayload).forEach((key) => {
      if (
        reqPayload[key] === false ||
        (Array.isArray(reqPayload[key]) && reqPayload[key].length === 0)
      ) {
        markForDeletion.push(key);
      }
      if (reqPayload[key] === true) {
        reqPayload[key] = "YES";
      }
    });
    markForDeletion.forEach(key => {
      delete reqPayload[key];
    });
    const options = {
      url: component.onClickApi,
      method: component.onClickApiMethod,
      headers: { "Content-Type": "application/json" },
      data: reqPayload,
    };
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (Object.keys(reqPayload).includes("budget")) {
      dispatch(callApi(options));
    }
  };

  const handleValueChange = (value, component) => {
    console.log('--------------- HANDLE VALUE CHANGE -------------', component.paginatioName || component.name, value, sliceData);
    if ((component.paginatioName || component.name) === "Reset") {
      // reset filters
      dispatch(resetFilterData({
        budget: sliceData?.budget,
        city: sliceData?.city,
        page: 0
      }));
      if (component.onClickApi) {
        getData(null, component);
      }
    } else {
      dispatch(
        storeFilterData({
          key: component.paginatioName || component.name,
          value:
            typeof value === "object"
              ? Array.isArray(value)
                ? value
                : value.value
              : value,
        })
      );
      console.log('============ CALLING THE GET DATA ONLY IF onClickApi ==============', component.onClickApi);
      if (component.onClickApi) {
        getData(value, component);
      }
    }
  };

  const handleLoadMore = (payload, component) => {
    const options = {
      url: component.api,
      method: component.apiType,
      headers: { "Content-Type": "application/json" },
      params: payload,
    };
    if (component.api) {
      dispatch(callApi(options));
    }
  };



                    return (
                        <Card className="property_page detail-screen">
                            
                <div className="component_wrapper homeHeader" key="undefined" id="undefined">
                    
                <div className="component_wrapper menu_comp" key="undefined" id="undefined">
                    <MenuState component={{"type":"HAMBURGER_MENU","items":[{"name":"Home","path":"/","icon":"HOME"},{"name":"Login","path":"/login","icon":"LOGIN"},{"name":"About Us","path":"/about_us","icon":"ORG"},{"name":"Contact Us","path":"/about_us#contact_us","icon":"CONTACT"},{"name":"Our Blog","path":"/blog","icon":"DOC"}],"className":"menu_comp","text":"Menu"}}  />
                </div>
            
                <div className="component_wrapper page_header_comp" key="undefined" id="undefined">
                    <Header component={{"type":"PAGE_HEADER","url":"/","image":"/BUILDER.png","title":"BuilderFloor.com","titleMobile":"BuilderFloor","className":"page_header_comp"}}  />
                </div>
            
                </div>
            
                <div className="component_wrapper header" key="undefined" id="undefined">
                    <AutoFetchApi component={{"type":"AUTO_FETCH_API","api":"https://bfservices.onrender.com/api/properties/getSimilarProperties?limit=5","className":"header"}}  />
                </div>
            
                <div className="component_wrapper property_images_container" key="detailedViewImage" id="undefined">
                    <DetailedDataCard component={{"type":"DETAILED_VIEW","name":"detailedViewImage","loadingApi":"getCardData","className":"property_images_container","apiSliceName":"getCardData","whatsappText":"Hi! I saw a property {link} on BuilderFloor.com and I am interested in it. Is it available?","icons":{"sectorNumber":"/icons/location.png","size":"/icons/area.png","accommodation":"/icons/home.png","floor":"/icons/stairs.png","facing":"/icons/compass.png","possession":"/icons/check.png","parkFacing":"/icons/park.png","corner":"/icons/right.png"}}}  />
                </div>
            
                <div className="component_wrapper property_details_divider" key="undefined" id="undefined">
                    <Line component={{"type":"HORIZONTAL_LINE","className":"property_details_divider"}}  />
                </div>
            
                <div className="component_wrapper explore_similar_options_heading" key="undefined" id="undefined">
                    <Heading component={{"type":"HEADING","className":"explore_similar_options_heading","text":"Explore similar options to match your choice"}}  />
                </div>
            
                <div className="component_wrapper default-home-cards similar_options_list" key="undefined" id="undefined">
                    <DynamicCardContainer component={{"type":"DYNAMIC_CARD_CONTAINER","loadingApi":"getSimilarPropertyData","className":"default-home-cards similar_options_list","apiName":"getSimilarPropertyData","renderComponentsInLoop":{"type":"HOME_CARD","className":"homeCards"},"defaultLimit":4,"cardClickApi":"https://bfservices.onrender.com/api/properties","cardClickNavigate":"/builderFloorDetails","addQueryParam":"{title}-{id}","cardClickApiType":"get"}} handleValueChange={handleValueChange} setSliceData={setSliceData} onLoadMore={handleLoadMore}  />
                </div>
            
                <div className="component_wrapper default-home-footer-div" key="undefined" id="undefined">
                    <Footer component={{"type":"PAGE_FOOTER","className":"default-home-footer-div","HomeLinks":{"icon":"/BUILDER.png","url":"/"},"social_media":[{"name":"INSTAGRAM_ICON","url":"https://www.instagram.com/"},{"name":"LINKEDIN_ICON","url":"https://www.linkedin.com/"}],"copyright":"© Builder Floor Official 2022"}}  />
                </div>
            
                <div className="component_wrapper undefined" key="ScrollToTop" id="undefined">
                    <ScrollToTop component={{"type":"SCROLL_TO_TOP","name":"ScrollToTop"}}  />
                </div>
            
                        </Card>
                    );
                }
            