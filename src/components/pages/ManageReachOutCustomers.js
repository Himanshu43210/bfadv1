import React from 'react';
import { USER_ROLE } from '../../ScreenJson.js';
import LoginRefresh from '../customComponents/LoginRefresh.jsx';
import PanelHeader from '../customComponents/PanelHeader.jsx';
import AutoFetchApiPost from '../customComponents/AutoFetchApiPost.jsx';
import { DELETE_REACH_OUT_USER, EDIT_REACH_OUT_USER_STATUS, GET, GET_NOT_CONTACTED_USER_COUNTS, GET_REACH_OUT_USERS } from '../utils/Const.js';
import { API_ENDPOINTS } from '@/redux/utils/api.js';
import Title from '../customComponents/Title.jsx';
import RealLabelMap from '../customComponents/LabelMap.jsx';
import DashboardListing from '../customComponents/DashboardListing.jsx';
import { editReachOutCustomerConst } from '../fieldConsts/UserFieldConst.js';
import CustomRouteButton from '../customComponents/RouteButton.jsx';

const ManageReachOutCustomers = () => {
    return (
        <div className='standalone_page manage_reachout_customers_page'>
            <div className={`component_wrapper ${''}`}>
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
                                method: GET,
                                api: API_ENDPOINTS[GET_REACH_OUT_USERS],
                            }}
                        />
                    </div>
                    <div className={`component_wrapper ${''}`}>
                        <Title component={{
                            titles: ["Customers to Reach Out"],
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
                    <div className={`component_wrapper ${''}`}>
                        <div className={`component_wrapper ${''}`}>
                            <DashboardListing component={{
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
            {/* <RenderComponent jsonToRender={MANAGE_REACH_OUT_USERS} /> */}
        </div>
    );
};

export default ManageReachOutCustomers;