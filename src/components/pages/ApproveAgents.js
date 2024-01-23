import React from 'react';
import { USER_ROLE } from '../../ScreenJson.js';
import LoginRefresh from '../customComponents/LoginRefresh.jsx';
import PanelHeader from '../customComponents/PanelHeader.jsx';
import AutoFetchApiPost from '../customComponents/AutoFetchApiPost.jsx';
import Title from '../customComponents/Title.jsx';
import { ALTER_USER_DATA, APPROVE_AGENT, DELETE_USER_DATA, GET, GET_UNAPPROVED_AGENTS_DATA, GET_UNAPPROVED_BROKER_COUNTS, PUT } from '../utils/Const.js';
import { API_ENDPOINTS } from '@/redux/utils/api.js';
import RealLabelMap from '../customComponents/LabelMap.jsx';
import CustomRouteButton from '../customComponents/RouteButton.jsx';
import DashboardListing from '../customComponents/DashboardListing.jsx';
import { editUserConst } from '../fieldConsts/UserFieldConst.js';

const ApproveAgents = () => {
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
                            user: true,
                            method: GET,
                            api: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
                        }}
                    />
                </div>
                <div className={`component_wrapper ${''}`}>
                    <Title component={{
                        titles: ["Approve Brokers"],
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
                <div className={`component_wrapper ${''}`}>
                    <div className={`component_wrapper ${''}`}>
                        <DashboardListing component={{
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

export default ApproveAgents;