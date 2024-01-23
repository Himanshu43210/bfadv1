import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer.jsx';
import { USER_ROLE } from '../../ScreenJson.js';
import LoginRefresh from '../customComponents/LoginRefresh.jsx';
import PanelHeader from '../customComponents/PanelHeader.jsx';
import { DELETE_CUSTOMER, EDIT_CUSTOMER, GET, GET_CUSTOMERS_LIST } from '../utils/Const.js';
import { API_ENDPOINTS } from '@/redux/utils/api.js';
import Title from '../customComponents/Title.jsx';
import AutoFetchApiPost from '../customComponents/AutoFetchApiPost.jsx';
import CustomRouteButton from '../customComponents/RouteButton.jsx';
import DashboardListing from '../customComponents/DashboardListing.jsx';
import { editCustomerConst } from '../fieldConsts/UserFieldConst.js';

function CustomerManagement() {
  return (
    <div className="standalone_page user_management_page">
      <LoginRefresh>
        <div className={`component_wrapper ${''}`}>
          <div className={`component_wrapper ${''}`}>
            <PanelHeader component={{
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            }} />
          </div>
        </div>
        <div className={`component_wrapper ${''}`}>
          <AutoFetchApiPost
            component={{
              // user: true,
              method: GET,
              api: API_ENDPOINTS[GET_CUSTOMERS_LIST],
            }}
          />
        </div>
        <div className={`component_wrapper ${''}`}>
          <Title component={{
            titles: ["Manage Customers"],
          }} />
        </div>
        <div className={`component_wrapper ${''}`}>
          <div className={`component_wrapper ${''}`}>
            <DashboardListing component={{
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
            }} />
            <div className={`component_wrapper ${'toogle-filter'}`}>
              <CustomRouteButton component={{
                className: "toogle-filter",
                label: "Back",
                name: "Back",
                route: "/admin",
              }} />
            </div>
          </div>
        </div>
      </LoginRefresh>
    </div>
  );
}

export default CustomerManagement;