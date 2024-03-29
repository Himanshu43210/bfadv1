import React from "react";
import {
  FaClipboardList,
  FaUsers,
  FaUserTie,
  FaBuilding,
} from "react-icons/fa/index.js";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai/index.js";
import {
  ADMIN_DASHBOARD,
  CUSTOMER_MANAGEMENT,
  PROPERTY_MANAGEMENT,
  USER_MANAGEMENT,
} from "./Const.js";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetApiStatus } from "../../redux/slice/apiSlice.js";

function Panel({ nonSalesUser, handlePageClick, onLogoutClick }) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);

  return (
    <div className="sidebarcontainer">
      <div className="panel-nav-link" id="sidebar">
        {/* <Link to="/" className="panel-link">
            <AiFillHome className="admin-panel-icons" /> &nbsp;
            <h6>BuilderFloor</h6>
          </Link> */}
        <a href="/" className="panel-link">
          <AiFillHome className="admin-panel-icons" />
          <h6 className="panel_link_label">BuilderFloor</h6>
        </a>

        <Button
          onClick={() => handlePageClick(ADMIN_DASHBOARD)}
          className="panel-link"
        >
          <FaClipboardList className="admin-panel-icons" />
          <h6 className="panel_link_label">Dashboard</h6>
        </Button>
        <>
          {nonSalesUser && (
            <>
              <Button
                onClick={() => handlePageClick(USER_MANAGEMENT)}
                className="panel-link"
              >
                <FaUserTie className="admin-panel-icons" />
                <h6 className="panel_link_label">User</h6>
              </Button>
            </>
          )}
        </>
        <Button
          onClick={() => handlePageClick(PROPERTY_MANAGEMENT)}
          className="panel-link"
        >
          <FaBuilding className="admin-panel-icons" />
          <h6 className="panel_link_label">Property</h6>
        </Button>
        {/* {userProfile.role === "ChannelPartner" && (
          <Button
            onClick={() => handlePageClick(CUSTOMER_MANAGEMENT)}
            className="panel-link"
          >
            <FaUsers className="admin-panel-icons" />
            <h6 className="panel_link_label">Customer</h6>
          </Button>
        )} */}
        <Button
          onClick={() => {
            dispatch(resetApiStatus(onLogoutClick));
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            localStorage.removeItem("login");
          }}
          className="panel-link panel-logout-btn"
        >
          <AiOutlineLogout className="admin-panel-icons" />
          <h6 className="panel_link_label">Logout</h6>
        </Button>
      </div>
    </div>
  );
}

export default Panel;
