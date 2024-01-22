import { newPropertyConst } from "./components/fieldConsts/PropertiesFieldConst.js";
import { editCustomerConst, editReachOutCustomerConst, editUserConst, newUserConst } from "./components/fieldConsts/UserFieldConst.js";
import {
  ALTER_PROPERTY_DATA,
  ALTER_USER_DATA,
  API_BUTTON,
  API_HEADING,
  APPROVE_AGENT,
  APPROVE_PROPERTY_DATA,
  AUTO_FETCH_API,
  AUTO_FETCH_API_POST,
  AUTO_FETCH_API_USER,
  BUTTON,
  CHATBOT,
  CONTAINER,
  DASHBOARD_LISTING,
  DELETE_CUSTOMER,
  DELETE_NOTIFICATION,
  DELETE_PROPERTY_DATA,
  DELETE_REACH_OUT_USER,
  DELETE_USER_DATA,
  DETAILED_VIEW,
  DYNAMIC_CARD_CONTAINER,
  EDIT_CUSTOMER,
  EDIT_REACH_OUT_USER_STATUS,
  GET,
  GET_ADMIN_PROPERTY_DATA,
  GET_ADMIN_USER_DATA,
  GET_ADMIN_USER_DATA_BY_ID,
  GET_APPROVAL_PROPERTIES,
  GET_CARD_DATA,
  GET_CUSTOMERS_LIST,
  GET_HOME_SCREEN_DATA,
  GET_LISTING_DATA,
  GET_MASTER_DATA_ON_HOME,
  GET_NOTIFICATIONS_LIST,
  GET_NOT_CONTACTED_USER_COUNTS,
  GET_PROPERTY_LIST_BY_USER_ID,
  GET_PROPERTY_USER,
  GET_REACH_OUT_USERS,
  GET_SEARCH_RESULT,
  GET_SIMILAR_PROPERTY_DATA,
  GET_UNAPPROVED_AGENTS_DATA,
  GET_UNAPPROVED_BROKER_COUNTS,
  HAMBURGER_MENU,
  HEADER_COMP,
  HEADING,
  HOME_CARD,
  HORIZONTAL_LINE,
  IMAGE_BANNER,
  INSTAGRAM_ICON,
  LABEL_MAP,
  LINKEDIN_ICON,
  LIST,
  LOGIN_REFRESH,
  NAVIGATE_BUTTON,
  OTP_LOGIN,
  PAGE_FOOTER,
  PAGE_HEADER,
  PANEL_HEADER,
  POST,
  PUT,
  REJECT_PROPERTY,
  ROUTE_BUTTON,
  SCROLL_TO_TOP,
  SEARCH_CARD,
  SELECT,
  SELECT2,
  SELECT_SLIDER,
  SLIDER,
  TABS,
  TITLE,
  TOGGLE_BUTTON,
} from "./components/utils/Const.js";
import { API_ENDPOINTS } from "./redux/utils/api.js";

export const USER_ROLE = {
  bfAdmin: "BuilderFloorAdmin",
  channelPartner: "ChannelPartner",
  salesUser: "SalesUser",
};

