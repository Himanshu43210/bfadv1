import React from 'react';
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import { ACCOUNT_TABS_SCREEN } from '../../ScreenJson.js';

function AccountTabs() {
    return (
        <Card className="account-tabs-screen">
            <RenderComponent jsonToRender={ACCOUNT_TABS_SCREEN} />
        </Card>
    );
}

export default AccountTabs;