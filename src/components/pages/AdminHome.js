import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi/index.js";
import Panel from "../utils/Panel.js";
// import Navbar from "../../utils/Navbar";
import { useSelector } from "react-redux";
import {
  ADMIN_DASHBOARD,
  ADMIN_DASHBOARD_LOGIN,
  PROPERTY_DEALER,
} from "../utils/Const.js";
import { USER_ROLE } from "../../ScreenJson.js";
import PageSelector from "../customComponents/PageSelector.jsx";
import NotificationBell from "../customComponents/NotificationBell.jsx";

export default function AdminHome() {
  const userProfile = useSelector((state) => state.profile);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(ADMIN_DASHBOARD);

  const handleMenuOverlayClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="app_header">
        <div className="app_header_left">
          <Button
            className="admin_menu_button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <GiHamburgerMenu className="menu_icon" />
          </Button>
          {/* <Navbar role={userProfile?.role} /> */}
          <span className="curr_page">Dashboard</span>
        </div>
        <div className="app_header_right">
          <NotificationBell />
        </div>
      </div>
      <div
        className={`${"main_admin_container"} ${showMenu ? "menu-is-active" : "menu-is-not-active"
          } `}
      >
        {showMenu && (
          <>
            <div className="panel_overlay" onClick={handleMenuOverlayClick}></div>
            <div className="admin_dashboard_home">
              <Panel
                nonSalesUser={userProfile?.role !== USER_ROLE[PROPERTY_DEALER]}
                handlePageClick={(page) => {
                  setCurrentPage(page);
                  setShowMenu(false);
                }}
                onLogoutClick={ADMIN_DASHBOARD_LOGIN}
              />
            </div>
          </>
        )}
        <div className="page_container">
          <PageSelector pageName={currentPage} />
        </div>
      </div>
    </>
  );
}
