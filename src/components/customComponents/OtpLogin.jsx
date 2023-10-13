import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SnackBar from './SnackBar';

function OtpLogin() {
    const [open, setOpen] = useState(false);
    // 1 - form stage 1; 2 - form stage 2, 0 - signed in
    const [loginStage, setLoginStage] = useState(0);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [resend, setResend] = useState(-1);
    const [snackbar, setSnackbar] = useState({});
    const [visited, setVisited] = useState(false);

    const userProfile = {
        name: "Tanish",
        phoneNumber: "********84"
    };

    const validations = {
        name: "^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$",
        phoneNumber: "^[0-9]{10}$",
        otp: "^[0-9]{6}$"
    };

    const handleCancelSignin = () => {
        setOpen(false);
        setFormData({});
        setLoginStage(1);
        setVisited(false);
    };

    const validateField = (key, value) => {
        const validationExp = new RegExp(validations[key]);
        const isValid = validationExp.test(value);
        setErrors({
            ...errors,
            [key]: ""
        });
        return isValid;
    };

    const handleInput = (key, value) => {
        console.log('----- handle input -----', key, value);
        setFormData({ ...formData, [key]: value });
    };

    const handleResendOtp = () => {
        console.log('----- handle input -----', formData.phoneNumber);
        setSnackbar({ open: true, message: `An OTP has been sent to ${formData.phoneNumber}.`, status: 1 });
        // hit api for resend otp with the payload phone number
        // show the snackbar: OTP sent.
        // disable the resend btn for 30s
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('===== otp login submit =====', formData);
        if (loginStage === 1) {
            if (formData.phoneNumber && formData.fullName) {
                setLoginStage(2);
                setSnackbar({ open: true, message: `An OTP has been sent to ${formData.phoneNumber}.`, status: 1 });
            } else {
                setSnackbar({ open: true, message: `Required field(s) empty.`, status: 1 });
            }
            // hit the send otp api
            // disable the resend btn for 30s
        } else if (loginStage === 2) {
            setLoginStage(0);
            // hit the signin api with the payload phone number & otp
            // wait for response, meanwhile show the loader
            // if success -> save the data and refresh the same page
            // if failed -> show the error snackbar
        }
    };

    const handleSignOut = () => {
        // setOpen(false);
        setLoginStage(1);
    };

    const snackbarClose = (status) => {
        setSnackbar({
            open: false,
            message: "",
        });
    };

    const handleMenuClose = () => {
        setOpen(false);
        setVisited(false);
    }

    const renderDetailsForm = () => {
        return (
            <form className='otp_login_form'>
                <div className='ol_form_fields_container'>
                    <label className='field_label'>Enter Full Name*</label>
                    <input type="text" value={formData.fullName} className='ol_input_field name_input' name='name' id='name' required={true} onInput={(e) => handleInput("fullName", e.target.value)} />
                    <label className='field_label'>Enter Phone Number*</label>
                    <input type="number" value={formData.phoneNumber} className='ol_input_field phone_input' name='phoneNumber' id='phoneNumber' required={true} onInput={(e) => handleInput("phoneNumber", e.target.value)} />
                </div>
                <Button type='submit' className='ol_submit_btn' onClick={handleSubmit}>Send OTP</Button>
                <Button type='reset' variant='outlined' className='ol_cancel_btn' onClick={handleCancelSignin}>Cancel</Button>
            </form>
        );
    };

    const renderOtpForm = () => {
        return (
            <form className='otp_login_form'>
                <div className='ol_form_fields_container'>
                    <label className='field_label'>Enter OTP*</label>
                    <input type="number" value={formData.otp} className='ol_input_field otp_input' name='otp' id='otp' required={true} onInput={(e) => handleInput("otp", e.target.value)} minLength={6} maxLength={6} />
                    <div className='resend_otp_wrapper'>
                        <Button type='button' disabled={resend > 0} className='ol_resend_btn' onClick={handleResendOtp}>Resend OTP</Button>
                        <span>in 30s</span>
                    </div>
                </div>
                <Button type='submit' className='ol_submit_btn' onClick={handleSubmit}>Submit</Button>
                <Button type='reset' variant='outlined' className='ol_cancel_btn' onClick={handleCancelSignin}>Cancel</Button>
            </form>
        );
    };

    const renderHeader = () => {
        return (
            <div className='section_header ol_header'>
                <div className='header_left'>
                    {loginStage > 1 && (
                        <Button className='form_back_btn' onClick={() => setLoginStage(1)}>
                            <ArrowBackIcon className='back_icon' />
                        </Button>
                    )}
                    <Typography variant="h3" className="detailcardheading header_title">Sign In</Typography>
                </div>
                <div className='header_right'>
                    <Button className='bot_btn' onClick={handleCancelSignin}>
                        <CloseOutlinedIcon className='chatbot_close' />
                    </Button>
                </div>
            </div>
        );
    };

    const renderForm = () => {
        switch (loginStage) {
            case 1:
                return renderDetailsForm();
            case 2:
                return renderOtpForm();
            default:
                return null;
        }
    };

    const renderMenuPopup = () => {
        return (
            <div className='menu_popup' onMouseEnter={() => setVisited(true)}>
                <div className='menu_sec menu_sec_top'>
                    <Typography className='profile_name'>{userProfile.name}</Typography>
                    <span className='acc_contact'>{userProfile.phoneNumber}</span>
                </div>
                <div className='menu_sec menu_sec_middle'>
                    <div className='menu_item'>
                        <span>Recent Searches</span>
                    </div>
                    <div className='menu_item'>
                        <span>Contacted</span>
                    </div>
                    <div className='menu_item'>
                        <span>Shortlisted</span>
                    </div>
                    <div className='menu_item'>
                        <span>Viewed</span>
                    </div>
                    <div className='menu_item'>
                        <span>Recommendations</span>
                    </div>
                </div>
                <div className='menu_sec menu_sec_bottom'>
                    <Button className='signout_btn' onClick={handleSignOut}>Sign Out</Button>
                </div>
            </div>
        )
    };

    const renderPopup = () => {
        if (loginStage === 0) {
            return renderMenuPopup();
        } else {
            return (
                <>
                    <div className='ol_overlay' onClick={handleCancelSignin}></div>
                    <div className='ol_popup'>
                        {renderHeader()}
                        {renderForm()}
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <div className='otp_login_component' onMouseLeave={() => {
                if (visited) {
                    handleMenuClose();
                }
            }}>
                <Button className={`ol_open_btn ${loginStage === 0 ? "acc_btn" : "signin_btn"}`} onClick={() => setOpen(!open)}>
                    {loginStage === 0 ? (
                        <>
                            <AccountCircleIcon className='acc_profile_icon' />
                            {/* <ExpandMoreIcon className='expand_icon' /> */}
                        </>
                    ) : (
                        <Typography className='ol_open_btn_label'>Sign In</Typography>
                    )}
                </Button>
                {open && renderPopup()}
            </div>
            <SnackBar
                open={snackbar?.open}
                message={snackbar?.message}
                onClose={(status) => snackbarClose(status)}
            />
        </>
    );
}

export default OtpLogin;