import React from 'react';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Button } from "@mui/material";
import Badge from './Badge';

const NotificationBell = () => {
    const notifTypes = {
        ADMIN_POST_APPROVE: "",

    };

    const renderDropdown = () => {
        return (
            <div className='notif_dd'>
                <div className='notif_list_wrapper'>

                </div>
            </div>
        );
    };

    return (
        <div className='notif_comp_wrapper'>
            <Button className={`notification_comp`}>
                <NotificationsRoundedIcon className='notif_bell_icon' />
                <Badge value={0} />
            </Button>
        </div>
    );
};

export default NotificationBell;