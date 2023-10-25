import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListingTable from "../../utils/ListingTable.js";
import { newUserConst } from "../../fieldConsts/UserFieldConst.js";
import TableButtonHeader from "../../utils/TableButtonHeader.js";
// import Navbar from "../../utils/Navbar";
import {
  ALTER_USER_DATA,
  DELETE_USER_DATA,
  GET,
  GET_ADMIN_USER_DATA,
  GET_USER_DATA,
  LOADING,
} from "../../utils/Const.js";
import AutoFetchApi from "../../customComponents/AutoFetchApi.jsx";
import { API_ENDPOINTS } from "../../../redux/utils/api.js";
import { selectApiData, selectApiStatus } from "../../../redux/utils/selectors.js";
import { CircularProgress } from "@mui/material";

export default function UserManagement() {
  const desktopHeaders = {
    Name: "name",
    "Phone Number": "phoneNumber",
    Address: "companyAddress",
    Email: "email",
    Role: "role",
    "Parent Id": "parentId",
  };
  const mobileHeaders = { Name: "name", Role: "role" };
  const fieldConst = newUserConst;
  let tableData = useSelector((state) => selectApiData(state, GET_USER_DATA));
  const userProfile = useSelector((state) => state.profile);
  const dataApi = API_ENDPOINTS[GET_ADMIN_USER_DATA] + "?id=" + userProfile._id;
  const apiStatus = useSelector((state) =>
    selectApiStatus(state, ALTER_USER_DATA || "")
  );
  return (
    <>
      {!tableData && <AutoFetchApi url={dataApi} method={GET} />}
      {apiStatus === LOADING ? (
        <CircularProgress className="loader-class" />
      ) : (
        <div className="sub_page user_management_page">
          <Card>
            <Card.Header className="card_header font">User Details</Card.Header>
            <Card.Body className="card_body">
              <TableButtonHeader
                fieldConst={fieldConst}
                tableData={_.cloneDeep(tableData?.data || [])}
                saveDataApi={ALTER_USER_DATA}
                refreshDataApi={dataApi}
                addHeader="Add User"
              />
              <ListingTable
                headersDesktop={desktopHeaders}
                headersMobile={mobileHeaders}
                fieldConst={fieldConst}
                editApi={ALTER_USER_DATA}
                deleteApi={DELETE_USER_DATA}
                getDataApi={GET_ADMIN_USER_DATA}
                filterDataUrl={dataApi}
                itemCount={tableData?.itemCount}
                refreshDataApi={dataApi}
              />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
