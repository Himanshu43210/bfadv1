
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    
    import { useEffect } from "react";
    import { API_ENDPOINTS } from "../../redux/utils/api.js";
    import { GET, GET_PROPERTY_LIST_BY_USER_ID } from "../utils/Const.js";
    import LoginRefresh from "../customComponents/LoginRefresh.jsx";

                export default function ViewListingScreen() {
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


  const pathname = window.location.href;
  const id = pathname.split("id=").pop();
  const dispatch2 = useDispatch();
  useEffect(() => {
    try {
      const options = {
        url: API_ENDPOINTS[GET_PROPERTY_LIST_BY_USER_ID] + "?userId=" + id,
        method: GET,
        headers: { "Content-Type": "application/json" },
      };
      dispatch2(callApi(options));
    } catch (error) {
      console.log(error);
    }
  }, [id]);

                    return (
                        <Card className="standalone_page">
                            
                <div className="component_wrapper " key="" id="undefined">
                    <LoginRefresh component={{"type":"LOGIN_REFRESH","name":"","className":"","children":[{"type":"CONTAINER","children":[{"type":"PANEL_HEADER","mainHeading":"WELCOME TO BUILDERFLOOR.COM","panelTitles":{"BuilderFloorAdmin":"SUPER ADMIN PANEL","ChannelPartner":"CHANNEL PARTNER ADMIN PANEL","SalesUser":"SUB USER PANEL"},"classes":"formheadingcontainer","mainHeaderClass":"formheadingcontainer","panelTitleClass":"formheadingcontainer"}]},{"type":"HEADING","name":"allListing","text":"All Listing","className":"formheadingcontainer"},{"type":"DASHBOARD_LISTING","desktopHeaders":{"Location":"sectorNumber","Plot No.":"plotNumber","Size":"size","Floor":"floor","Title":"title","Price":"price","Accommodation":"accommodation","Facing":"facing","Park Facing":"parkFacing","Corner":"corner","Possession":"possession","Builder Name":"builderName","Builder Contact Name":"builderContact","City":"city","State":"state","Dated of Posting":"updatedAt"},"mobileHeaders":{"Title":"title","Price":"price","Accommodation":"accommodation"},"user":true,"getDataApi":"getPropertiesListByUserId","endpoint":"https://bfservices.onrender.com/api/properties/getPropertiesListByUserId","dataPoint":"getPropertiesListByUserId","useParamsFromUrl":{"userId":"id"},"hideAlterActions":true,"disableRowModal":true,"showPreviewButton":true,"showEditAction":false,"showDeleteAction":false},{"type":"ROUTE_BUTTON","className":"toogle-filter","label":"Back","name":"Back","route":"/admin/statistics"}]}}  />
                </div>
            
                        </Card>
                    );
                }
            