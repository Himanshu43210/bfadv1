import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import Panel from "../../utils/Panel";
import Navbar from "../../utils/Navbar";
import { useSelector } from "react-redux";
import { ADMIN_DASHBOARD_LOGIN, PROPERTY_DEALER } from "../../utils/Const";
import { USER_ROLE } from "../../../ScreenJson";
import PageSelector from "../../customComponents/PageSelector";

export default function AdminHome() {
  const userProfile = useSelector((state) => state.profile);
  const [showMenu, setShowMenu] = useState(true);
  const [currentPage, setCurrentPage] = useState(true);

  return (
    <>
      <div>
        <Button
          className="admin-menu-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </Button>
        <Navbar role={userProfile?.role} />
      </div>
      <div
        className={`${"main-admin-container"} ${
          showMenu ? "menu-is-active" : "menu-is-not-active"
        } `}
      >
        {showMenu && (
          <div className="admin-dashboard-home">
            <Panel
              nonSalesUser={userProfile?.role !== USER_ROLE[PROPERTY_DEALER]}
              handlePageClick={(page) => {
                setCurrentPage(page);
              }}
              onLogoutClick={ADMIN_DASHBOARD_LOGIN}
            />
          </div>
        )}
        <div>
          <PageSelector pageName={currentPage} />
        </div>
      </div>
    </>
  );
}
