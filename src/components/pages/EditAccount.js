import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer.jsx';
import { MANAGE_ACCOUNT } from '../../ScreenJson.js';
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import { ROUTE_BUTTON } from '../utils/Const.js';

const EditAccount = () => {

    return (
        <>
            <div className={`standalone_page stats_page`}>
                <RenderComponent jsonToRender={MANAGE_ACCOUNT} />
                <CustomRouteButton
              component={{
                type: ROUTE_BUTTON,
                className: "admin-route-button",
                label: "Go to Dashboard",
                name: "Go to Dashboard",
                route: "/admin",
              }}
            />
            </div>
        </>
    );
}

export default EditAccount;