
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    ABOUTUS_SCREEN,
    ACCOUNT_TABS_SCREEN,
    BLOG_SCREEN,
    CARD_DETAILS_SCREEN,
    HOME_SCREEN,
    SEARCH_RESULT,
    AD_MASTER_TABLE,
    APPROVAL_PROPERTIES,
    MANAGE_USER,
    STATS_LIST,
    VIEW_LISTING,
} from "./ScreenJson.js";
import HomeScreen from "./components/pages/HomeScreen.js"
import Login from "./components/pages/Login.js"
import SearchResultScreen from "./components/pages/SearchResultScreen.js"
import AboutUsScreen from "./components/pages/AboutUsScreen.js"
import BlogScreen from "./components/pages/BlogScreen.js"
import PropertyDetailScreen from "./components/pages/PropertyDetailScreen.js"
import AccountTabsScreen from "./components/pages/AccountTabsScreen.js"
import FormScreen from "./components/pages/FormScreen.js"
import PropertyManagement from "./components/pages/PropertyManagement.js"
import SuperUserManagement from "./components/pages/SuperUserManagement.js"
import ApproveListingScreen from "./components/pages/ApproveListingScreen.js"
import MasterManagement from "./components/pages/MasterManagement.js"
import SuperMasterTable from "./components/pages/SuperMasterTable.js"
import StatsScreen from "./components/pages/StatsScreen.js"
import ViewListingScreen from "./components/pages/ViewListingScreen.js"
import AdminHome from "./components/pages/AdminHome.js"

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomeScreen jsonToRender={HOME_SCREEN} />} />
                    <Route path="/login" element={<Login jsonToRender={undefined} />} />
                    <Route path="/searchResult" element={<SearchResultScreen jsonToRender={SEARCH_RESULT} />} />
                    <Route path="/about_us" element={<AboutUsScreen jsonToRender={ABOUTUS_SCREEN} />} />
                    <Route path="/blog" element={<BlogScreen jsonToRender={BLOG_SCREEN} />} />
                    <Route path="/:pid" element={<PropertyDetailScreen jsonToRender={CARD_DETAILS_SCREEN} />} />
                    <Route path="/account/tabs" element={<AccountTabsScreen jsonToRender={ACCOUNT_TABS_SCREEN} />} />
                    <Route path="/admin/form" element={<FormScreen jsonToRender={undefined} />} />
                    <Route path="/admin/property" element={<PropertyManagement jsonToRender={undefined} />} />
                    <Route path="/admin/user" element={<SuperUserManagement jsonToRender={MANAGE_USER} />} />
                    <Route path="/admin/approveListing" element={<ApproveListingScreen jsonToRender={APPROVAL_PROPERTIES} />} />
                    <Route path="/admin/master" element={<MasterManagement jsonToRender={undefined} />} />
                    <Route path="/admin/masterTable" element={<SuperMasterTable jsonToRender={AD_MASTER_TABLE} />} />
                    <Route path="/admin/statistics" element={<StatsScreen jsonToRender={STATS_LIST} />} />
                    <Route path="/admin/statistics/listingData" element={<ViewListingScreen jsonToRender={VIEW_LISTING} />} />
                    <Route path="/admin" element={<AdminHome jsonToRender={undefined} />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
