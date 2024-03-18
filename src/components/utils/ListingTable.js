import React, { useRef, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Button as MuiButton } from "@mui/material";
import ReusablePopup from "./ReusablePopup.jsx";
import FormBuilder from "./FormBuilder.jsx";
import { FaCaretUp, FaCaretDown } from "react-icons/fa/index.js";
import { FaUserEdit, FaRegTrashAlt, FaRegEye } from "react-icons/fa/index.js";
import {
  API_DOMAIN,
  API_ENDPOINTS,
  APP_DOMAIN,
} from "../../redux/utils/api.js";
import { CircularProgress } from "@mui/material";
import { AiOutlineDoubleRight } from "react-icons/ai/index.js";
import { RiFilter2Fill } from "react-icons/ri/index.js";
import {
  APPROVED,
  BF_ADMIN,
  CHANNEL_PARTNER,
  DELETE,
  GET,
  GET_ADMIN_PROPERTY_DATA,
  GET_CHANNEL_PARTNER_DATA,
  NEED_APPROVAL_BY,
  POST,
  PROFILE,
  PROPERTY_DEALER,
} from "./Const.js";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../redux/utils/apiActions.js";
import BasicTablePagination from "../customComponents/TablePagination.jsx";
import { selectApiData } from "../../redux/utils/selectors.js";
import { useEffect } from "react";
import { FcApproval, FcRemoveImage } from "react-icons/fc/index.js";
import _ from "lodash";
import HomeCard from "../customComponents/HomeCard.jsx";
import SearchCard from "../customComponents/SearchCard.jsx";
import DetailDataCard from "../customComponents/DetailedDataCard.jsx";
import { selectApiStatus } from "./../../redux/utils/selectors.js";
import { sanitizeFormData } from "./reusableMethods.js";
import { USER_ROLE } from "../../ScreenJson.js";
import SnackBar from "../customComponents/SnackBar.jsx";
import { useRouter } from "next/navigation.js";
import { generatePropertyUrl } from "./propertyUtils.js";
import Link from "next/link.js";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";

