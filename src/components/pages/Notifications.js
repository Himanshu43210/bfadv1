import React from 'react'
import { USER_ROLE } from '@/ScreenJson.js'
import LoginRefresh from '../customComponents/LoginRefresh'
import AutoFetchApiPost from '../customComponents/AutoFetchApiPost'
import { ALTER_PROPERTY_DATA, DELETE_NOTIFICATION, GET, GET_ADMIN_USER_DATA, GET_NOTIFICATIONS_LIST } from '../utils/Const'
import { API_ENDPOINTS } from '@/redux/utils/api'
import PanelHeader from '../customComponents/PanelHeader'
import Title from '../customComponents/Title'
import DashboardListing from '../customComponents/DashboardListing'
import CustomRouteButton from '../customComponents/RouteButton'

const Notifications = () => {
    return (
        <>
            <div className={`standalone_page stats_page`}>
                <LoginRefresh>
                    <div className={`component_wrapper ${''}`}>
                        <AutoFetchApiPost
                            component={{
                                user: true,
                                method: GET,
                                api: API_ENDPOINTS[GET_NOTIFICATIONS_LIST],
                            }}
                        />
                    </div>
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
                        <Title component={{
                            titles: [
                                "Admin Notifications",
                                "Broker Notifications",
                                "Sub User Notifications"
                            ],
                        }} />
                    </div>
                    <div className={`component_wrapper ${''}`}>
                        <div className={`component_wrapper ${''}`}>
                            <DashboardListing component={{
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
        </>
    )
}

export default Notifications