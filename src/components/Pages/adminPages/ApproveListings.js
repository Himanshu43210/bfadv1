import React from "react";
import RenderComponent from "../../customComponents/ComponentRenderer";
import { APPROVAL_PROPERTIES } from "../../../UserJson";

export default function ApproveListing() {
  return (
    <div style={{ marginTop: "100px" }}>
      <RenderComponent jsonToRender={APPROVAL_PROPERTIES} />
    </div>
  );
}
