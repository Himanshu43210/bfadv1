
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import MenuState from "../customComponents/MenuState.jsx";
import Header from "../customComponents/Header.jsx";
import SelectButton from "../customComponents/SelectButton.jsx";
import Slider from "../customComponents/Slider.jsx";
import ApiButton from "../customComponents/ApiButton.jsx";
import DynamicHeading from "../customComponents/DynamicHeading.jsx";
import DropSelect from "../customComponents/DropSelect.jsx";
import SelectSlider from "../customComponents/SelectSlider.jsx";
import CustomToogleButton from "../customComponents/CustomToogleButton.jsx";
import Button from "../customComponents/Button.jsx";
import DynamicCardContainer from "../customComponents/DynamicCardContainer.jsx";
import Footer from "../customComponents/Footer.jsx";
import ScrollToTop from "../customComponents/ScrollToTop.jsx";

                export default function SearchResultScreen() {
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
                        <Card className="search-result-screen">
                            
                <div className="component_wrapper homeHeader" key="undefined" id="undefined">
                    
                <div className="component_wrapper menu_comp" key="undefined" id="undefined">
                    <MenuState component={{"type":"HAMBURGER_MENU","items":[{"name":"Home","path":"/","icon":"HOME"},{"name":"Login","path":"/login","icon":"LOGIN"},{"name":"About Us","path":"/about_us","icon":"ORG"},{"name":"Contact Us","path":"/about_us#contact_us","icon":"CONTACT"},{"name":"Our Blog","path":"/blog","icon":"DOC"}],"className":"menu_comp","text":"Menu"}}  />
                </div>
            
                <div className="component_wrapper page_header_comp" key="undefined" id="undefined">
                    <Header component={{"type":"PAGE_HEADER","url":"/","image":"/BUILDER.png","title":"BuilderFloor.com","titleMobile":"BuilderFloor","className":"page_header_comp"}}  />
                </div>
            
                </div>
            
                <div className="component_wrapper actioncontainer" key="undefined" id="undefined">
                    
                <div className="component_wrapper select-city-button" key="city" id="undefined">
                    <SelectButton component={{"type":"SELECT","className":"select-city-button","sliceName":"filter","name":"city","defaultValue":{"label":"Gurgaon","value":"Gurgaon"},"options":[{"label":"Gurgaon","value":"Gurgaon"}],"onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post"}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper select-range" key="budget" id="undefined">
                    <Slider component={{"type":"SLIDER","sliceName":"filter","className":"select-range","name":"budget","minValue":0,"maxValue":200000000,"step":1000000,"defaultValue":[20000000,50000000]}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper undefined" key="search" id="undefined">
                    <ApiButton component={{"type":"API_BUTTON","sliceName":"filter","name":"search","buttonLabel":"Search","btnClass":"sr-search-button","apiType":"post","navigate":"/searchResult","api":"https://bfservices.onrender.com/api/properties/searchPropertiesData"}} setSliceData={setSliceData}  />
                </div>
            
                </div>
            
                <div className="component_wrapper match-found-heading" key="matchFoundHeading" id="undefined">
                    <DynamicHeading component={{"type":"API_HEADING","name":"matchFoundHeading","tag":"h2","className":"match-found-heading","dynamicDetails":{"api":"getSearchResult","textReplace":"_TEXT_TO_REPLACE_"},"text":"_TEXT_TO_REPLACE_ Matches Found"}}  />
                </div>
            
                <div className="component_wrapper cardBodyContainer" key="cardBodyContainer" id="undefined">
                    
                <div className="component_wrapper filter-button-div" key="undefined" id="undefined">
                    
                <div className="component_wrapper filter-button-div-overflowed" key="undefined" id="undefined">
                    
                <div className="component_wrapper filterbutton" key="floor" id="undefined">
                    <DropSelect component={{"type":"SELECT2","sliceName":"filter","name":"floor","label":"Floors","className":"filterbutton","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","options":[{"label":"First Floor","value":"1ST FLOOR"},{"label":"Second Floor","value":"2ND FLOOR"},{"label":"Third Floor","value":"3RD FLOOR"},{"label":"Fourth Floor","value":"4TH FLOOR"},{"label":"Basement + First Floor","value":"FIRSTBASEMENT"}],"zIndex":95}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper filterChannel" key="location" id="undefined">
                    <DropSelect component={{"type":"SELECT2","sliceName":"filter","name":"location","label":"Locations","className":"filterChannel","fetchOptionsApi":"https://bfservices.onrender.com/api/masters/getMasterDataOnHome","optionKey":"sectorNumber","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","options":[{"label":"DLF Phase 1","value":"DLF PHASE 1"},{"label":"DLF Phase 2","value":"DLF PHASE 2"},{"label":"DLF Phase 3","value":"DLF PHASE 3"},{"label":"DLF Phase 4","value":"DLF PHASE 4"},{"label":"DLF Phase 5","value":"DLF PHASE 5"},{"label":"Sector 4","value":"SECTOR 4"},{"label":"Sector 5","value":"SECTOR 5"},{"label":"Sector 17","value":"SECTOR 17"},{"label":"Sector 27","value":"SECTOR 27"},{"label":"Sector 28","value":"SECTOR 28"},{"label":"Sector 38","value":"SECTOR 38"},{"label":"Sector 40","value":"SECTOR 40"},{"label":"Sector 42","value":"SECTOR 42"},{"label":"Sector 43","value":"SECTOR 43"},{"label":"Sector 45","value":"SECTOR 45"},{"label":"Sector 46","value":"SECTOR 46"},{"label":"Sector 50","value":"SECTOR 50"},{"label":"Sector 55","value":"SECTOR 55"},{"label":"Sector 57","value":"SECTOR 57"},{"label":"Sector 12A","value":"SECTOR 12A"},{"label":"Sector Southend","value":"SECTOR 57"},{"label":"South City 1","value":"SOUTH CITY 1"},{"label":"Sushant Lok 1","value":"SUSHANT LOK 1"},{"label":"Sushant Lok 3","value":"SUSHANT LOK 3"},{"label":"Nirvana Country","value":"NIRVANA COUNTRY"},{"label":"Emaar Emerald Hills","value":"EMAAR EMERALD HILLS"},{"label":"New Colony","value":"NEW COLONY"},{"label":"Ardee City","value":"ARDEE CITY"},{"label":"Sun City","value":"SUNCITY"},{"label":"Rosewood City","value":"ROSEWOOD CITY"},{"label":"Malibu Town","value":"MALIBU TOWN"},{"label":"Vatika India Next","value":"VATIKA INDIA NEXT"},{"label":"Uppal Southend","value":"UPPAL SOUTHEND"},{"label":"BPTP Amstoria","value":"BPTP AMSTORIA "},{"label":"Anant Raj","value":"ANANT RAJ"}],"zIndex":94}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper undefined" key="size" id="undefined">
                    <SelectSlider component={{"type":"SELECT_SLIDER","sliceName":"filter","name":"size","buttonLabel":"Size","minValue":0,"maxValue":1000,"onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","step":0.1,"defaultValue":[180,360],"zIndex":93}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper filterbutton" key="accommodation" id="undefined">
                    <DropSelect component={{"type":"SELECT2","sliceName":"filter","name":"accommodation","label":"Accommodation","className":"filterbutton","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","options":[{"label":"2 BHK","value":"2 BHK"},{"label":"3 BHK","value":"3 BHK"},{"label":"4 BHK","value":"4 BHK"},{"label":"5 BHK","value":"5 BHK"},{"label":"6 BHK","value":"6 BHK"}],"zIndex":92}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper filterbutton" key="possession" id="undefined">
                    <DropSelect component={{"type":"SELECT2","sliceName":"filter","name":"possession","label":"Possession","className":"filterbutton","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","options":[{"label":"Ready","value":"Ready"},{"label":"1 Months","value":"1M"},{"label":"3 Months","value":"3M"},{"label":"6 Months","value":"6M"},{"label":"9 Months","value":"9M"},{"label":"12 Months","value":"12M"}],"zIndex":91}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper filterbutton" key="facing" id="undefined">
                    <DropSelect component={{"type":"SELECT2","sliceName":"filter","name":"facing","label":"Facing","className":"filterbutton","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","options":[{"label":"North","value":"North"},{"label":"South","value":"South"},{"label":"East","value":"East"},{"label":"West","value":"West"},{"label":"North-East","value":"NorthEast"},{"label":"North-West","value":"NorthWest"},{"label":"South-East","value":"SouthEast"},{"label":"South-West","value":"SouthWest"}],"zIndex":90}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper filterbutton" key="sortBy" id="undefined">
                    <DropSelect component={{"type":"SELECT2","sliceName":"filter","name":"sortBy","label":"Sort By","className":"filterbutton","maxAllowed":1,"onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","options":[{"label":"Price High to Low","value":"Price High to Low"},{"label":"Price Low to High","value":"Price Low to High"}],"zIndex":89}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper toogle-filter" key="parkFacing" id="undefined">
                    <CustomToogleButton component={{"type":"TOGGLE_BUTTON","className":"toogle-filter","sliceName":"filter","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","label":"Park","name":"parkFacing"}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper toogle-filter" key="corner" id="undefined">
                    <CustomToogleButton component={{"type":"TOGGLE_BUTTON","className":"toogle-filter","sliceName":"filter","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","label":"Corner","name":"corner"}} handleValueChange={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                <div className="component_wrapper toogle-filter filter_reset_btn" key="Reset" id="undefined">
                    <Button component={{"type":"BUTTON","className":"toogle-filter filter_reset_btn","sliceName":"filter","onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","label":"Reset","name":"Reset","isReset":true}} handleOnClick={handleValueChange} setSliceData={setSliceData}  />
                </div>
            
                </div>
            
                </div>
            
                <div className="component_wrapper result-searchdiv" key="undefined" id="undefined">
                    <DynamicCardContainer component={{"type":"DYNAMIC_CARD_CONTAINER","loadingApi":"getSearchResult","sliceName":"filter","className":"result-searchdiv","apiName":"getSearchResult","paginatioName":"page","defaultPage":1,"cardPerPage":5,"onClickApi":"https://bfservices.onrender.com/api/properties/searchPropertiesData","onClickApiMethod":"post","paginationClass":"search_pagination","renderComponentsInLoop":{"type":"SEARCH_CARD","className":"homeCards"},"cardClickApi":"https://bfservices.onrender.com/api/properties","cardClickNavigate":"/builderFloorDetails","cardClickApiType":"get"}} handleValueChange={handleValueChange} setSliceData={setSliceData} onLoadMore={handleLoadMore}  />
                </div>
            
                <div className="component_wrapper default-home-footer-div" key="undefined" id="undefined">
                    <Footer component={{"type":"PAGE_FOOTER","className":"default-home-footer-div","HomeLinks":{"icon":"/BUILDER.png","url":"/"},"social_media":[{"name":"INSTAGRAM_ICON","url":"https://www.instagram.com/"},{"name":"LINKEDIN_ICON","url":"https://www.linkedin.com/"}],"copyright":"© Builder Floor Official 2022"}}  />
                </div>
            
                <div className="component_wrapper undefined" key="ScrollToTop" id="undefined">
                    <ScrollToTop component={{"type":"SCROLL_TO_TOP","name":"ScrollToTop"}}  />
                </div>
            
                </div>
            
                        </Card>
                    );
                }
            