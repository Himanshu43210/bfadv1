import React, { useRef, useEffect, useState } from "react";
import FormBuilder from "../utils/FormBuilder.jsx";
import { Button, CircularProgress } from "@mui/material/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
    ALTER_USER_DATA,
    GET,
    GET_MASTER_DATA_ON_HOME,
    NEED_APPROVAL_BY,
    POST,
    ROUTE_BUTTON,
} from "../utils/Const.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { filterAutofillData, sanitizeFormData } from "../utils/reusableMethods.js";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import SnackBar from "../customComponents/SnackBar.jsx";
import { useNavigate } from "react-router-dom";
import { USER_ROLE } from "../../ScreenJson.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { newAgentConst } from "../fieldConsts/UserFieldConst.js";
import { storeUserData } from "../../redux/slice/userSlice.js";

const GeneralFormPage = () => {
    const finalizeRef = useRef(null);
    const [snackbar, setSnackbar] = useState({});
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(true);
    const [otp, setOtp] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [captchaGenerated, setCaptchaGenerated] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hasImages, setHasImages] = useState(false);
    const [submitData, setSubmitData] = useState();
    const [verifing, setVerifing] = useState(false);
    const registerAgent = {
        type: ROUTE_BUTTON,
        className: "form-route-btn",
        label: "Sign Up (New Broker)",
        name: "Sign Up (New Broker)",
        form: newAgentConst,
        onSaveApi: ALTER_USER_DATA,
        route: "/agent/form",
    };

    useEffect(() => {
        console.log('================= NO USER PROFILE =================', userProfile);
        if (!userProfile || Object.keys(userProfile).length === 0) {
            console.log('========= CONDITION TRUE ========');
            dispatch(
                storeUserData({
                    ...userProfile,
                    formType: registerAgent.form,
                    formSaveApi: registerAgent.onSaveApi,
                    formName: registerAgent.label,
                    autofill: registerAgent.autofill,
                })
            );
        }
    }, [userProfile]);

    useEffect(() => {
        try {
            const options = {
                url: API_ENDPOINTS[GET_MASTER_DATA_ON_HOME],
                method: GET,
                headers: { "Content-Type": "application/json" },
            };
            dispatch(callApi(options))
                .then((res) => {
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const snackbarClose = () => {
        setSnackbar({
            open: false,
            message: "",
        });
    };

    const getMessage = (type = "SUBMIT", status = "SUCCESS") => {
        let message = '';
        switch (userProfile.formName) {
            case "Create Broker":
                message = `Broker ${type === "SUBMIT" ? 'Created' : 'Saved'}.`;
                break;
            case "Create Sub User":
                message = `Sub User ${type === "SUBMIT" ? 'Created' : 'Saved'}.`;
                break;
            case "Post Listing":
                message = `Post ${type === "SUBMIT" ? 'Submitted' : 'Saved'} Successfully.`;
                break;
            default:
                message = "Submitted";
        }
        return message;
    };

    const [submitting, setSubmitting] = useState(false);
    const [saving, setSaving] = useState(false);
    const router = useNavigate();

    const generateRecaptcha = () => {
        if (captchaGenerated) return;
        setCaptchaGenerated(true);
        console.log('=== GENERAE RECAPTCHA ===');
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-recaptcha', {
            'size': 'invisible',
            'callback': (response) => {
                console.log('=== RECAPTCHA VERIFIER ===', response);
            }
        });
        console.log('++++++ generateCaptcha ++++++', captchaGenerated);
    };

    const handleResendOtp = () => {
        handleDataSubmit(phoneNumber);
    };

    const handleDataSubmit = (phoneNumber) => {
        console.log('++++++ dataSubmit ++++++', phoneNumber);
        if (phoneNumber) {
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            console.log('=== appVerifier ===', appVerifier);
            signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier)
                .then((confirmationResult) => {
                    setSnackbar({ open: true, message: `An OTP has been sent to ${phoneNumber}.`, status: 1 });
                    window.confirmationResult = confirmationResult;
                }).catch((error) => {
                    console.log('=== OTP LOGIN ERROR ===', phoneNumber, error);
                    setSnackbar({ open: true, message: `Sorry! Too many requests. Try later.`, status: 1 });
                });
        } else {
            setSnackbar({ open: true, message: `Error: Required field(s) empty.`, status: 1 });
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        console.log('++++++ otpSubmit ++++++', otp);
        if (otp?.length === 6) {
            setVerifing(true);
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                console.log('+++++ OTP VERIFICATION SUCCESSFUL +++++', result);
                // send the result to the server to save the user
                let headers = hasImages
                    ? { "Content-Type": "multipart/form-data" }
                    : { "Content-Type": "application/json" };
                const options = {
                    url: API_ENDPOINTS[userProfile.formSaveApi],
                    method: POST,
                    headers: headers,
                    data: submitData,
                };
                dispatch(callApi(options)).then(() => {
                    setVerifing(false);
                    setTimeout(() => {
                        router("/");
                    }, 1200);
                    setSnackbar({ open: true, message: "Registered as an agent." });
                }).catch((error) => {
                    setSnackbar({ open: true, message: `Registration failed.`, status: 1 });
                });
            }).catch((error) => {
                console.log('-------- otp verification error -------', error);
                setVerifing(false);
                setSnackbar({ open: true, message: `Please enter correct OTP.`, status: 1 });
            });
        } else {
            setSnackbar({ open: true, message: `Invalid OTP.`, status: 1 });
        }
    };

    const handleSubmit = async () => {
        if (!submitting) {
            const formData = finalizeRef.current.finalizeData();
            if (formData) {
                console.log("***** Received validated data: *****", formData, userProfile.formType);
                try {
                    let newFormData = new FormData();
                    const fileFields = [
                        "thumbnailFile",
                        "normalImageFile",
                        "threeSixtyImages",
                        "layoutFile",
                        "videoFile",
                        "virtualFile",
                    ];

                    fileFields.forEach((field) => {
                        if (formData[field]) {
                            for (const file of formData[field]) {
                                newFormData.append(field, file);
                            }
                        }
                    });

                    // system id
                    newFormData.append("parentId", "6543375a83ea9de3bacc5fe2");
                    // admin id
                    newFormData.append("contactId", "64e867d86a2061a0973a9a6c");
                    newFormData.append(NEED_APPROVAL_BY, "64e867d86a2061a0973a9a6c");
                    newFormData.append("type", "agent");

                    function isObjectNotString(value) {
                        return (
                            typeof value === "object" &&
                            !Array.isArray(value) &&
                            value !== null
                        );
                    }

                    function isFileList(value) {
                        return value instanceof FileList;
                    }

                    Object.keys(formData).forEach((element) => {
                        if (!isFileList(formData[element])) {
                            if (isObjectNotString(formData[element])) {
                                newFormData.append(
                                    element,
                                    formData[element].value
                                );
                            } else {
                                newFormData.append(element, formData[element]);
                            }
                        }
                    });

                    const imagesCheck = fileFields.some((field) => formData[field]);
                    setHasImages(imagesCheck);

                    let data = imagesCheck
                        ? newFormData
                        : sanitizeFormData({
                            ...formData,
                            parentId: "64e867d86a2061a0973a9a6c",
                            role: USER_ROLE["channelPartner"],
                            type: "agent"
                        });
                    setSubmitData(data);

                    // check if mobile number is present
                    if (formData.phoneNumber && formData.phoneNumber !== "") {
                        console.log('------ formData.phoneNumber ------', formData.phoneNumber);
                        setPhoneNumber(formData.phoneNumber);
                        setShowPopup(true);
                        handleDataSubmit(formData.phoneNumber);
                        // setSubmitting(true);
                    }
                } catch (error) {
                    setSubmitting(false);
                    setSnackbar({ open: true, message: `Submit Failed.` });
                    console.log("--- SUBMIT failed ---", error);
                }
            } else {
                setSubmitting(false);
                setSnackbar({ open: true, message: `Empty required field(s).` });
            }
        } else {
            setSnackbar({ open: true, message: `Submitting.` });
        }
    };

    const handleSave = () => {
        if (!saving) {

        } else {
            setSnackbar({ open: true, message: `Saving.` });
        }
    };

    const handleReset = () => {
        finalizeRef.current.resetForm();
        setSnackbar({ open: true, message: `Form resetted.` });
    };

    const handleCancelPopup = () => {
        setShowPopup(false);
        setOtp("");
    };

    const renderOtpForm = () => {
        return (
            <>
                <div className="ol_overlay" onClick={handleCancelPopup}></div>
                <div className='ol_popup'>
                    <form className='otp_login_form'>
                        <div className='ol_form_fields_container'>
                            <label className='field_label'>Enter OTP*</label>
                            <input type="number" value={otp} className='ol_input_field otp_input' name='otp' id='otp' required={true} onInput={(e) => setOtp(e.target.value)} />
                            <div className='resend_otp_wrapper'>
                                <Button type='button' className='ol_resend_btn' onClick={handleResendOtp}>Didn't received OTP? Resend.</Button>
                            </div>
                        </div>
                        <div className='form_btns_wrapper'>
                            <Button type='submit' className='form_btn ol_submit_btn' onClick={handleOtpSubmit} disabled={verifing}>
                                <span>{verifing ? "Sending.." : "Submit"}</span>
                            </Button>
                            <Button type='reset' variant='outlined' className='form_btn ol_cancel_btn' onClick={handleCancelPopup}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </>
        );
    };

    return (
        <>
            {loading && <CircularProgress className="loader-class" />}
            {!loading && (
                <>
                    <div className="standalone_page form_page">
                        <div className="formheadingcontainer">{userProfile.formName}</div>
                        <FormBuilder
                            ref={finalizeRef}
                            fields={userProfile.formType}
                            propsFormData={
                                userProfile.autofill
                                    ? filterAutofillData(userProfile.autofill, userProfile)
                                    : {}
                            }
                        />
                        <div className="form_controls_wrapper">
                            <Button variant="contained" onClick={handleSubmit} disabled={submitting} className="save_btn">{submitting ? "Submitting..." : "Submit"}</Button>
                            {
                                userProfile?.showSaveBtn ? (
                                    <Button variant="secondary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
                                ) : null
                            }
                            {
                                userProfile?.showResetBtn ? (
                                    <Button variant="secondary" onClick={handleReset}>Reset</Button>
                                ) : null
                            }
                        </div>
                        <CustomRouteButton
                            component={{
                                type: ROUTE_BUTTON,
                                className: "admin-route-button",
                                label: "Back",
                                name: "Back",
                                route: -1,
                            }}
                        />
                    </div>
                    <SnackBar
                        open={snackbar?.open}
                        message={snackbar?.message}
                        onClose={snackbarClose}
                    />
                    {submitting === true ? <CircularProgress className="loader-class" /> : null}
                    <div id="sign-in-recaptcha"></div>
                    {showPopup && renderOtpForm()}
                </>
            )}
        </>
    );
};

export default GeneralFormPage;