const ListingTable = ({
  headersDesktop = [],
  headersMobile = [],
  roleSpecificDesktopHeaders,
  fieldConst,
  editApi,
  deleteApi,
  getDataApi,
  approveApi,
  approveApiMethod,
  itemCount,
  isproperty,
  removeApi,
  filterDataUrl,
  onRefreshApiType,
  hideActions,
  showViewAllListing,
  showRecommendationActions,
  hideAlterActions,
  refreshDataApi,
  addActionApi,
  removeActionApi,
  refreshMethod,
  disableRowModal,
  showEditAction,
  showDeleteAction,
  showColumnFilter,
  showApproveAction,
  data,
  useParamsFromUrl,
  rowClick,
  userId,
  showTableControls = true,
  showPagination = true,
  allowSelect,
  showFilter,
  setFilterValue,
  setFilterKey,
  filterValue,
  filterKey,
}) => {
  const finalizeRef = useRef(null);
  const [snackbar, setSnackbar] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRowModal, setShowRowModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(10);
  const [sortType, setSortType] = useState("desc");
  const [sortColumn, setSortColumn] = useState("updatedAt");
  const [tableData, setTableData] = useState([]);
  const [tableFilter, setTableFilter] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [showImgEditModal, setShowImgEditModal] = useState(false);
  const [imgEditor, setImgEditor] = useState({});
  const [imgsToBeDeleted, setImgsToBeDeleted] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const filterSiZe = [...new Set(tableData.map((property) => property.size))];
  const siZeOptions = filterSiZe.map((value) => ({
    key: value,
    value,
  }));

  const filterOptions = {
    Location: [
      { key: "DLF Phase 2", value: "DLF Phase 2" },
      { key: "DLF Phase 3", value: "DLF Phase 3" },
      { key: "DLF Phase 4", value: "DLF Phase 4" },
      { key: "DLF Phase 5", value: "DLF Phase 5" },
      { key: "DLF Almeda", value: "DLF Almeda" },
      { key: "DLF Garden City", value: "DLF Garden City" },
      { key: "Sushant Lok 1", value: "Sushant Lok 1" },
      { key: "Sushant Lok 2", value: "Sushant Lok 2" },
      { key: "Sushant Lok 3", value: "Sushant Lok 3" },
      { key: "Esencia Sector 67A", value: "Esencia Sector 67A" },
      { key: "Versalia Sector 67A", value: "Versalia Sector 67A" },
      { key: "Greenwood City", value: "Greenwood City" },
      { key: "South City 1", value: "South City 1" },
      { key: "South City 2", value: "South City 2" },
      { key: "Nirvana Country", value: "Nirvana Country" },
      { key: "Rosewood City", value: "Rosewood City" },
      { key: "Vipul World", value: "Vipul World" },
      { key: "Suncity", value: "Suncity" },
      { key: "Uppal Southend", value: "Uppal Southend" },
      { key: "Malibu Town", value: "Malibu Town" },
      { key: "BPTP Amstoria", value: "BPTP Amstoria" },
      { key: "G99", value: "G99" },
      { key: "Anant Raj", value: "Anant Raj" },
      { key: "Ireo City", value: "Ireo City" },
      { key: "Emaar Emerald Hills", value: "Emaar Emerald Hills" },
      { key: "Sector 3", value: "Sector 3" },
      { key: "Sector 4", value: "Sector 4" },
      { key: "Sector 5", value: "Sector 5" },
      { key: "Sector 9A", value: "Sector 9A" },
      { key: "Sector 10", value: "Sector 10" },
      { key: "Sector 10A", value: "Sector 10A" },
      { key: "Sector 12A", value: "Sector 12A" },
      { key: "Sector 14", value: "Sector 14" },
      { key: "Sector 15 Part 1", value: "Sector 15 Part 1" },
      { key: "Sector 15 Part 2", value: "Sector 15 Part 2" },
      { key: "Sector 17", value: "Sector 17" },
      { key: "Sector 21", value: "Sector 21" },
      { key: "Sector 22", value: "Sector 22" },
      { key: "Sector 23-23A", value: "Sector 23-23A" },
      { key: "Sector 27", value: "Sector 27" },
      { key: "Sector 7", value: "Sector 7" },
      { key: "Sector 28", value: "Sector 28" },
      { key: "Sector 31", value: "Sector 31" },
      { key: "Sector 31-32A", value: "Sector 31-32A" },
      { key: "Sector 38", value: "Sector 38" },
      { key: "Sector 39", value: "Sector 39" },
      { key: "Sector 40", value: "Sector 40" },
      { key: "Sector 42", value: "Sector 42" },
      { key: "Sector 43", value: "Sector 43" },
      { key: "Sector 45", value: "Sector 45" },
      { key: "Sector 46", value: "Sector 46" },
      { key: "Sector 47", value: "Sector 47" },
      { key: "Sector 49", value: "Sector 49" },
      { key: "Sector 50", value: "Sector 50" },
      { key: "Sector 51", value: "Sector 51" },
      { key: "Sector 52", value: "Sector 52" },
      { key: "Sector 55", value: "Sector 55" },
      { key: "Sector 56", value: "Sector 56" },
      { key: "Sector 57", value: "Sector 57" },
      { key: "Old DLF Colony", value: "Old DLF Colony" },
      { key: "New Colony", value: "New Colony" },
      { key: "Palam Vihar", value: "Palam Vihar" },
      { key: "Mayfield Garden", value: "Mayfield Garden" },
      { key: "Ardee City", value: "Ardee City" },
      { key: "Adani Samsara", value: "Adani Samsara" },
      { key: "DLF Phase 1", value: "DLF Phase 1" },
      { key: "Vatika India Next", value: "Vatika India Next" },
    ],
    // "Plot No": plotNoOptions,
    // Size: siZeOptions,
    Floor: [
      { key: "First Floor", value: "1ST FLOOR" },
      { key: "Second Floor", value: "2ND FLOOR" },
      { key: "Forth Floor", value: "4TH FLOOR" },
      { key: "Basement + First Floor", value: "Basement + First" },
    ],
    // Title: locationOptions,
    Price: [
      {
        key: 23000000,
        value: 23000000,
      },
      {
        key: 22500000,
        value: 22500000,
      },
      {
        key: 22000000,
        value: 22000000,
      },
      {
        key: 50000000,
        value: 50000000,
      },
      {
        key: 33000000,
        value: 33000000,
      },
      {
        key: 34000000,
        value: 34000000,
      },
      {
        key: 47000000,
        value: 47000000,
      },
      {
        key: 44000000,
        value: 44000000,
      },
      {
        key: 57500000,
        value: 57500000,
      },
      {
        key: 17000000,
        value: 17000000,
      },
      {
        key: 18000000,
        value: 18000000,
      },
      {
        key: 53000000,
        value: 53000000,
      },
      {
        key: 35000000,
        value: 35000000,
      },
      {
        key: 37500000,
        value: 37500000,
      },
      {
        key: 30000000,
        value: 30000000,
      },
      {
        key: 40000000,
        value: 40000000,
      },
      {
        key: 25000000,
        value: 25000000,
      },
      {
        key: 35500000,
        value: 35500000,
      },
      {
        key: 31500000,
        value: 31500000,
      },
      {
        key: 52000000,
        value: 52000000,
      },
      {
        key: 44500000,
        value: 44500000,
      },
    ],
    Accommodation: [
      { key: "2 BHK", value: "2 BHK" },
      { key: "3 BHK", value: "3 BHK" },
      { key: "5 BHK", value: "5 BHK" },
      { key: "6 BHK", value: "6 BHK" },
    ],
    Facing: [
      { key: "North", value: "North" },
      { key: "South", value: "South" },
      { key: "East", value: "East" },
      { key: "West", value: "West" },
      { key: "North-West", value: "North-West" },
      { key: "North-East", value: "North-East" },
      { key: "South-West", value: "South-West" },
      { key: "South-East", value: "South-East" },
    ],
    "Park Facing": [
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
    ],
    Corner: [
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
    ],
    Possession: [
      { key: "Ready", value: "READY" },
      { key: "1 Month", value: "1M" },
      { key: "3 Months", value: "3M" },
      { key: "6 Months", value: "6M" },
      { key: "9 Months", value: "9M" },
      { key: "12 Months", value: "12M" },
    ],
    // "Builder Name": builderNameOptions,
    // "Builder Contact Name": builderContactOptions,
    // "Created By": createdByOptions,
    // "Mobile Number": mobileNumberOptions,
    // "Company Name": companyNameOptions,
    City: [{ key: "Gurgaon", value: "Gurgaon" }],
    State: [
      { key: "Haryana", value: "Haryana" },
      { key: "Punjab", value: "Punjab" },
    ],
    // "Dated of Posting": createdAtOptions,
    // "Updated At": updatedAtOptions,
  };
  const [selectedHeader, setSelectedHeader] = useState(null);

  useEffect(() => {
    if (selectedHeader !== null) {
      setFilterKey(headersDesktop[selectedHeader]);
    }
  }, [selectedHeader]);

  const handleClickDropdownItem = (value) => {
    setFilterValue(value);
    setSelectedHeader(null);
  };

  const handleFilterIcon = (headerLabel) => {
    setFilterValue("");
    setFilterKey("");
    setSelectedHeader(selectedHeader === headerLabel ? null : headerLabel);
  };
  const apiStatus = useSelector((state) => selectApiStatus(state, getDataApi));
  let isMobile = false; // Adjust the breakpoint as per your needs
  const tableHeaders = isMobile ? headersMobile : headersDesktop;
  const dispatch = useDispatch();
  const getApiDataFromRedux = useSelector((state) => {
    return selectApiData(state, getDataApi);
  });

  const userProfile = useSelector((state) => state[PROFILE]);
  const navigateTo = useRouter();
  let allowedTableColumns = roleSpecificDesktopHeaders
    ? roleSpecificDesktopHeaders[userProfile.role]
    : tableHeaders;

  const applyFilters = (sortingFilter = "") => {
    const filterQuery =
      Object.entries(tableFilter)
        .map(([key, value]) => `&${key}=${value}`)
        .join("") || "";
    let payload = {
      sortType,
      sortColumn,
      activePage,
      itemsCountPerPage,
    };
    if (filterKey && filterValue) {
      payload = { ...payload, [filterKey]: filterValue };
    }
    dispatch(
      callApi({
        url: filterDataUrl + sortingFilter + filterQuery,
        method: onRefreshApiType || GET,
        headers: { "Content-Type": "application/json" },
        data: payload,
      })
    );
  };

  useEffect(() => {
    if (window !== "undefined") {
      isMobile = window.innerWidth <= 768;
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(getApiDataFromRedux)) {
      if (getApiDataFromRedux.pageNumber !== activePage)
        setActivePage(getApiDataFromRedux.pageNumber);
      if (getApiDataFromRedux.nbHits !== itemsCountPerPage) {
        setItemsCountPerPage(getApiDataFromRedux.nbHits);
      }
      if (getApiDataFromRedux.totalItems !== totalItems)
        setTotalItems(getApiDataFromRedux.totalItems);
      setTableData(getApiDataFromRedux.data);
      setSelectAll(false);
      allowedTableColumns = roleSpecificDesktopHeaders
        ? roleSpecificDesktopHeaders[userProfile.role]
        : tableHeaders;
    }
  }, [getApiDataFromRedux]);

  const refreshData = () => {
    try {
      setTableFilter({ ...tableFilter });
      const options = {
        url: refreshDataApi,
        method: onRefreshApiType || GET,
        headers: { "Content-Type": "application/json" },
        params: {
          page: activePage,
          limit: itemsCountPerPage,
        },
        data:
          onRefreshApiType === POST
            ? {
                sortColumn,
                sortType,
                activePage,
                itemsCountPerPage,
              }
            : {},
      };
      dispatch(callApi(options));
    } catch (error) {}
  };

  const generateFormData = (formData, jsonData, parentKey) => {
    if (
      jsonData &&
      typeof jsonData === "object" &&
      !(jsonData instanceof Date) &&
      !(jsonData instanceof File) &&
      !(jsonData instanceof Blob)
    ) {
      Object.keys(jsonData).forEach((key) => {
        generateFormData(
          formData,
          jsonData[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = jsonData == null ? "" : jsonData;

      formData.append(parentKey, value);
    }
  };

  const jsonToFormData = (jsonData) => {
    const newFormData = new FormData();
    generateFormData(newFormData, jsonData);
    return newFormData;
  };

  const checkForChange = (prevData, newData) => {
    for (const field of Object.keys(newData)) {
      if (newData[field] !== prevData[field]) {
        return true;
      }
    }
    return false;
  };

  const isPropertyEdit = API_ENDPOINTS[editApi]?.includes("editProperty");

  const handleSave = (edit = false) => {
    const alreadyHaveThumbanils =
      currentRowData?.thumbnails?.filter((link) => link !== "") || [];
    const haveReqFiles = isPropertyEdit
      ? alreadyHaveThumbanils.length > 0 &&
        (imgsToBeDeleted?.thumbnails?.length || 0) <
          alreadyHaveThumbanils.length &&
        alreadyHaveThumbanils[0] !== ""
      : false;
    const formData = finalizeRef.current.finalizeData(
      haveReqFiles ? ["thumbnailFile"] : []
    );
    if (formData) {
      if (Object.keys(formData).length !== 0) {
        try {
          // check for change or delete array is not empty
          const isChanged = checkForChange(currentRowData, formData);
          let isImgsTobeDeleted = false;
          for (const mediaKey of Object.keys(imgsToBeDeleted)) {
            if (imgsToBeDeleted[mediaKey].length !== 0) {
              isImgsTobeDeleted = true;
            }
          }
          const shouldEdit = isChanged || isImgsTobeDeleted;
          console.log(
            "================= CHANGED ==================",
            isChanged,
            isImgsTobeDeleted,
            shouldEdit
          );
          if (!shouldEdit) {
            setSnackbar({
              open: true,
              message: "No field changed.",
              status: -1,
            });
            return;
          }
          const newFormData = new FormData();
          const mediaLinkTypes = [
            "thumbnails",
            "normalImages",
            "images",
            "videos",
            "layouts",
            "virtualFiles",
          ];
          const filesToBeDeleted = [];
          const replaceFiles = {};
          for (const file of formData?.thumbnailFile || []) {
            replaceFiles.thumbnails = true;
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
          for (const file of formData?.videoFile || []) {
            newFormData.append("videoFile", file);
          }
          for (const file of formData?.virtualFile || []) {
            newFormData.append("virtualFile", file);
          }
          newFormData.append("formData", { ...formData });

          function isObjectNotString(value) {
            return (
              typeof value === "object" &&
              Array.isArray(value) &&
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
            "videoFile",
            "virtualFile",
          ]);

          mediaLinkTypes.forEach((mediaLinkType) => {
            // append individually in formData
            if (Array.isArray(formData[mediaLinkType])) {
              for (const mediaLink of formData[mediaLinkType]) {
                // add to new form data only if not to be deleted
                // and not exist multiple times
                if (!imgsToBeDeleted[mediaLinkType]?.includes(mediaLink)) {
                  newFormData.append(mediaLinkType, mediaLink);
                } else {
                  if (
                    !filesToBeDeleted.includes(mediaLink) ||
                    replaceFiles[mediaLinkType] === true
                  ) {
                    filesToBeDeleted.push(mediaLink);
                  }
                }
              }
            }
            if (!newFormData.has(mediaLinkType)) {
              newFormData.append(mediaLinkType, []);
            }
          });

          function isFileList(value) {
            return value instanceof FileList;
          }

          Object.keys(formData).map((element) => {
            if (!isFileList(formData[element])) {
              if (
                !mediaLinkTypes.includes(element) &&
                typeof formData[element] == "object" &&
                !Array.isArray(formData[element])
              ) {
                if (element === "parentId") {
                  newFormData.append(element, formData[element]?._id);
                } else {
                  newFormData.append(element, formData[element]?.value);
                }
              } else if (isObjectNotString(formData[element])) {
                // ignore
              } else {
                newFormData.append(element, formData[element]);
              }
            }
          });

          // filesToBeDeleted.forEach((link) => {
          //   newFormData.append("filesToBeDeleted", link);
          // });
          Object.keys(replaceFiles).forEach((key) => {
            formData[key].forEach((link) => {
              filesToBeDeleted.push(link);
            });
          });

          newFormData.append("filesToBeDeleted", filesToBeDeleted);

          // form data for edit property and json data for edit user
          const options = {
            url: API_ENDPOINTS[editApi],
            method: POST,
            headers: {
              "Content-Type": isPropertyEdit
                ? "multipart/form-data"
                : "application/json",
            },
            data: isPropertyEdit
              ? newFormData
              : sanitizeFormData({
                  ...formData,
                }),
          };
          setShowLoader(true);
          dispatch(callApi(options)).then(() => {
            setShowLoader(false);
            setSnackbar({
              open: true,
              message: edit ? "Edited Successfully." : "Saved Successfully.",
              status: 0,
            });
            setShowEditModal(false);
            refreshData();
          });
        } catch (error) {
          setShowLoader(false);
          setSnackbar({
            open: true,
            message: edit ? "Edit Failed." : "Save Failed.",
            status: -1,
          });
          console.log("Edit failed : listing table ", error);
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
        message: `Empty required field(s) or no change.`,
        status: -1,
      });
    }
  };

  const handleDelete = () => {
    try {
      const options = {
        url: API_ENDPOINTS[deleteApi] + "?id=" + currentRowData._id,
        method: DELETE,
        headers: { "Content-Type": "application/json" },
      };
      dispatch(callApi(options)).then(() => {
        setSnackbar({ open: true, message: `Deleted.`, status: 0 });
        setShowPreviewModal(false);
        refreshData();
      });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: `Deletion Failed.`, status: -1 });
    }
  };
  const handleApprove = (rowId) => {
    try {
      const data = approveApiMethod
        ? { id: rowId }
        : {
            _id: rowId,
            [NEED_APPROVAL_BY]: userProfile.parentId || APPROVED,
          };
      const options = {
        url: API_ENDPOINTS[approveApi],
        method: approveApiMethod || POST,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      dispatch(callApi(options)).then(() => {
        setSnackbar({ open: true, message: `Approved.`, status: 0 });
        setShowPreviewModal(false);
        refreshData();
      });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: `Approval Failed.`, status: -1 });
    }
  };

  const handleRemove = (rowId) => {
    const formData = finalizeRef.current.finalizeData();
    try {
      const options = {
        url: API_ENDPOINTS[removeApi],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: {
          id: rowId,
          userId: userProfile._id,
          rejectedByBFAdmin:
            userProfile.role === USER_ROLE[BF_ADMIN]
              ? userProfile._id
              : undefined,
          rejectedByCP:
            userProfile.role === USER_ROLE[CHANNEL_PARTNER]
              ? userProfile._id
              : undefined,
          rejectedByBFAdminComments: formData?.rejectedByBFAdminComments,
          rejectedByCPComments: formData?.rejectedByCPComments,
        },
      };
      dispatch(callApi(options)).then(() => {
        setSnackbar({ open: true, message: `Removed.`, status: 0 });
        setShowPreviewModal(false);
        refreshData();
      });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: `Removal Failed.`, status: -1 });
    }
  };

  const filterData = ({
    activePage,
    itemsCountPerPage,
    sortType,
    sortColumn,
    [filterKey]: filterValue,
  }) => {
    applyFilters(
      `&page=${activePage}&limit=${itemsCountPerPage}&sortType=${sortType}&sortColumn=${sortColumn}${{
        [filterKey]: filterValue,
      }},`
    );
  };

  const isRowSelected = (id) => {
    let selected = false;
    for (let i = 0; i < selectedRows.length; i++) {
      if (selectedRows[i]._id === id) {
        selected = true;
        break;
      }
    }
    return selected;
  };

  const handleRowSelection = (e, rowData, all = false) => {
    const checked = e.target.checked;
    if (all) {
      setSelectAll(checked);
      if (checked) {
        // for each element in tableData --- if not present in selectedRows list, insert
        for (let i = 0; i < tableData.length; i++) {
          const newToPush = [];
          if (
            selectedRows.find(
              (selectedRow) => selectedRow._id === tableData[i]._id
            ) === undefined
          ) {
            newToPush.push(tableData[i]);
          }
          setSelectedRows((currSelectedRows) => {
            return [...currSelectedRows, ...newToPush];
          });
        }
      } else {
        // for each element in tableData --- if present in selectedRows list, remove
        let newToPush = [...selectedRows];
        for (let i = 0; i < tableData.length; i++) {
          newToPush = newToPush.filter(
            (selectedRow) => selectedRow._id !== tableData[i]._id
          );
        }
        setSelectedRows([...newToPush]);
      }
    } else {
      if (checked) {
        setSelectedRows((currSelectedRows) => {
          return [...currSelectedRows, rowData];
        });
      } else {
        setSelectedRows((currSelectedRows) => {
          return currSelectedRows?.filter(
            (selectedRow) => selectedRow._id !== rowData._id
          );
        });
      }
    }
  };

  const handleShare = (shareData, e = null) => {
    if (e) {
      e.preventDefault();
    }
    if (navigator.share !== undefined) {
      navigator
        .share({
          title: "BuilderFloor.com",
          text: shareData,
        })
        .then(() => {
          console.log(">>>>>> Share Successful <<<<<<");
        })
        .catch((error) => {
          console.log(">>>>>> Share Failed <<<<<<", error);
        });
    } else {
      console.log(
        ">>>>> NO NAVIGATOR : sharing not possible <<<<<<",
        window.navigator
      );
      if (navigator.clipboard !== undefined) {
        console.log("============= CLIPBOARD AVAILABLE ==============");
        navigator.clipboard
          .writeText(shareData)
          .then(() => {
            console.log(">>>>>> Copy Successful <<<<<<");
            setSnackbar({
              open: true,
              message: "Copied to Clipboard.",
              status: -1,
            });
          })
          .catch((error) => {
            console.log(">>>>>> Copy Failed <<<<<<", error);
          });
      }
    }
    if (window.AndroidShareHandler) {
      window.AndroidShareHandler.share(formattedShareData);
    }
  };

  const handleBulkShare = () => {
    let formattedShareData = ``;
    for (let i = 0; i < selectedRows.length; i++) {
      formattedShareData +=
        APP_DOMAIN + generatePropertyUrl(selectedRows[i]) + "\n\n";
    }
    console.log(
      ">>>>>>>>>>>>> FORMATTED SHARE DATA <<<<<<<<<<<<<",
      formattedShareData
    );
    handleShare(formattedShareData);
  };

  const handleBulkDelete = () => {
    const deletePromises = [];
    for (let i = 0; i < selectedRows.length; i++) {
      try {
        const options = {
          url: API_ENDPOINTS[deleteApi] + "?id=" + selectedRows[i]._id,
          method: DELETE,
          headers: { "Content-Type": "application/json" },
        };
        deletePromises.push(dispatch(callApi(options)));
      } catch (error) {
        console.log(error);
        setSnackbar({ open: true, message: `Deletion Failed.`, status: -1 });
      }
    }
    Promise.all(deletePromises)
      .then((res) => {
        console.log("================ BULK DELETE RES ===============", res);
        setSnackbar({ open: true, message: `Deleted.`, status: 0 });
        refreshData();
      })
      .catch((error) => {
        console.log("BULK DELETE ERROR: ", error);
      });
  };

  const handleSelectionOp = (type) => {
    switch (type) {
      case "SHARE":
        handleBulkShare();
        break;
      case "DELETE":
        handleBulkDelete();
        break;
      default:
        break;
    }
  };

  const toogleRowClick = () => {
    setShowRowModal(!showRowModal);
  };

  const snackbarClose = (status) => {
    setSnackbar({
      open: false,
      message: "",
    });
  };

  useEffect(() => {
    setImgsToBeDeleted([]);
    const fileFields = [
      "thumbnails",
      "normalImages",
      "images",
      "layouts",
      "videos",
      "virtualFiles",
    ];
    console.log("******* current row adta **********", currentRowData);
    const currAllFiles = {};
    fileFields.forEach((field) => {
      if (currentRowData[field]) {
        for (const link of currentRowData[field]) {
          if (!currAllFiles[field]) {
            currAllFiles[field] = [];
          }
          if (link && link !== "") {
            currAllFiles[field].push(link);
          }
        }
      }
    });
    setImgEditor({ ...imgEditor, allFiles: { ...currAllFiles } });
  }, [currentRowData]);

  const handleImgEditModal = (key) => {
    setImgEditor({ ...imgEditor, selectedImgType: key });
    setShowImgEditModal(true);
  };

  const handleImgsToBeDeleted = (type, link, isArray = false) => {
    let newToBeDeleted = { ...imgsToBeDeleted };
    if (isArray) {
      if (!newToBeDeleted[type]) {
        newToBeDeleted[type] = [];
      }
      link.forEach((lk) => {
        if (lk !== "") {
          newToBeDeleted[type].push(lk);
        }
      });
    } else {
      if (isSelectedForDeletion(type, link)) {
        newToBeDeleted[type] = newToBeDeleted[type].filter(
          (entry) => entry !== link
        );
      } else {
        if (!newToBeDeleted[type]) {
          newToBeDeleted[type] = [];
        }
        newToBeDeleted[type].push(link);
      }
    }
    let totalToBeDeleted = 0;
    Object.keys(newToBeDeleted).forEach((key) => {
      totalToBeDeleted += newToBeDeleted[key]?.length || 0;
    });
    setImgsToBeDeleted({ ...newToBeDeleted, totalToBeDeleted });
  };

  const isSelectedForDeletion = (type, link) => {
    if (imgsToBeDeleted[type]?.includes(link)) {
      return true;
    } else {
      return false;
    }
  };

  const toogleEdit = () => {
    setShowEditModal(!showEditModal);
  };
  const toogleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const tooglePreview = () => {
    setShowPreviewModal(!showPreviewModal);
  };
  const toogleApproval = () => {
    setShowApprovalModal(!showApprovalModal);
  };

  const toggleRemove = () => {
    setShowRemoveModal(!showRemoveModal);
  };
  const toggleImgEditor = () => {
    setShowImgEditModal(!showImgEditModal);
  };

  const handleSort = (column) => {
    const newSortType = sortType !== "asc" ? "desc" : "asc";
    setSortType(newSortType);
    setSortColumn(column);
    filterData({
      activePage,
      itemsCountPerPage,
      sortColumn: column,
      sortType: newSortType,
    });
  };

  const handlePageChange = (action, pageNumber) => {
    if (pageNumber > 0) setActivePage(pageNumber);
    filterData({
      activePage: pageNumber,
      itemsCountPerPage,
      sortColumn,
      sortType,
      [filterKey]: filterValue,
    });
  };

  const handleRecordPerPage = (action) => {
    setItemsCountPerPage(action.target.value);
    filterData({
      activePage,
      itemsCountPerPage: action.target.value,
      sortColumn,
      sortType,
      [filterKey]: filterValue,
    });
  };

  const getImageLabel = (key) => {
    switch (key) {
      case "thumbnails":
        return "Thumbnail images";
      case "normalImages":
        return "Normal images";
      case "images":
        return "360 images";
      case "layouts":
        return "Layouts";
      case "videos":
        return "Videos";
      case "virtualFiles":
        return "Virtual Tour images";
      default:
        return null;
    }
  };

  const handleRecommendation = (key, data) => {
    if (key === "ADD" && addActionApi) {
      const options = {
        url: addActionApi,
        method: POST,
        data: {
          propertyId: data?._id || currentRowData._id,
          userId: userId,
        },
      };
      dispatch(callApi(options))
        .then((res) => {
          setSnackbar({
            open: true,
            message: `Recommendation Successful.`,
            status: 0,
          });
        })
        .catch((error) => {
          console.log("--------- ADD RECOMMENDATION ERROR ----------", error);
        });
    } else if (key === "REMOVE" && removeActionApi) {
    }
  };

  const formatTableCell = (element, headerLabel) => {
    // handle cell link
    const allowedTableColumnsFinal = allowedTableColumns;
    if (headerLabel === "Link Share") {
      const propertyLink =
        "https://builderfloor.com" + generatePropertyUrl(element);
      return (
        <Link
          href={propertyLink}
          onClick={(e) => handleShare(propertyLink, e)}
          target="_blank"
        >
          Share
        </Link>
      );
    }
    let cellData;
    const splittedKeys = allowedTableColumnsFinal[headerLabel]?.split(".");
    if (splittedKeys?.length === 1) {
      if (
        userProfile.role === USER_ROLE[BF_ADMIN] ||
        userProfile.role === USER_ROLE[GET_CHANNEL_PARTNER_DATA] ||
        userProfile.role === USER_ROLE[PROPERTY_DEALER]
      ) {
        if (splittedKeys[0] === "createdByName") {
          cellData = element["cpName"] || element["createdByName"];
        } else if (splittedKeys[0] === "createdByPhoneNumber") {
          cellData =
            element["cpPhoneNumber"] || element["createdByPhoneNumber"];
        } else {
          cellData = element?.[allowedTableColumnsFinal?.[headerLabel]];
        }
      } else {
        cellData = element?.[allowedTableColumnsFinal?.[headerLabel]];
      }
    } else if (splittedKeys?.length > 1) {
      cellData = element?.[splittedKeys?.[0]]?.[splittedKeys?.[1]];
    }
    // check for date
    if (!isNaN(Date.parse(cellData)) && cellData?.length > 20) {
      return new Date(cellData).toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    // check for true
    if (cellData === true || cellData === "true") {
      return "Yes";
    }
    // check for false
    if (cellData === false || cellData === "false") {
      return "No";
    }
    // check for ChannelPartner
    if (cellData === "ChannelPartner") {
      return "Broker";
    }
    return cellData;
  };

  return (
    <>
      {showEditModal && (
        <ReusablePopup
          onSave={() => {
            handleSave(true);
          }}
          onHide={toogleEdit}
          onCancel={toogleEdit}
        >
          <div className="formheadingcontainer">Edit</div>
          <FormBuilder
            ref={finalizeRef}
            propsFormData={currentRowData}
            fields={fieldConst}
          />
          <div className="images-state" style={{ display: "flex" }}>
            {Object.entries(imgEditor?.allFiles).map((entry) => {
              return entry[1]?.length > 0 ? (
                <MuiButton
                  variant="secondary"
                  onClick={() => handleImgEditModal(entry[0])}
                  style={{ width: "fit-content" }}
                >
                  {entry[1]?.length} {getImageLabel(entry[0])}
                </MuiButton>
              ) : null;
            })}
          </div>
          {imgsToBeDeleted.totalToBeDeleted > 0 && (
            <div className="label warning_text">
              {imgsToBeDeleted.totalToBeDeleted} images/videos to be deleted
            </div>
          )}
        </ReusablePopup>
      )}

      {showDeleteModal && (
        <ReusablePopup
          onYes={() => {
            handleDelete();
            toogleDelete();
          }}
          onHide={toogleDelete}
          onCancel={toogleDelete}
        >
          <p className="lbel">Are you sure want to Delete?</p>
        </ReusablePopup>
      )}

      {showPreviewModal && (
        <ReusablePopup
          onHide={tooglePreview}
          onClose={tooglePreview}
          onEdit={(e) => {
            e.stopPropagation();
            toogleEdit();
          }}
          onApprove={
            approveApi &&
            currentRowData[NEED_APPROVAL_BY] &&
            userProfile._id === currentRowData[NEED_APPROVAL_BY] &&
            ((e) => {
              e.stopPropagation();
              toogleApproval();
            })
          }
          onRemove={
            approveApi &&
            currentRowData[NEED_APPROVAL_BY] &&
            userProfile._id === currentRowData[NEED_APPROVAL_BY] &&
            ((e) => {
              e.stopPropagation();
              toggleRemove();
            })
          }
        >
          <div className="formheadingcontainer popup_title">
            Property Preview
          </div>
          <HomeCard
            element={currentRowData}
            disableOnClickNavigate={true}
          ></HomeCard>
          <SearchCard
            element={currentRowData}
            disableOnClickNavigate={true}
          ></SearchCard>
          <DetailDataCard singledata={currentRowData}></DetailDataCard>
        </ReusablePopup>
      )}

      {showImgEditModal && (
        <ReusablePopup onHide={toggleImgEditor} onClose={toggleImgEditor}>
          <div className="formheadingcontainer popup_title">
            Edit Property {getImageLabel(imgEditor?.selectedImgType)}
          </div>
          <p className="label">
            {imgEditor?.allFiles[imgEditor?.selectedImgType]?.length}{" "}
            {getImageLabel(imgEditor?.selectedImgType)}
          </p>
          <div className="delete_media_list">
            {imgEditor?.allFiles[imgEditor?.selectedImgType].map(
              (entry, index) => (
                <div className="img-item">
                  <label htmlFor={index}>
                    {imgEditor?.selectedImgType !== "videos" ? (
                      <img
                        src={entry}
                        alt={entry}
                        width={100}
                        height={100}
                        className="delete_media"
                      />
                    ) : (
                      <video
                        src={entry}
                        alt={entry}
                        width={100}
                        height={100}
                        className="delete_media"
                      />
                    )}
                  </label>
                  <input
                    id={index}
                    type="checkbox"
                    checked={isSelectedForDeletion(
                      imgEditor?.selectedImgType,
                      entry
                    )}
                    onChange={() =>
                      handleImgsToBeDeleted(imgEditor?.selectedImgType, entry)
                    }
                  />
                </div>
              )
            )}
          </div>
          <p className="lbel warning_text">
            (Note: Selected images/videos will be deleted on save.)
          </p>
        </ReusablePopup>
      )}

      {!disableRowModal && showRowModal && (
        <ReusablePopup onHide={toogleRowClick} onClose={toogleRowClick}>
          <FormBuilder
            ref={finalizeRef}
            propsFormData={currentRowData}
            fields={fieldConst}
          />
        </ReusablePopup>
      )}

      {showApprovalModal && (
        <ReusablePopup
          onYes={() => {
            handleApprove(currentRowData._id);
            toogleApproval();
          }}
          onHide={toogleApproval}
          onCancel={toogleApproval}
        >
          <p className="lbel">Are you sure want to Approve?</p>
        </ReusablePopup>
      )}

      {showRemoveModal && (
        <ReusablePopup
          onYes={() => {
            handleRemove(currentRowData._id);
            toggleRemove();
          }}
          onHide={toggleRemove}
          onCancel={toggleRemove}
        >
          <p className="lbel">Are you sure want to Remove?</p>
          <FormBuilder
            ref={finalizeRef}
            fields={[
              {
                name:
                  userProfile.role === USER_ROLE[BF_ADMIN]
                    ? "rejectedByBFAdminComments"
                    : "rejectedByCPComments",
                label: "Comments",
                type: "textarea",
                parentclassName: "property-w-3 column-property",
                className: "column-property",
                textLimit: 100,
                isRequired: true,
              },
            ]}
          />
        </ReusablePopup>
      )}

      <div className="tablediv">
        {showTableControls && (
          <div className="table_controls_wrapper">
            <input
              type="text"
              onChange={(e) => {
                setTableFilter({
                  search: e.target.value,
                });
              }}
              value={[tableFilter["search"]] || ""}
              className="filter_input"
            />
            <Button
              onClick={() => applyFilters()}
              className="filter_submit filter_btn"
            >
              <RiFilter2Fill className="filter_icon" />
              Filter&nbsp;Data
            </Button>
            {/* {showColumnFilter && (
              <Button onClick={() => setShowFilters(!showFilters)} className="filter_btn">
                <RiFilter2Fill className="filter_icon" />
                Filter
              </Button>
            )} */}
          </div>
        )}
        {selectedRows?.length > 0 && (
          <div className="table_selection_controls">
            <div className="selection_info">
              <span>{selectedRows.length} Selected</span>
            </div>
            <div className="table_selection_control_btns">
              <Button
                onClick={(e) => handleSelectionOp("SHARE")}
                className="selection_ctrl_btn edit_btn selection_share_btn"
              >
                <ShareRoundedIcon className="tsc_icon share_icon" />
                Share
              </Button>
              <Button
                onClick={(e) => handleSelectionOp("DELETE")}
                className="selection_ctrl_btn delete_btn btn-danger"
              >
                <DeleteRoundedIcon className="tsc_icon delete_icon" />
                Delete
              </Button>
            </div>
          </div>
        )}
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              {allowSelect && (
                <th className="tablehead text">
                  <input
                    type="checkbox"
                    className="table_row_check table_head_row_check"
                    checked={selectAll}
                    onChange={(e) => handleRowSelection(e, null, true)}
                  />
                </th>
              )}
              {Object.keys(allowedTableColumns).map((headerLabel, index) => (
                <th key={index} className="tablehead text">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <div
                      onClick={() =>
                        handleSort(allowedTableColumns[headerLabel])
                      }
                    >
                      {headerLabel}
                    </div>
                    {sortColumn === allowedTableColumns[headerLabel] &&
                      (sortType === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
                    {showFilter &&
                      headerLabel !== "Plot No" &&
                      headerLabel !== "Size" &&
                      headerLabel !== "Builder Name" &&
                      headerLabel !== "Builder Contact" &&
                      headerLabel !== "Created By" &&
                      headerLabel !== "Mobile Number" &&
                      headerLabel !== "Company Name" &&
                      headerLabel !== "Updated At" &&
                      headerLabel !== "Link Share" && (
                        <div style={{ position: "relative" }}>
                          <FilterListIcon
                            sx={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => handleFilterIcon(headerLabel)}
                          />
                          {selectedHeader == headerLabel && (
                            <div
                              className="dropdown"
                              style={{
                                position: "absolute",
                                top: "20px",
                                overflowY:
                                  headerLabel == "Location"
                                    ? "scroll"
                                    : "hidden",
                                maxHeight: "800px",
                              }}
                            >
                              <ul
                                style={{
                                  backgroundColor: "white",
                                  boxShadow:
                                    "0px 0px 0px 1px rgba(0, 0, 0, 0.2)",
                                  borderRadius: "10px",
                                  padding: "10px 20px",
                                  width: "full",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {filterOptions[selectedHeader]?.map((item) => (
                                  <li
                                    style={{
                                      color: "#000",
                                      listStyle: "none",
                                      marginBottom: "5px",
                                      cursor: "pointer",
                                      fontWeight: 500,
                                      fontSize: "14px",
                                      transition: "background-color 0.3s ease",
                                    }}
                                    key={item}
                                    value={item}
                                    onClick={() =>
                                      handleClickDropdownItem(item.value)
                                    }
                                  >
                                    {item.key}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </th>
              ))}

              {!hideActions && (
                <th className="tablehead text">
                  <div>Actions</div>
                </th>
              )}
              {showViewAllListing && (
                <th className="tablehead text">View all Listing</th>
              )}
            </tr>
          </thead>
          <tbody className="tablebody text">
            {tableData?.map((element) => (
              <tr
                className="tableborder text"
                style={{
                  backgroundColor:
                    element?.needApprovalBy === "Rejected"
                      ? "#fd5c63"
                      : "white",
                  color: "black",
                }}
                key={element.id}
                onClick={() => {
                  if (rowClick) {
                    setCurrentRowData(element);
                    toogleRowClick();
                  }
                }}
              >
                {allowSelect && (
                  <td className="bodytext">
                    <input
                      type="checkbox"
                      className="table_row_check"
                      checked={isRowSelected(element._id)}
                      onChange={(e) => handleRowSelection(e, element)}
                    />
                  </td>
                )}
                {/* {Object.keys(allowedTableColumns).map((headerLabel, index) => (
                  <td className="bodytext" key={index}>
                    {formatTableCell(element, headerLabel)}
                  </td>
                ))} */}
                <td className="bodytext">{element.type}</td>
                <td className="bodytext">{element.subType}</td>
                <td className="bodytext">{element.title}</td>
                <td className="bodytext">{element.details}</td>
                <td className="bodytext">{element.status}</td>
                <td className="bodytext">{element?.userId?.name}</td>
                {!hideActions && (
                  <td className="tablebody tableborder text actionColumn">
                    <>
                      {(!hideAlterActions || showEditAction) && (
                        <>
                          <Button
                            className="row_action_btn edit_btn ListingEditbtn"
                            variant="success"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRowData(element);
                              toogleEdit();
                            }}
                          >
                            <FaUserEdit size={20} />
                          </Button>
                          &nbsp;
                        </>
                      )}
                      {(!hideAlterActions || showDeleteAction) && (
                        <>
                          {userProfile.role !== USER_ROLE.salesUser && (
                            <Button
                              className="row_action_btn delete_btn ListingDeletebtn"
                              variant="danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentRowData(element);
                                toogleDelete();
                              }}
                            >
                              <FaRegTrashAlt size={20} />
                            </Button>
                          )}
                          &nbsp;
                        </>
                      )}
                    </>
                    {isproperty && ( // Conditionally render the Preview button
                      <>
                        <Button
                          className="row_action_btn preview_btn ListingPreviewbtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentRowData(element);
                            tooglePreview(); // Add a function to handle the preview logic
                          }}
                        >
                          <FaRegEye size={20} />
                        </Button>
                        &nbsp;
                      </>
                    )}
                    {((approveApi &&
                      element[NEED_APPROVAL_BY] &&
                      userProfile._id === element[NEED_APPROVAL_BY]) ||
                      showApproveAction) && (
                      <Button
                        className="row_action_btn approve_btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentRowData(element);
                          toogleApproval();
                        }}
                      >
                        <FcApproval size={12} />
                      </Button>
                    )}
                    {approveApi &&
                      element[NEED_APPROVAL_BY] &&
                      userProfile._id === element[NEED_APPROVAL_BY] && (
                        <Button
                          className="row_action_btn reject_btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentRowData(element);
                            toggleRemove();
                          }}
                        >
                          <FcRemoveImage size={12} />
                        </Button>
                      )}
                    {addActionApi && (
                      <Button
                        className="row_action_btn approve_btn ListingDeletebtn text_btn"
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentRowData(element);
                          handleRecommendation("ADD", element);
                        }}
                      >
                        Add
                      </Button>
                    )}
                    {removeActionApi && (
                      <Button
                        className="row_action_btn approve_btn ListingDeletebtn text_btn"
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentRowData(element);
                          handleRecommendation("REMOVE", element);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                    {showRecommendationActions && (
                      <>
                        <Button
                          className="row_action_btn text_btn"
                          onClick={(e) => {
                            setCurrentRowData(element);
                            navigateTo.push(
                              `/admin/addRecommendation?uid=${element.userId?._id}`
                            );
                          }}
                        >
                          +&nbsp;Add&nbsp;Recommendation
                        </Button>
                        <Button
                          className="row_action_btn text_btn"
                          onClick={(e) => {
                            setCurrentRowData(element);
                            navigateTo.push(
                              `/admin/showRecommended?uid=${element.userId?._id}`
                            );
                          }}
                        >
                          Show&nbsp;Recommendations
                          <AiOutlineDoubleRight size={12} />
                        </Button>
                      </>
                    )}
                  </td>
                )}
                {showViewAllListing && (
                  <td>
                    <Button
                      className="row_action_btn"
                      onClick={(e) => {
                        setCurrentRowData(element);
                        navigateTo.push(
                          showViewAllListing + "?id=" + element._id
                        );
                      }}
                    >
                      <AiOutlineDoubleRight size={12} />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {apiStatus === "loading" || showLoader ? (
        <CircularProgress className="loader-class" />
      ) : tableData.length > 0 && showPagination ? (
        <BasicTablePagination
          dataLength={totalItems}
          currentPage={activePage}
          handlePageChange={handlePageChange}
          rowPerPage={itemsCountPerPage}
          handleRowPerPagChange={handleRecordPerPage}
        />
      ) : null}

      <SnackBar
        open={snackbar?.open}
        message={snackbar?.message}
        onClose={(status) => snackbarClose(status)}
      />
    </>
  );
};

export default ListingTable;