export const MANAGE_USER = {
  name: "Master table",
  pageClass: "standalone_page user_management_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_ADMIN_USER_DATA],
        },
        {
          type: TITLE,
          titles: ["Manage Broker", "Manage Sub User"],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
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
                    Role: "role"
                  },
                  fieldConst: editUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_ADMIN_USER_DATA,
                  // approveApi: APPROVE_PROPERTY_DATA,
                  endpoint: API_ENDPOINTS[GET_ADMIN_USER_DATA],
                  dataPoint: GET_ADMIN_USER_DATA,
                  showPreviewButton: false,
                  disableRowModal: true,
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const MANAGE_CUSTOMER = {
  name: "Master table",
  pageClass: "standalone_page customer_management_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          // user: true,
          method: GET,
          api: API_ENDPOINTS[GET_CUSTOMERS_LIST],
        },
        {
          type: TITLE,
          titles: ["Manage Customers"],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    Name: "fullName",
                    "Phone Number": "phoneNumber",
                    "Email": "email",
                    Status: "status",
                    "Created At": "updatedAt",
                  },
                  mobileHeaders: {
                    Name: "fullName",
                    "Phone Number": "phoneNumber",
                    "Email": "email",
                    Status: "status",
                    "Created At": "updatedAt",
                  },
                  fieldConst: editCustomerConst,
                  editApi: EDIT_CUSTOMER,
                  deleteApi: DELETE_CUSTOMER,
                  getDataApi: GET_CUSTOMERS_LIST,
                  endpoint: API_ENDPOINTS[GET_CUSTOMERS_LIST],
                  dataPoint: GET_CUSTOMERS_LIST,
                  showPreviewButton: false,
                  disableRowModal: true,
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const MANAGE_REACH_OUT_USERS = {
  name: "Customers to Reach Out",
  pageClass: "standalone_page customer_management_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          method: GET,
          api: API_ENDPOINTS[GET_REACH_OUT_USERS],
        },
        {
          type: TITLE,
          titles: ["Customers to Reach Out"],
        },
        {
          type: LABEL_MAP,
          className: "lableded-map-dashboard",
          api: API_ENDPOINTS[GET_NOT_CONTACTED_USER_COUNTS],
          parentClassName: "super-admin-label",
          method: GET,
          endpoint: GET_NOT_CONTACTED_USER_COUNTS,
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    "Phone Number": "phoneNumber",
                    Contacted: "contacted",
                    "Created At": "createdAt",
                    "Last Updated": "updatedAt",
                  },
                  mobileHeaders: {
                    "Phone Number": "phoneNumber",
                    Contacted: "contacted",
                    "Created At": "createdAt",
                    "Last Updated": "updatedAt",
                  },
                  fieldConst: editReachOutCustomerConst,
                  editApi: EDIT_REACH_OUT_USER_STATUS,
                  deleteApi: DELETE_REACH_OUT_USER,
                  getDataApi: GET_REACH_OUT_USERS,
                  endpoint: API_ENDPOINTS[GET_REACH_OUT_USERS],
                  dataPoint: GET_REACH_OUT_USERS,
                  showPreviewButton: false,
                  disableRowModal: true,
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const MANAGE_AGENT = {
  name: "Master table",
  pageClass: "standalone_page user_management_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
        },
        {
          type: TITLE,
          titles: ["Approve Brokers"],
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
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
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
                    Role: "role"
                  },
                  fieldConst: editUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_UNAPPROVED_AGENTS_DATA,
                  approveApi: APPROVE_AGENT,
                  approveApiMethod: PUT,
                  endpoint: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
                  dataPoint: GET_UNAPPROVED_AGENTS_DATA,
                  showPreviewButton: false,
                  disableRowModal: true,
                  showEditAction: true,
                  hideAlterActions: true,
                  showDeleteAction: true,
                  showApproveAction: true
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const MANAGE_ACCOUNT = {
  name: "Master table",
  pageClass: "standalone_page user_management_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_ADMIN_USER_DATA_BY_ID],
        },
        {
          type: TITLE,
          titles: ["Edit Account", "Edit Account", "Edit Account"],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
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
                  showPagination: false
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const CP_CUSTOMERS = {
  name: "Customers",
  pageClass: "standalone_page cp_customers_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
        },
        {
          type: TITLE,
          titles: ["Approve Brokers"],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
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
                    Role: "role"
                  },
                  fieldConst: editUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_UNAPPROVED_AGENTS_DATA,
                  approveApi: APPROVE_AGENT,
                  approveApiMethod: PUT,
                  endpoint: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
                  dataPoint: GET_UNAPPROVED_AGENTS_DATA,
                  showPreviewButton: false,
                  disableRowModal: true,
                  showEditAction: true,
                  hideAlterActions: true,
                  showDeleteAction: true,
                  showApproveAction: true
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const STATS_LIST = {
  name: "Master table",
  pageClass: "standalone_page stats_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: TITLE,
          titles: ["Statistics"],
          common: true,
        },
        {
          type: LABEL_MAP,
          className: "lableded-map-dashboard",
          api: API_ENDPOINTS[GET_LISTING_DATA],
          method: GET,
          endpoint: GET_LISTING_DATA,
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          userId: true,
          method: GET,
          api: API_ENDPOINTS[GET_PROPERTY_USER],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
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
                },
              ],
            },
          ],
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin",
        },
      ],
    },
  ],
};

export const APPROVAL_PROPERTIES = {
  name: "Master table",
  pageClass: "standalone_page approve_listing_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_APPROVAL_PROPERTIES],
        },
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: TITLE,
          titles: [
            "Approve Broker Listings",
            "Approve Sub User Listings",
          ],
        },
        {
          type: LABEL_MAP,
          className: "lableded-map-dashboard",
          api: API_ENDPOINTS[GET_LISTING_DATA],
          method: GET,
          endpoint: GET_LISTING_DATA,
        },
        {
          type: DASHBOARD_LISTING,
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
              City: "city",
              "Primary Title": "title",
            },
            [USER_ROLE.channelPartner]: {
              "Sub User Name": "createdByName",
              "Mobile Number": "createdByPhoneNumber",
              City: "city",
              "Primary Title": "title",
            },
          },
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
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin",
        },
      ],
    },
  ],
};

