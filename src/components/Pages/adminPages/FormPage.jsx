 import React, { useState } from "react";
import { newUserConst } from "../../fieldConsts/UserFieldConst";
import FormBuilder from "../../utils/FormBuilder";
import { Button } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import Panel from "../../utils/Panel";
import Navbar from "../../utils/Navbar";
import { useSelector } from "react-redux";
import { ADMIN_DASHBOARD_LOGIN, PROPERTY_DEALER } from "../../utils/Const";
import { USER_ROLE } from "../../../ScreenJson";
import PageSelector from "../../customComponents/PageSelector";
import { useNavigate } from "react-router-dom";
const FormPage = () => {
  const handleFormDataChange = (e) => {};
  const userProfile = useSelector((state) => state.profile);
  const [showMenu, setShowMenu] = useState(true);
  const [currentPage, setCurrentPage] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Button
          className="admin-menu-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </Button>
        {/* <Navbar role={userProfile?.role} /> */}
      </div>
      <div
        style={{
            marginTop:"100px"
        }}
        className={`${"main-admin-container"} ${
          showMenu ? "menu-is-active" : "menu-is-not-active"
        } `}
      >
        {showMenu && (
          <div className="admin-dashboard-home">
            <Panel
              nonSalesUser={userProfile?.role !== USER_ROLE[PROPERTY_DEALER]}
              handlePageClick={(page) => {
                navigate("/admin");
                setCurrentPage(page);
              }}
              onLogoutClick={ADMIN_DASHBOARD_LOGIN}
            />
          </div>
        )}
        <div>
          <div className="formheadingcontainer">Header</div>
          <FormBuilder
            fields={userProfile.formType}
            onFormDataChange={handleFormDataChange}
          />
        </div>
      </div>
    </>
  );
};

export default FormPage;