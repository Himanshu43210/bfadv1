import React from "react";
import _ from "lodash";
import { USER_ROLE } from "../../ScreenJson.js";
import LoginRefresh from "../customComponents/LoginRefresh.jsx";
import AutoFetchApiPost from "../customComponents/AutoFetchApiPost.jsx";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import {
  ALTER_PROPERTY_DATA,
  APPROVE_PROPERTY_DATA,
  DELETE_PROPERTY_DATA,
  GET_ADMIN_PROPERTY_DATA,
  POST,
} from "../utils/Const.js";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import Title from "../customComponents/Title.jsx";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import DashboardListing from "../customComponents/DashboardListing.jsx";
import { newPropertyConst } from "../fieldConsts/PropertiesFieldConst.js";

export default function PropertyManagement() {
  return (
    <>
      <div className="standalone_page master_table_page">
        <LoginRefresh>
          <div className={`component_wrapper ${""}`}>
            <AutoFetchApiPost
              component={{
                api: API_ENDPOINTS[GET_ADMIN_PROPERTY_DATA],
                data: {
                  sortType: "desc",
                  sortColumn: "updatedAt",
                },
                method: POST,
                className: "header",
                user: true,
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
                titles: [
                  "Master Data of Super Admin",
                  "Master Data of Broker",
                  "Master Data of Sub User",
                ],
              }}
            />
          </div>
          <div className={`component_wrapper ${""}`}>
            <div className={`component_wrapper ${""}`}>
              <DashboardListing
                component={{
                  data: {},
                  desktopHeaders: {
                    Location: "sectorNumber",
                    "Plot No": "plotNumber",
                    Size: "size",
                    Floor: "floor",
                    Title: "title",
                    Price: "price",
                    Accommodation: "accommodation",
                    Facing: "facing",
                    "Park Facing": "parkFacing",
                    Corner: "corner",
                    Possession: "possession",
                    "Builder Name": "builderName",
                    "Builder Contact Name": "builderContact",
                    "Created By": "channelPartner",
                    "Mobile Number": "phoneNumber",
                    "Company Name": "companyName",
                    City: "city",
                    State: "state",
                    "Dated of Posting": "createdAt",
                    "Link Share": "",
                  },
                  mobileHeaders: {
                    Location: "sectorNumber",
                    "Plot No": "plotNumber",
                    Size: "size",
                    Floor: "floor",
                    Title: "title",
                    Price: "price",
                    Accommodation: "accommodation",
                    Facing: "facing",
                    "Park Facing": "parkFacing",
                    Corner: "corner",
                    Possession: "possession",
                    "Builder Name": "builderName",
                    "Builder Contact Name": "builderContact",
                    "Created By": "channelPartner",
                    "Mobile Number": "",
                    "Company Name": "",
                    City: "Gurgaon",
                    State: "Haryana",
                    "Dated of Posting": "createdAt",
                    "Link Share": "",
                  },
                  roleSpecificDesktopHeaders: {
                    [USER_ROLE.bfAdmin]: {
                      Location: "sectorNumber",
                      "Plot No": "plotNumber",
                      Size: "size",
                      Floor: "floor",
                      Price: "price",
                      Accommodation: "accommodation",
                      Facing: "facing",
                      "Park Facing": "parkFacing",
                      Corner: "corner",
                      Possession: "possession",
                      "Builder Name": "builderName",
                      "Builder Contact": "builderContact",
                      "Created By": "parentId.name",
                      "Mobile Number": "parentId.phoneNumber",
                      "Company Name": "parentId.companyName",
                      City: "city",
                      State: "state",
                      "Updated At": "updatedAt",
                      "Link Share": "",
                    },
                    [USER_ROLE.channelPartner]: {
                      Location: "sectorNumber",
                      "Plot No": "plotNumber",
                      Size: "size",
                      Floor: "floor",
                      Price: "price",
                      Accommodation: "accommodation",
                      Facing: "facing",
                      "Park Facing": "parkFacing",
                      Corner: "corner",
                      Possession: "possession",
                      "Builder Name": "builderName",
                      "Builder Contact": "builderContact",
                      "Created By": "parentId.name",
                      "Updated At": "updatedAt",
                      "Link Share": "",
                    },
                    [USER_ROLE.salesUser]: {
                      Location: "sectorNumber",
                      "Plot No": "plotNumber",
                      Size: "size",
                      Floor: "floor",
                      Price: "price",
                      Accommodation: "accommodation",
                      Facing: "facing",
                      "Park Facing": "parkFacing",
                      Corner: "corner",
                      Possession: "possession",
                      "Builder Name": "builderName",
                      "Builder Contact Name": "builderContact",
                      "Created By": "parentId.name",
                      "Updated At": "updatedAt",
                      "Link Share": "",
                    },
                  },
                  fieldConst: newPropertyConst,
                  editApi: ALTER_PROPERTY_DATA,
                  deleteApi: DELETE_PROPERTY_DATA,
                  getDataApi: GET_ADMIN_PROPERTY_DATA,
                  approveApi: APPROVE_PROPERTY_DATA,
                  endpoint: API_ENDPOINTS[GET_ADMIN_PROPERTY_DATA],
                  dataPoint: GET_ADMIN_PROPERTY_DATA,
                  onRefreshApiType: POST,
                  disableRowModal: true,
                  showPreviewButton: true,
                  showColumnFilter: true,
                  allowSelect: true,
                  showFilter: true,
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
