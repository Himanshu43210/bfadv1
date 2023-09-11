import React from "react";
import { FaClipboardList, FaUsers, FaCog, FaUserShield } from "react-icons/fa";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import {
  ADMIN_DASHBOARD,
  MASTER_MANAGEMENT,
  PROPERTY_MANAGEMENT,
  USER_MANAGEMENT,
} from "./Const";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetApiStatus } from "../../redux/slice/apiSlice";

function Panel({ nonSalesUser, handlePageClick, onLogoutClick }) {
  console.log(nonSalesUser);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="sidebarcontainer">
        <div className="panel-nav-link" id="sidebar">
          {/* <Link to="/" className="panel-link">
            <AiFillHome className="admin-panel-icons" /> &nbsp;
            <h6>BuilderFloor</h6>
          </Link> */}
          <a
            href="https://www.builderfloor.com"
            className="panel-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillHome className="admin-panel-icons" /> &nbsp;
            <h6>BuilderFloor</h6>
          </a>

          <Button
            onClick={() => handlePageClick(ADMIN_DASHBOARD)}
            className="panel-link"
          >
            <FaClipboardList className="admin-panel-icons" /> &nbsp;
            <h6>Dashboard</h6>
          </Button>
          <>
            {nonSalesUser && (
              <>
                <Button
                  onClick={() => handlePageClick(USER_MANAGEMENT)}
                  className="panel-link"
                >
                  <FaUsers className="admin-panel-icons" />
                  <h6>User</h6>
                </Button>

                <Button
                  onClick={() => handlePageClick(MASTER_MANAGEMENT)}
                  className="panel-link"
                >
                  <FaUserShield className="admin-panel-icons" />
                  <h6>Master</h6>
                </Button>
              </>
            )}
          </>
          <Button
            onClick={() => handlePageClick(PROPERTY_MANAGEMENT)}
            className="panel-link"
          >
            <FaCog className="admin-panel-icons" />
            <h6>Property</h6>
          </Button>
          <Button
            onClick={() => {
              dispatch(resetApiStatus(onLogoutClick));
            }}
            className="panel-link"
          >
            <AiOutlineLogout className="admin-panel-icons" />
            <h6>Logout</h6>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Panel;
