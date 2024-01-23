import React, { useEffect } from "react";
import { USER_ROLE } from "../../ScreenJson.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { GET, GET_PROPERTY_LIST_BY_USER_ID } from "../utils/Const.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import LoginRefresh from "../customComponents/LoginRefresh.jsx";
import PanelHeader from "../customComponents/PanelHeader.jsx";
import Heading from "../customComponents/Heading.jsx";
import CustomRouteButton from "../customComponents/RouteButton.jsx";
import DashboardListing from "../customComponents/DashboardListing.jsx";

export default function ViewListing() {
  // let pathname = '';
  const router = useRouter();
  const { id } = router.query;
  // const id = pathname.split("id=").pop();
  const dispatch2 = useDispatch();
  // useEffect(() => {
  //   if (window !== "undefined") {
  //     pathname = window.location.href;
  //   }
  // }), [];
  useEffect(() => {
    try {
      const options = {
        url: API_ENDPOINTS[GET_PROPERTY_LIST_BY_USER_ID] + "?userId=" + id,
        method: GET,
        headers: { "Content-Type": "application/json" },
      };
      dispatch2(callApi(options));
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  return (
    <>
      <div className="standalone_page ">
        <LoginRefresh>
          <div className={`component_wrapper ${''}`}>
            <div className={`component_wrapper ${''}`}>
              <PanelHeader component={{
                mainHeading: "WELCOME TO BUILDERFLOOR.COM",
                panelTitles: {
                  [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                  [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                  [USER_ROLE.salesUser]: "SUB USER PANEL",
                },
                classes: "formheadingcontainer",
                mainHeaderClass: "formheadingcontainer",
                panelTitleClass: "formheadingcontainer",
              }} />
            </div>
          </div>
          <div className={`component_wrapper ${'formheadingcontainer'}`}>
            <Heading component={{
              name: "allListing",
              text: "All Listing",
              className: "formheadingcontainer",
            }} />
          </div>
          <div className={`component_wrapper ${''}`}>
            <div className={`component_wrapper ${''}`}>
              <DashboardListing component={{
                desktopHeaders: {
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
                  // "Created By": "parentId.name",
                  // "Mobile Number": "parentId.phoneNumber",
                  // "Company Name": "parentId.companyName",
                  City: "city",
                  State: "state",
                  "Dated of Posting": "updatedAt",
                  // Status: "status",
                  // "Link Share": "",
                },
                mobileHeaders: {
                  Title: "title",
                  Price: "price",
                  Accommodation: "accommodation",
                },
                user: true,
                getDataApi: GET_PROPERTY_LIST_BY_USER_ID,
                endpoint: API_ENDPOINTS[GET_PROPERTY_LIST_BY_USER_ID],
                dataPoint: GET_PROPERTY_LIST_BY_USER_ID,
                useParamsFromUrl: { userId: "id" },
                hideAlterActions: true,
                disableRowModal: true,
                showPreviewButton: true,
                showEditAction: false,
                showDeleteAction: false
              }} />
              <div className={`component_wrapper ${'toogle-filter'}`}>
                <CustomRouteButton component={{
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin/statistics",
                }} />
              </div>
            </div>
          </div>
        </LoginRefresh>
      </div>
    </>
  );
}
