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
// import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router.js";

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
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
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/admin");
      }
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
      dispatch(callApi(options)).then((res) => {
        localStorage.setItem("userId", res?.payload?.profile?._id);
        localStorage.setItem("email", res?.payload?.profile?.email);
        localStorage.setItem("_token", res?.payload?.authToken);
        localStorage.setItem("role", res?.payload?.profile?.role);
        localStorage.setItem("password", password);
      });
    } catch (error) {}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            color: "white",
          }}
        >
          <Link href="/forgetPassword">Forgot Password?</Link>
        </div>
        {loginStatus === LOADING ? (
          <CircularProgress className="loader-class" />
        ) : (
          <button type="submit" className="btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
