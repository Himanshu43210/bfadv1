import React from "react";

import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import { CARD_DETAILS_SCREEN } from "../../ScreenJson.js";
import dynamic from 'next/dynamic'

function comp() {
  return (
    <>
      <Card className="property_page detail-screen">
        <RenderComponent jsonToRender={CARD_DETAILS_SCREEN} />
      </Card>
    </>
  );
}

const DetailedView = dynamic(() => Promise.resolve(comp), { ssr: false })

export default DetailedView;