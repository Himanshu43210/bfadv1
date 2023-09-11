import React from "react";
import RenderComponent from "../../customComponents/ComponentRenderer";
import { AD_USER_DASHBOARD, CP_USER_DASHBOARD } from "../../../UserJson";

export default function AdminDashboard({ role }) {
console.log(role)
  return (
    <div style={{ marginTop: "100px" }}>
      <RenderComponent jsonToRender={AD_USER_DASHBOARD} />
    </div>
  );
}