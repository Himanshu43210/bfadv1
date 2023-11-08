import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../pages/AdminDashboard.js";
import MasterManagement from "../pages/MasterManagement.js";
import PropertyManagement from "../pages/PropertyManagement.js";
import UserManagement from "../pages/UserManagement.js";
import {
  ADMIN_DASHBOARD,
  ADMIN_DASHBOARD_LOGIN,
  CUSTOMER_MANAGEMENT,
  MASTER_MANAGEMENT,
  POST,
  PROPERTY_MANAGEMENT,
  SUCCESS,
  USER_MANAGEMENT,
} from "../utils/Const.js";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors.js";
import Login from "../pages/Login.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { storeUserData } from "../../redux/slice/userSlice.js";
import CustomerManagement from "../pages/CustomerManagement.js";

export default function PageSelector({ pageName }) {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  const userProfile = useSelector((state) => state.profile);
  const userProfile1 = useSelector((state) =>
    selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  );
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (!loginStatus) {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      if (email && password) {
        try {
          const options = {
            url: API_ENDPOINTS[ADMIN_DASHBOARD_LOGIN],
            method: POST,
            headers: { "Content-Type": "application/json" },
            data: {
              email: email,
              password: password,
            },
          };
          dispatch(callApi(options));
        } catch (error) { }
      } else {
        navigate("/login");
      }
    } else {
    }
  }, [loginStatus]);

  useEffect(() => {
    if (loginStatus === SUCCESS) {
      dispatch(storeUserData(userProfile1?.profile));
    }
    if (userProfile._id) {
      setCheck(true);
    }
  }, [loginStatus, userProfile]);

  return (
    <>
      {check && (
        <>
          {!loginStatus && <Login />}
          {pageName === ADMIN_DASHBOARD && (
            <AdminDashboard role={userProfile.role} />
          )}
          {pageName === USER_MANAGEMENT && <UserManagement />}
          {pageName === PROPERTY_MANAGEMENT && <PropertyManagement />}
          {pageName === MASTER_MANAGEMENT && <MasterManagement />}
          {/* {pageName === CUSTOMER_MANAGEMENT && <CustomerManagement />} */}
        </>
      )}
    </>
  );
}
