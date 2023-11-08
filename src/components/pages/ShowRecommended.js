import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import { API_ENDPOINTS } from '../../redux/utils/api.js';
import { GET, GET_RECOMMENDED, LOADING } from '../utils/Const.js';
import { callApi } from '../../redux/utils/apiActions.js';
import AutoFetchApi from "../customComponents/AutoFetchApi.jsx";
import { selectApiData, selectApiStatus } from '../../redux/utils/selectors.js';
import { Card } from "react-bootstrap";
import ListingTable from '../utils/ListingTable.js';

const ShowRecommended = () => {
    const desktopHeaders = {
        "Location": "propertyId.sectorNumber",
        "Plot": "propertyId.plotNumber",
        "Size": "propertyId.size",
        "Floor": "propertyId.floor",
        "Price(₹)": "propertyId.price",
        "Accommodation": "propertyId.accommodation",
        "Facing": "propertyId.facing",
        "Park Facing": "propertyId.parkFacing",
        "Corner": "propertyId.corner"
    };
    const dispatch = useDispatch();
    const [queryParams, setQueryParams] = useSearchParams();

    let tableData = useSelector((state) => selectApiData(state, GET_RECOMMENDED));
    const apiStatus = useSelector((state) => selectApiStatus(state, GET_RECOMMENDED || ""));
    const dataApi = ``;

    useEffect(() => {
        try {
            const uid = queryParams.get("uid");
            console.log('------------- cid -----------', uid);
            // get 
            const options = {
                url: API_ENDPOINTS[GET_RECOMMENDED],
                method: GET,
                headers: { "Content-Type": "application/json" },
                params: {
                    userId: uid,
                    page: 0,
                    limit: 100
                }
            };
            dispatch(callApi(options))
                .then((res) => {
                    console.log('++++++++++ FETCH RECOMMENDED RES +++++++++', res);
                }).catch((error) => {
                    console.log('========== FETCH RECOMMENDED ERROR =========', error);
                });
        } catch (error) {
            console.log('-------- ERROR : addRecommendation ------------', error);
        }
    }, []);

    return (
        <>
            {apiStatus === LOADING ? (
                <CircularProgress className="loader-class" />
            ) : (
                <div className="sub_page user_management_page">
                    <Card>
                        <Card.Header className="card_header font">All Recommendations</Card.Header>
                        <Card.Body className="card_body">
                            <ListingTable
                                headersDesktop={desktopHeaders}
                                headersMobile={desktopHeaders}
                                getDataApi={GET_RECOMMENDED}
                                filterDataUrl={{ dataApi }}
                                itemCount={tableData?.itemCount}
                                refreshDataApi={{ dataApi }}
                                hideAlterActions={true}
                                // removeActionApi={{}}
                            />
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    );
}

export default ShowRecommended;