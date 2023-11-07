import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material/index.js';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack.js';
import SnackBar from './SnackBar.jsx';
import { auth } from '../../firebase.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { ADD_CUSTOMER, ALTER_USER_DATA, POST, ROUTE_BUTTON } from '../utils/Const.js';
import AccountMenu from './AccountMenu.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { callApi } from '../../redux/utils/apiActions.js';
import { API_ENDPOINTS } from '../../redux/utils/api.js';
import { storeCustomerData, clearCustomerData } from '../../redux/slice/customerSlice.js'
import { newAgentConst } from '../fieldConsts/UserFieldConst.js';
import { useNavigate } from 'react-router-dom';
import { storeUserData } from '../../redux/slice/userSlice.js';

function OtpLogin() {
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [formStage, setFormStage] = useState(0);
    const [popupStage, setPopupStage] = useState(0);
    const [mode, setMode] = useState();
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customerProfile = useSelector((state) => state.customer);
    const user = useSelector((state) => state.profile);

    useEffect(() => {
        if (!customerProfile || Object.keys(customerProfile).length === 0) {
            const customer = localStorage.getItem("customer");
            if (customer !== undefined || customer !== "undefined") {
                const customerData = JSON.parse(customer);
                dispatch(storeCustomerData(customerData));
            }
        }
    }, []);

    const registerAgent = {
        type: ROUTE_BUTTON,
        className: "form-route-btn",
        label: "Agent",
        name: "Agent",
        form: newAgentConst,
        onSaveApi: ALTER_USER_DATA,
        route: "/agent/form",
    };

    const handleCancelSignin = () => {
        setOpen(false);
        setOpenForm(false);
        setVisited(false);
        setFormData({});
        setFormStage(0);
        setPopupStage(0);
        setCaptchaGenerated(false);
    };

    const handleSignOut = () => {
        localStorage.removeItem("customer");
        setFormStage(0);
        setOpenForm(true);
        dispatch(clearCustomerData());
        navigate("/");
    };

    const handleInput = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const routeEntry = (key) => {
        if (key === 'CUSTOMER') {
            if (mode === 'SIGNIN') {
                // show signin form
                setOpenForm(true);
                setOpen(false);
            } else if (mode === 'SIGNUP') {
                // show signup form
                setOpenForm(true);
                setOpen(false);
            }
        } else if (key === 'AGENT') {
            if (mode === 'SIGNIN') {
                navigate('/login');
            } else if (mode === 'SIGNUP') {
                dispatch(
                    storeUserData({
                        ...user,
                        formType: registerAgent.form,
                        formSaveApi: registerAgent.onSaveApi,
                        formName: registerAgent.label,
                        autofill: registerAgent.autofill,
                    })
                );
                navigate(registerAgent.route);
            }
        }
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
        if ((mode === "SIGNIN" && formData.phoneNumber) || (mode === "SIGNUP" && formData.phoneNumber && formData.fullName)) {
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
                    url: mode === "SIGNUP" ? API_ENDPOINTS[ADD_CUSTOMER] : API_ENDPOINTS[""],
                    method: POST,
                    headers,
                    data,
                };
                dispatch(callApi(options))
                    .then((res) => {
                        console.log('>>>>>>> CUSTOMER REGISTERED <<<<<<<', res);
                        if (mode === 'SIGNIN') {
                            if (res.payload?.user) {
                                dispatch(storeCustomerData(res.payload.user));
                                localStorage.setItem("customer", JSON.stringify(res.payload.user));
                                setFormData({ fullName: "", phoneNumber: "", otp: "" });
                            }
                        } else if (mode === 'SIGNUP') {
                            if (res.payload?.data) {
                                dispatch(storeCustomerData(res.payload.data));
                                localStorage.setItem("customer", JSON.stringify(res.payload.data));
                                setFormData({ fullName: "", phoneNumber: "", otp: "" });
                            }
                        }
                    }).catch((error) => {
                        console.log('----- customer registration error -----', error);
                        setSnackbar({ open: true, message: error.message, status: 1 });
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

    const renderDetailsForm = () => {
        return (
            <form className='otp_login_form'>
                <div className='ol_form_fields_container'>
                    {mode === 'SIGNUP' && (
                        <>
                            <label className='field_label'>Enter Full Name*</label>
                            <input type="text" value={formData.fullName} className='ol_input_field name_input' name='name' id='name' required={true} onInput={(e) => handleInput("fullName", e.target.value)} />
                        </>
                    )}
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
                    <Typography variant="h3" className="detailcardheading header_title">{mode === 'SIGNIN' ? 'Sign In' : 'Sign Up'}</Typography>
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

    const renderFormPopup = () => {
        return (
            <>
                <div className='ol_overlay' onClick={handleCancelSignin}></div>
                <div className='ol_popup'>
                    {renderHeader()}
                    {renderForm()}
                    <div id="sign-in-recaptcha"></div>
                </div>
            </>
        );
    }

    const renderPopup = () => {
        return (
            <div className='menu_popup' onMouseEnter={() => setVisited(true)}>
                {popupStage === 0 ? (
                    <div className='btns_group'>
                        {/* sign in btn */}
                        <button className='popup_btn' onClick={() => {
                            setPopupStage(1);
                            setMode('SIGNIN');
                        }}>Sign In</button>
                        {/* sign up btn */}
                        <button className='popup_btn' onClick={() => {
                            setPopupStage(1);
                            setMode('SIGNUP');
                        }}>Sign Up</button>
                    </div>
                ) : (
                    <div className='btns_group'>
                        <div className='popup_head'>
                            <button className='popup_icon_btn' onClick={() => {
                                setPopupStage(0);
                                setMode();
                            }}>
                                <ArrowBackIcon className='back_icon' />Back
                            </button>
                        </div>
                        {/* Customer */}
                        <button className='popup_btn' onClick={() => routeEntry('CUSTOMER')}> {mode === 'SIGNIN' ? 'Sign In' : 'Sign Up'} As Customer</button>
                        <button className='popup_btn' onClick={() => routeEntry('AGENT')}>{mode === 'SIGNIN' ? 'Sign In' : 'Sign Up'} As Agent</button>
                    </div>
                )}
            </div>
        );
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
                    {open && renderPopup()}
                    {openForm && renderFormPopup()}
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