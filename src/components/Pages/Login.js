import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../redux/utils/api";
import {
  ADMIN_DASHBOARD_LOGIN,
  EMAIL,
  LOADING,
  POST,
  SUCCESS,
} from "../utils/Const";
import { callApi } from "../../redux/utils/apiActions";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors";
import { storeUserData } from "../../redux/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  const userProfile = useSelector((state) =>
    selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  );
  const [email, setEmail] = useState("admin@builderfloor.com");
  const [password, setPassword] = useState("123");

  useEffect(() => {
    if (loginStatus === SUCCESS) {
      dispatch(storeUserData(userProfile?.profile));
      navigate("/admin");
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
    } catch (error) {}
  };
  return (
    <div className="contain">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="lab-class">Email</label>

          <input
            type={EMAIL}
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="inpt"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {loginStatus === LOADING ? (
          <div className="loading-class">
            <CircularProgress />
          </div>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </div>
  );
};

export default Login;
