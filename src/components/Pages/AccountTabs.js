import React from 'react';
import { Card } from "react-bootstrap";
import RenderComponent from "../customComponents/ComponentRenderer";
import { ACCOUNT_TABS_SCREEN } from '../../ScreenJson';

function AccountTabs() {
    return (
        <Card className="account-tabs-screen">
            <RenderComponent jsonToRender={ACCOUNT_TABS_SCREEN} />
        </Card>
    );
}

export default AccountTabs;