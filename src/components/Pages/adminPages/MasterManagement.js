import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ListingTable from "../../utils/ListingTable";
import { newMasterConst } from "../../fieldConsts/MasterFieldConst";
import TableButtonHeader from "../../utils/TableButtonHeader";
import Navbar from "../../utils/Navbar";
import {
  ADMIN_DASHBOARD_LOGIN,
  ALTER_MASTER_DATA,
  DELETE_MASTER_DATA,
  GET,
  GET_MASTER_DATA,
  POST,
  SUCCESS,
} from "../../utils/Const";
import AutoFetchApi from "../../customComponents/AutoFetchApi";
import { API_ENDPOINTS } from "../../../redux/utils/api";
import { selectApiData, selectApiStatus } from "../../../redux/utils/selectors";
import { useNavigate } from "react-router-dom";
import { callApi } from "../../../redux/utils/apiActions";
import { storeUserData } from "../../../redux/slice/userSlice";

function MasterManagement() {
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
      tableData.push({
        masterId: element.id,
        field: element.fieldName,
        value: value,
      });
    });
  });
  return (
    <>
      {!dataToRender && (
        <AutoFetchApi url={API_ENDPOINTS[GET_MASTER_DATA]} method={GET} />
      )}
      <div>
        <div>
          {/* <Navbar /> */}
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

export default function MasterManagementParent() {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) =>
    selectApiStatus(state, ADMIN_DASHBOARD_LOGIN)
  );
  const userProfile = useSelector((state) => state.profile);
  const userProfile1 = useSelector((state) =>
    selectApiData(state, ADMIN_DASHBOARD_LOGIN)
  );
  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (!loginStatus) {
      const email = localStorage.getItem("email");
      const password = localStorage.getItem("password");
      if (email && password) {
        try {
          const options = {
            url: API_ENDPOINTS[ADMIN_DASHBOARD_LOGIN],
            method: POST,
            headers: { "Content-Type": "application/json" },
            data: {
              email: email,
              password: password,
            },
          };
          dispatch(callApi(options));
        } catch (error) {}
      } else {
        navigate("/login");
      }
    } else {
    }
  }, [loginStatus]);

  useEffect(() => {
    if (loginStatus === SUCCESS) {
      dispatch(storeUserData(userProfile1?.profile));
    }
    if (userProfile._id) {
      setCheck(true);
    }
  }, [loginStatus, userProfile]);
  return <>{check && <MasterManagement />}</>;
}
