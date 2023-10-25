import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListingTable from "../../utils/ListingTable.js";
import TableButtonHeader from "../../utils/TableButtonHeader.js";
// import Navbar from "../../utils/Navbar";
import {
  ALTER_MASTER_DATA,
  DELETE_MASTER_DATA,
  GET,
  GET_MASTER_DATA,
  LOADING,
  ROUTE_BUTTON,
} from "../../utils/Const.js";
import AutoFetchApi from "../../customComponents/AutoFetchApi.jsx";
import { API_ENDPOINTS } from "../../../redux/utils/api.js";
import { selectApiData, selectApiStatus } from "../../../redux/utils/selectors.js";
import { CircularProgress } from "@mui/material";
import { newMasterConst } from "../../fieldConsts/MasterFieldConst.js";
import CustomRouteButton from "../../customComponents/RouteButton.jsx";

export default function UserManagement() {
  const desktopHeaders = {
    Field: "fieldName",
    Label: "fieldLabel",
    Value: "fieldValue",
  };
  const mobileHeaders = {
    Field: "fieldName",
    Label: "fieldLabel",
    Value: "fieldValue",
  };
  const fieldConst = newMasterConst;
  let tableData = useSelector((state) => selectApiData(state, GET_MASTER_DATA));
  const userProfile = useSelector((state) => state.profile);
  const dataApi = API_ENDPOINTS[GET_MASTER_DATA] + "?id=" + userProfile._id;
  const apiStatus = useSelector((state) =>
    selectApiStatus(state, ALTER_MASTER_DATA || "")
  );
  return (
    <>
      {!tableData && <AutoFetchApi url={dataApi} method={GET} />}
      {apiStatus === LOADING ? (
        <CircularProgress className="loader-class" />
      ) : (
        <div className="standalone_page master_management_page">
          <Card>
            <Card.Header className="card_header font">User Details</Card.Header>
            <Card.Body className="card_body">
              <TableButtonHeader
                fieldConst={fieldConst}
                tableData={_.cloneDeep(tableData?.data || [])}
                saveDataApi={ALTER_MASTER_DATA}
                refreshDataApi={dataApi}
                addHeader="Add Master Data"
                refreshMethod={GET}
              />
              <ListingTable
                headersDesktop={desktopHeaders}
                headersMobile={mobileHeaders}
                fieldConst={fieldConst}
                editApi={ALTER_MASTER_DATA}
                deleteApi={DELETE_MASTER_DATA}
                getDataApi={GET_MASTER_DATA}
                filterDataUrl={dataApi}
                itemCount={tableData?.itemCount}
                refreshDataApi={dataApi}
                refreshMethod={GET}
              />
              <CustomRouteButton
                component={{
                  type: ROUTE_BUTTON,
                  className: "admin-route-button",
                  label: "Go to Dashboard",
                  name: "Go to Dashboard",
                  route: "/admin",
                }}
              />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
