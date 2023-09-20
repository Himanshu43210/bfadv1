import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import ReusablePopup from "./ReusablePopup";
import FormBuilder from "./FormBuilder";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
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
  NEED_APPROVAL_BY,
  POST,
  PROFILE,
  REJECTED,
} from "./Const";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../redux/utils/apiActions";
import BasicTablePagination from "../customComponents/TablePagination";
import { selectApiData } from "../../redux/utils/selectors";
import { useEffect } from "react";
import { FcApproval, FcRemoveImage } from "react-icons/fc";
import _ from "lodash";
import HomeCard from "../customComponents/HomeCard";
import SearchCard from "../customComponents/SearchCard";
import DetailDataCard from "../customComponents/DetailedDataCard";
import { selectApiStatus } from "./../../redux/utils/selectors";
import axios from "axios";
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
  refreshMethod
}) => {
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
  const [formData, setFormData] = useState({});
  const apiStatus = useSelector((state) => selectApiStatus(state, getDataApi));
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs
  const tableHeaders = isMobile ? headersMobile : headersDesktop;
  const dispatch = useDispatch();
  const getApiDataFromRedux = useSelector((state) =>
    selectApiData(state, getDataApi)
  );
  const userProfile = useSelector((state) => state[PROFILE]);
  const navigateTo = useNavigate();
  let allowedTableColumns = roleSpecificDesktopHeaders ? roleSpecificDesktopHeaders[userProfile.role] : tableHeaders;

  useEffect(() => {
    if (!_.isEmpty(getApiDataFromRedux)) {
      if (getApiDataFromRedux.pageNumber !== activePage)
        setActivePage(getApiDataFromRedux.pageNumber);
      if (getApiDataFromRedux.nbHits !== itemsCountPerPage) {
        console.log('===== not equal to nbHits =====', getApiDataFromRedux, itemsCountPerPage);
        setItemsCountPerPage(getApiDataFromRedux.nbHits);
      }
      if (getApiDataFromRedux.totalItems !== totalItems)
        setTotalItems(getApiDataFromRedux.totalItems);
      setTableData(getApiDataFromRedux.data);
      allowedTableColumns = roleSpecificDesktopHeaders ? roleSpecificDesktopHeaders[userProfile.role] : tableHeaders;
    }
  }, [getApiDataFromRedux]);

  const refreshData = () => {
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

  const handleSave = () => {
    try {
      const err = {};
      fieldConst.forEach((field) => {
        if (
          field.isRequired &&
          ((typeof formData[field.name] === "object" &&
            formData[field.name]?.length === 0) ||
            !formData[field.name])
        ) {
          err[field.name] = "This is required";
        }
      });
      const options = {
        url: API_ENDPOINTS[editApi],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: sanitizeFormData(formData),
      };
      if (Object.keys(err).length === 0) {
        dispatch(callApi(options))
          .then(() => {
            setSnackbar({ open: true, message: `Saved.` });
          })
          .catch(() => {
            setSnackbar({ open: true, message: `Failed.` });
          });
      } else {
        setSnackbar({ open: true, message: `Fields are missing.` });
      }
    } catch (error) {
      setSnackbar({ open: true, message: `Failed.` });
      console.log(error);
    }
  };

  const handleDelete = () => {
    try {
      const options = {
        url: API_ENDPOINTS[deleteApi] + "?id=" + currentRowData._id,
        method: DELETE,
        headers: { "Content-Type": "application/json" },
      };
      dispatch(callApi(options))
        .then(() => {
          setSnackbar({ open: true, message: `Deleted.` });
        });
    } catch (error) {
      console.log(error);
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
      dispatch(callApi(options))
        .then(() => {
          setSnackbar({ open: true, message: `Approved.` });
        });
    } catch (error) {
      console.log(error);
      setSnackbar({ open: true, message: `Approve Failed.` });
    }
  };

  const handleRemove = (rowId) => {
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
          rejectedByBFAdminComments: formData.rejectedByBFAdminComments,
          rejectedByCPComments: formData.rejectedByCPComments,
        },
      };
      dispatch(callApi(options))
        .then(() => {
          setSnackbar({ open: true, message: `Removed.` });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = ({
    activePage,
    itemsCountPerPage,
    sortType,
    sortColumn,
  }) => {
    dispatch(
      callApi({
        url:
          filterDataUrl +
          `&page=${activePage}&limit=${itemsCountPerPage}&sortType=${sortType}&sortColumn=${sortColumn}`,
        method: onRefreshApiType || GET,
        headers: { "Content-Type": "application/json" },
        data: { sortType, sortColumn, activePage, itemsCountPerPage },
      })
    );
  };
  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const toogleRowClick = () => {
    setShowRowModal(!showRowModal);
  };

  const snackbarClose = () => {
    setSnackbar({
      open: false,
      message: ""
    });
    refreshData();
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

  // // Sort the data
  // setTableData(
  //   _.clone(tableData).sort((a, b) => {
  //     const itemA = a[sortColumn];
  //     const itemB = b[sortColumn];

  //     let comparison = 0;
  //     if (itemA > itemB) {
  //       comparison = 1;
  //     } else if (itemA < itemB) {
  //       comparison = -1;
  //     }
  //     return sortType === "asc" ? comparison : comparison * -1;
  //   })
  // );

  return (
    <>
      {showEditModal && (
        <ReusablePopup
          onSave={() => {
            handleSave();
            toogleEdit();
          }}
          onHide={toogleEdit}
          onCancel={toogleEdit}
        >
          <div className="formheadingcontainer">Edit User</div>
          <FormBuilder
            propsFormData={currentRowData}
            fields={fieldConst}
            onFormDataChange={handleFormDataChange}
          />
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
          <HomeCard element={currentRowData}></HomeCard>
          <SearchCard element={currentRowData}></SearchCard>
          <DetailDataCard singledata={currentRowData}></DetailDataCard>
          {
            currentRowData[NEED_APPROVAL_BY] && (
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
            )
          }
        </ReusablePopup>
      )}

      {showRowModal && (
        <ReusablePopup onHide={toogleRowClick} onClose={toogleRowClick}>
          <FormBuilder
            propsFormData={currentRowData}
            fields={fieldConst}
            onFormDataChange={handleFormDataChange}
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
              },
            ]}
            onFormDataChange={handleFormDataChange}
          />
        </ReusablePopup>
      )}
      <div className="tablediv ">
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              {Object.keys(allowedTableColumns).map((headerLabel, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(allowedTableColumns[headerLabel])}
                  className="tablehead text"
                >
                  {headerLabel}
                  {sortColumn === allowedTableColumns[headerLabel] &&
                    (sortType === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
                </th>
              ))}
              {!hideActions && <th className="tablehead text">Actions</th>}
              {showViewAllListing && (
                <th className="tablehead text">View all Listing</th>
              )}
            </tr>
          </thead>
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
                    {element[allowedTableColumns[headerLabel]]}
                  </td>
                ))}
                {!hideActions && (
                  <td className="tablebody tableborder text actionColumn">
                    {!hideAlterActions && (
                      <>
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
                        &nbsp;
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
                        &nbsp;
                      </>
                    )}
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
      <SnackBar open={snackbar?.open} message={snackbar?.message} onClose={snackbarClose} />
    </>
  );
};

export default ListingTable;
