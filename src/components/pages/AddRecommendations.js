import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import {
  ADD_RECOMMENDATION,
  GET_ADMIN_PROPERTY_DATA,
  LOADING,
  POST,
  PROFILE,
} from "../utils/Const.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors.js";
import { CircularProgress } from "@mui/material";
import { Card } from "react-bootstrap";
import ListingTable from "../utils/ListingTable.js";
import RouteButton from "../customComponents/RouteButton.jsx";
import { useRouter } from "next/router.js";

const AddRecommendations = () => {
  const desktopHeaders = {
    Location: "sectorNumber",
    "Plot No.": "plotNumber",
    Size: "size",
    Floor: "floor",
    Title: "title",
    Price: "price",
    Accommodation: "accommodation",
    Facing: "facing",
    "Park Facing": "parkFacing",
    Corner: "corner",
    Possession: "possession",
    "Builder Name": "builderName",
    "Builder Contact Name": "builderContact",
    City: "city",
    State: "state",
    "Dated of Posting": "updatedAt",
  };
  const backBtnComp = {
    className: "toogle-filter",
    label: "Back",
    name: "Back",
    route: -1,
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const { uid } = router.query;
  const userProfile = useSelector((state) => state[PROFILE]);

  let tableData = useSelector((state) =>
    selectApiData(state, GET_ADMIN_PROPERTY_DATA)
  );
  const apiStatus = useSelector((state) =>
    selectApiStatus(state, GET_ADMIN_PROPERTY_DATA || "")
  );
  const dataApi = ``;

  useEffect(() => {
    try {
      const options = {
        url: API_ENDPOINTS[GET_ADMIN_PROPERTY_DATA],
        method: POST,
        params: { id: userProfile._id, role: userProfile.role },
      };
      dispatch(callApi(options)).then((res) => {
        console.log("++++++++++ FETCH all cp properties RES +++++++++", res);
      });
    } catch (error) {
      console.log("-------- ERROR : addRecommendation ------------", error);
    }
  }, []);

  return (
    <>
      {apiStatus === LOADING ? (
        <CircularProgress className="loader-class" />
      ) : (
        <div className="sub_page user_management_page">
          <Card>
            <Card.Header className="card_header font">
              Add Recommendation
            </Card.Header>
            <Card.Body className="card_body">
              <ListingTable
                headersDesktop={desktopHeaders}
                headersMobile={desktopHeaders}
                getDataApi={GET_ADMIN_PROPERTY_DATA}
                filterDataUrl={{ dataApi }}
                itemCount={tableData?.itemCount}
                refreshDataApi={{ dataApi }}
                hideAlterActions={true}
                addActionApi={API_ENDPOINTS[ADD_RECOMMENDATION]}
                userId={uid}
                isproperty={true}
              />
              <RouteButton component={backBtnComp} />
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default AddRecommendations;
