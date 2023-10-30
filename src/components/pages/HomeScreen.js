
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import MenuState from "../customComponents/MenuState.jsx";
import Header from "../customComponents/Header.jsx";
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import Banner from "../customComponents/Banner.jsx";
import SelectButton from "../customComponents/SelectButton.jsx";
import Slider from "../customComponents/Slider.jsx";
import ApiButton from "../customComponents/ApiButton.jsx";
import Heading from "../customComponents/Heading.jsx";
import DynamicCardContainer from "../customComponents/DynamicCardContainer.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";

                export default function HomeScreen() {
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
                        <Card className="home-screen">
                            
                <div className="component_wrapper homeHeader" key="undefined" id="undefined">
                    
                <div className="component_wrapper menu_comp" key="undefined" id="undefined">
                    <MenuState component={{"type":"HAMBURGER_MENU","items":[{"name":"Home","path":"/","icon":"HOME"},{"name":"Login","path":"/login","icon":"LOGIN"},{"name":"About Us","path":"/about_us","icon":"ORG"},{"name":"Contact Us","path":"/about_us#contact_us","icon":"CONTACT"},{"name":"Our Blog","path":"/blog","icon":"DOC"}],"className":"menu_comp","text":"Menu"}}  />
                </div>
            
                <div className="component_wrapper page_header_comp" key="undefined" id="undefined">
                    <Header component={{"type":"PAGE_HEADER","url":"/","image":"/BUILDER.png","title":"BuilderFloor.com","titleMobile":"BuilderFloor","className":"page_header_comp"}}  />
                </div>
            
                </div>
            
                <div className="component_wrapper header" key="undefined" id="undefined">
                    <AutoFetchApi component={{"type":"AUTO_FETCH_API","api":"https://bfservices.onrender.com/api/properties/getHomeData","className":"header","params":{"sortType":"desc"}}}  />
                </div>
            
                <div className="component_wrapper home-page-banner" key="homeImageBanner" id="undefined">
                    <Banner component={{"type":"IMAGE_BANNER","name":"homeImageBanner","className":"home-page-banner","text":"Start Exploring Your Dream ","spanText":"Builder Floor now","bgImage":"https://thumbs.dreamstime.com/b/mumbai-capital-india-mumbai-india-december-mumbai-financial-commercial-entertainment-capital-india-december-112388360.jpg"}}  />
                </div>
            
                <div className="component_wrapper homeselect" key="undefined" id="undefined">
                    
                <div className="component_wrapper select-city-button" key="city" id="undefined">
                    <SelectButton component={{"type":"SELECT","className":"select-city-button","sliceName":"filter","name":"city","defaultValue":{"label":"Gurgaon","value":"Gurgaon"},"options":[{"label":"Gurgaon","value":"Gurgaon"}]}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper select-range" key="budget" id="undefined">
                    <Slider component={{"type":"SLIDER","sliceName":"filter","className":"select-range","name":"budget","minValue":0,"maxValue":200000000,"step":1000000,"defaultValue":[20000000,50000000]}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper undefined" key="search" id="undefined">
                    <ApiButton component={{"type":"API_BUTTON","sliceName":"filter","name":"search","buttonLabel":"Search","btnClass":"home-search-button","apiType":"post","navigate":"/searchResult","api":"https://bfservices.onrender.com/api/properties/searchPropertiesData","searchWithQueryParams":true}} setSliceData={setSliceData}  />
                </div>
            
                </div>
            
                <div className="component_wrapper home-screen-card-section-heading" key="homeScreenHeading" id="undefined">
                    <Heading component={{"type":"HEADING","name":"homeScreenHeading","tag":"h2","className":"home-screen-card-section-heading","text":"Explore Top Builder Floor to Match Your Choice"}}  />
                </div>
            
                <div className="component_wrapper default-home-cards" key="undefined" id="undefined">
                    <DynamicCardContainer component={{"type":"DYNAMIC_CARD_CONTAINER","loadingApi":"getHomeScreenData","className":"default-home-cards","apiName":"getHomeScreenData","loadMore":"Load More","defaultPage":0,"defaultLimit":20,"apiType":"get","api":"https://bfservices.onrender.com/api/properties/getHomeData","renderComponentsInLoop":{"type":"HOME_CARD","className":"homeCards"},"cardClickApi":"https://bfservices.onrender.com/api/properties","cardClickNavigate":"/builderFloorDetails","addQueryParam":"{title}-{id}","cardClickApiType":"get"}} handleValueChange={handleValueChange} setSliceData={setSliceData} onLoadMore={handleLoadMore}  />
                </div>
            
                <div className="component_wrapper home-screen-card-section-bottom" key="homeScreenBottom" id="undefined">
                    <Heading component={{"type":"HEADING","name":"homeScreenBottom","tag":"h2","className":"home-screen-card-section-bottom","text":"We are your trusted partner in finding your dream builder floor in Gurgaon"}}  />
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
            