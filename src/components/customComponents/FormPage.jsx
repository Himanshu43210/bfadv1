import React, { useEffect, useState } from "react";
import FormBuilder from "../utils/FormBuilder";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
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

const FormPage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({});
  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSave = async () => {
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

      let checked = false;
      function isFileList(value) {
        return value instanceof FileList;
      }

      Object.keys(formData).forEach((element) => {
        if (!isFileList(formData[element])) {
          if (isObjectNotString(formData[element])) {
            checked = true;
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
        : checked
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

      dispatch(callApi(options));
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
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
    </>
  );
};

export default FormPage;