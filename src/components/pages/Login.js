import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import {
  ADMIN_DASHBOARD_LOGIN,
  EMAIL,
  LOADING,
  POST,
  SUCCESS,
} from "../utils/Const.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors.js";
import { storeUserData } from "../../redux/slice/userSlice.js";
import { storeParentData } from "../../redux/slice/parentSlice.js";
import { useRouter } from "next/navigation.js";

const Login = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  const userProfile = useSelector((state) =>
    selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginStatus === SUCCESS) {
      dispatch(storeUserData(userProfile?.profile));
      dispatch(storeParentData(userProfile?.parentUser));
      navigate.push("/admin");
    }
  }, [loginStatus]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleLogin = () => {
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
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      dispatch(callApi(options));
    } catch (error) { }
  };

  return (
    <div className="contain">
      <h2>Sign In (Already Registered)</h2>
      <form onSubmit={handleSubmit} className="login_form">
        <div className="form-group">
          <label className="lab-class">Email</label>

          <input
            className="normal_input"
            type={EMAIL}
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="inpt normal_input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {loginStatus === LOADING ? (
          <CircularProgress className="loader-class" />
        ) : (
          <button type="submit" className="btn" onClick={handleLogin}>Login</button>
        )}
      </form>
    </div>
  );
};

export default Login;
