import React, { useEffect, useState } from "react";
import MenuState from "../customComponents/MenuState";
import Header from "../customComponents/Header";
import OtpLogin from "../customComponents/OtpLogin";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { USER_ROLE } from "@/ScreenJson";
import RenderComponent from "../customComponents/ComponentRenderer";
import {
  CONTAINER,
  GET_MASTER_DATA_ON_HOME,
  GET_SEARCH_RESULT,
  POST,
  SELECT2,
  SELECT3,
} from "../utils/Const";
import { API_ENDPOINTS } from "@/redux/utils/api";
import { Search } from "lucide-react";

const MENU_ITEMS = [
  {
    name: "Home",
    path: "/",
    icon: "HOME",
  },
  {
    name: "Dashboard",
    path: "/admin",
    icon: "DASHBOARD",
  },
  {
    name: "Maps",
    path: "/maps",
    icon: "DOC",
  },
  {
    name: "Documents",
    path: "/documents",
    icon: "DOC",
  },
  {
    name: "About Us",
    path: "/about_us",
    icon: "ORG",
  },
  {
    name: "Contact Us",
    path: "/about_us#contact_us",
    icon: "CONTACT",
  },
  {
    name: "Our Blog",
    path: "/blog",
    icon: "DOC",
  },
];

export const FILTER = {
  name: "Search Result",
  pageClass: "search-result-screen",
  className: "klk",
  children: [
    {
      type: CONTAINER,
      className: "filter-button-div-overflowed",
      children: [
        {
          type: SELECT2,
          sliceName: "filter",
          name: "location",
          label: "Location",
          className: "filterChannel",
          fetchOptionsApi: API_ENDPOINTS[GET_MASTER_DATA_ON_HOME],
          optionKey: "sectorNumber",
          onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
          onClickApiMethod: POST,
          options: [
            { label: "DLF Phase 1", value: "DLF PHASE 1" },
            { label: "DLF Phase 2", value: "DLF PHASE 2" },
            { label: "DLF Phase 3", value: "DLF PHASE 3" },
            { label: "DLF Phase 4", value: "DLF PHASE 4" },
            { label: "DLF Phase 5", value: "DLF PHASE 5" },
            { label: "Sector 4", value: "SECTOR 4" },
            { label: "Sector 5", value: "SECTOR 5" },
            { label: "Sector 17", value: "SECTOR 17" },
            { label: "Sector 27", value: "SECTOR 27" },
            { label: "Sector 28", value: "SECTOR 28" },
            { label: "Sector 38", value: "SECTOR 38" },
            { label: "Sector 40", value: "SECTOR 40" },
            { label: "Sector 42", value: "SECTOR 42" },
            { label: "Sector 43", value: "SECTOR 43" },
            { label: "Sector 45", value: "SECTOR 45" },
            { label: "Sector 46", value: "SECTOR 46" },
            { label: "Sector 50", value: "SECTOR 50" },
            { label: "Sector 55", value: "SECTOR 55" },
            { label: "Sector 57", value: "SECTOR 57" },
            { label: "Sector 12A", value: "SECTOR 12A" },
            { label: "Sector Southend", value: "SECTOR 57" },
            { label: "South City 1", value: "SOUTH CITY 1" },
            { label: "Sushant Lok 1", value: "SUSHANT LOK 1" },
            { label: "Sushant Lok 3", value: "SUSHANT LOK 3" },
            { label: "Nirvana Country", value: "NIRVANA COUNTRY" },
            {
              label: "Emaar Emerald Hills",
              value: "EMAAR EMERALD HILLS",
            },
            { label: "New Colony", value: "NEW COLONY" },
            { label: "Ardee City", value: "ARDEE CITY" },
            { label: "Sun City", value: "SUNCITY" },
            { label: "Rosewood City", value: "ROSEWOOD CITY" },
            { label: "Malibu Town", value: "MALIBU TOWN" },
            { label: "Vatika India Next", value: "VATIKA INDIA NEXT" },
            { label: "Uppal Southend", value: "UPPAL SOUTHEND" },
            { label: "BPTP Amstoria", value: "BPTP AMSTORIA " },
            { label: "Anant Raj", value: "ANANT RAJ" },
          ],
          navigate: "/searchResult",
          zIndex: 94,
        },
      ],
    },
  ],
};

