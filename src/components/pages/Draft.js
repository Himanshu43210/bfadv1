import React, { useState } from "react";
import _ from "lodash";
import { USER_ROLE } from "../../ScreenJson.js";
import LoginRefresh from "../customComponents/LoginRefresh.jsx";
import AutoFetchApiPost from "../customComponents/AutoFetchApiPost.jsx";
import { API_DOMAIN, API_ENDPOINTS } from "@/redux/utils/api.js";
import { POST } from "../utils/Const.js";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import Title from "../customComponents/Title.jsx";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import DashboardListing from "../customComponents/DashboardListing.jsx";
import { newPropertyConst } from "../fieldConsts/PropertiesFieldConst.js";

export default function Draft() {
  const [filterValue, setFilterValue] = useState("");
  const [filterKey, setFilterKey] = useState("");

  let payload = { sortType: "desc" };

  if (filterKey && filterValue) {
    payload = { ...payload, [filterKey]: filterValue };
  }

  return (
    <>
      <div className="standalone_page master_table_page">
        <LoginRefresh>
          <div className={`component_wrapper ${""}`}>
            <AutoFetchApiPost
              component={{
                api: `${API_DOMAIN}properties/v2/adminPropertyListDraft`,
                data: payload,
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
                  "Draft Data of Super Admin",
                  "Draft Data of Broker",
                  "Draft Data of Sub User",
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
                    Actions: "actions",
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
                    Actions: "actions",
                  },
                  roleSpecificDesktopHeaders: {
                    [USER_ROLE.bfAdmin]: {
                      Location: "sectorNumber",
                      "Plot No": "plotNumber",
                      Size: "size",
                      "Floor 1": "floor",
                      "Floor 1 Price": "price",
                      "Floor 1 Possession": "possession",
                      "Floor 2": "floor",
                      "Floor 2 Price": "price",
                      "Floor 2 Possession": "possession",
                      "Floor 3": "floor",
                      "Floor 3 Price": "price",
                      "Floor 3 Possession": "possession",
                      "Floor 4": "floor",
                      "Floor 4 Price": "price",
                      "Floor 4 Possession": "possession",
                      Accommodation: "accommodation",
                      Facing: "facing",
                      "Park Facing": "parkFacing",
                      Corner: "corner",
                      "Builder Name": "builderName",
                      "Builder Contact": "builderContact",
                      "Owner Contact": "ownerContact",
                      "Created By": "parentId.name",
                      "Updated At": "updatedAt",
                      Actions: "actions",
                    },
                    [USER_ROLE.channelPartner]: {
                      Location: "sectorNumber",
                      "Plot No": "plotNumber",
                      Size: "size",
                      "Floor 1": "floor",
                      "Floor 1 Price": "price",
                      "Floor 1 Possession": "possession",
                      "Floor 2": "floor",
                      "Floor 2 Price": "price",
                      "Floor 2 Possession": "possession",
                      "Floor 3": "floor",
                      "Floor 3 Price": "price",
                      "Floor 3 Possession": "possession",
                      "Floor 4": "floor",
                      "Floor 4 Price": "price",
                      "Floor 4 Possession": "possession",
                      Accommodation: "accommodation",
                      Facing: "facing",
                      "Park Facing": "parkFacing",
                      Corner: "corner",
                      "Builder Name": "builderName",
                      "Builder Contact": "builderContact",
                      "Owner Contact": "ownerContact",
                      "Created By": "parentId.name",
                      "Updated At": "updatedAt",
                      Actions: "actions",
                    },
                    [USER_ROLE.salesUser]: {
                      Location: "sectorNumber",
                      "Plot No": "plotNumber",
                      Size: "size",
                      "Floor 1": "floor",
                      "Floor 1 Price": "price",
                      "Floor 1 Possession": "possession",
                      "Floor 2": "floor",
                      "Floor 2 Price": "price",
                      "Floor 2 Possession": "possession",
                      "Floor 3": "floor",
                      "Floor 3 Price": "price",
                      "Floor 3 Possession": "possession",
                      "Floor 4": "floor",
                      "Floor 4 Price": "price",
                      "Floor 4 Possession": "possession",
                      Accommodation: "accommodation",
                      Facing: "facing",
                      "Park Facing": "parkFacing",
                      Corner: "corner",
                      "Builder Name": "builderName",
                      "Builder Contact": "builderContact",
                      "Owner Contact": "ownerContact",
                      "Approved By": "parentId.name",
                      "Updated At": "updatedAt",
                      Actions: "actions",
                    },
                  },
                  fieldConst: newPropertyConst,

                  disableRowModal: true,
                  showPreviewButton: true,
                  showColumnFilter: true,
                  allowSelect: true,
                  showFilter: true,
                  setFilterValue: setFilterValue,
                  filterValue: filterValue,
                  setFilterKey: setFilterKey,
                  filterKey: filterKey,
                  hideActions: true,
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
