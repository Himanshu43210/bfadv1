import React from "react";
import _ from "lodash";
import RenderComponent from "../../customComponents/ComponentRenderer.jsx";
import { STATS_LIST } from "../../../UserJson.js";

export default function StatsListing() {
  return (
    <>
      <div className={`standalone_page stats_page`}>
        <RenderComponent jsonToRender={STATS_LIST} />
      </div>
    </>
  );
}
