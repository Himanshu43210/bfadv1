import React, { useEffect, useState } from "react";
import FormBuilder from "../utils/FormBuilder";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  ADMIN_DASHBOARD_LOGIN,
  BF_ADMIN,
  NEED_APPROVAL_BY,
  POST,
  PROPERTY_DEALER,
  ROUTE_BUTTON,
} from "../utils/Const";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { callApi } from "../../redux/utils/apiActions";
import { filterAutofillData, sanitizeFormData } from "../utils/reusableMethods";
import CustomRouteButton from "./RouteButton";
import { USER_ROLE } from "../../ScreenJson";
import _ from "lodash";
import SnackBar from "../customComponents/SnackBar";
import { useNavigate } from "react-router-dom";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors";

const FormPage = () => {
  const [snackbar, setSnackbar] = useState({});
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({});

  const snackbarClose = (status) => {
    setSnackbar({
      open: false,
      message: "",
    });
    // based on status proceed with further actions
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const handleSave = async () => {
    if (!loading) {
      setLoading(true);
      try {
        let newFormData = new FormData();

        // Populate formData with files (If they exist)
        const fileFields = [
          "thumbnailFile",
          "normalImageFile",
          "threeSixtyImages",
          "layoutFile",
          "VideoFile",
          "virtualFile",
        ];

        fileFields.forEach((field) => {
          if (formData[field]) {
            for (const file of formData[field]) {
              newFormData.append(field, file);
            }
          }
        });

        // Add additional fields to formData
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
            typeof value === "object" && !Array.isArray(value) && value !== null
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
                JSON.stringify(formData[element].value)
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

        const err = {};
        userProfile.formType.forEach((field) => {
          if (
            field.isRequired &&
            ((typeof formData[field.name] === "object" &&
              formData[field.name].length === 0) ||
              !formData[field.name])
          ) {
            err[field.name] = "This is required";
          }
        });

        const options = {
          url: API_ENDPOINTS[userProfile.formSaveApi],
          method: POST,
          headers: headers,
          data: data,
        };

        if (Object.keys(err).length === 0) {
          dispatch(callApi(options)).then(() => {
            router("/admin");
            setFormData({});
            setSnackbar({ open: true, message: `Saved.` });
          });
        } else {
          setSnackbar({ open: true, message: `Required fields are empty.` });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setSnackbar({ open: true, message: `Save Failed.` });
        console.log(error);
      }
    }
  };

  const handleReset = () => {
    setFormData({});
    setSnackbar({ open: true, message: "Form Reset." });
  };

  const navigate = useNavigate();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  const userProfile1 = useSelector((state) =>
    selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  );

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
          {console.log(formData)}
          <div>
            <div className="formheadingcontainer">{userProfile.formName}</div>
            <FormBuilder
              fields={userProfile.formType}
              onFormDataChange={handleFormDataChange}
              propsFormData={
                userProfile.autofill
                  ? filterAutofillData(userProfile.autofill, userProfile)
                  : {}
              }
            />
            {userProfile?.showResetBtn && <Button onClick={handleReset} color="secondary">Reset</Button>}
            <Button variant="primary" onClick={handleSave}>Save</Button>
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
            onClose={(status) => snackbarClose(status)}
          />
        </>
      )}
    </>
  );
};

export default FormPage;
