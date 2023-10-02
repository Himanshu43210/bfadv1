import React from "react";
import _ from "lodash";
import RenderComponent from "../../customComponents/ComponentRenderer";
import { STATS_LIST } from "../../../UserJson";

export default function StatsListing() {
  return (
    <>
      <div className={`standalone_page stats_page`}>
        <RenderComponent jsonToRender={STATS_LIST} />
      </div>
    </>
  );
}
