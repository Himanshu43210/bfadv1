import React from "react";
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import { SEARCH_RESULT } from "../../ScreenJson.js";

export default function SearchResult() {
  return (
    <>
      <Card className="search-result-screen">
        <RenderComponent jsonToRender={SEARCH_RESULT} />
      </Card>
    </>
  );
}
