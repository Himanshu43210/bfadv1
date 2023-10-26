import _ from "lodash";
import React from "react";
import RenderComponent from "../../customComponents/ComponentRenderer.jsx";
import { MANAGE_USER } from "../../../ScreenJson.js";

export default function UserManagement() {
  return (
    <div className="standalone_page user_management_page">
      <RenderComponent jsonToRender={MANAGE_USER} />
    </div>
  );
}
