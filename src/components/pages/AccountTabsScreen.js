
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import MenuState from "../customComponents/MenuState.jsx";
import Header from "../customComponents/Header.jsx";
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import Tabbar from "../customComponents/Tabbar.jsx";
import DynamicCardContainer from "../customComponents/DynamicCardContainer.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";

                export default function AccountTabsScreen() {
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
                        <Card className="account-tabs-screen">
                            
                <div className="component_wrapper homeHeader" key="undefined" id="undefined">
                    
                <div className="component_wrapper menu_comp" key="undefined" id="undefined">
                    <MenuState component={{"type":"HAMBURGER_MENU","items":[{"name":"Home","path":"/","icon":"HOME"},{"name":"Login","path":"/login","icon":"LOGIN"},{"name":"About Us","path":"/about_us","icon":"ORG"},{"name":"Contact Us","path":"/about_us#contact_us","icon":"CONTACT"},{"name":"Our Blog","path":"/blog","icon":"DOC"}],"className":"menu_comp","text":"Menu"}}  />
                </div>
            
                <div className="component_wrapper page_header_comp" key="undefined" id="undefined">
                    <Header component={{"type":"PAGE_HEADER","url":"/","image":"/BUILDER.png","title":"BuilderFloor.com","titleMobile":"BuilderFloor","className":"page_header_comp"}}  />
                </div>
            
                </div>
            
                <div className="component_wrapper header" key="undefined" id="undefined">
                    <AutoFetchApi component={{"type":"AUTO_FETCH_API_POST","method":"post","api":"https://bfservices.onrender.com/api/properties/searchPropertiesData","className":"header"}}  />
                </div>
            
                <div className="component_wrapper tabs_wrapper" key="undefined" id="undefined">
                    <Tabbar component={{"type":"TABS","tabs":[{"label":"Recent Searches","key":"recentSearches"},{"label":"Viewed","key":"viewed"},{"label":"Contacted","key":"contacted"},{"label":"Recommendations","key":"recommendations"}],"className":"tabs_wrapper"}}  />
                </div>
            
                <div className="component_wrapper result-searchdiv tab_data" key="undefined" id="undefined">
                    <DynamicCardContainer component={{"type":"DYNAMIC_CARD_CONTAINER","loadingApi":"getSearchResult","sliceName":"filter","className":"result-searchdiv tab_data","apiName":"getSearchResult","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","paginationClass":"search_pagination","renderComponentsInLoop":{"type":"SEARCH_CARD","className":"homeCards"},"cardClickApi":"https://bfservices.onrender.com/api/properties","cardClickNavigate":"/builderFloorDetails","cardClickApiType":"get","showOptions":true}} handleValueChange={handleValueChange} setSliceData={setSliceData} onLoadMore={handleLoadMore}  />
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
            