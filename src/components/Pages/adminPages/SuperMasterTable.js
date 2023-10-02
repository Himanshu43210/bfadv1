import React from "react";
import _ from "lodash";
import { AD_MASTER_TABLE } from "../../../UserJson";
import RenderComponent from "../../customComponents/ComponentRenderer";

export default function PropertyManagement() {
  return (
    <>
      <div className="standalone_page master_table_page">
        <RenderComponent jsonToRender={AD_MASTER_TABLE} />
      </div>
    </>
  );
}
