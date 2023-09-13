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
const ListingTable = ({
  headersDesktop = [],
  headersMobile = [],
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
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showHomePreviewModal, setShowHomePreviewModal] = useState(false);
  const [showSearchPreviewModal, setShowSearchPreviewModal] = useState(false);
  const [showDetailPreviewModal, setShowDetailPreviewModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRowModal, setShowRowModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});
  const [activePage, setActivePage] = useState(1);
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
  useEffect(() => {
    if (!_.isEmpty(getApiDataFromRedux)) {
      if (getApiDataFromRedux.pageNumber !== activePage)
        setActivePage(getApiDataFromRedux.pageNumber);
      if (getApiDataFromRedux.nbHits !== itemsCountPerPage)
        setItemsCountPerPage(getApiDataFromRedux.nbHits);
      if (getApiDataFromRedux.totalItems !== totalItems)
        setTotalItems(getApiDataFromRedux.totalItems);
      setTableData(getApiDataFromRedux.data);
    }
  }, [getApiDataFromRedux]);

  const handleSave = () => {
    try {
      const options = {
        url: API_ENDPOINTS[editApi],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: sanitizeFormData(formData),
      };
      dispatch(callApi(options));
    } catch (error) {
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
      dispatch(callApi(options));
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
      dispatch(callApi(options));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (rowId) => {
    console.log(formData);
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
      dispatch(callApi(options));
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

  const toogleEdit = () => {
    setShowEditModal(!showEditModal);
  };
  const toogleDelete = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const tooglePreview = () => {
    setShowPreviewModal(!showPreviewModal);
  };
  const toggleHomePreview = () => {
    setShowHomePreviewModal(!showHomePreviewModal);
  };
  const toggleSearchpreview = () => {
    setShowSearchPreviewModal(!showSearchPreviewModal);
  };
  const toggleDetailPreview = () => {
    setShowDetailPreviewModal(!showDetailPreviewModal);
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
      {showHomePreviewModal && (
        <ReusablePopup
          onHide={toggleHomePreview}
          className="home-modal-content"
          onCancel={toggleHomePreview}
        >
          <HomeCard element={currentRowData}></HomeCard>
        </ReusablePopup>
      )}
      {showSearchPreviewModal && (
        <ReusablePopup
          onHide={toggleSearchpreview}
          onCancel={toggleSearchpreview}
          className="search-modal-content"
        >
          <SearchCard element={currentRowData}></SearchCard>
        </ReusablePopup>
      )}
      {showDetailPreviewModal && (
        <ReusablePopup
          className="detail-modal-content"
          onHide={toggleDetailPreview}
          onCancel={toggleDetailPreview}
        >
          <DetailDataCard singledata={currentRowData}></DetailDataCard>
        </ReusablePopup>
      )}

      {showPreviewModal && (
        <ReusablePopup
          onHomePreview={() => {
            toggleHomePreview();
            tooglePreview();
          }}
          onDetailPreview={() => {
            toggleDetailPreview();
            tooglePreview();
          }}
          onSearchResultPreview={() => {
            toggleSearchpreview();
            tooglePreview();
          }}
          onHide={tooglePreview}
        ></ReusablePopup>
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
          onRemove={() => {
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
              {Object.keys(tableHeaders).map((headerLabel, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(tableHeaders[headerLabel])}
                  className="tablehead text"
                >
                  {headerLabel}
                  {sortColumn === tableHeaders[headerLabel] &&
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
                {Object.keys(tableHeaders).map((headerLabel, index) => (
                  <td className="bodytext" key={index}>
                    {element[tableHeaders[headerLabel]]}
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
    </>
  );
};

export default ListingTable;
