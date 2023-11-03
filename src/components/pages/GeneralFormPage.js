import React, { useRef, useEffect, useState } from "react";
import FormBuilder from "../utils/FormBuilder.jsx";
import { Button, CircularProgress } from "@mui/material/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
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

const GeneralFormPage = () => {
    const finalizeRef = useRef(null);
    const [snackbar, setSnackbar] = useState({});
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(true);

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
            case "Create Channel Partner":
                message = `Channel Partner ${type === "SUBMIT" ? 'Created' : 'Saved'}.`;
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

    const handleSubmit = async () => {
        if (!submitting) {
            const formData = finalizeRef.current.finalizeData();
            if (formData) {
                console.log("Received validated data:", formData);
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

                    let headers = imagesCheck
                        ? { "Content-Type": "multipart/form-data" }
                        : { "Content-Type": "application/json" };

                    let data = imagesCheck
                        ? newFormData
                        : sanitizeFormData({
                            ...formData,
                            parentId: "6543375a83ea9de3bacc5fe2",
                            role: USER_ROLE["channelPartner"],
                        });

                    const options = {
                        url: API_ENDPOINTS[userProfile.formSaveApi],
                        method: POST,
                        headers: headers,
                        data: data,
                    };

                    setSubmitting(true);
                    dispatch(callApi(options)).then(() => {
                        setSubmitting(false);
                        setTimeout(() => {
                            router("/");
                        }, 1200);
                        setSnackbar({ open: true, message: "Property Registered." });
                    });
                } catch (error) {
                    setSubmitting(false);
                    setSnackbar({ open: true, message: `Submit Failed.` });
                    console.log("--- SUBMIT failed ---", error);
                }
            } else {
                setSubmitting(false);
                setSnackbar({ open: true, message: `Empty required field(s) or no change.` });
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
                </>
            )}
        </>
    );
};

export default GeneralFormPage;