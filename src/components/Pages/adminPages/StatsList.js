import React from "react";
import _ from "lodash";
import RenderComponent from "../../customComponents/ComponentRenderer";
import { STATS_LIST } from "../../../UserJson";

export default function StatsListing() {
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <RenderComponent jsonToRender={STATS_LIST} />
      </div>
    </>
  );
}
