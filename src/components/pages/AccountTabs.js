import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import ComponentSelector from '../customComponents/ComponentSelector.jsx';
import Tabbar from '../customComponents/Tabbar.jsx';
import { API_ENDPOINTS } from '../../redux/utils/api.js';
import { useDispatch, useSelector } from 'react-redux';
import { callApi } from '../../redux/utils/apiActions.js';
import { CHATBOT, CONTAINER, DYNAMIC_CARD_CONTAINER, GET, GET_CARD_DATA, GET_SEARCH_RESULT, HEADER_COMP, HEADING, PAGE_FOOTER, POST, SCROLL_TO_TOP, SEARCH_CARD, TABS } from '../utils/Const.js';
import SearchCard from '../customComponents/SearchCard.jsx';
import BasicPagination from "../customComponents/Pagination.jsx";
import { CircularProgress } from '@mui/material';
import { usePathname } from 'next/navigation.js';
import { useRouter } from 'next/router.js';
import Footer from '../customComponents/Footer.jsx';
import ScrollToTop from '../customComponents/ScrollToTop.jsx';
import Chatbot from '../customComponents/Chatbot.jsx';
import HeaderComp from '../newComponents/HeaderComp.jsx';

// export const ACCOUNT_TABS_SCREEN = {
//     name: "Account Tabs",
//     pageClass: "account-tabs-screen",
//     children: [
//         {
//             type: CONTAINER,
//             className: 'coming_soon_container',
//             children: [
//                 {
//                     type: HEADING,
//                     tag: 'h3',
//                     text: 'Coming Soon...',
//                     className: 'coming_soon'
//                 }
//             ]
//         },
//         {
//             type: DYNAMIC_CARD_CONTAINER,
//             loadingApi: GET_SEARCH_RESULT,
//             sliceName: "filter",
//             className: "result-searchdiv tab_data",
//             apiName: GET_SEARCH_RESULT,
//             onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
//             onClickApiMethod: POST,
//             paginationClass: "search_pagination",
//             renderComponentsInLoop: {
//                 type: SEARCH_CARD,
//                 className: "homeCards",
//             },
//             cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
//             cardClickNavigate: "/builderFloorDetails",
//             cardClickApiType: GET,
//             showOptions: true,
//         },
//     ]
// };

function AccountTabs() {
    const location = usePathname();
    const navigate = useRouter();
    const { tab } = navigate.query;
    const revMappings = {
        viewed: 0,
        contacted: 1,
        recommendations: 2,
    };
    const [currTab, setCurrTab] = useState(revMappings[tab]);
    const [loading, setLoading] = useState(false);
    const component = {};
    const [tabData, setTabData] = useState([]);
    const [tabMetaData, setTabMetaData] = useState({
        currPage: 0,
        totalPages: 0,
        totalItems: 0
    });
    const dispatch = useDispatch();
    const customerProfile = useSelector((state) => state.customer);

    const fetchData = (page = 0) => {
        if (customerProfile && customerProfile._id) {
            setLoading(true);
            // fetch the data for the
            let urlToFetch = '';
            switch (tab) {
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
                    setTabData(res?.payload?.data);
                    setTabMetaData({
                        currPage: res.payload?.pageNumber,
                        totalPages: res.payload?.totalPages,
                        totalItems: res.payload?.totalItems
                    });
                }).catch((error) => {
                }).finally(() => {
                    setLoading(false);
                });
        } else {
            navigate.push("/");
        }
    };

    const handlePageChange = (page) => {
        window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
        fetchData(page);
    };

    const handleOptionChange = (propertyId, value) => {
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
                // setTabData(res?.payload?.data);
                // setTabMetaData({
                //     currPage: res.payload?.pageNumber,
                //     totalPages: res.payload?.totalPages,
                //     totalItems: res.payload?.totalItems
                // });
            }).catch((error) => {
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
        resetData();
        fetchData();
        const ct = revMappings[tab];
        setCurrTab(ct);
    }, [location, tab, customerProfile]);

    return (
        <Card className="account-tabs-screen">
            <div className={`component_wrapper ${component?.className}`} key={component?.name}>
                <HeaderComp />
                <div className='comp_tabs_wrapper'>
                    <div className={`component_wrapper ${'tabs_wrapper'}`}>
                        <Tabbar component={{
                            tabs: [
                                // { label: "Recent Searches", key: "recentSearches" },
                                { label: "Viewed", key: "viewed" },
                                { label: "Contacted", key: "contacted" },
                                { label: "Recommendations", key: "recommendations" },
                            ],
                            className: "tabs_wrapper"
                        }} currTab={currTab} doNavigate={true} urlTemp='/account/tabs?tab={TAB}' />
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
                                        showOptions={tab === "recommendations" ? true : false}
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
                <div className={`component_wrapper`}>
                    <Footer />
                </div>
                <div className={`component_wrapper`}>
                    <ScrollToTop />
                </div>
                <div className={`component_wrapper`}>
                    <Chatbot />
                </div>
                {loading === true && (<CircularProgress className="loader-class" />)}
            </div>
        </Card>
    );
}

export default AccountTabs;