import React from "react";
import RenderComponent from "../../customComponents/ComponentRenderer";
import {
  AD_USER_DASHBOARD,
  CP_USER_DASHBOARD,
  SU_USER_DASHBOARD,
} from "../../../UserJson";
import { USER_ROLE } from "../../../ScreenJson";

export default function AdminDashboard({ role }) {
  return (
    <div style={{ marginTop: "100px" }}>
      <RenderComponent
        jsonToRender={
          role === USER_ROLE["bfAdmin"]
            ? AD_USER_DASHBOARD
            : role === USER_ROLE["channelPartner"]
            ? CP_USER_DASHBOARD
            : SU_USER_DASHBOARD
        }
      />
    </div>
  );
}
