import React from "react";
import RenderComponent from "../../customComponents/ComponentRenderer";
import {
  AD_USER_DASHBOARD,
  CP_USER_DASHBOARD,
  SU_USER_DASHBOARD,
} from "../../../UserJson";
import { USER_ROLE } from "../../../ScreenJson";
import { BF_ADMIN } from "../../utils/Const";

export default function AdminDashboard({ role }) {
  (role);
  return (
    <div style={{ marginTop: "100px" }}>
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