const HeaderComp = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useRouter();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setIsMobile(window.innerWidth <= 768);
    }
    if (typeof localStorage !== "undefined") {
      setUserRole(localStorage.getItem("role"));
    }
  }, []);

  const handlePostListing = () => {
    if (
      userRole == USER_ROLE.channelPartner ||
      userRole == USER_ROLE.salesUser
    ) {
      navigate.push("/admin/form?type=postListing");
    } else {
      navigate.push("/login?redirect=/admin/form?type=postListing");
    }
  };

  const locationOptions = [
    { label: "DLF Phase 1", value: "DLF PHASE 1" },
    { label: "DLF Phase 2", value: "DLF PHASE 2" },
    { label: "DLF Phase 3", value: "DLF PHASE 3" },
    { label: "DLF Phase 4", value: "DLF PHASE 4" },
    { label: "DLF Phase 5", value: "DLF PHASE 5" },
    { label: "Sector 4", value: "SECTOR 4" },
    { label: "Sector 5", value: "SECTOR 5" },
    { label: "Sector 17", value: "SECTOR 17" },
    { label: "Sector 27", value: "SECTOR 27" },
    { label: "Sector 28", value: "SECTOR 28" },
    { label: "Sector 38", value: "SECTOR 38" },
    { label: "Sector 40", value: "SECTOR 40" },
    { label: "Sector 42", value: "SECTOR 42" },
    { label: "Sector 43", value: "SECTOR 43" },
    { label: "Sector 45", value: "SECTOR 45" },
    { label: "Sector 46", value: "SECTOR 46" },
    { label: "Sector 50", value: "SECTOR 50" },
    { label: "Sector 55", value: "SECTOR 55" },
    { label: "Sector 57", value: "SECTOR 57" },
    { label: "Sector 12A", value: "SECTOR 12A" },
    { label: "Sector Southend", value: "SECTOR 57" },
    { label: "South City 1", value: "SOUTH CITY 1" },
    { label: "Sushant Lok 1", value: "SUSHANT LOK 1" },
    { label: "Sushant Lok 3", value: "SUSHANT LOK 3" },
    { label: "Nirvana Country", value: "NIRVANA COUNTRY" },
    {
      label: "Emaar Emerald Hills",
      value: "EMAAR EMERALD HILLS",
    },
    { label: "New Colony", value: "NEW COLONY" },
    { label: "Ardee City", value: "ARDEE CITY" },
    { label: "Sun City", value: "SUNCITY" },
    { label: "Rosewood City", value: "ROSEWOOD CITY" },
    { label: "Malibu Town", value: "MALIBU TOWN" },
    { label: "Vatika India Next", value: "VATIKA INDIA NEXT" },
    { label: "Uppal Southend", value: "UPPAL SOUTHEND" },
    { label: "BPTP Amstoria", value: "BPTP AMSTORIA " },
    { label: "Anant Raj", value: "ANANT RAJ" },
  ];

  const [location, setLocation] = useState("");

  const searchLocation = () => {
    navigate.push(`/searchResult?query=${location}`);
  };

  useEffect(() => {
    if (!location) return;
    else {
      searchLocation();
    }
  }, [location]);

  const [prompt, setPrompt] = useState("");
  const handleSearch = () => {
    if (!prompt) return;
    navigate.push(`/search?query=${prompt}`);
    setPrompt("");
  };

  return (
    <div className={`component_wrapper ${"homeHeader"}`}>
      <div className={`component_wrapper ${"menu_comp"}`}>
        <MenuState
          isMobile={isMobile}
          component={{
            items: MENU_ITEMS,
            className: "menu_comp",
            title: "BuilderFloor",
          }}
        />
      </div>
      {/* <div className={`component_wrapper ${"page_header_comp"}`}>
        <Header
          isMobile={isMobile}
          component={{
            url: "/",
            image: "/BUILDER.png",
            title: "BuilderFloor.com",
            titleMobile: "BuilderFloor",
            className: "page_header_comp",
          }}
        />
      </div> */}
      <div className={`component_wrapper ${"ol_comp_wrapper"} flex gap-2`}>
        <div className="flex items-center">
          <div className="max-md:hidden mr-10">
            <div className="flex-none gap-2">
              <div className="hidden md:flex lg:flex flex-row items-center bg-white pr-3  border border-[#006D77] ">
                <input
                  value={prompt}
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setPrompt(e.target.value)}
                  className="px-3 py-1 outline-none w-24 md:w-auto"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && prompt) {
                      handleSearch();
                    }
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700 cursor-pointer"
                  onClick={handleSearch}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>
            {/* <RenderComponent jsonToRender={FILTER} /> */}
          </div>
          <div className="flex gap-2 h-[40px]">
            <Button className={`ol_open_btn`} onClick={handlePostListing}>
              Post Listing
            </Button>
            <OtpLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComp;
