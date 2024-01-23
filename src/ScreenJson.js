import { editUserConst } from "./components/fieldConsts/UserFieldConst.js";
import {
  ALTER_USER_DATA,
  APPROVE_AGENT,
  AUTO_FETCH_API_USER,
  CONTAINER,
  DASHBOARD_LISTING,
  DELETE_USER_DATA,
  GET,
  GET_UNAPPROVED_AGENTS_DATA,
  LOGIN_REFRESH,
  PANEL_HEADER,
  PUT,
  ROUTE_BUTTON,
  TITLE,
} from "./components/utils/Const.js";
import { API_ENDPOINTS } from "./redux/utils/api.js";

export const USER_ROLE = {
  bfAdmin: "BuilderFloorAdmin",
  channelPartner: "ChannelPartner",
  salesUser: "SalesUser",
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
