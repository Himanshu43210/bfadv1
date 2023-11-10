import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/pages/AdminHome.js";
import Login from "./components/pages/Login.js";
import UserManagement from "./components/pages/SuperUserManagement.js";
import MasterManagement from "./components/pages/MasterManagement.js";
import SuperMasterTable from "./components/pages/SuperMasterTable.js";
import PropertyManagement from "./components/pages/PropertyManagement.js";
import StatsList from "./components/pages/StatsList.js";
import Home from "./components/pages/Home.js";
import DetailedView from "./components/pages/DetailedView.js";
import SearchResult from "./components/pages/SearchResult.js";
import FormPage from "./components/pages/FormPage.js";
import ViewListing from "./components/pages/ViewListing.js";
import ApproveListing from "./components/pages/ApproveListings.js";
import AccountTabs from './components/pages/AccountTabs.js';
import AboutUs from "./components/pages/AboutUs.js";
import Blog from "./components/pages/Blog.js";
import GeneralFormPage from "./components/pages/GeneralFormPage.js";
import ApproveAgents from "./components/pages/ApproveAgents.js";
import AddRecommendations from "./components/pages/AddRecommendations.js";
import ShowRecommended from "./components/pages/ShowRecommended.js";
import CustomerManagement from "./components/pages/CustomerManagement.js";
import CustomerEngagement from "./components/pages/CustomerEngagement.js";
import EditAccount from "./components/pages/EditAccount.js";

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
          <Route path="/admin/approveAgents" element={<ApproveAgents />} />
          <Route path="/admin/approveListing" element={<ApproveListing />} />
          <Route path="/admin/customers" element={<CustomerEngagement />} />
          <Route path="/admin/manageCustomers" element={<CustomerManagement />} />
          <Route path="/admin/addRecommendation" element={<AddRecommendations />} />
          <Route path="/admin/showRecommended" element={<ShowRecommended />} />
          <Route path="/admin/account/edit" element={<EditAccount />} />
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