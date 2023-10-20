import { ABOUTUS_SCREEN, ACCOUNT_TABS_SCREEN, BLOG_SCREEN, CARD_DETAILS_SCREEN, HOME_SCREEN, SEARCH_RESULT } from "./ScreenJson";
import { AD_MASTER_TABLE, APPROVAL_PROPERTIES, MANAGE_USER, STATS_LIST, VIEW_LISTING } from "./UserJson";

export const APP_ROUTES = {
    "/": { key: 'HomeScreen', data: HOME_SCREEN },
    "/login": { key: 'LoginScreen', data: HOME_SCREEN },
    "/searchResult": { key: 'SearchResultScreen', data: SEARCH_RESULT },
    "/aboutUs": { key: 'AboutUsScreen', data: ABOUTUS_SCREEN },
    "/blog": { key: 'BlogScreen', data: BLOG_SCREEN },
    "/:pid": { key: 'PropertyDetailScreen', data: CARD_DETAILS_SCREEN },
    "/account/tabs": { key: 'AccountTabsScreen', data: ACCOUNT_TABS_SCREEN },
    "/admin/form": { key: 'FormScreen', data: HOME_SCREEN },
    // "/admin/property": { key: 'PropertyManagementScreen', data: HOME_SCREEN },
    "/admin/user": { key: 'UserManagementScreen', data: MANAGE_USER },
    "/admin/approveListing": { key: 'ApproveListingScreen', data: APPROVAL_PROPERTIES },
    "/admin/master": { key: 'MasterManagementScreen', data: HOME_SCREEN },
    "/admin/masterTable": { key: 'MasterTableScreen', data: AD_MASTER_TABLE },
    "/admin/statistics": { key: 'StatsScreen', data: STATS_LIST },
    "/admin/statistics/listingData": { key: 'ViewListingScreen', data: VIEW_LISTING },
    "/admin": { key: 'AdminHomeScreen', data: HOME_SCREEN },
};
