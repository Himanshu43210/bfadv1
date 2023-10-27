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
    "/admin": { key: 'AdminHomeScreen', screen: "HOME_SCREEN" },
};


export const SCREEN_MAPPINGS = {
    HOME_SCREEN: HOME_SCREEN,
    SEARCH_RESULT: SEARCH_RESULT,
    ABOUTUS_SCREEN: ABOUTUS_SCREEN,
    BLOG_SCREEN: BLOG_SCREEN,
    CARD_DETAILS_SCREEN: CARD_DETAILS_SCREEN,
    ACCOUNT_TABS_SCREEN: ACCOUNT_TABS_SCREEN,
    MANAGE_USER: MANAGE_USER,
    APPROVAL_PROPERTIES: APPROVAL_PROPERTIES,
    AD_MASTER_TABLE: AD_MASTER_TABLE,
    STATS_LIST: STATS_LIST,
    VIEW_LISTING: VIEW_LISTING
};


export const COMPONENTS = {
    [LOADING]: { name: "CircularProgress", path: "", import: `import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress.js";` },
    [AUTO_FETCH_API]: { name: "AutoFetchApi", path: "", import: "" },
    [AUTO_FETCH_API_POST]: { name: "AutoFetchApi", path: "", import: "" },
    [AUTO_FETCH_API_USER]: { name: "ApiHandler", path: "", import: "" },
    [TITLE]: { name: "", path: "", import: "" },      // create component
    [CONTAINER]: { name: "RenderComponent", path: "", import: "" },    // call self
    [PANEL_HEADER]: { name: "PanelHeader", path: "", import: "" },
    [IMAGE_BANNER]: { name: "Banner", path: "", import: "" },
    [SELECT]: { name: "SelectButton", path: "", import: "" },
    [SELECT2]: { name: "DropSelect", path: "", import: "" },
    [SLIDER]: { name: "Slider", path: "", import: "" },
    [API_BUTTON]: { name: "ApiButton", path: "", import: "" },
    [HEADING]: { name: "Heading", path: "", import: "" },
    [API_HEADING]: { name: "DynamicHeading", path: "", import: "" },
    [LIST]: { name: "List", path: "", import: "" },
    [DYNAMIC_CARD_CONTAINER]: { name: "DynamicCardContainer", path: "", import: "" },
    [DETAILED_VIEW]: { name: "DetailDataCard", path: "", import: "" },
    [NAVIGATE_BUTTON]: { name: "NavigateButton", path: "", import: "" },
    [PAGE_FOOTER]: { name: "Footer", path: "", import: "" },
    [PAGE_HEADER]: { name: "Header", path: "", import: "" },
    [OTP_LOGIN]: { name: "OtpLogin", path: "", import: "" },
    [HAMBURGER_MENU]: { name: "MenuState", path: "", import: "" },
    [TABS]: { name: "Tabbar", path: "", import: "" },
    [SELECT_SLIDER]: { name: "SelectSlider", path: "", import: "" },
    [TOGGLE_BUTTON]: { name: "CustomToogleButton", path: "", import: "" },
    [BUTTON]: { name: "Button", path: "", import: "" },
    [SCROLL_TO_TOP]: { name: "ScrollToTop", path: "", import: "" },
    [CHATBOT]: { name: "Chatbot", path: "", import: "" },
    [DASHBOARD_LISTING]: { name: "DashboardListing", path: "", import: "" },
    [ROUTE_BUTTON]: { name: "RouteButton", path: "", import: "" },
    [LABEL_MAP]: { name: "LabelMap", path: "", import: "" },
    [HORIZONTAL_LINE]: { name: "Line", path: "", import: "" },     // create component
    [TABLE_HEADER]: { name: "TableHeader", path: "", import: "" },
    [LOGIN_REFRESH]: { name: "LoginRefresh", path: "", import: "" },
    [ABOUT_HERO]: { name: "AboutHero", path: "", import: "" },
    [CONTACT_US]: { name: "ContactForm", path: "", import: "" },
};
