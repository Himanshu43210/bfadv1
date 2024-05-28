import _ from "lodash";
import React from "react";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import { USER_ROLE } from "../../ScreenJson.js";
import LoginRefresh from "../customComponents/LoginRefresh.jsx";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import AutoFetchApiPost from "../customComponents/AutoFetchApiPost.jsx";
import {
  ALTER_USER_DATA,
  DELETE_USER_DATA,
  GET,
  GET_ADMIN_USER_DATA,
} from "../utils/Const.js";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import DashboardListing from "../customComponents/DashboardListing.jsx";
import { editUserConst } from "../fieldConsts/UserFieldConst.js";
import Title from "../customComponents/Title.jsx";

export default function UserManagement() {
  return (
    <div className="standalone_page user_management_page">
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
          <AutoFetchApiPost
            component={{
              user: true,
              method: GET,
              api: API_ENDPOINTS[GET_ADMIN_USER_DATA],
            }}
          />
        </div>
        <div className={`component_wrapper ${""}`}>
          <Title
            component={{
              titles: ["Manage Broker", "Manage Sub User"],
            }}
          />
        </div>
        <div className={`component_wrapper ${""}`}>
          <div className={`component_wrapper ${""}`}>
            <DashboardListing
              component={{
                data: {},
                roleSpecific: false,
                desktopHeaders: {
                  "Company Name": "companyName",
                  "Mobile Number": "phoneNumber",
                  Name: "name",
                  City: "city",
                  State: "state",
                  Status: "status",
                  // "Address": "address",
                  // "Email": "email",
                  // "Role": "role",
                  // "Parent Id": "parentId",
                  // "Status": "status",
                },
                mobileHeaders: {
                  Name: "name",
                  Role: "role",
                },
                state: true,
                fieldConst: editUserConst,
                editApi: ALTER_USER_DATA,
                deleteApi: DELETE_USER_DATA,
                getDataApi: GET_ADMIN_USER_DATA,
                // approveApi: APPROVE_PROPERTY_DATA,
                endpoint: API_ENDPOINTS[GET_ADMIN_USER_DATA],
                dataPoint: GET_ADMIN_USER_DATA,
                showPreviewButton: false,
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
