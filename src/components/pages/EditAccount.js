import React from "react";
import { USER_ROLE } from "../../ScreenJson.js";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import {
  ALTER_USER_DATA,
  DELETE_USER_DATA,
  GET,
  GET_ADMIN_USER_DATA_BY_ID,
} from "../utils/Const.js";
import LoginRefresh from "../customComponents/LoginRefresh.jsx";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import AutoFetchApiPost from "../customComponents/AutoFetchApiPost.jsx";
import Title from "../customComponents/Title.jsx";
import { API_ENDPOINTS } from "@/redux/utils/api.js";
import DashboardListing from "../customComponents/DashboardListing.jsx";
import { editUserConst } from "../fieldConsts/UserFieldConst.js";

const EditAccount = () => {
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
            <AutoFetchApiPost
              component={{
                user: true,
                method: GET,
                api: API_ENDPOINTS[GET_ADMIN_USER_DATA_BY_ID],
              }}
            />
          </div>
          <div className={`component_wrapper ${""}`}>
            <Title
              component={{
                titles: ["Edit Account", "Edit Account", "Edit Account"],
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
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    State: "state",
                    Status: "status",
                  },
                  mobileHeaders: {
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    State: "state",
                    Status: "status",
                  },
                  fieldConst: editUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_ADMIN_USER_DATA_BY_ID,
                  endpoint: API_ENDPOINTS[GET_ADMIN_USER_DATA_BY_ID],
                  dataPoint: GET_ADMIN_USER_DATA_BY_ID,
                  showPreviewButton: false,
                  disableRowModal: true,
                  showTableControls: false,
                  showPagination: false,
                }}
              />
              <div className={`component_wrapper ${"toogle-filter"}`}>
                <CustomRouteButton
                  component={{
                    className: "admin-route-button",
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
};

export default EditAccount;
