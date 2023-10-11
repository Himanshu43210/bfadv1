import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function OtpLogin() {
    const [open, setOpen] = useState(false);
    const [loginStage, setLoginStage] = useState(0);
    const [formData, setFormData] = useState({});
    const [resend, setResend] = useState(-1);

    const handleInput = (key, value) => {
        console.log('----- handle input -----', key, value);
        setFormData({ ...formData, [key]: value });
    };

    const handleResendOtp = () => {
        console.log('----- handle input -----', formData.phoneNumber);
        // hit api for resend otp with the payload phone number
        // show the snackbar: OTP sent.
        // disable the resend btn for 30s
    };

    const handleSubmit = () => {
        console.log('===== otp login submit =====', formData);
        if (loginStage === 0) {
            // hit the send otp api
            // disable the resend btn for 30s
        } else if (loginStage === 1) {
            // hit the signin api with the payload phone number & otp
            // wait for response, meanwhile show the loader
            // if success -> save the data and refresh the same page
            // if failed -> show the error snackbar
        } else if (loginStage === 2) {

        }
    };

    const renderPhoneForm = () => {
        return (
            <form className='otp_login_form'>
                <div className='ol_form_fields_container'>
                    <label className='field_label'>Enter Phone Number</label>
                    <input type="text" className='input_field phone_input' name='phone' id='phone' required onInput={(e) => handleInput("phoneNumber", e.target.value)} />
                </div>
                <Button type='submit' className='ol_submit_btn'>Send OTP</Button>
            </form>
        );
    };

    const renderOtpForm = () => {
        return (
            <form className='otp_login_form'>
                <div className='ol_form_fields_container'>
                    <label className='field_label'>Enter OTP</label>
                    <input type="text" className='input_field otp_input' name='otp' id='otp' required onInput={(e) => handleInput("otp", e.target.value)} />
                    <div className='resend_otp_wrapper'>
                        <Button type='submit' disabled={resend > 0} className='ol_submit_btn' onClick={handleResendOtp}>Resend OTP</Button>
                        <span>in 30s</span>
                    </div>
                </div>
                <Button type='submit' className='ol_submit_btn'>Submit</Button>
            </form>
        );
    };

    const renderForm = () => {
        switch (loginStage) {
            case 0:
                return renderPhoneForm();
            case 1:
                return renderOtpForm();
            default:
                return null;
        }
    };

    return (
        <div className='otp_login_component'>
            <Button className='ol_open_btn' onClick={() => setOpen(!open)}>
                <Typography className='ol_open_btn_label'>Sign In</Typography>
            </Button>
            {open && (
                <div className='ol_popup'>
                    {renderForm()}
                </div>
            )}
        </div>
    );
}

export default OtpLogin;