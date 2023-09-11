import React from "react";

import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer";
import { CARD_DETAILS_SCREEN } from "../../ScreenJson";

export default function DetailedView() {
  return (
    <>
      <Card className="detail-screen">
        <RenderComponent jsonToRender={CARD_DETAILS_SCREEN} />
      </Card>
    </>
  );
}
