
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../redux/utils/apiActions.js";
    import LoginRefresh from "../customComponents/LoginRefresh.jsx";

                export default function ApproveListingScreen() {
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
                        <Card className="standalone_page approve_listing_page">
                            
                <div className="component_wrapper " key="" id="undefined">
                    <LoginRefresh component={{"type":"LOGIN_REFRESH","name":"","className":"","children":[{"type":"AUTO_FETCH_API_USER","user":true,"method":"get","api":"https://bfservices.onrender.com/api/properties/getApprovalProperties"},{"type":"CONTAINER","children":[{"type":"PANEL_HEADER","mainHeading":"WELCOME TO BUILDERFLOOR.COM","panelTitles":{"BuilderFloorAdmin":"SUPER ADMIN PANEL","ChannelPartner":"CHANNEL PARTNER ADMIN PANEL","SalesUser":"SUB USER PANEL"},"classes":"formheadingcontainer","mainHeaderClass":"formheadingcontainer","panelTitleClass":"formheadingcontainer"}]},{"type":"title","titles":["Approve Channel Partner Listings","Approve Sub User Listings"]},{"type":"LABEL_MAP","className":"lableded-map-dashboard","api":"https://bfservices.onrender.com/api/properties/getPropertiesListingCounts","method":"get","endpoint":"getPropertiesListingCounts"},{"type":"DASHBOARD_LISTING","desktopHeaders":{"Company Name":"createdByName","Mobile Number":"createdByPhoneNumber","City":"city","Primary Title":"title","Location":"location","Plot No.":"plotNumber","Floor":"floor","Title":"title","Accommodation":"accommodation","Facing":"facing","Possession":"possession","Price":"price","Builder Name":"builderName","Builder Contact Name":"builderContact"},"roleSpecificDesktopHeaders":{"BuilderFloorAdmin":{"Company Name":"createdByName","Mobile Number":"createdByPhoneNumber","City":"city","Primary Title":"title"},"ChannelPartner":{"Sub User Name":"createdByName","Mobile Number":"createdByPhoneNumber","City":"city","Primary Title":"title"}},"user":true,"getDataApi":"getApprovalProperties","dataApi":"getApprovalProperties","endpoint":"https://bfservices.onrender.com/api/properties/getApprovalProperties","dataPoint":"getApprovalProperties","editApi":"alterPropertyData","fieldConst":[{"name":"state","label":"State","type":"select","parentclassName":"property-w-1","isRequired":true,"requiredErrorMessage":"Please select a state."},{"name":"city","label":"City","type":"select","parentclassName":"property-w-1","isRequired":true,"requiredErrorMessage":"Please select a city."},{"name":"sectorNumber","label":"Location","type":"select","parentclassName":"property-w-1","isRequired":true,"requiredErrorMessage":"Please select a sector number."},{"name":"plotNumber","label":"Plot Number","parentclassName":"property-w-1","type":"text","isRequired":false,"requiredErrorMessage":"Please enter a plot number."},{"name":"size","nameType":"sizeType","parentclassName":"property-w-1","label":"Size","className":"property-price-class","type":"size","options":[{"value":"Sq.Yd.","label":"Sq.Yd."},{"value":"Sq.Mt.","label":"Sq.Mt."}],"defaultOption":{"value":"Sq.Yd.","label":"Sq.Yd."},"isRequired":true,"requiredErrorMessage":"Please enter a size."},{"name":"floor","label":"Floor","parentclassName":"property-w-1","type":"select","isRequired":true,"requiredErrorMessage":"Please enter a floor."},{"name":"price","label":"Price","parentclassName":"property-w-1","type":"price","className":"property-price-class","isRequired":true,"requiredErrorMessage":"Please enter a price."},{"name":"accommodation","label":"Accommodation","type":"select","parentclassName":"property-w-1","isRequired":true,"requiredErrorMessage":"Please select an accommodation."},{"name":"facing","label":"Facing","type":"select","parentclassName":"property-w-1","isRequired":true,"requiredErrorMessage":"Please select a facing direction."},{"name":"parkFacing","label":"Park Facing","type":"radio","parentclassName":"property-w-1","dataKey":"parkFacing","isRequired":true,"options":[{"value":"Yes","label":"Yes"},{"value":"No","label":"No"}],"requiredErrorMessage":"Please select an option for park facing."},{"name":"corner","label":"Corner","type":"radio","isRequired":true,"parentclassName":"property-w-1","dataKey":"corner","options":[{"value":"Yes","label":"Yes"},{"value":"No","label":"No"}],"requiredErrorMessage":"Please select an option for corner."},{"name":"possession","label":"Possession","type":"select","parentclassName":"property-w-1","isRequired":true,"requiredErrorMessage":"Please select a possession status."},{"name":"builderName","label":"Builder Name","parentclassName":"property-w-2","type":"text","isRequired":false,"requiredErrorMessage":"Please enter a builder name."},{"name":"builderContact","label":"Builder Contact","parentclassName":"property-w-2","type":"text","isRequired":false,"requiredErrorMessage":"Please enter a builder contact.","regex":{},"regexErrorMessage":"Invalid builder contact"},{"name":"title","label":"Primary Title","parentclassName":"property-w-2 property-margin-r large_field_wrapper","className":"large_field","type":"creatable_select","isRequired":true,"requiredErrorMessage":"Please enter a title."},{"name":"detailTitle","parentclassName":"property-w-2 property-margin-r large_field_wrapper","className":"large_field","label":"Secondary Title","type":"text","textLimit":100,"isRequired":true,"requiredErrorMessage":"Please enter a detail title."},{"name":"description","label":"Description","type":"textarea","parentclassName":"property-w-3 column-property large_field_wrapper","className":"column-property large_textarea_field","isRequired":true,"textLimit":100,"requiredErrorMessage":"Please enter a description."},{"name":"thumbnailFile","label":"Front (Main) Image","parentclassName":"property-w-1","type":"file","isMulti":false,"isRequired":true,"requiredErrorMessage":"Please Add Thumbnail Image","acceptedFileTypes":"image/*"},{"name":"normalImageFile","label":"More (Normal) Images","type":"file","isMulti":true,"parentclassName":"property-w-1","isRequired":false,"requiredErrorMessage":"Please Add Normal Image","acceptedFileTypes":"image/*"},{"name":"threeSixtyImages","label":"Only 360 Images","parentclassName":"property-w-1","type":"file","isMulti":true,"isRequired":false,"requiredErrorMessage":"Please Add 360 Image","acceptedFileTypes":"image/*"},{"name":"layoutFile","label":"Layout Plan","parentclassName":"property-w-1","type":"file","isMulti":true,"isRequired":false,"requiredErrorMessage":"Please Add Layout Image","acceptedFileTypes":"image/*"},{"name":"videoFile","label":"Load Videos","parentclassName":"property-w-1","type":"file","isMulti":true,"isRequired":false,"requiredErrorMessage":"Please Add Video File","acceptedFileTypes":"video/*"},{"name":"virtualFile","label":"Load Virtual Tour","parentclassName":"property-w-1","type":"file","isMulti":true,"isRequired":false,"requiredErrorMessage":"Please Add Virtual Image","acceptedFileTypes":"image/*"}],"hideAlterActions":true,"showPreviewButton":true,"showEditAction":true,"approveApi":"approvePropertyData","removeApi":"rejectProperty","disableRowModal":true},{"type":"ROUTE_BUTTON","className":"toogle-filter","label":"Back","name":"Back","route":"/admin"}]}}  />
                </div>
            
                        </Card>
                    );
                }
            