import React from "react";

import { Card } from "react-bootstrap";
import { HOME_SCREEN } from "../../ScreenJson.js";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";

export default function Home() {
  return (
    <>
      {/* <MenupState MenuItems={MENU_ITEMS} /> */}
      <Card className="home-screen">
        <RenderComponent jsonToRender={HOME_SCREEN} />
      </Card>
    </>
  );
}
