import React from "react";
import RenderComponent from "../../customComponents/ComponentRenderer";
import { APPROVAL_PROPERTIES } from "../../../UserJson";

export default function ApproveListing() {
  return (
    <div className="standalone_page approve_listing_page">
      <RenderComponent jsonToRender={APPROVAL_PROPERTIES} />
    </div>
  );
}
