import React, { useEffect } from "react";
import { USER_ROLE } from "../../ScreenJson.js";
import { ALTER_PROPERTY_DATA, ALTER_USER_DATA, BF_ADMIN, GET, GET_LISTING_DATA, GET_MASTER_DATA_ON_HOME, GET_NOT_CONTACTED_USER_COUNTS, GET_UNAPPROVED_BROKER_COUNTS } from "../utils/Const.js";
import { useDispatch } from "react-redux";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { callApi } from "../../redux/utils/apiActions.js";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import RouteButton from "../customComponents/RouteButton.jsx";
import { newUserConst } from "../fieldConsts/UserFieldConst.js";
import RealLabelMap from "../customComponents/LabelMap.jsx";
import { newPropertyConst } from "../fieldConsts/PropertiesFieldConst.js";

const SuperAdminDashboard = () => {
  return (
    <>
      <div className={`component_wrapper ${''}`}>
        <PanelHeader component={{
          mainHeading: "WELCOME TO BUILDERFLOOR.COM",
          panelTitle: "SUPER ADMIN PANEL",
          classes: "formheadingcontainer",
          mainHeaderClass: "formheadingcontainer",
          panelTitleClass: "formheadingcontainer",
        }} />
      </div>
      <div className={`component_wrapper ${'superAdminDashboard'}`}>
        <div className={`component_wrapper ${'superAdminDashboard-child-1'}`}>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Create Broker",
              name: "Create Broker",
              form: newUserConst,
              onSaveApi: ALTER_USER_DATA,
              route: "/admin/form",
              params: { type: "createBroker" },
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Manage Broker",
              name: "Manage Broker",
              route: "/admin/user",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Approve Brokers",
              name: "Approve Brokers",
              route: "/admin/approveAgents",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Approve Broker Listngs",
              name: "Approve Broker Listngs",
              route: "/admin/approveListing",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Statistics",
              name: "Statistics",
              route: "/admin/statistics",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Field Changes Master Data",
              name: "Field Changes Master Data",
              route: "/admin/master",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Master Data of Super Admin",
              name: "Master Data of Super Admin",
              route: "/admin/masterTable",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Manage Customers",
              name: "Manage Customers",
              route: "/admin/manageCustomers",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Customers to Reach Out",
              name: "Customers to Reach Out",
              route: "/admin/reachOutCustomers",
            }} />
          </div>
        </div>
        <div className={`component_wrapper ${'superAdminDashboard-child-1'}`}>
          <div className={`component_wrapper ${'lableded-map-dashboard'}`}>
            <RealLabelMap component={{
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_LISTING_DATA],
              parentClassName: "super-admin-label",
              method: GET,
              endpoint: GET_LISTING_DATA,
            }} />
          </div>
          <div className={`component_wrapper ${'lableded-map-dashboard'}`}>
            <RealLabelMap component={{
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_UNAPPROVED_BROKER_COUNTS],
              parentClassName: "super-admin-label",
              method: GET,
              endpoint: GET_UNAPPROVED_BROKER_COUNTS,
            }} />
          </div>
          <div className={`component_wrapper ${'lableded-map-dashboard'}`}>
            <RealLabelMap component={{
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_NOT_CONTACTED_USER_COUNTS],
              parentClassName: "super-admin-label",
              method: GET,
              endpoint: GET_NOT_CONTACTED_USER_COUNTS,
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

const BrokerDashboard = () => {
  return (
    <>
      <div className={`component_wrapper ${''}`}>
        <PanelHeader component={{
          mainHeading: "WELCOME TO BUILDERFLOOR.COM",
          panelTitle: "BROKER ADMIN PANEL",
          classes: "formheadingcontainer",
          mainHeaderClass: "formheadingcontainer",
          panelTitleClass: "formheadingcontainer",
        }} />
      </div>
      <div className={`component_wrapper ${'superAdminDashboard'}`}>
        <div className={`component_wrapper ${'superAdminDashboard-child-1'}`}>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Create Sub User",
              name: "Create Sub User",
              form: newUserConst,
              onSaveApi: ALTER_USER_DATA,
              route: "/admin/form",
              params: { type: "createSubUser" },
              autofill: [
                "companyName",
                "companyAddress",
                "city",
                "state",
                "location",
              ],
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Manage Sub User",
              name: "Manage Sub User",
              route: "/admin/user",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Approve Sub User Listngs",
              name: "Approve Sub User Listngs",
              route: "/admin/approveListing",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Statistics",
              name: "Statistics",
              route: "/admin/statistics",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Post Listing",
              name: "Post Listing",
              form: newPropertyConst,
              onSaveApi: ALTER_PROPERTY_DATA,
              route: "/admin/form",
              params: { type: "postListing" },
              autofill: ["city", "state", "location"],
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Customer Engagement",
              name: "Customer Engagement",
              route: "/admin/customers",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Master Data of Broker",
              name: "Master Data of Broker",
              route: "/admin/masterTable",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button ar_edit_btn",
              label: "Edit Account Data",
              name: "Edit Account Data",
              route: "/admin/account/edit",
            }} />
          </div>

        </div>
        <div className={`component_wrapper ${'superAdminDashboard-child-1'}`}>
          <div className={`component_wrapper ${'lableded-map-dashboard'}`}>
            <RealLabelMap component={{
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_LISTING_DATA],
              method: GET,
              endpoint: GET_LISTING_DATA,
              parentClassName: "super-admin-label",
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

const SubUserDashboard = () => {
  return (
    <>
      <div className={`component_wrapper ${''}`}>
        <PanelHeader component={{
          mainHeading: "WELCOME TO BUILDERFLOOR.COM",
          panelTitle: "SUB USER PANEL",
          classes: "formheadingcontainer",
          mainHeaderClass: "formheadingcontainer",
          panelTitleClass: "formheadingcontainer",
        }} />
      </div>
      <div className={`component_wrapper ${'superAdminDashboard'}`}>
        <div className={`component_wrapper ${'superAdminDashboard-child-1'}`}>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Statistics",
              name: "Statistics",
              route: "/admin/statistics",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Post Listing",
              name: "Post Listing",
              form: newPropertyConst,
              onSaveApi: ALTER_PROPERTY_DATA,
              route: "/admin/form",
              params: { type: "postListing" },
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button",
              label: "Master Data of Sub User",
              name: "Master Data of Sub User",
              route: "/admin/masterTable",
            }} />
          </div>
          <div className={`component_wrapper ${'admin_route_button'}`}>
            <RouteButton component={{
              className: "admin_route_button ar_edit_btn",
              label: "Edit Account Data",
              name: "Edit Account Data",
              route: "/admin/account/edit",
            }} />
          </div>
        </div>
        <div className={`component_wrapper ${'superAdminDashboard-child-1'}`}>
          <div className={`component_wrapper ${'lableded-map-dashboard'}`}>
            <RealLabelMap component={{
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_LISTING_DATA],
              method: GET,
              endpoint: GET_LISTING_DATA,
              parentClassName: "super-admin-label",
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default function AdminDashboard({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const options = {
        url: API_ENDPOINTS[GET_MASTER_DATA_ON_HOME],
        method: GET,
        headers: { "Content-Type": "application/json" },
      };
      dispatch(callApi(options));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderRoleSpecificDashboard = () => {
    switch (role) {
      case USER_ROLE[BF_ADMIN]:
        return <SuperAdminDashboard />;
      case USER_ROLE["channelPartner"]:
        return <BrokerDashboard />;
      default:
        return <SubUserDashboard />;
    }
  };

  return (
    <div className="admin_dashboard">
      {renderRoleSpecificDashboard()}
    </div>
  );
}
