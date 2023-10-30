import {
    ABOUTUS_SCREEN,
    ACCOUNT_TABS_SCREEN,
    BLOG_SCREEN,
    CARD_DETAILS_SCREEN,
    HOME_SCREEN,
    SEARCH_RESULT,
    AD_MASTER_TABLE,
    MANAGE_USER,
    STATS_LIST,
    APPROVAL_PROPERTIES,
    VIEW_LISTING,
} from "./ScreenJson.js";
import { ABOUT_HERO, API_BUTTON, API_HEADING, AUTO_FETCH_API, AUTO_FETCH_API_POST, AUTO_FETCH_API_USER, BUTTON, CHATBOT, CONTACT_US, CONTAINER, DASHBOARD_LISTING, DETAILED_VIEW, DYNAMIC_CARD_CONTAINER, HAMBURGER_MENU, HEADING, HORIZONTAL_LINE, IMAGE_BANNER, LABEL_MAP, LIST, LOADING, LOGIN_REFRESH, NAVIGATE_BUTTON, OTP_LOGIN, PAGE_FOOTER, PAGE_HEADER, PANEL_HEADER, ROUTE_BUTTON, SCROLL_TO_TOP, SELECT, SELECT2, SELECT_SLIDER, SLIDER, TABLE_HEADER, TABS, TITLE, TOGGLE_BUTTON } from "./components/utils/Const.js";

export const APP_ROUTES = {
    "/": { key: 'HomeScreen', screen: "HOME_SCREEN" },
    "/login": { key: 'LoginScreen', page: "./src/components/Pages/Login.js" },
    "/searchResult": { key: 'SearchResultScreen', screen: "SEARCH_RESULT" },
    "/aboutUs": { key: 'AboutUsScreen', screen: "ABOUTUS_SCREEN" },
    "/blog": { key: 'BlogScreen', screen: "BLOG_SCREEN" },
    "/:pid": { key: 'PropertyDetailScreen', screen: "CARD_DETAILS_SCREEN" },
    "/account/tabs": { key: 'AccountTabsScreen', screen: "ACCOUNT_TABS_SCREEN" },
    "/admin/form": { key: 'FormScreen', page: "./src/components/Pages/adminPages/FormPage.js" },
    "/admin/property": { key: 'PropertyManagementScreen', page: "./src/components/Pages/adminPages/PropertyManagement.js" },
    "/admin/user": { key: 'UserManagementScreen', screen: "MANAGE_USER" },
    "/admin/approveListing": { key: 'ApproveListingScreen', screen: "APPROVAL_PROPERTIES" },
    "/admin/master": { key: 'MasterManagementScreen', page: "./src/components/Pages/adminPages/MasterManagement.js" },
    "/admin/masterTable": { key: 'MasterTableScreen', screen: "AD_MASTER_TABLE" },
    "/admin/statistics": { key: 'StatsScreen', screen: "STATS_LIST" },
    "/admin/statistics/listingData": { key: 'ViewListingScreen', screen: "VIEW_LISTING" },
    "/admin": { key: 'AdminHomeScreen', screen: "ADMIN_HOME_SCREEN" },
};


export const SCREEN_MAPPINGS = {
    HOME_SCREEN: { data: HOME_SCREEN },
    SEARCH_RESULT: { data: SEARCH_RESULT },
    ABOUTUS_SCREEN: { data: ABOUTUS_SCREEN },
    BLOG_SCREEN: { data: BLOG_SCREEN },
    CARD_DETAILS_SCREEN: { data: CARD_DETAILS_SCREEN },
    ACCOUNT_TABS_SCREEN: { data: ACCOUNT_TABS_SCREEN },
    MANAGE_USER: { data: MANAGE_USER },
    APPROVAL_PROPERTIES: { data: APPROVAL_PROPERTIES },
    AD_MASTER_TABLE: { data: AD_MASTER_TABLE },
    STATS_LIST: { data: STATS_LIST },
    VIEW_LISTING: { data: VIEW_LISTING, code: "./src/components/Pages/adminPages/ViewListing.js", startBoundary: "ViewListing", endBoundary: "return (" },
    ADMIN_HOME_SCREEN: { code: "./src/components/Pages/adminPages/AdminHome.js", all: true },
};


export const COMPONENTS = {
    [LOADING]: { name: "CircularProgress", path: "", import: `import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress.js";` },
    [AUTO_FETCH_API]: { name: "AutoFetchApi" },
    [AUTO_FETCH_API_POST]: { name: "AutoFetchApi" },
    [AUTO_FETCH_API_USER]: { name: "ApiHandler" },
    [TITLE]: { name: "Title" },
    [CONTAINER]: { name: "RenderComponent" },
    [PANEL_HEADER]: { name: "PanelHeader" },
    [IMAGE_BANNER]: { name: "Banner" },
    [SELECT]: { name: "SelectButton", props: { handleValueChange: "handleValueChange", setSliceData: "setSliceData" } },
    [SELECT2]: { name: "DropSelect", props: { handleValueChange: "handleValueChange", setSliceData: "setSliceData" } },
    [SLIDER]: { name: "Slider", props: { handleValueChange: "handleValueChange", setSliceData: "setSliceData" } },
    [API_BUTTON]: { name: "ApiButton", props: { setSliceData: "setSliceData" } },
    [HEADING]: { name: "Heading" },
    [API_HEADING]: { name: "DynamicHeading" },
    [LIST]: { name: "List" },
    [DYNAMIC_CARD_CONTAINER]: { name: "DynamicCardContainer", props: { handleValueChange: "handleValueChange", setSliceData: "setSliceData", onLoadMore: "handleLoadMore" } },
    [DETAILED_VIEW]: { name: "DetailDataCard" },
    [NAVIGATE_BUTTON]: { name: "NavigateButton" },
    [PAGE_FOOTER]: { name: "Footer" },
    [PAGE_HEADER]: { name: "Header" },
    [OTP_LOGIN]: { name: "OtpLogin" },
    [HAMBURGER_MENU]: { name: "MenuState" },
    [TABS]: { name: "Tabbar" },
    [SELECT_SLIDER]: { name: "SelectSlider", props: { handleValueChange: "handleValueChange", setSliceData: "setSliceData" } },
    [TOGGLE_BUTTON]: { name: "CustomToogleButton", props: { handleValueChange: "handleValueChange", setSliceData: "setSliceData" } },
    [BUTTON]: { name: "Button", props: { handleOnClick: "handleValueChange", setSliceData: "setSliceData" } },
    [SCROLL_TO_TOP]: { name: "ScrollToTop" },
    [CHATBOT]: { name: "Chatbot" },
    [DASHBOARD_LISTING]: { name: "DashboardListing" },
    [ROUTE_BUTTON]: { name: "RouteButton" },
    [LABEL_MAP]: { name: "LabelMap" },
    [HORIZONTAL_LINE]: { name: "Line" },     // create component
    [TABLE_HEADER]: { name: "TableHeader" },
    [LOGIN_REFRESH]: { name: "LoginRefresh" },
    [ABOUT_HERO]: { name: "AboutHero" },
    [CONTACT_US]: { name: "ContactForm" },
};


export const PAGE_IMPORTS = {
    common: `
    import React from "react";
    import {Card} from "react-bootstrap";
    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
    import { callApi } from "../../../redux/utils/apiActions.js";
    `,
    VIEW_LISTING: `
    import { useEffect } from "react";
    import { API_ENDPOINTS } from "../../../redux/utils/api.js";
    import { GET, GET_PROPERTY_LIST_BY_USER_ID } from "../../utils/Const.js";
    `,
};

