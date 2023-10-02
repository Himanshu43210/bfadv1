import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import Panel from "../../utils/Panel";
import Navbar from "../../utils/Navbar";
import { useSelector } from "react-redux";
import {
  ADMIN_DASHBOARD,
  ADMIN_DASHBOARD_LOGIN,
  PROPERTY_DEALER,
} from "../../utils/Const";
import { USER_ROLE } from "../../../ScreenJson";
import PageSelector from "../../customComponents/PageSelector";

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
        <Button
          className="admin_menu_button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu className="menu_icon" />
        </Button>
        {/* <Navbar role={userProfile?.role} /> */}
        <span className="curr_page">Dashboard</span>
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
