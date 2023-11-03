import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Pages/adminPages/AdminHome.js";
import Login from "./components/Pages/Login.js";
import UserManagement from "./components/Pages/adminPages/SuperUserManagement.js";
import MasterManagement from "./components/Pages/adminPages/MasterManagement.js";
import SuperMasterTable from "./components/Pages/adminPages/SuperMasterTable.js";
import PropertyManagement from "./components/Pages/adminPages/PropertyManagement.js";
import StatsList from "./components/Pages/adminPages/StatsList.js";
import Home from "./components/Pages/Home.js";
import DetailedView from "./components/Pages/DetailedView.js";
import SearchResult from "./components/Pages/SearchResult.js";
import FormPage from "./components/Pages/adminPages/FormPage.js";
import ViewListing from "./components/Pages/adminPages/ViewListing.js";
import ApproveListing from "./components/Pages/adminPages/ApproveListings.js";
import AccountTabs from './components/Pages/AccountTabs.js';
import AboutUs from "./components/Pages/AboutUs.js";
import Blog from "./components/Pages/Blog.js";
import GeneralFormPage from "./components/pages/GeneralFormPage.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/agent/form" element={<GeneralFormPage />} />
          <Route path="/:pid" element={<DetailedView />} />
          <Route path="/account/tabs" element={<AccountTabs />} />
          <Route path="/admin/form" element={<FormPage />} />
          <Route path="/admin/property" element={<PropertyManagement />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/approveListing" element={<ApproveListing />} />
          <Route path="/admin/master" element={<MasterManagement />} />
          <Route path="/admin/masterTable" element={<SuperMasterTable />} />
          <Route path="/admin/statistics" element={<StatsList />} />
          <Route path="/admin/statistics/listingData" element={<ViewListing />} />
          <Route path="/admin" element={<AdminHome />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
