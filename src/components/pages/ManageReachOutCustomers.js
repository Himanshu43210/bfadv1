import React from 'react';
import RenderComponent from '../customComponents/ComponentRenderer.jsx';
import { MANAGE_REACH_OUT_USERS } from '../../ScreenJson.js';

const ManageReachOutCustomers = () => {
    return (
        <div className='standalone_page manage_reachout_customers_page'>
            <RenderComponent jsonToRender={MANAGE_REACH_OUT_USERS} />
        </div>
    );
};

export default ManageReachOutCustomers;