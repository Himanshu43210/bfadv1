import React from "react";
import _ from "lodash";
import { USER_ROLE } from "../../ScreenJson.js";
import LoginRefresh from "../customComponents/LoginRefresh.jsx";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import Title from "../customComponents/Title.jsx";
import RealLabelMap from "../customComponents/LabelMap.jsx";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import {
  ALTER_USER_DATA,
  APPROVE_PROPERTY_DATA,
  DELETE_USER_DATA,
  GET,
  GET_LISTING_DATA,
  GET_PROPERTY_USER,
  REJECT_PROPERTY,
} from "../utils/Const.js";
import AutoFetchApiPost from "../customComponents/AutoFetchApiPost.jsx";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import { newUserConst } from "../fieldConsts/UserFieldConst.js";
import DashboardListing from "../customComponents/DashboardListing.jsx";

export default function StatsListing() {
  return (
    <>
      <div className={`standalone_page stats_page`}>
        <LoginRefresh>
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
                titles: ["Statistics"],
                common: true,
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
            <AutoFetchApiPost
              component={{
                user: true,
                userId: true,
                method: GET,
                api: API_ENDPOINTS[GET_PROPERTY_USER],
              }}
            />
          </div>
          <div className={`component_wrapper ${""}`}>
            <div className={`component_wrapper ${""}`}>
              <DashboardListing
                component={{
                  data: {},
                  desktopHeaders: {
                    "Company Name": "name",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    "Total Listings": "total_count",
                    Approved: "approved_count",
                    Pending: "pending_count",
                    Rejected: "rejected_count",
                    // "View all Listings": "",
                  },
                  removeApi: REJECT_PROPERTY,
                  user: true,
                  mobileHeaders: {
                    "Company Name": "name",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    "Total Listings": "total_count",
                    Approved: "approved_count",
                    Pending: "pending_count",
                    Rejected: "rejected_count",
                  },
                  fieldConst: newUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_PROPERTY_USER,
                  approveApi: APPROVE_PROPERTY_DATA,
                  endpoint: API_ENDPOINTS[GET_PROPERTY_USER],
                  dataPoint: GET_PROPERTY_USER,
                  hideActions: true,
                  showViewAllListing: "listingData",
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
    </>
  );
}
