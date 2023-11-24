import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_DASHBOARD_LOGIN, POST, SUCCESS } from "../utils/Const.js";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { storeUserData } from "../../redux/slice/userSlice.js";
import { storeParentData } from "../../redux/slice/parentSlice.js";
import RenderComponent from "./ComponentRenderer.jsx";
import { useRouter } from "next/navigation.js";

const LoginRefresh = ({ component }) => {
  const navigate = useRouter();
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
        navigate.push("/login");
      }
    } else {
    }
  }, [loginStatus]);

  useEffect(() => {
    if (loginStatus === SUCCESS) {
      dispatch(storeUserData(userProfile1?.profile));
      dispatch(storeParentData(userProfile1?.parentUser));
    }
    if (userProfile._id) {
      setCheck(true);
    }
  }, [loginStatus, userProfile]);
  return <>{check && <RenderComponent jsonToRender={component} />}</>;
};

export default LoginRefresh;
