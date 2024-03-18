import React, { useEffect, useState } from "react";
import MenuState from "../customComponents/MenuState";
import Header from "../customComponents/Header";
import OtpLogin from "../customComponents/OtpLogin";
import { Button } from "@mui/material";
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

  return (
    <div className={`component_wrapper ${"homeHeader"}`}>
      <div className={`component_wrapper ${"menu_comp"}`}>
        <MenuState
          component={{
            items: MENU_ITEMS,
            className: "menu_comp",
            text: "Menu",
          }}
        />
      </div>
      <div className={`component_wrapper ${"page_header_comp"}`}>
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
      </div>
      <div className={`component_wrapper ${"ol_comp_wrapper"} flex gap-2`}>
        <HeaderSearchBar />
        <Button
          className={`ol_open_btn signin_btn`}
          onClick={handlePostListing}
        >
          Post Listing
        </Button>
        <OtpLogin />
      </div>
    </div>
  );
};

export default HeaderComp;
