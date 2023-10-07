import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Pages/adminPages/AdminHome";
import Login from "./components/Pages/Login";
import UserManagement from "./components/Pages/adminPages/SuperUserManagement";
import MasterManagement from "./components/Pages/adminPages/MasterManagement";
import SuperMasterTable from "./components/Pages/adminPages/SuperMasterTable";
import PropertyManagement from "./components/Pages/adminPages/PropertyManagement";
import StatsList from "./components/Pages/adminPages/StatsList";
import Home from "./components/Pages/Home";
import DetailedView from "./components/Pages/DetailedView";
import SearchResult from "./components/Pages/SearchResult";
import { useSelector } from "react-redux";
import FormPage from "./components/customComponents/FormPage";
import ViewListing from "./components/Pages/adminPages/ViewListing";
import ApproveListing from "./components/Pages/adminPages/ApproveListings";
import TableFormPage from "./components/customComponents/TableFormData";

function App() {
  const userProfile = useSelector((state) => state.profile);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/builderFloorDetails" element={<DetailedView />} />
          <Route path="/admin/property" element={<PropertyManagement />} />
          <Route path="/admin/form" element={<FormPage />} />
          <Route path="/admin/TableForm" element={<TableFormPage />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/approveListing" element={<ApproveListing />} />
          <Route path="/admin/master" element={<MasterManagement />} />
          <Route path="/admin/masterTable" element={<SuperMasterTable />} />
          <Route path="/admin/statistics" element={<StatsList />} />
          <Route
            path="/admin/statistics/listingData"
            element={<ViewListing />}
          />
          <Route
            path="/admin"
            element={<AdminHome role={userProfile.role} />}
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
