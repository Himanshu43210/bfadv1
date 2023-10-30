import React, { useRef, useEffect, useState } from "react";
import FormBuilder from "../utils/FormBuilder.jsx";
import { Button, CircularProgress } from "@mui/material/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  ADMIN_DASHBOARD_LOGIN,
  BF_ADMIN,
  NEED_APPROVAL_BY,
  POST,
  PROPERTY_DEALER,
  ROUTE_BUTTON,
} from "../utils/Const.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { filterAutofillData, sanitizeFormData } from "../utils/reusableMethods.js";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import { USER_ROLE } from "../../ScreenJson.js";
import _ from "lodash";
import SnackBar from "../customComponents/SnackBar.jsx";
import { useNavigate } from "react-router-dom";
import { selectApiStatus } from "../../redux/utils/selectors.js";

const FormPage = () => {
  const finalizeRef = useRef(null);
  const [message, setMessage] = useState("");
  const [snackbar, setSnackbar] = useState({});
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);

  console.log('+++++ form page : user profile +++++', useSelector((state) => state));

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

          // Ad"Post Submitted Successfully"d additional fields to formData
          newFormData.append("parentId", userProfile._id);
          newFormData.append(
            "contactId",
            userProfile.role === USER_ROLE[PROPERTY_DEALER]
              ? userProfile.parentId
              : userProfile._id
          );
          newFormData.append(NEED_APPROVAL_BY, userProfile.parentId);

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

          // Set the headers and data based on whether images/files are being uploaded
          let headers = imagesCheck
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" };

          let data = imagesCheck
            ? newFormData
            : sanitizeFormData({
              ...formData,
              parentId: userProfile._id,
              role:
                userProfile.role === USER_ROLE[BF_ADMIN]
                  ? USER_ROLE["channelPartner"]
                  : USER_ROLE["salesUser"],
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
              router("/admin");
            }, 1200);
            setSnackbar({ open: true, message: getMessage() });
          });
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

  const navigate = useNavigate();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  // const userProfile1 = useSelector((state) =>
  //   selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  // );
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

  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (!loginStatus) {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      if (email && password) {
        try {
          const options = {
            url: API_ENDPOINTS[ADMIN_DASHBOARD_LOGIN],
            method: POST,
            headers: { "Content-Type": "application/json" },
            data: {
              email: email,
              password: password,
            },
          };
          dispatch(callApi(options));
        } catch (error) { }
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } else {
      setCheck(true);
    }
  }, [loginStatus]);

  return (
    <>
      {check && (
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
                label: "Go to Dashboard",
                name: "Go to Dashboard",
                route: "/admin",
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

export default FormPage;
