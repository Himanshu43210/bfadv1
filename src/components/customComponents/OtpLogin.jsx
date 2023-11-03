import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material/index.js';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack.js';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt.js';
import SnackBar from './SnackBar.jsx';
import { auth } from '../../firebase.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ADD_CUSTOMER, ALTER_PROPERTY_DATA, POST, ROUTE_BUTTON } from '../utils/Const.js';
import { newPropertyConst } from '../fieldConsts/PropertiesFieldConst.js';
import RouteButton from './RouteButton.jsx';
import AccountMenu from './AccountMenu.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { callApi } from '../../redux/utils/apiActions.js';
import { API_ENDPOINTS } from '../../redux/utils/api.js';
import { storeCustomerData, clearCustomerData } from '../../redux/slice/customerSlice.js'

function OtpLogin() {
    const [open, setOpen] = useState(false);
    const [formStage, setFormStage] = useState(0);
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        otp: ""
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({});
    const [visited, setVisited] = useState(false);
    const [captchaGenerated, setCaptchaGenerated] = useState(false);
    const isMobile = window.innerWidth < 768;
    const recaptchaWrapperRef = useRef();
    const dispatch = useDispatch();

    const customerProfile = useSelector((state) => state.customer);

    useEffect(() => {
        if (!customerProfile || Object.keys(customerProfile).length === 0) {
            const customer = localStorage.getItem("customer");
            if (customer !== undefined || customer !== "undefined") {
                const customerData = JSON.parse(customer);
                dispatch(storeCustomerData(customerData));
            }
        }
    }, []);

    const registerProperty = {
        type: ROUTE_BUTTON,
        className: "form-route-btn",
        label: "Register Property",
        name: "Register Property",
        form: newPropertyConst,
        onSaveApi: ALTER_PROPERTY_DATA,
        route: "/agent/form",
        autofill: ["city", "state", "location"],
    };

    const handleCancelSignin = () => {
        setOpen(false);
        setVisited(false);
        setFormData({});
        setFormStage(0);
        setCaptchaGenerated(false);
    };

    const handleSignOut = () => {
        localStorage.removeItem("customer");
        setFormStage(0);
        setOpen(true);
        dispatch(clearCustomerData());
    };

    const handleInput = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleResendOtp = () => {
        setFormData(currFormData => {
            return { ...currFormData, otp: "" };
        });
        handleDataSubmit();
    };

    const generateRecaptcha = () => {
        if (captchaGenerated) return;
        setCaptchaGenerated(true);
        console.log('=== GENERAE RECAPTCHA ===');
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log('=== RECAPTCHA VERIFIER ===', response);
                // setSnackbar({ open: true, message: `Captcha failed. Try again.`, status: 1 });
            }
        });
    };

    const handleDataSubmit = () => {
        if (formData.phoneNumber && formData.fullName) {
            setLoading(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            console.log('=== appVerifier ===', appVerifier);
            signInWithPhoneNumber(auth, `+91${formData.phoneNumber}`, appVerifier)
                .then((confirmationResult) => {
                    setFormStage(1);
                    setSnackbar({ open: true, message: `An OTP has been sent to ${formData.phoneNumber}.`, status: 1 });
                    window.confirmationResult = confirmationResult;
                }).catch((error) => {
                    console.log('=== OTP LOGIN ERROR ===', formData.phoneNumber, error);
                    setFormStage(0);
                    setSnackbar({ open: true, message: `Sorry! Too many requests. Try later.`, status: 1 });
                }).finally(() => {
                    setLoading(false);
                });
        } else {
            setSnackbar({ open: true, message: `Error: Required field(s) empty.`, status: 1 });
        }
    };

    const handleOtpSubmit = () => {
        if (formData.otp?.length === 6) {
            setLoading(true);
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(formData.otp).then((result) => {
                console.log('+++++ OTP VERIFICATION SUCCESSFUL +++++', result);
                // send the result to the server to save the user
                const headers = { "Content-Type": "application/json" };
                const data = {
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber
                };
                const options = {
                    url: API_ENDPOINTS[ADD_CUSTOMER],
                    method: POST,
                    headers,
                    data,
                };
                dispatch(callApi(options))
                    .then((res) => {
                        console.log('>>>>>>> CUSTOMER REGISTERED <<<<<<<', res);
                        dispatch(storeCustomerData(res.payload.user));
                        localStorage.setItem("customer", JSON.stringify(res.payload.user));
                        setFormData({ fullName: "", phoneNumber: "", otp: "" });
                    }).catch((error) => {
                        console.log('----- customer registration error -----', error);
                    });
            }).catch((error) => {
                console.log('-------- otp verification error -------', error);
                setSnackbar({ open: true, message: `Please enter correct OTP.`, status: 1 });
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setSnackbar({ open: true, message: `Invalid OTP.`, status: 1 });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('===== otp login submit =====', formData);
        if (formStage === 0) {
            handleDataSubmit();
        } else if (formStage === 1) {
            handleOtpSubmit();
        }
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
    };

    const renderLinks = () => {
        return (
            <div className='form_links_wrapper'>
                <RouteButton component={registerProperty}>
                    <ArrowRightAltIcon />
                </RouteButton>
            </div>
        );
    };

    const renderDetailsForm = () => {
        return (
            <form className='otp_login_form'>
                <div className='ol_form_fields_container'>
                    <label className='field_label'>Enter Full Name*</label>
                    <input type="text" value={formData.fullName} className='ol_input_field name_input' name='name' id='name' required={true} onInput={(e) => handleInput("fullName", e.target.value)} />
                    <label className='field_label'>Enter Phone Number*</label>
                    <input type="number" value={formData.phoneNumber} className='ol_input_field phone_input' name='phoneNumber' id='phoneNumber' required={true} onInput={(e) => handleInput("phoneNumber", e.target.value)} />
                </div>
                <div className='form_btns_wrapper'>
                    <Button type='submit' className='form_btn ol_submit_btn' onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <span>Sending...</span>
                        ) : (
                            <span>Send OTP</span>
                        )}

                    </Button>
                    <Button type='reset' variant='outlined' className='form_btn ol_cancel_btn' onClick={handleCancelSignin}>Cancel</Button>
                </div>
                {renderLinks()}
            </form>
        );
    };

    const renderOtpForm = () => {
        return (
            <form className='otp_login_form'>
                <div className='ol_form_fields_container'>
                    <label className='field_label'>Enter OTP*</label>
                    <input type="number" value={formData.otp} className='ol_input_field otp_input' name='otp' id='otp' required={true} onInput={(e) => handleInput("otp", e.target.value)} />
                    <div className='resend_otp_wrapper'>
                        <Button type='button' className='ol_resend_btn' onClick={handleResendOtp}>Didn't received OTP? Resend.</Button>
                    </div>
                </div>
                <div className='form_btns_wrapper'>
                    <Button type='submit' className='form_btn ol_submit_btn' onClick={handleSubmit} disabled={loading}>
                        <span>{loading ? "Sending.." : "Submit"}</span>
                    </Button>
                    <Button type='reset' variant='outlined' className='form_btn ol_cancel_btn' onClick={handleCancelSignin}>Cancel</Button>
                </div>
            </form>
        );
    };

    const renderHeader = () => {
        return (
            <div className='section_header ol_header'>
                <div className='header_left'>
                    {/* {formStage > 0 && (
                        <Button className='form_back_btn' onClick={() => setFormStage(1)}>
                            <ArrowBackIcon className='back_icon' />
                        </Button>
                    )} */}
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
        switch (formStage) {
            case 0:
                return renderDetailsForm();
            case 1:
                return renderOtpForm();
            default:
                return null;
        }
    };

    return (
        <>
            {(customerProfile && Object.keys(customerProfile).length !== 0) ? (
                <AccountMenu userProfile={customerProfile} onSignOut={handleSignOut} />
            ) : (
                <div className='otp_login_component' onMouseLeave={() => {
                    if (visited || isMobile) {
                        handleMenuClose();
                    }
                }}>
                    <Button className={`ol_open_btn signin_btn`} onClick={() => setOpen(!open)}>
                        <Typography className='ol_open_btn_label'>Sign In</Typography>
                    </Button>
                    {open && (
                        <>
                            <div className='ol_overlay' onClick={handleCancelSignin}></div>
                            <div className='ol_popup'>
                                {renderHeader()}
                                {renderForm()}
                                <div ref={recaptchaWrapperRef}>
                                    <div id="sign-in-recaptcha"></div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
            <SnackBar
                open={snackbar?.open}
                message={snackbar?.message}
                onClose={(status) => snackbarClose(status)}
            />
        </>
    );
}

export default OtpLogin;