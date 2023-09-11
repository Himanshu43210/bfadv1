import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Pages/adminPages/SuperAdminDashboard";
import Login from "./components/Pages/Login";
// import UserManagement from "./components/Pages/adminPages/UserManagement";
import UserManagement from "./components/Pages/adminPages/SuperUserManagement";
import PropertyManagement from "./components/Pages/adminPages/PropertyManagement";
import MasterManagement from "./components/Pages/adminPages/MasterManagement";
import SuperMasterTable from "./components/Pages/adminPages/SuperMasterTable";
import StatsList from "./components/Pages/adminPages/StatsList";
// import Home from "./components/Pages/Home";
// import DetailedView from "./components/Pages/DetailedView";
// import SearchResult from "./components/Pages/SearchResult";
import FormPage from "./components/Pages/adminPages/FormPage.jsx";
import { useSelector } from "react-redux";
function App() {
  const userProfile = useSelector((state) => state.profile);
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/builderFloorDetails" element={<DetailedView />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/property" element={<PropertyManagement />} />
          <Route path="/admin/master" element={<MasterManagement />} />
          <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={<AdminHome role={userProfile.role} />}
          />
          <Route path="/admin/form" element={<FormPage />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route path="/admin/property" element={<PropertyManagement />} />
          <Route path="/admin/master" element={<MasterManagement />} />
          <Route path="/admin/masterTable" element={<SuperMasterTable />} />
          <Route path="/admin/statistics" element={<StatsList />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
