import React from "react";
import RenderComponent from "../../customComponents/ComponentRenderer.jsx";
import { APPROVAL_PROPERTIES } from "../../../UserJson.js";

export default function ApproveListing() {
  return (
    <div className="standalone_page approve_listing_page">
      <RenderComponent jsonToRender={APPROVAL_PROPERTIES} />
    </div>
  );
}
