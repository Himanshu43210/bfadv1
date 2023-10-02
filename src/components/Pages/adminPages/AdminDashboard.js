import React, { useEffect } from "react";
import RenderComponent from "../../customComponents/ComponentRenderer";
import {
  AD_USER_DASHBOARD,
  CP_USER_DASHBOARD,
  SU_USER_DASHBOARD,
} from "../../../UserJson";
import { USER_ROLE } from "../../../ScreenJson";
import { BF_ADMIN, GET, GET_MASTER_DATA_ON_HOME } from "../../utils/Const";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../../redux/utils/api";
import { callApi } from "../../../redux/utils/apiActions";
import { selectMasterData } from "../../../redux/utils/selectors";

export default function AdminDashboard({ role }) {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const options = {
        url: API_ENDPOINTS[GET_MASTER_DATA_ON_HOME],
        method: GET,
        headers: { "Content-Type": "application/json" },
      };
      dispatch(callApi(options));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="admin_dashboard">
      <RenderComponent
        jsonToRender={
          role === USER_ROLE[BF_ADMIN]
            ? AD_USER_DASHBOARD
            : role === USER_ROLE["channelPartner"]
            ? CP_USER_DASHBOARD
            : SU_USER_DASHBOARD
        }
      />
    </div>
  );
}
