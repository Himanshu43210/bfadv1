import { USER_ROLE } from "./ScreenJson";
import { newMasterConst } from "./components/fieldConsts/MasterFieldConst";
import { newPropertyConst } from "./components/fieldConsts/PropertiesFieldConst";
import {
  editUserConst,
  newUserConst,
} from "./components/fieldConsts/UserFieldConst";
import {
  ALTER_PROPERTY_DATA,
  ALTER_USER_DATA,
  API_BUTTON,
  API_HEADING,
  APPROVE_PROPERTY_DATA,
  AUTO_FETCH_API_POST,
  AUTO_FETCH_API_USER,
  CONTAINER,
  DASHBOARD_LISTING,
  DELETE_PROPERTY_DATA,
  DELETE_USER_DATA,
  GET,
  GET_ADMIN_PROPERTY_DATA,
  GET_ADMIN_USER_DATA,
  GET_APPROVAL_PROPERTIES,
  GET_LISTING_DATA,
  GET_PROPERTY_LIST_BY_USER_ID,
  GET_PROPERTY_USER,
  HEADING,
  HORIZONTAL_LINE,
  LABEL_MAP,
  PANEL_HEADER,
  LOGIN_REFRESH,
  POST,
  REJECT_PROPERTY,
  ROUTE_BUTTON,
  SELECT,
  SELECT_SLIDER,
  SLIDER,
  TABLE_HEADER,
  TITLE,
  TOGGLE_BUTTON,
  ALTER_MASTER_DATA,
} from "./components/utils/Const";
import { API_ENDPOINTS } from "./redux/utils/api";

// export const AD_USER_DASHBOARD = {
//   name: "User Dashboard Screen",
//   children: [
//     {
//       type: DASHBOARD_LISTING,
//       desktopHeaders: {
//         "Channel Partner Company Name": "fieldName",
//         "City Where Registered": "fieldValue",
//         "Channel Partner Name": "parentId",
//         "Channel Partner Mobile number": "channel partner mobile number",
//         Listings: "listings",
//         Approved: "approved",
//         Pending: "pending",
//         "View Details": "view detail",
//       },
//       mobileHeaders: {
//         "Channel Partner Company Name": "fieldName",
//         "City Where Registered": "fieldValue",
//         "Channel Partner Name": "parentId",
//         "Channel Partner Mobile number": "channel partner mobile number",
//         Listings: "listings",
//         Approved: "approved",
//         Pending: "pending",
//         "View Details": "view detail",
//       },
//     },
//   ],
// };

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
              label: "Create Channel Partner",
              name: "Create Channel Partner",
              form: newUserConst,
              onSaveApi: ALTER_USER_DATA,
              route: "/admin/form",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Manage Channel Partner",
              name: "Manage Channel Partner",
              route: "/admin/user",
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Approve Channel Partner Listngs",
              name: "Approve Channel Partner Listngs",
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
          panelTitle: "CHANNEL PARTNER ADMIN PANEL",
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
              autofill: ["city", "state", "location"],
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Master Data of Channel Partner",
              name: "Master Data of Channel Partner",
              route: "/admin/masterTable",
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
            },
            {
              type: ROUTE_BUTTON,
              className: "admin_route_button",
              label: "Master Data of Sub User",
              name: "Master Data of Sub User",
              route: "/admin/masterTable",
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

export const AD_MASTER_TABLE = {
  name: "Master table",
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
          data: { filter: {} },
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
                [USER_ROLE.channelPartner]: "CHANNEL PARTNER ADMIN PANEL",
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
            "Master Data of Channel Partner",
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
              "Created By": "channelPartner",
              "Mobile Number": "channelContact",
              "Company Name": "companyName",
              City: "city",
              State: "state",
              "Date of Posting": "createdAt",
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
              "Builder Contact Name": "builderContact",
              "Created By": "parentId",
              "Date of Posting": "createdAt",
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
              "Created By": "parentId",
              "Date of Posting": "createdAt",
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
          showPreviewButton: true
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

export const MANAGE_USER = {
  name: "Master table",
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
                [USER_ROLE.channelPartner]: "CHANNEL PARTNER ADMIN PANEL",
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
          titles: ["Manage Channel Partner", "Manage Sub User"],
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

export const STATS_LIST = {
  name: "Master table",
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
                [USER_ROLE.channelPartner]: "CHANNEL PARTNER ADMIN PANEL",
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
                  mobileHeaders: { Name: "name", Role: "role" },
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

export const VIEW_LISTING = {
  name: "Master table",
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
                [USER_ROLE.channelPartner]: "CHANNEL PARTNER ADMIN PANEL",
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
          type: API_BUTTON,
          name: "refresh",
          buttonLabel: "Refresh",
          apiType: GET,
          api: API_ENDPOINTS[GET_PROPERTY_LIST_BY_USER_ID],
          btnClass: "btn refresh_btn standalone_btn"
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
            "Created By": "",
            "Mobile Number": "",
            "Company Name": "",
            City: "Gurgaon",
            State: "Haryana",
            "Dated of Posting": "",
            Status: "status",
            "Link Share": "",
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
          hideActions: true,
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

export const APPROVAL_PROPERTIES = {
  name: "Master table",
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
                [USER_ROLE.channelPartner]: "CHANNEL PARTNER ADMIN PANEL",
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
            "Approve Channel Partner Listings",
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
