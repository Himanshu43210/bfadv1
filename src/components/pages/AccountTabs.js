import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import { ACCOUNT_TABS_SCREEN } from '../../ScreenJson.js';
import { useLocation, useSearchParams } from 'react-router-dom';
import ComponentSelector from '../customComponents/ComponentSelector.jsx';
import Tabbar from '../customComponents/Tabbar.jsx';
import { API_ENDPOINTS } from '../../redux/utils/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { callApi } from '../../redux/utils/apiActions.js';
import { GET, POST } from '../utils/Const.js';
import SearchCard from '../customComponents/SearchCard.jsx';
import BasicPagination from "../customComponents/Pagination.jsx";
import { CircularProgress } from '@mui/material/index.js';

function AccountTabs() {
    const location = useLocation();
    const [queryParams, setQueryParams] = useSearchParams();
    const revMappings = {
        viewed: 0,
        contacted: 1,
        recommendations: 2,
    };
    const [currTab, setCurrTab] = useState(revMappings[queryParams.get("tab")]);
    const [loading, setLoading] = useState(false);
    const component = ACCOUNT_TABS_SCREEN;
    const [tabData, setTabData] = useState([]);
    const [tabMetaData, setTabMetaData] = useState({
        currPage: 0,
        totalPages: 0,
        totalItems: 0
    });
    const dispatch = useDispatch();
    const customerProfile = useSelector((state) => state.customer);
    console.log('>>>>>>>>>>>>>>> CUSTOMER PROFILE <<<<<<<<<<<<<<<<', customerProfile);

    const fetchData = (page = 0) => {
        if (customerProfile._id) {
            setLoading(true);
            // fetch the data for the
            let urlToFetch = '';
            switch (queryParams.get("tab")) {
                case 'viewed':
                    urlToFetch = API_ENDPOINTS["getPropertyViewed"];
                    break;
                case 'contacted':
                    urlToFetch = API_ENDPOINTS["getPropertyContacted"];
                    break;
                case 'recommendations':
                    urlToFetch = API_ENDPOINTS["getPropertyRecommended"];
                    break;
                default:
                    break;
            }
            const options = {
                url: urlToFetch,
                method: GET,
                headers: { "Content-Type": "application/json" },
                params: {
                    userId: customerProfile?._id,
                    page: page,
                    limit: 10
                }
            };
            dispatch(callApi(options))
                .then((res) => {
                    console.log('********** tab data api res **********', tabData, res);
                    setTabData(res?.payload?.data);
                    setTabMetaData({
                        currPage: res.payload?.pageNumber,
                        totalPages: res.payload?.totalPages,
                        totalItems: res.payload?.totalItems
                    });
                }).catch((error) => {
                    console.log('------------- ERROR: tab data fetch ------------', error);
                }).finally(() => {
                    setLoading(false);
                });
        }
    };

    const handlePageChange = (page) => {
        window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
        fetchData(page);
    };

    const handleOptionChange = (propertyId, value) => {
        console.log('+++++++++++++ RECOMMENDATION FEEDBACK ++++++++++++', propertyId, value);
        const options = {
            url: API_ENDPOINTS["addPropertyRecommended"],
            method: POST,
            headers: { "Content-Type": "application/json" },
            data: {
                userId: customerProfile?._id,
                propertyId: propertyId,
                options: [value]
            }
        };
        dispatch(callApi(options))
            .then((res) => {
                console.log('********** recommendation feedback res **********', tabData, res);
                // setTabData(res?.payload?.data);
                // setTabMetaData({
                //     currPage: res.payload?.pageNumber,
                //     totalPages: res.payload?.totalPages,
                //     totalItems: res.payload?.totalItems
                // });
            }).catch((error) => {
                console.log('---------- recommendation feedback error --------', error);
            }).finally(() => {
                setLoading(false);
            });
    };

    const resetData = () => {
        setTabData([]);
        setTabMetaData({
            currPage: 0,
            totalPages: 0,
            totalItems: 0
        });
    };

    useEffect(() => {
        console.log('+++++++++++ HANDLE PAGE CHANGE ++++++++++++');
        resetData();
        fetchData();
        const ct = revMappings[queryParams.get("tab")];
        console.log('------------- HANDLE PAGE CHANGE CT ------------', queryParams.get("tab"), ct);
        setCurrTab(ct);
    }, [location, customerProfile]);

    return (
        <Card className="account-tabs-screen">
            <div className={`component_wrapper ${component?.className}`} key={component.name} id={component.id}>
                <div className={`component_wrapper ${component?.children[0]?.className}`}>
                    <ComponentSelector component={component.children[0]} />
                </div>
                <div className='comp_tabs_wrapper'>
                    <div className={`component_wrapper ${component?.children[1]?.className}`}>
                        <Tabbar component={component.children[1]} currTab={currTab} doNavigate={true} urlTemp='/account/tabs?tab={TAB}' />
                    </div>
                </div>
                <div className={`component_wrapper result-searchdiv tab_data`}>
                    <div className='searchdiv'>
                        {tabData?.map((tabItem) => {
                            if (tabItem && tabItem.propertyId && Object.keys(tabItem.propertyId).length !== 0) {
                                return (
                                    <SearchCard
                                        key={tabItem?.propertyId?._id}
                                        element={tabItem?.propertyId}
                                        classes="homeCards"
                                        showOptions={queryParams.get("tab") === "recommendations" ? true : false}
                                        handleValueChange={handleOptionChange}
                                        optVal={tabItem?.options?.[0]}
                                    />
                                )
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    {(tabMetaData?.totalPages > 1 && loading === false) && (
                        <BasicPagination
                            paginationClass="search_pagination"
                            handlePageChange={(e, newPage) => {
                                handlePageChange(newPage - 1);
                            }}
                            currentPage={tabMetaData?.currPage + 1}
                            totalPages={tabMetaData?.totalPages}
                        />
                    )}
                </div>
                <div className={`component_wrapper ${component?.children[4]?.className}`}>
                    <ComponentSelector component={component.children[4]} />
                </div>
                <div className={`component_wrapper ${component?.children[5]?.className}`}>
                    <ComponentSelector component={component.children[5]} />
                </div>
                <div className={`component_wrapper ${component?.children[6]?.className}`}>
                    <ComponentSelector component={component.children[6]} />
                </div>
                {loading === true && (<CircularProgress className="loader-class" />)}
            </div>
        </Card>
    );
}

export default AccountTabs;