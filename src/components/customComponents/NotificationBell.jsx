import React from 'react';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Badge from './Badge';
import Link from 'next/link';

const NotificationBell = () => {
    const notifTypes = {
        ADMIN_POST_APPROVE: "",

    };

    return (
        <Link href="/admin/notifications" className={`notification_comp`}>
            <div className='notif_comp_wrapper'>
                <NotificationsRoundedIcon className='notif_bell_icon' />
                <Badge value={0} />
            </div>
        </Link>
    );
};

export default NotificationBell;