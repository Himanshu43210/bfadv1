import React, { useState } from 'react';
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import { GET, GET_CUSTOMER_CONTACTED, LOADING } from '../utils/Const.js';
import { useSelector } from 'react-redux';
import { selectApiData, selectApiStatus } from "../../redux/utils/selectors.js";
import { CircularProgress } from "@mui/material";
import { Card } from "react-bootstrap";
import ListingTable from '../utils/ListingTable.js';
import { API_ENDPOINTS } from '../../redux/utils/api.js';
import RouteButton from "../customComponents/RouteButton.jsx";

const CustomerEngagement = () => {
    const [tableState, setTableState] = useState(0);
    const desktopHeaders = {
        "Name": "userId.fullName",
        "Phone Number": "userId.phoneNumber",
        "Plot No.": "propertyId.plotNumber",
        "Location": "propertyId.sectorNumber",
        "Title": "propertyId.title",
        "Price(₹)": "propertyId.price"
    };
    const backBtnComp = {
        className: "toogle-filter",
        label: "Back",
        name: "Back",
        route: "/admin",
    };
    let tableData = useSelector((state) => selectApiData(state, GET_CUSTOMER_CONTACTED));
    console.log('============== TABLE DATA : CUSTOMER MANAGEMENT ==============', tableData);
    const userProfile = useSelector((state) => state.profile);
    const dataApi = `${API_ENDPOINTS[GET_CUSTOMER_CONTACTED]}?cpId=${userProfile._id}&page=0&limit=10`;
    const apiStatus = useSelector((state) =>
        selectApiStatus(state, GET_CUSTOMER_CONTACTED || "")
    );
    console.log('++++++++++++++ api status ++++++++++++++++', apiStatus);

    return (
        <>
            {!tableData && <AutoFetchApi component={{ api: dataApi, method: GET }} />}
            {apiStatus === LOADING ? (
                <CircularProgress className="loader-class" />
            ) : (
                <div className="sub_page user_management_page">
                    <Card>
                        <Card.Header className="card_header font">Customer Details</Card.Header>
                        <Card.Body className="card_body">
                            <ListingTable
                                headersDesktop={desktopHeaders}
                                headersMobile={desktopHeaders}
                                getDataApi={GET_CUSTOMER_CONTACTED}
                                filterDataUrl={{ dataApi }}
                                itemCount={tableData?.itemCount}
                                refreshDataApi={{ dataApi }}
                                showRecommendationActions={true}
                                hideAlterActions={true}
                            />
                            {/* back button */}
                        </Card.Body>
                        <RouteButton component={backBtnComp} />
                    </Card>
                </div>
            )}
        </>
    );
}

export default CustomerEngagement;