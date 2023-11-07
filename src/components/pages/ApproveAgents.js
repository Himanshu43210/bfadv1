import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer.jsx';
import { MANAGE_AGENT } from '../../ScreenJson.js';

const ApproveAgents = () => {
    return (
        <div className="standalone_page user_management_page">
            <RenderComponent jsonToRender={MANAGE_AGENT} />
        </div>
    );
}

export default ApproveAgents;