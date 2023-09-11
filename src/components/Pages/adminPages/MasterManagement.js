import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListingTable from "../../utils/ListingTable";
import { newMasterConst } from "../../fieldConsts/MasterFieldConst";
import TableButtonHeader from "../../utils/TableButtonHeader";
import Navbar from "../../utils/Navbar";
import {
  ALTER_MASTER_DATA,
  DELETE_MASTER_DATA,
  GET,
  GET_MASTER_DATA,
} from "../../utils/Const";
import AutoFetchApi from "../../customComponents/AutoFetchApi";
import { API_ENDPOINTS } from "../../../redux/utils/api";
import { selectApiData } from "../../../redux/utils/selectors";

export default function MasterManagement() {
  let tableData = [];
  const desktopHeaders = {
    Field: "fieldName",
    Value: "fieldValue",
    "Parent Id": "parentId",
  };
  const mobileHeaders = {
    Field: "field",
    Value: "value",
    "Parent Id": "parentId",
  };
  const fieldConst = newMasterConst;
  const dataToRender = useSelector((state) =>
    selectApiData(state, GET_MASTER_DATA)
  );

  dataToRender?.data?.map((element) => {
    element.fieldValue?.map((value) => {
      console.log(element, value);
      tableData.push({
        masterId: element.id,
        field: element.fieldName,
        value: value,
      });
    });
  });
  console.log(tableData);
  return (
    <>
      {!dataToRender && (
        <AutoFetchApi url={API_ENDPOINTS[GET_MASTER_DATA]} method={GET} />
      )}
      <div>
        <div>
          <Navbar />
          <Card>
            <Card.Header className="font">Master Details</Card.Header>
            <Card.Body>
              <TableButtonHeader
                fieldConst={fieldConst}
                tableData={tableData}
                saveDataApi={ALTER_MASTER_DATA}
                refreshDataApi={GET_MASTER_DATA}
                addHeader="Add Masters"
              />
              <ListingTable
                data={tableData}
                headersDesktop={desktopHeaders}
                headersMobile={mobileHeaders}
                fieldConst={fieldConst}
                editApi={ALTER_MASTER_DATA}
                deleteApi={DELETE_MASTER_DATA}
                getDataApi={GET_MASTER_DATA}
                itemCount={dataToRender?.itemCount}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