export const AD_MASTER_TABLE = {
  name: "Master table",
  pageClass: "standalone_page master_table_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: AUTO_FETCH_API_USER,
          api: API_ENDPOINTS[GET_ADMIN_PROPERTY_DATA],
          data: {
            sortType: "desc",
            sortColumn: "updatedAt"
          },
          method: POST,
          className: "header",
          user: true,
        },
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: TITLE,
          titles: [
            "Master Data of Super Admin",
            "Master Data of Broker",
            "Master Data of Sub User",
          ],
        },
        // { type: HORIZONTAL_LINE },

        {
          type: DASHBOARD_LISTING,
          data: {},
          desktopHeaders: {
            Location: "sectorNumber",
            "Plot No.": "plotNumber",
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
            "Plot No.": "plotNumber",
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
              "Plot No.": "plotNumber",
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
              "Plot No.": "plotNumber",
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
              "Plot No.": "plotNumber",
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
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin",
        },
      ],
    },
  ],
};

export const VIEW_LISTING = {
  name: "Master table",
  pageClass: "standalone_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: HEADING,
          name: "allListing",
          text: "All Listing",
          className: "formheadingcontainer",
        },
        {
          type: DASHBOARD_LISTING,
          desktopHeaders: {
            Location: "sectorNumber",
            "Plot No.": "plotNumber",
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
            // "Created By": "parentId.name",
            // "Mobile Number": "parentId.phoneNumber",
            // "Company Name": "parentId.companyName",
            City: "city",
            State: "state",
            "Dated of Posting": "updatedAt",
            // Status: "status",
            // "Link Share": "",
          },
          mobileHeaders: {
            Title: "title",
            Price: "price",
            Accommodation: "accommodation",
          },
          user: true,
          getDataApi: GET_PROPERTY_LIST_BY_USER_ID,
          endpoint: API_ENDPOINTS[GET_PROPERTY_LIST_BY_USER_ID],
          dataPoint: GET_PROPERTY_LIST_BY_USER_ID,
          useParamsFromUrl: { userId: "id" },
          hideAlterActions: true,
          disableRowModal: true,
          showPreviewButton: true,
          showEditAction: false,
          showDeleteAction: false
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin/statistics",
        },
      ],
    },
  ],
};

export const NOTIFICATIONS_LIST = {
  name: "Notifications",
  pageClass: "standalone_page notifications_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: AUTO_FETCH_API_USER,
          method: GET,
          api: API_ENDPOINTS[GET_NOTIFICATIONS_LIST],
        },
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: TITLE,
          titles: [
            "Admin Notifications",
            "Broker Notifications",
            "Sub User Notifications"
          ],
        },
        {
          type: DASHBOARD_LISTING,
          data: {},
          desktopHeaders: {
            Type: "type",
            "Sub Type": "subType",
            Details: "details",
            status: "status",

          },
          mobileHeaders: {
            Type: "type",
            "Sub Type": "subType",
            Details: "details",
            status: "status",

          },
          editApi: ALTER_PROPERTY_DATA,
          deleteApi: DELETE_NOTIFICATION,
          getDataApi: GET_NOTIFICATIONS_LIST,
          endpoint: API_ENDPOINTS[GET_NOTIFICATIONS_LIST],
          dataPoint: GET_NOTIFICATIONS_LIST,
          showPreviewButton: false,
          disableRowModal: true,
          showTableControls: false,
          allowSelect: true
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin",
        },
      ]
    }
  ]
};

export const ExpetedHeader = {
  user: ["Name", "Phone Number", "Address", "Email", "Role", "Parent Id"],
  master: ["Field", "Value", "Parent Id"],
  property: [
    "Property id",
    "City",
    "Location",
    "Plot Number",
    "Size",
    "Floor",
    "Accommodation",
    "Possession",
    "Price",
    "Facing",
    "Park Facing",
    "Corner",
    "Description",
    "1st Page Title",
    "2 Page Title",
    "Channel Partner Name",
    "Channel Contact Number",
    "Builder name",
    "Contact",
    "THUMBNAIL IMAGE NAME",
    "FOLDER NAME",
  ],
};
