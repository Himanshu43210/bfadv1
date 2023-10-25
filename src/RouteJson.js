import { ABOUTUS_SCREEN, ACCOUNT_TABS_SCREEN, BLOG_SCREEN, CARD_DETAILS_SCREEN, HOME_SCREEN, SEARCH_RESULT } from "./ScreenJson";
import { AD_MASTER_TABLE, APPROVAL_PROPERTIES, MANAGE_USER, STATS_LIST, VIEW_LISTING } from "./UserJson";

export const APP_ROUTES = {
    "/": { key: 'HomeScreen', pageData: HOME_SCREEN },
    "/login": { key: 'LoginScreen', pageData: HOME_SCREEN },
    "/searchResult": { key: 'SearchResultScreen', pageData: SEARCH_RESULT },
    "/aboutUs": { key: 'AboutUsScreen', pageData: ABOUTUS_SCREEN },
    "/blog": { key: 'BlogScreen', pageData: BLOG_SCREEN },
    "/:pid": { key: 'PropertyDetailScreen', pageData: CARD_DETAILS_SCREEN },
    "/account/tabs": { key: 'AccountTabsScreen', pageData: ACCOUNT_TABS_SCREEN },
    "/admin/form": { key: 'FormScreen', pageData: HOME_SCREEN },
    // "/admin/property": { key: 'PropertyManagementScreen', pageData: HOME_SCREEN },
    "/admin/user": { key: 'UserManagementScreen', pageData: MANAGE_USER },
    "/admin/approveListing": { key: 'ApproveListingScreen', pageData: APPROVAL_PROPERTIES },
    "/admin/master": { key: 'MasterManagementScreen', pageData: HOME_SCREEN },
    "/admin/masterTable": { key: 'MasterTableScreen', pageData: AD_MASTER_TABLE },
    "/admin/statistics": { key: 'StatsScreen', pageData: STATS_LIST },
    "/admin/statistics/listingData": { key: 'ViewListingScreen', pageData: VIEW_LISTING },
    "/admin": { key: 'AdminHomeScreen', pageData: HOME_SCREEN },
};
