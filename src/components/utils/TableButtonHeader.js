import { useRef, useState } from "react";
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUserPlus,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import FormBuilder from "./FormBuilder";
import ReusablePopup from "./ReusablePopup";
import {
  BF_ADMIN,
  NEED_APPROVAL_BY,
  POST,
  PROFILE,
  PROPERTY_DEALER,
} from "./Const";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { callApi } from "../../redux/utils/apiActions";
import ExcelTable from "../customComponents/BulkUpload";
import CSVUpload from "../customComponents/BulkUpload";
import { USER_ROLE } from "../../ScreenJson";
import SnackBar from "../customComponents/SnackBar";
import { Toaster } from "react-hot-toast";
import { sanitizeFormData } from "./reusableMethods";
import { CircularProgress } from "@mui/material";

const TableButtonHeader = ({
  tableData = [],
  fieldConst,
  saveDataApi,
  refreshDataApi,
  addHeader,
  refreshMethod,
}) => {
  const finalizeRef = useRef(null);
  const [snackbar, setSnackbar] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPopup, setNewPopup] = useState(null);
  const [importPopup, setImportPopup] = useState(null);
  const [exportPopup, setExportPopup] = useState(null);
  const [formData, setFormData] = useState({});
  const userProfile = useSelector((state) => state[PROFILE]);

  const dispatch = useDispatch();

  const convertArrayToExcel = (dataArray, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(dataArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    const anchor = document.createElement("a");
    const url = window.URL.createObjectURL(data);
    anchor.href = url;
    anchor.download = `${filename}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    setSnackbar({
      open: true,
      message: "Data Exported!",
      ahd: 3000,
    });
  };

  const handleExportClick = () => {
    convertArrayToExcel(tableData, "data_export");
    toogleExportPopup();
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const refreshData = () => {
    console.log(refreshMethod);
    try {
      const options = {
        url: refreshDataApi,
        method: refreshMethod ? refreshMethod : POST,
        headers: { "Content-Type": "application/json" },
        data: {},
      };
      dispatch(callApi(options));
    } catch (error) { }
  };

  const handleSubmit = async () => {
    const formData = finalizeRef.current.finalizeData();
    if (formData) {
      console.log("Received validated data:", formData);
      if (Object.keys(formData).length !== 0) {
        try {
          const newFormData = new FormData();

          // for (const file of formData?.images || []) {
          //   newFormData.append("files", file);
          // }
          for (const file of formData?.thumbnailFile || []) {
            newFormData.append("thumbnailFile", file);
          }
          for (const file of formData?.normalImageFile || []) {
            newFormData.append("normalImageFile", file);
          }
          for (const file of formData?.threeSixtyImages || []) {
            newFormData.append("threeSixtyImages", file);
          }
          for (const file of formData?.layoutFile || []) {
            newFormData.append("layoutFile", file);
          }
          for (const file of formData?.VideoFile || []) {
            newFormData.append("videoFile", file);
          }
          for (const file of formData?.virtualFile || []) {
            newFormData.append("virtualFile", file);
          }
          newFormData.append("parentId", userProfile._id);
          newFormData.append(
            "contactId",
            userProfile.role === USER_ROLE[PROPERTY_DEALER]
              ? userProfile.parentId
              : userProfile._id
          );
          newFormData.append([NEED_APPROVAL_BY], userProfile.parentId);
          newFormData.append("formData", { ...formData });
          function isObjectNotString(value) {
            return (
              typeof value === "object" &&
              !Array.isArray(value) &&
              value !== null
            );
          }
          function hasAnyProperty(object, properties) {
            if (
              !object ||
              typeof object !== "object" ||
              !properties ||
              !Array.isArray(properties)
            ) {
              // Ensure that object is valid and properties is an array
              return false;
            }

            for (let i = 0; i < properties.length; i++) {
              if (object.hasOwnProperty(properties[i])) {
                return true; // Found at least one property
              }
            }

            return false; // None of the properties were found
          }

          const imagesCheck = hasAnyProperty(formData, [
            "thumbnailFile",
            "normalImageFile",
            "threeSixtyImages",
            "layoutFile",
            "VideoFile",
            "virtualFile",
          ]);

          let checked = false;
          function isFileList(value) {
            return value instanceof FileList;
          }
          Object.keys(formData).map((element) => {
            if (!isFileList(formData[element])) {
              if (isObjectNotString(formData[element])) {
                checked = true;
                newFormData.append(element, formData[element].value);
              } else {
                newFormData.append(element, formData[element]);
              }
            }
          });

          const options = {
            url: API_ENDPOINTS[saveDataApi],
            method: POST,
            headers: {
              "Content-Type": imagesCheck
                ? "multipart/form-data"
                : "application/json",
            },
            data: imagesCheck
              ? newFormData
              : sanitizeFormData({
                ...formData,
                parentId: userProfile._id,
                role:
                  userProfile.role === USER_ROLE[BF_ADMIN]
                    ? USER_ROLE["channelPartner"]
                    : USER_ROLE["salesUser"],
              }),
          };
          setLoading(true);
          dispatch(callApi(options)).then(() => {
            setLoading(false);
            setSnackbar({ open: true, message: "Successful!", status: 0 });
            // on success clear the form data
            setFormData({});
          });
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      } else {
        setSnackbar({
          open: true,
          message: "Empty required field(s)!",
          status: -1,
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Empty required field(s)!",
        status: -1,
      });
    }
  };

  const snackbarClose = (status) => {
    setSnackbar({
      ...snackbar,
      open: false,
      message: "",
    });
    // if status is 0, then refresh
    if (status === 0) {
      refreshData();
    }
  };
  const toogleNewPopup = () => {
    setNewPopup(!newPopup);
  };
  const toogleUploadPopup = () => {
    setImportPopup(!importPopup);
  };
  const toogleExportPopup = () => {
    setExportPopup(!exportPopup);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {newPopup ? (
        <ReusablePopup
          onSave={handleSubmit}
          onHide={toogleNewPopup}
          onCancel={toogleNewPopup}
        >
          <div className="formheadingcontainer">{addHeader}</div>
          <FormBuilder ref={finalizeRef} fields={fieldConst} />
        </ReusablePopup>
      ) : null}
      {importPopup ? (
        <ReusablePopup onHide={toogleUploadPopup} onCancel={toogleUploadPopup}>
          <div className="container">
            <h2 className="lbel">You Can Upload Your Files over Here</h2>
            <CSVUpload />
            {/* <Button variant="success" class="btnclass">
              Upload File
            </Button> */}
          </div>
        </ReusablePopup>
      ) : null}
      {exportPopup ? (
        <ReusablePopup onHide={toogleExportPopup}>
          <div class="container">
            <p className="lbel">Export Table Data into Excel</p>
            <Button variant="success" onClick={handleExportClick}>
              Export to Excel
            </Button>
          </div>
        </ReusablePopup>
      ) : null}
      <div>
        <Button class="btn" variant="success" onClick={toogleNewPopup}>
          <FaUserPlus />
          &nbsp;&nbsp; ADD
        </Button>
        <Button class="btn" onClick={toogleUploadPopup}>
          <FaCloudUploadAlt /> &nbsp;&nbsp; UPLOAD
        </Button>
        <Button class="btn" onClick={toogleExportPopup}>
          <FaCloudDownloadAlt /> &nbsp;&nbsp; EXPORT
        </Button>
        <Button class="btn" onClick={refreshData}>
          <FiRefreshCcw /> &nbsp;&nbsp; REFRESH
        </Button>
      </div>
      <SnackBar
        open={snackbar?.open}
        message={snackbar?.message}
        onClose={(status) => snackbarClose(status)}
      />
      {loading === true ? <CircularProgress /> : null}
    </>
  );
};

export default TableButtonHeader;
