
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import LoginRefresh from "../customComponents/LoginRefresh.jsx";

                export default function StatsScreen() {
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
                        <Card className="standalone_page stats_page">
                            
                <div className="component_wrapper " key="" id="undefined">
                    <LoginRefresh component={{"type":"LOGIN_REFRESH","name":"","className":"","children":[{"type":"CONTAINER","children":[{"type":"PANEL_HEADER","mainHeading":"WELCOME TO BUILDERFLOOR.COM","panelTitles":{"BuilderFloorAdmin":"SUPER ADMIN PANEL","ChannelPartner":"CHANNEL PARTNER ADMIN PANEL","SalesUser":"SUB USER PANEL"},"classes":"formheadingcontainer","mainHeaderClass":"formheadingcontainer","panelTitleClass":"formheadingcontainer"}]},{"type":"title","titles":["Statistics"],"common":true},{"type":"LABEL_MAP","className":"lableded-map-dashboard","api":"https://bfservices.onrender.com/api/properties/getPropertiesListingCounts","method":"get","endpoint":"getPropertiesListingCounts"},{"type":"AUTO_FETCH_API_USER","user":true,"userId":true,"method":"get","api":"https://bfservices.onrender.com/api/properties/getPropertiesCountsByUserId"},{"type":"CONTAINER","name":"","className":"","children":[{"type":"CONTAINER","name":"","className":"","children":[{"type":"DASHBOARD_LISTING","data":{},"desktopHeaders":{"Company Name":"name","Mobile Number":"phoneNumber","City":"city","Total Listings":"total_count","Approved":"approved_count","Pending":"pending_count","Rejected":"rejected_count"},"removeApi":"rejectProperty","user":true,"mobileHeaders":{"Company Name":"name","Mobile Number":"phoneNumber","City":"city","Total Listings":"total_count","Approved":"approved_count","Pending":"pending_count","Rejected":"rejected_count"},"fieldConst":[{"name":"name","label":"Name","dataKey":"name","type":"text","isRequired":true,"requiredErrorMessage":"Please enter your name."},{"name":"phoneNumber","label":"Mobile Number","dataKey":"PhoneNumber","type":"text","isRequired":true,"requiredErrorMessage":"Please enter your phone number.","regex":{},"regexErrorMessage":"Invalid phone number"},{"name":"email","label":"Email","dataKey":"email","type":"text","isRequired":true,"requiredErrorMessage":"Please enter your email.","regex":{},"regexErrorMessage":"Invalid Email"},{"name":"companyName","label":"Company Name","dataKey":"companyName","type":"text","isRequired":true,"requiredErrorMessage":"Please enter your name."},{"name":"companyAddress","label":"Company Address","dataKey":"companyAddress","type":"text","isRequired":true,"requiredErrorMessage":"Please enter your address."},{"name":"city","label":"city","dataKey":"city","type":"select","isRequired":true,"requiredErrorMessage":"Please select a City."},{"name":"state","label":"state","dataKey":"state","type":"select","isRequired":true,"requiredErrorMessage":"Please select a State."},{"name":"sectorNumber","label":"Locations Allowed","dataKey":"location","type":"select","isRequired":true,"isMulti":true,"requiredErrorMessage":"Please select a Locations."}],"editApi":"alterUserData","deleteApi":"deleteUserData","getDataApi":"getPropertiesCountsByUserId","approveApi":"approvePropertyData","endpoint":"https://bfservices.onrender.com/api/properties/getPropertiesCountsByUserId","dataPoint":"getPropertiesCountsByUserId","hideActions":true,"showViewAllListing":"listingData"}]}]},{"type":"ROUTE_BUTTON","className":"toogle-filter","label":"Back","name":"Back","route":"/admin"}]}}  />
                </div>
            
                        </Card>
                    );
                }
            