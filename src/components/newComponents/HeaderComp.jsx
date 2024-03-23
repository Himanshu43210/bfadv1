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
import HeaderSearchBar from "../customComponents/HeaderSearchBar";

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

  return (
    <div className={`component_wrapper ${"homeHeader"}`}>
      <div className={`component_wrapper ${"menu_comp"}`}>
        <MenuState
          isMobile={isMobile}
          component={{
            items: MENU_ITEMS,
            className: "menu_comp",
            text: "BuilderFloor.com",
            isMobiletext: "BuilderFloor",
            image: "/BUILDER.png",
          }}
        />
      </div>
      <div className={`component_wrapper ${"page_header_comp"}`}>
        {/* <Header
          isMobile={isMobile}
          component={{
            url: "/",
            image: "/BUILDER.png",
            title: "BuilderFloor.com",
            titleMobile: "BuilderFloor",
            className: "page_header_comp",
          }}
        /> */}
      </div>
      <div
        className={`component_wrapper ${"ol_comp_wrapper"} flex gap-2 items-center`}
      >
        {/* <div className="max-md:hidden">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={location}
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                width: "250px",
              }}
            >
              {locationOptions?.map((location) => (
                <MenuItem value={location.value}>{location.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}
        <Button
          className={`ol_open_btn signin_btn`}
          onClick={handlePostListing}
          sx={{
            height: "40px",
          }}
        >
          Post Listing
        </Button>
        <OtpLogin />
      </div>
    </div>
  );
};

export default HeaderComp;
