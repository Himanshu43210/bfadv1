import { newPropertyConst } from "./components/fieldConsts/PropertiesFieldConst.js";
import {
  newUserConst,
} from "./components/fieldConsts/UserFieldConst.js";
import {
  ALTER_PROPERTY_DATA,
  ALTER_USER_DATA,
  CONTAINER,
  GET,
  GET_LISTING_DATA,
  GET_NOT_CONTACTED_USER_COUNTS,
  GET_UNAPPROVED_BROKER_COUNTS,
  LABEL_MAP,
  PANEL_HEADER,
  ROUTE_BUTTON,
} from "./components/utils/Const.js";
import { API_ENDPOINTS } from "./redux/utils/api.js";

export const AD_USER_DASHBOARD = {
  name: "User Dashboard Screen",
  children: [
    {
      type: CONTAINER,
      // className: "superAdminDashboard",
      children: [
        {
          type: PANEL_HEADER,
          mainHeading: "WELCOME TO BUILDERFLOOR.COM",
          panelTitle: "SUPER ADMIN PANEL",
          classes: "formheadingcontainer",
          mainHeaderClass: "formheadingcontainer",
          panelTitleClass: "formheadingcontainer",
        },
      ],
    },
    {
      type: CONTAINER,
      className: "superAdminDashboard",
      children: [
        {
          type: CONTAINER,
          className: "superAdminDashboard-child-1",
          children: [
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Create Broker",
              name: "Create Broker",
              form: newUserConst,
              onSaveApi: ALTER_USER_DATA,
              route: "/admin/form",
              params: { type: "createBroker" },
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Manage Broker",
              name: "Manage Broker",
              route: "/admin/user",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Approve Brokers",
              name: "Approve Brokers",
              route: "/admin/approveAgents",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Approve Broker Listngs",
              name: "Approve Broker Listngs",
              route: "/admin/approveListing",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Statistics",
              name: "Statistics",
              route: "/admin/statistics",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Field Changes Master Data",
              name: "Field Changes Master Data",
              route: "/admin/master",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Master Data of Super Admin",
              name: "Master Data of Super Admin",
              route: "/admin/masterTable",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Manage Customers",
              name: "Manage Customers",
              route: "/admin/manageCustomers",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Customers to Reach Out",
              name: "Customers to Reach Out",
              route: "/admin/reachOutCustomers",
            },
          ],
        },
        {
          type: CONTAINER,
          className: "superAdminDashboard-child-1",
          children: [
            {
              type: LABEL_MAP,
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_LISTING_DATA],
              parentClassName: "super-admin-label",
              method: GET,
              endpoint: GET_LISTING_DATA,
            },
            {
              type: LABEL_MAP,
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_UNAPPROVED_BROKER_COUNTS],
              parentClassName: "super-admin-label",
              method: GET,
              endpoint: GET_UNAPPROVED_BROKER_COUNTS,
            },
            {
              type: LABEL_MAP,
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_NOT_CONTACTED_USER_COUNTS],
              parentClassName: "super-admin-label",
              method: GET,
              endpoint: GET_NOT_CONTACTED_USER_COUNTS,
            },
          ],
        },
      ],
    },
  ],
};

export const CP_USER_DASHBOARD = {
  name: "User Dashboard Screen",
  children: [
    {
      type: CONTAINER,
      // className: "superAdminDashboard",
      children: [
        {
          type: PANEL_HEADER,
          mainHeading: "WELCOME TO BUILDERFLOOR.COM",
          panelTitle: "BROKER ADMIN PANEL",
          classes: "formheadingcontainer",
          mainHeaderClass: "formheadingcontainer",
          panelTitleClass: "formheadingcontainer",
        },
      ],
    },
    {
      type: CONTAINER,
      className: "superAdminDashboard",
      children: [
        {
          type: CONTAINER,
          className: "superAdminDashboard-child-1",
          children: [
            {
              type: ROUTE_BUTTON,
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
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Manage Sub User",
              name: "Manage Sub User",
              route: "/admin/user",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Approve Sub User Listngs",
              name: "Approve Sub User Listngs",
              route: "/admin/approveListing",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Statistics",
              name: "Statistics",
              route: "/admin/statistics",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Post Listing",
              name: "Post Listing",
              form: newPropertyConst,
              onSaveApi: ALTER_PROPERTY_DATA,
              route: "/admin/form",
              params: { type: "postListing" },
              autofill: ["city", "state", "location"],
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Customer Engagement",
              name: "Customer Engagement",
              route: "/admin/customers",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Master Data of Broker",
              name: "Master Data of Broker",
              route: "/admin/masterTable",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button ar_edit_btn",
              label: "Edit Account Data",
              name: "Edit Account Data",
              route: "/admin/account/edit",
            },
          ],
        },
        {
          type: CONTAINER,
          className: "superAdminDashboard-child-1",
          children: [
            {
              type: LABEL_MAP,
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_LISTING_DATA],
              method: GET,
              endpoint: GET_LISTING_DATA,
              parentClassName: "super-admin-label",
            },
          ],
        },
      ],
    },
  ],
};

export const SU_USER_DASHBOARD = {
  name: "User Dashboard Screen",
  children: [
    {
      type: CONTAINER,
      // className: "superAdminDashboard",
      children: [
        {
          type: PANEL_HEADER,
          mainHeading: "WELCOME TO BUILDERFLOOR.COM",
          panelTitle: "SUB USER PANEL",
          classes: "formheadingcontainer",
          mainHeaderClass: "formheadingcontainer",
          panelTitleClass: "formheadingcontainer",
        },
      ],
    },
    {
      type: CONTAINER,
      className: "superAdminDashboard",
      children: [
        {
          type: CONTAINER,
          className: "superAdminDashboard-child-1",
          children: [
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Statistics",
              name: "Statistics",
              route: "/admin/statistics",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Post Listing",
              name: "Post Listing",
              form: newPropertyConst,
              onSaveApi: ALTER_PROPERTY_DATA,
              route: "/admin/form",
              params: { type: "postListing" },
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Master Data of Sub User",
              name: "Master Data of Sub User",
              route: "/admin/masterTable",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button ar_edit_btn",
              label: "Edit Account Data",
              name: "Edit Account Data",
              route: "/admin/account/edit",
            },
          ],
        },
        {
          type: CONTAINER,
          className: "superAdminDashboard-child-1",
          children: [
            {
              type: LABEL_MAP,
              className: "lableded-map-dashboard",
              api: API_ENDPOINTS[GET_LISTING_DATA],
              method: GET,
              endpoint: GET_LISTING_DATA,
              parentClassName: "super-admin-label",
            },
          ],
        },
      ],
    },
  ],
};
