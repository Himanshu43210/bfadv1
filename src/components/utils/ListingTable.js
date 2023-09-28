import React, { useRef, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Button as MuiButton } from "@mui/material";
import ReusablePopup from "./ReusablePopup";
import FormBuilder from "./FormBuilder";
import { FaCaretUp, FaCaretDown, FaSearch } from "react-icons/fa";
import { FaUserEdit, FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import { API_ENDPOINTS } from "../../redux/utils/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AiOutlineDoubleRight } from "react-icons/ai";
import {
  APPROVED,
  BF_ADMIN,
  CHANNEL_PARTNER,
  DELETE,
  GET,
  GET_ADMIN_PROPERTY_DATA,
  NEED_APPROVAL_BY,
  POST,
  PROFILE,
  PROPERTY_DEALER,
  REJECTED,
} from "./Const";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../redux/utils/apiActions";
import BasicTablePagination from "../customComponents/TablePagination";
import { selectApiData } from "../../redux/utils/selectors";
import { useEffect } from "react";
import { FcApproval, FcRemoveImage } from "react-icons/fc";
import _, { find } from "lodash";
import HomeCard from "../customComponents/HomeCard";
import SearchCard from "../customComponents/SearchCard";
import DetailDataCard from "../customComponents/DetailedDataCard";
import { selectApiStatus } from "./../../redux/utils/selectors";
import { useNavigate } from "react-router-dom";
import { sanitizeFormData } from "./reusableMethods";
import { USER_ROLE } from "../../ScreenJson";
import SnackBar from "../customComponents/SnackBar";

const ListingTable = ({
  headersDesktop = [],
  headersMobile = [],
  roleSpecificDesktopHeaders,
  fieldConst,
  editApi,
  deleteApi,
  getDataApi,
  approveApi,
  itemCount,
  isproperty,
  removeApi,
  filterDataUrl,
  onRefreshApiType,
  hideActions,
  showViewAllListing,
  hideAlterActions,
  refreshDataApi,
  refreshMethod,
  disableRowModal,
  showEditAction,
  showDeleteAction,
  showColumnFilter,
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
  const [sortType, setSortType] = useState("asc");
  const [sortColumn, setSortColumn] = useState("id");
  const [tableData, setTableData] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [tableFilter, setTableFilter] = useState({});
  const [showImgEditModal, setShowImgEditModal] = useState(false);
  const [imgEditor, setImgEditor] = useState({});
  const [imgsToBeDeleted, setImgsToBeDeleted] = useState([]);
  const apiStatus = useSelector((state) => selectApiStatus(state, getDataApi));
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs
  const tableHeaders = isMobile ? headersMobile : headersDesktop;
  const dispatch = useDispatch();
  const getApiDataFromRedux = useSelector((state) =>
    selectApiData(state, getDataApi)
  );
  const userProfile = useSelector((state) => state[PROFILE]);
  const navigateTo = useNavigate();
  let allowedTableColumns = roleSpecificDesktopHeaders
    ? roleSpecificDesktopHeaders[userProfile.role]
    : tableHeaders;

  const applyFilters = (sortingFilter = "") => {
    const filterQuery =
      Object.entries(tableFilter)
        .map(([key, value]) => `&${key}=${value}`)
        .join("") || "";
    dispatch(
      callApi({
        url: filterDataUrl + sortingFilter + filterQuery,
        method: onRefreshApiType || GET,
        headers: { "Content-Type": "application/json" },
        data: { sortType, sortColumn, activePage, itemsCountPerPage },
      })
    );
  };

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
      allowedTableColumns = roleSpecificDesktopHeaders
        ? roleSpecificDesktopHeaders[userProfile.role]
        : tableHeaders;
    }
  }, [getApiDataFromRedux]);

  const refreshData = () => {
    try {
      const options = {
        url: refreshDataApi,
        method: onRefreshApiType || GET,
        headers: { "Content-Type": "application/json" },
        data: {},
      };
      dispatch(callApi(options));
    } catch (error) { }
  };

  const handleSave = (edit = false) => {
    const haveReqFiles = (currentRowData?.thumbnails?.length > 0) && (imgsToBeDeleted?.thumbnails?.length !== currentRowData?.thumbnails?.length);
    const formData = finalizeRef.current.finalizeData(haveReqFiles ? ["thumbnailFile"] : []);
    if (formData) {
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
          for (const file of formData?.videoFile || []) {
            newFormData.append("videoFile", file);
          }
          for (const file of formData?.virtualFile || []) {
            newFormData.append("virtualFile", file);
          }
          // newFormData.append("parentId", userProfile._id);
          // newFormData.append(
          //   "contactId",
          //   userProfile.role === USER_ROLE[PROPERTY_DEALER]
          //     ? userProfile.parentId
          //     : userProfile._id
          // );
          // newFormData.append([NEED_APPROVAL_BY], userProfile.parentId);
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
            "videoFile",
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
          newFormData.append("filesToBeDeleted", imgsToBeDeleted);

          const options = {
            url: API_ENDPOINTS[editApi],
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
                filesToBeDeleted: imgsToBeDeleted
                // parentId: userProfile._id,
                // role:
                //   userProfile.role === USER_ROLE[BF_ADMIN]
                //     ? USER_ROLE["channelPartner"]
                //     : USER_ROLE["salesUser"],
              }),
          };
          dispatch(callApi(options)).then(() => {
            setSnackbar({ open: true, message: edit ? 'Edited Successfully.' : 'Saved Successfully.', status: 0 });
            setShowEditModal(false);
            refreshData();
            // setTimeout(()=> {
            // },1500);
          });
        } catch (error) {
          setSnackbar({ open: true, message: edit ? 'Edit Failed.' : 'Save Failed.', status: -1 });
          console.log(error);
        }
      } else {
        setSnackbar({
          open: true,
          message: "Empty required field(s)!",
          status: -1,
        });
      }
    } else {
      setSnackbar({ open: true, message: `Empty required field(s).`, status: -1 });
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
      const options = {
        url: API_ENDPOINTS[approveApi],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: {
          _id: rowId,
          [NEED_APPROVAL_BY]: userProfile.parentId || APPROVED,
        },
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
  }) => {
    applyFilters(
      `&page=${activePage}&limit=${itemsCountPerPage}&sortType=${sortType}&sortColumn=${sortColumn}`
    );
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
    console.log('******* current row adta **********', currentRowData);
    const currAllFiles = {};
    fileFields.forEach((field) => {
      console.log('----- stage 1 : field -----', field);
      if (currentRowData[field]) {
        console.log('----- stage 2 : field -----', currentRowData[field]);
        for (const link of currentRowData[field]) {
          console.log('----- stage 3 : link -----', link);
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

  const handleImgsToBeDeleted = (link) => {
    let newToBeDeleted = [...imgsToBeDeleted];
    if (isSelectedForDeletion(link)) {
      newToBeDeleted = newToBeDeleted.filter((entry) => entry !== link);
    } else {
      newToBeDeleted.push(link);
    }
    setImgsToBeDeleted(newToBeDeleted);
  };

  const isSelectedForDeletion = (link) => {
    if (imgsToBeDeleted.includes(link)) {
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
    const newSortType = sortType === "asc" ? "desc" : "asc";
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
    });
  };

  const handleRecordPerPage = (action) => {
    setItemsCountPerPage(action.target.value);
    filterData({
      activePage,
      itemsCountPerPage: action.target.value,
      sortColumn,
      sortType,
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

  const formatTableCell = (cellData) => {
    // check for date
    if (!isNaN(Date.parse(cellData)) && cellData.length > 20) {
      return new Date(cellData).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    // check for true
    if (cellData === true || cellData === "true") {
      return "Yes";
    }
    // check for false
    if (cellData === false || cellData === "false") {
      return "No";
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
            {
              Object.entries(imgEditor?.allFiles).map((entry) => {
                return (
                  entry[1]?.length > 0 ? (
                    <MuiButton variant="secondary" onClick={() => handleImgEditModal(entry[0])} style={{ width: "fit-content" }}>
                      {entry[1]?.length} {getImageLabel(entry[0])}
                    </MuiButton>
                  ) : null
                )
              })
            }
                      </div>
          {imgsToBeDeleted.length > 0 && <div className="label">{imgsToBeDeleted.length} files to be deleted</div>}
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
        <ReusablePopup onHide={tooglePreview} onClose={tooglePreview}>
          <HomeCard
            element={currentRowData}
            disableOnClickNavigate={true}
          ></HomeCard>
          <SearchCard
            element={currentRowData}
            disableOnClickNavigate={true}
          ></SearchCard>
          <DetailDataCard singledata={currentRowData}></DetailDataCard>
          {
            <Button
              variant="success"
              onClick={(e) => {
                e.stopPropagation();
                toogleEdit();
              }}
            >
              Edit
            </Button>
          }
          {approveApi &&
            currentRowData[NEED_APPROVAL_BY] &&
            userProfile._id === currentRowData[NEED_APPROVAL_BY] && (
              <>
                <Button
                  variant="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    toogleApproval();
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRemove();
                  }}
                >
                  Reject
                </Button>
              </>
            )}
        </ReusablePopup>
      )}
      {showImgEditModal && (
        <ReusablePopup onHide={toggleImgEditor} onClose={toggleImgEditor}>
          <div className="formheadingcontainer">Edit Property {getImageLabel(imgEditor?.selectedImgType)}</div>
          <p className="label">{imgEditor?.allFiles[imgEditor?.selectedImgType]?.length} {getImageLabel(imgEditor?.selectedImgType)} ({imgsToBeDeleted[imgEditor?.selectedImgType]?.length || 0} selected for deletion)</p>
          {
            imgEditor?.allFiles[imgEditor?.selectedImgType].map((entry, index) => (
              <div className="img-item">
                <label htmlFor={index}>
                  {
                    imgEditor?.selectedImgType !== "videos" ? (
                      <img src={entry} alt={entry} width={100} height={100} />
                    ) : (
                      <video src={entry} alt={entry} width={100} height={100} />
                    )
                  }
                </label>
                <input id={index} type="checkbox" checked={isSelectedForDeletion(entry)} onChange={() => handleImgsToBeDeleted(entry)} />
              </div>
            ))
          }
          <p className="lbel">(Note: Selected files will be deleted on save.)</p>
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
        <input
          type="text"
          onChange={(e) => {
            setTableFilter({
              search: e.target.value,
            });
          }}
          value={[tableFilter["search"]] || ""}
        />
        <Button onClick={() => applyFilters()}>Filter Data</Button>
        {showColumnFilter && (
          <Button onClick={() => setShowFilters(!showFilters)}>Filter</Button>
        )}
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              {Object.keys(allowedTableColumns).map((headerLabel, index) => (
                <th key={index} className="tablehead text">
                  <div
                    onClick={() => handleSort(allowedTableColumns[headerLabel])}
                  >
                    {headerLabel}
                  </div>
                  {sortColumn === allowedTableColumns[headerLabel] &&
                    (sortType === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
                  {showFilters && (
                    <input
                      type="text"
                      onChange={(e) =>
                        setTableFilter({
                          ...tableFilter,
                          [allowedTableColumns[headerLabel]]: e.target.value,
                        })
                      }
                      value={
                        tableFilter[allowedTableColumns[headerLabel]] || ""
                      }
                    />
                  )}
                </th>
              ))}
              {!hideActions && <th className="tablehead text">Actions</th>}
              {showViewAllListing && (
                <th className="tablehead text">View all Listing</th>
              )}
            </tr>
          </thead>
          {console.log('----- table data : listing table -----', tableData)}
          <tbody className="tablebody text">
            {tableData.map((element) => (
              <tr
                className="tableborder text"
                key={element.id}
                onClick={() => {
                  if (!showViewAllListing) {
                    setCurrentRowData(element);
                    toogleRowClick();
                  }
                }}
              >
                {Object.keys(allowedTableColumns).map((headerLabel, index) => (
                  <td className="bodytext" key={index}>
                    {formatTableCell(element[allowedTableColumns[headerLabel]])}
                  </td>
                ))}
                {!hideActions && (
                  <td className="tablebody tableborder text actionColumn">
                    <>
                      {
                        (!hideAlterActions || showEditAction) && (
                          <Button
                            className="ListingEditbtn"
                            variant="success"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRowData(element);
                              toogleEdit();
                            }}
                          >
                            <FaUserEdit size={20} />
                          </Button>
                        )
                      }
                      &nbsp;
                      {
                        (!hideAlterActions || showDeleteAction) && (
                          <Button
                            className="ListingDeletebtn"
                            variant="danger"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRowData(element);
                              toogleDelete();
                            }}
                          >
                            <FaRegTrashAlt size={20} />
                          </Button>
                        )
                      }
                      &nbsp;
                    </>
                    {isproperty && ( // Conditionally render the Preview button
                      <Button
                        className="ListingPreviewbtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentRowData(element);
                          tooglePreview(); // Add a function to handle the preview logic
                        }}
                      >
                        <FaRegEye size={20} />
                      </Button>
                    )}
                    &nbsp;
                    {approveApi &&
                      element[NEED_APPROVAL_BY] &&
                      userProfile._id === element[NEED_APPROVAL_BY] && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRowData(element);
                              toogleApproval();
                            }}
                          >
                            <FcApproval size={12} />
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentRowData(element);
                              toggleRemove();
                            }}
                          >
                            <FcRemoveImage size={12} />
                          </Button>
                        </>
                      )}
                  </td>
                )}
                {showViewAllListing && (
                  <td>
                    <Button
                      onClick={(e) => {
                        navigateTo(showViewAllListing + "?id=" + element._id);
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
      {apiStatus === "loading" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        tableData.length > 0 && (
          <BasicTablePagination
            dataLength={totalItems}
            currentPage={activePage}
            handlePageChange={handlePageChange}
            rowPerPage={itemsCountPerPage}
            handleRowPerPagChange={handleRecordPerPage}
          />
        )
      )}
      <SnackBar
        open={snackbar?.open}
        message={snackbar?.message}
        onClose={(status) => snackbarClose(status)}
      />
    </>
  );
};

export default ListingTable;
