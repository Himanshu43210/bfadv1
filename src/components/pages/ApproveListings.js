import React from "react";
import { USER_ROLE } from "../../ScreenJson.js";
import LoginRefresh from "../customComponents/LoginRefresh.jsx";
import AutoFetchApiPost from "../customComponents/AutoFetchApiPost.jsx";
import {
  ALTER_PROPERTY_DATA,
  APPROVE_PROPERTY_DATA,
  GET,
  GET_ADMIN_USER_DATA,
  GET_APPROVAL_PROPERTIES,
  GET_LISTING_DATA,
  REJECT_PROPERTY,
} from "../utils/Const.js";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import Title from "../customComponents/Title.jsx";
import RealLabelMap from "../customComponents/LabelMap.jsx";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import DashboardListing from "../customComponents/DashboardListing.jsx";
import { newPropertyConst } from "../fieldConsts/PropertiesFieldConst.js";

export default function ApproveListing() {
  return (
    <div className="standalone_page approve_listing_page">
      <LoginRefresh>
        <div className={`component_wrapper ${""}`}>
          <AutoFetchApiPost
            component={{
              user: true,
              method: GET,
              api: API_ENDPOINTS[GET_APPROVAL_PROPERTIES],
            }}
          />
        </div>
        <div className={`component_wrapper ${""}`}>
          <div className={`component_wrapper ${""}`}>
            <PanelHeader
              component={{
                mainHeading: "WELCOME TO BUILDERFLOOR.COM",
                panelTitles: {
                  [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                  [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                  [USER_ROLE.salesUser]: "SUB USER PANEL",
                },
                classes: "formheadingcontainer",
                mainHeaderClass: "formheadingcontainer",
                panelTitleClass: "formheadingcontainer",
              }}
            />
          </div>
        </div>
        <div className={`component_wrapper ${""}`}>
          <Title
            component={{
              titles: ["Approve Broker Listings", "Approve Sub User Listings"],
            }}
          />
        </div>
        <div className={`component_wrapper ${"lableded-map-dashboard"}`}>
          <RealLabelMap
            component={{
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_LISTING_DATA],
              method: GET,
              endpoint: GET_LISTING_DATA,
            }}
          />
        </div>
        <div className={`component_wrapper ${""}`}>
          <div className={`component_wrapper ${""}`}>
            <DashboardListing
              component={{
                desktopHeaders: {
                  "Company Name": "createdByName",
                  "Mobile Number": "createdByPhoneNumber",
                  City: "city",
                  "Primary Title": "title",
                  Location: "location",
                  "Plot No.": "plotNumber",
                  Floor: "floor",
                  Title: "title",
                  Accommodation: "accommodation",
                  Facing: "facing",
                  Possession: "possession",
                  Price: "price",
                  "Builder Name": "builderName",
                  "Builder Contact Name": "builderContact",
                },
                roleSpecificDesktopHeaders: {
                  [USER_ROLE.bfAdmin]: {
                    "Company Name": "createdByName",
                    "Mobile Number": "createdByPhoneNumber",
                    "Primary Title": "title",
                    City: "city",
                    State: "state",
                    Location: "sectorNumber",
                  },
                  [USER_ROLE.channelPartner]: {
                    "Sub User Name": "createdByName",
                    "Mobile Number": "createdByPhoneNumber",
                    City: "city",
                    "Primary Title": "title",
                  },
                },
                state: true,
                user: true,
                getDataApi: GET_APPROVAL_PROPERTIES,
                dataApi: GET_APPROVAL_PROPERTIES,
                endpoint: API_ENDPOINTS[GET_APPROVAL_PROPERTIES],
                dataPoint: GET_APPROVAL_PROPERTIES,
                editApi: ALTER_PROPERTY_DATA,
                // deleteApi: DELETE_PROPERTY_DATA,
                fieldConst: newPropertyConst,
                hideAlterActions: true,
                showPreviewButton: true,
                showEditAction: true,
                approveApi: APPROVE_PROPERTY_DATA,
                removeApi: REJECT_PROPERTY,
                disableRowModal: true,
              }}
            />
            <div className={`component_wrapper ${"toogle-filter"}`}>
              <CustomRouteButton
                component={{
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                }}
              />
            </div>
          </div>
        </div>
      </LoginRefresh>
    </div>
  );
}
