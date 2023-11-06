import React from "react";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import { AD_MASTER_TABLE} from "../../ScreenJson.js";

export default function AdminDashboard() {

  return (
    <div style={{ marginTop: "100px" }}>
      <RenderComponent jsonToRender={AD_MASTER_TABLE} />
    </div>
  );
}