import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListingTable from "../utils/ListingTable.js";
// import Navbar from "../../utils/Navbar";
import TableButtonHeader from "../utils/TableButtonHeader.js";
import { newPropertyConst } from "../fieldConsts/PropertiesFieldConst.js";
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors.js";
import _ from "lodash";
import {
  ALTER_PROPERTY_DATA,
  APPROVE_PROPERTY_DATA,
  DELETE_PROPERTY_DATA,
  GET,
  GET_ADMIN_PROPERTY_DATA,
  GET_PROPERTY_DATA,
  LOADING,
  POST,
} from "../utils/Const.js";
import { CircularProgress } from "@mui/material";

export default function PropertyManagement() {
  const desktopHeaders = {
    "Plot Number": "plotNumber",
    Location: "sectorNumber",
    Title: "title",
    Accommodation: "accommodation",
    Possession: "possession",
    Facing: "facing",
    "Updated At": "updatedAt",
  };

  const apiStatus = useSelector((state) =>
    selectApiStatus(state, ALTER_PROPERTY_DATA || "")
  );

  const mobileHeaders = {
    Title: "title",
    Accommodation: "accommodation",
  };

  const fieldConst = newPropertyConst;
  const tableData = useSelector((state) =>
    selectApiData(state, GET_PROPERTY_DATA)
  );
  const userProfile = useSelector((state) => state.profile);
  const dataApi =
    API_ENDPOINTS[GET_ADMIN_PROPERTY_DATA] +
    "?id=" +
    userProfile._id +
    "&role=" +
    userProfile.role;

  return (
    <>
      {!tableData && (
        <AutoFetchApi
          component={{
            api: dataApi, method: POST,
            data: { sortColumn: "updatedAt", sortType: "desc" }
          }}
        />
      )}
      {apiStatus === LOADING ? (
        <CircularProgress className="loader-class" />
      ) : (
        <div className="sub_page property_management">
          <Card>
            <Card.Header className="card_header font">Property Details</Card.Header>
            <Card.Body className="card_body">
              <TableButtonHeader
                fieldConst={fieldConst}
                tableData={_.cloneDeep(tableData?.data || [])}
                saveDataApi={ALTER_PROPERTY_DATA}
                refreshDataApi={dataApi}
                refreshMethod={POST}
                addHeader="Add Property"
              />
              <ListingTable
                // data={_.cloneDeep(tableData?.data || [])}
                data={{ filter: { sortColumn: "updatedAt", sortType: "desc" } }}
                headersDesktop={desktopHeaders}
                headersMobile={mobileHeaders}
                fieldConst={fieldConst}
                editApi={ALTER_PROPERTY_DATA}
                deleteApi={DELETE_PROPERTY_DATA}
                getDataApi={GET_ADMIN_PROPERTY_DATA}
                filterDataUrl={dataApi}
                approveApi={APPROVE_PROPERTY_DATA}
                itemCount={tableData?.itemCount}
                isproperty={true}
                onRefreshApiType={POST}
                refreshDataApi={dataApi}
              />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}
