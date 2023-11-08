import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout.js';
import YoutubeSearchedForSharpIcon from '@mui/icons-material/YoutubeSearchedForSharp.js';
import VisibilityIcon from '@mui/icons-material/Visibility.js';
import CallIcon from '@mui/icons-material/Call.js';
import RecommendIcon from '@mui/icons-material/Recommend.js';
import AccountCircleIcon from '@mui/icons-material/AccountCircle.js';
import { Typography, Button } from '@mui/material/index.js';

const AccountMenu = ({ userProfile, onSignOut }) => {
    const [open, setOpen] = useState(false);
    const [visited, setVisited] = useState(false);
    const isMobile = window.innerWidth < 768;

    const handleMenuClose = () => {
        setOpen(false);
        setVisited(false);
    };

    const handleSignOut = () => {
        onSignOut();
    };

    const hidePartially = (value) => {
        let res = '';
        Array.from(value).forEach((element, index) => {
            if (index < (value.length - 2)) {
                res += "*";
            } else {
                res += element;
            }
        });
        return res;
    };

    const renderMenuPopup = () => {
        return (
            <div className='menu_popup' onMouseEnter={() => setVisited(true)}>
                <div className='menu_sec menu_sec_top'>
                    <Typography className='profile_name'>{userProfile.fullName}</Typography>
                    <span className='acc_contact'>{hidePartially(userProfile.phoneNumber)}</span>
                </div>
                <div className='menu_sec menu_sec_middle'>
                    {/* <Link to="/account/tabs?tab=recent_searches" className='acc_menu_item'>
                        <div className='menu_item'>
                            <YoutubeSearchedForSharpIcon className='menu_item_icon' />
                            <span>Recent Searches</span>
                        </div>
                    </Link> */}
                    <Link to="/account/tabs?tab=viewed" className='acc_menu_item'>
                        <div className='menu_item'>
                            <VisibilityIcon className='menu_item_icon' />
                            <span>Viewed</span>
                        </div>
                    </Link>
                    <Link to="/account/tabs?tab=contacted" className='acc_menu_item'>
                        <div className='menu_item'>
                            <CallIcon className='menu_item_icon' />
                            <span>Contacted</span>
                        </div>
                    </Link>
                    <Link to="/account/tabs?tab=recommendations" className='acc_menu_item'>
                        <div className='menu_item'>
                            <RecommendIcon className='menu_item_icon' />
                            <span>Recommendations</span>
                        </div>
                    </Link>
                </div>
                <div className='menu_sec menu_sec_bottom'>
                    <Button className='menu_item signout_btn' onClick={handleSignOut}>
                        <LogoutIcon className='menu_item_icon' />
                        <span className='menu_item_label'>Sign Out</span>
                    </Button>
                </div>
            </div>
        )
    };

    return (
        <div className='otp_login_component' onMouseLeave={() => {
            if (visited || isMobile) {
                handleMenuClose();
            }
        }}>
            <Button className={`ol_open_btn acc_btn`} onClick={() => setOpen(!open)}>
                <AccountCircleIcon className='acc_profile_icon' />
                {!isMobile && (
                    <Typography className='profile_name_pc'>{userProfile.fullName}</Typography>
                )}
            </Button>
            {open && renderMenuPopup()}
        </div>
    );
}

export default AccountMenu;