import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer.jsx';
import { MANAGE_CUSTOMER } from '../../ScreenJson.js';

function CustomerManagement() {
  return (
    <div className="standalone_page user_management_page">
      <RenderComponent jsonToRender={MANAGE_CUSTOMER} />
    </div>
  );
}

export default CustomerManagement;