import {
  API_BUTTON,
  API_HEADING,
  AUTO_FETCH_API,
  BUTTON,
  CHATBOT,
  CONTAINER,
  DETAILED_VIEW,
  DYNAMIC_CARD_CONTAINER,
  GET,
  GET_CARD_DATA,
  GET_HOME_SCREEN_DATA,
  GET_SEARCH_RESULT,
  GET_SIMILAR_PROPERTY_DATA,
  HAMBURGER_MENU,
  HEADING,
  HOME_CARD,
  HORIZONTAL_LINE,
  IMAGE_BANNER,
  INSTAGRAM_ICON,
  LINKEDIN_ICON,
  LIST,
  NAVIGATE_BUTTON,
  OTP_LOGIN,
  PAGE_FOOTER,
  PAGE_HEADER,
  POST,
  SCROLL_TO_TOP,
  SEARCH_CARD,
  SELECT,
  SELECT2,
  SELECT_SLIDER,
  SLIDER,
  TABS,
  TOGGLE_BUTTON,
} from "./components/utils/Const";
import { API_ENDPOINTS } from "./redux/utils/api";

const MENU_ITEMS = [
  {
    name: "Home",
    path: "/",
    icon: "HOME",
  },
  {
    name: "Login",
    path: "/login",
    icon: "LOGIN",
  },
  {
    name: "About Us",
    path: "/about_us",
    icon: "ORG",
  },
  {
    name: "Contact Us",
    path: "/about_us#contact",
    icon: "CONTACT",
  },
  {
    name: "Our Blog",
    path: "/blog",
    icon: "DOC",
  }
];

export const USER_ROLE = {
  bfAdmin: "BuilderFloorAdmin",
  channelPartner: "ChannelPartner",
  salesUser: "SalesUser",
};

const FOOTER = {
  type: PAGE_FOOTER,
  className: "default-home-footer-div",
  HomeLinks: {
    icon: "/BUILDER.png",
    url: "/",
  },
  social_media: [
    {
      name: INSTAGRAM_ICON,
      url: "https://www.instagram.com/",
    }, //for instagram
    {
      name: LINKEDIN_ICON,
      url: "https://www.linkedin.com/",
    },
  ],
  copyright: "© Builder Floor Official 2022",
};

const HEADER = {
  type: CONTAINER,
  className: "homeHeader",
  children: [
    {
      type: HAMBURGER_MENU,
      items: MENU_ITEMS,
      className: "menu_comp",
      text: "Menu"
    },
    {
      type: PAGE_HEADER,
      url: "/",
      image: "/BUILDER.png",
      title: "BuilderFloor.com",
      titleMobile: "BuilderFloor",
      className: "page_header_comp",
    },
    // {
    //   type: OTP_LOGIN,
      //   className: "ol_comp_wrapper",
    // }
  ],
};

const SCROLLTOP = {
  type: SCROLL_TO_TOP,
  name: "ScrollToTop",
};

export const HOME_SCREEN = {
  name: "Home Screen",
  children: [
    HEADER,
    {
      type: AUTO_FETCH_API,
      api: API_ENDPOINTS[GET_HOME_SCREEN_DATA],
      className: "header",
      params: { sortType: "desc" }
    },
    {
      type: IMAGE_BANNER,
      name: "homeImageBanner",
      className: "home-page-banner",
      text: "Start Exploring Your Dream ",
      spanText: "Builder Floor now",
      bgImage:
        "https://thumbs.dreamstime.com/b/mumbai-capital-india-mumbai-india-december-mumbai-financial-commercial-entertainment-capital-india-december-112388360.jpg",
    },
    {
      type: CONTAINER,
      className: "homeselect",
      children: [
        {
          type: SELECT,
          className: "select-city-button",
          sliceName: "filter",
          name: "city",
          defaultValue: { label: "Gurgaon", value: "Gurgaon" },
          options: [{ label: "Gurgaon", value: "Gurgaon" }],
        },
        {
          type: SLIDER,
          sliceName: "filter",
          className: "select-range",
          name: "budget",
          minValue: 0,
          maxValue: 200000000,
          step: 1000000,
          defaultValue: [20000000, 50000000],
        },
        {
          type: API_BUTTON,
          sliceName: "filter",
          name: "search",
          buttonLabel: "Search",
          btnClass: "home-search-button",
          apiType: POST,
          navigate: "/searchResult",
          api: API_ENDPOINTS[GET_SEARCH_RESULT],
          searchWithQueryParams: true,
        },
      ],
    },
    {
      type: HEADING,
      name: "homeScreenHeading",
      tag: "h2",
      className: "home-screen-card-section-heading",
      text: "Explore Top Builder Floor to Match Your Choice",
    },
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_HOME_SCREEN_DATA,
      className: "default-home-cards",
      apiName: GET_HOME_SCREEN_DATA,
      loadMore: "Load More",
      defaultPage: 0,
      defaultLimit: 20,
      apiType: GET,
      api: API_ENDPOINTS[GET_HOME_SCREEN_DATA],
      renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
      cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
      cardClickNavigate: "/builderFloorDetails",
      addQueryParam: "{title}-{id}",
      cardClickApiType: GET,
    },
    {
      type: HEADING,
      name: "homeScreenBottom",
      tag: "h2",
      className: "home-screen-card-section-bottom",
      text: "We are your trusted partner in finding your dream builder floor in Gurgaon",
    },
    FOOTER,
    SCROLLTOP,
    // { type: CHATBOT }
  ],
};

export const ACCOUNT_TABS_SCREEN = {
  name: "Account Tabs",
  children: [
    HEADER,
    {
      type: AUTO_FETCH_API,
      className: "header",
      api: API_ENDPOINTS[GET_SIMILAR_PROPERTY_DATA],
    },
    {
      type: TABS,
      tabs: [
        { label: "Recent Searches", key: "recentSearches" },
        { label: "Viewed", key: "viewed" },
        { label: "Contacted", key: "contacted" },
        { label: "Shortlisted", key: "shortlisted" },
        { label: "Recommendations", key: "recommendations" },
      ],
      className: "tabs_wrapper"
    },
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_SIMILAR_PROPERTY_DATA,
      className: "default-home-cards similar_options_list",
      apiName: GET_SIMILAR_PROPERTY_DATA,
      renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
      defaultLimit: 4,
      cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
      cardClickNavigate: "/builderFloorDetails",
      addQueryParam: "{title}-{id}",
      cardClickApiType: GET,
    },
    FOOTER,
    SCROLLTOP,
    // { type: CHATBOT }
  ]
};

export const CARD_DETAILS_SCREEN = {
  name: "Card Detail Screen",
  children: [
    HEADER,
    {
      type: AUTO_FETCH_API,
      api: API_ENDPOINTS[GET_SIMILAR_PROPERTY_DATA],
      className: "header",
    },
    {
      type: DETAILED_VIEW,
      name: "detailedViewImage",
      loadingApi: GET_CARD_DATA,
      className: "property_images_container",
      apiSliceName: GET_CARD_DATA,
      whatsappText: `Hi! I saw a property {link} on BuilderFloor.com and I am interested in it. Is it available?`,
      icons: {
        sectorNumber: "/icons/location.png",
        size: "/icons/area.png",
        accommodation: "/icons/home.png",
        floor: "/icons/stairs.png",
        facing: "/icons/compass.png",
        possession: "/icons/check.png",
        parkFacing: "/icons/park.png",
        corner: "/icons/right.png",
      },
    },
    { type: HORIZONTAL_LINE, className: "property_details_divider" },
    {
      type: HEADING,
      className: "explore_similar_options_heading",
      text: "Explore similar options to match your choice"
    },
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_SIMILAR_PROPERTY_DATA,
      className: "default-home-cards similar_options_list",
      apiName: GET_SIMILAR_PROPERTY_DATA,
      renderComponentsInLoop: { type: HOME_CARD, className: "homeCards" },
      defaultLimit: 4,
      cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
      cardClickNavigate: "/builderFloorDetails",
      addQueryParam: "{title}-{id}",
      cardClickApiType: GET,
    },
    FOOTER,
    SCROLLTOP,
    // { type: CHATBOT }
  ],
};

export const SEARCH_RESULT = {
  name: "Search Result",
  className: "klk",
  children: [
    HEADER,
    {
      type: CONTAINER,
      className: "actioncontainer",
      children: [
        {
          type: SELECT,
          className: "select-city-button",
          sliceName: "filter",
          name: "city",
          defaultValue: { label: "Gurgaon", value: "Gurgaon" },
          options: [{ label: "Gurgaon", value: "Gurgaon" }],
          onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
          onClickApiMethod: POST,
        },
        {
          type: SLIDER,
          sliceName: "filter",
          className: "select-range",
          name: "budget",
          minValue: 0,
          maxValue: 200000000,
          step: 1000000,
          defaultValue: [20000000, 50000000],
        },
        {
          type: API_BUTTON,
          sliceName: "filter",
          name: "search",
          buttonLabel: "Search",
          btnClass: "sr-search-button",
          apiType: POST,
          navigate: "/searchResult",
          api: API_ENDPOINTS[GET_SEARCH_RESULT],
        },
      ],
    },
    {
      type: API_HEADING,
      name: "matchFoundHeading",
      tag: "h2",
      className: "match-found-heading",
      dynamicDetails: {
        api: GET_SEARCH_RESULT,
        textReplace: "_TEXT_TO_REPLACE_",
      },
      text: "_TEXT_TO_REPLACE_ Matches Found",
    },
    {
      type: CONTAINER,
      name: "cardBodyContainer",
      className: "cardBodyContainer",
      children: [
        {
          type: CONTAINER,
          className: "filter-button-div",
          children: [
            {
              type: CONTAINER,
              className: "filter-button-div-overflowed",
              children: [
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "floor",
                  label: "Floors",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "First Floor", value: "1ST FLOOR" },
                    { label: "Second Floor", value: "2ND FLOOR" },
                    { label: "Third Floor", value: "3RD FLOOR" },
                    { label: "Fourth Floor", value: "4TH FLOOR" },
                    { label: "Basement + First Floor", value: "FIRSTBASEMENT" },
                  ],
                  zIndex: 95,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "location",
                  label: "Locations",
                  className: "filterChannel",
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
                    { label: "Emaar Emerald Hills", value: "EMAAR EMERALD HILLS" },
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
                  zIndex: 94,
                },
                {
                  type: SELECT_SLIDER,
                  sliceName: "filter",
                  name: "size",
                  buttonLabel: "Size",
                  minValue: 0.0,
                  maxValue: 1000.0,
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  step: 0.1,
                  defaultValue: [180.0, 360.0],
                  zIndex: 93,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "accommodation",
                  label: "Accommodation",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "2 BHK", value: "2 BHK" },
                    { label: "3 BHK", value: "3 BHK" },
                    { label: "4 BHK", value: "4 BHK" },
                    { label: "5 BHK", value: "5 BHK" },
                    { label: "6 BHK", value: "6 BHK" },
                  ],
                  zIndex: 92,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "possession",
                  label: "Possession",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "Ready", value: "Ready" },
                    { label: "1 Months", value: "1M" },
                    { label: "3 Months", value: "3M" },
                    { label: "6 Months", value: "6M" },
                    { label: "9 Months", value: "9M" },
                    { label: "12 Months", value: "12M" },
                  ],
                  zIndex: 91,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "facing",
                  label: "Facing",
                  className: "filterbutton",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "North", value: "North" },
                    { label: "South", value: "South" },
                    { label: "East", value: "East" },
                    { label: "West", value: "West" },
                    { label: "North-East", value: "NorthEast" },
                    { label: "North-West", value: "NorthWest" },
                    { label: "South-East", value: "SouthEast" },
                    { label: "South-West", value: "SouthWest" },
                  ],
                  zIndex: 90,
                },
                {
                  type: SELECT2,
                  sliceName: "filter",
                  name: "sortBy",
                  label: "Sort By",
                  className: "filterbutton",
                  maxAllowed: 1,
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  options: [
                    { label: "Price High to Low", value: "Price High to Low" },
                    { label: "Price Low to High", value: "Price Low to High" },
                  ],
                  zIndex: 89,
                },
                {
                  type: TOGGLE_BUTTON,
                  className: "toogle-filter",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Park",
                  name: "parkFacing",
                },
                {
                  type: TOGGLE_BUTTON,
                  className: "toogle-filter",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Corner",
                  name: "corner",
                },
                {
                  type: BUTTON,
                  className: "toogle-filter filter_reset_btn",
                  sliceName: "filter",
                  onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
                  onClickApiMethod: POST,
                  label: "Reset",
                  name: "Reset",
                  isReset: true,
                },
              ],
            },
          ],
        },
        {
          type: DYNAMIC_CARD_CONTAINER,
          loadingApi: GET_SEARCH_RESULT,
          sliceName: "filter",
          className: "result-searchdiv",
          apiName: GET_SEARCH_RESULT,
          paginatioName: "page",
          defaultPage: 1,
          cardPerPage: 5,
          onClickApi: API_ENDPOINTS[GET_SEARCH_RESULT],
          onClickApiMethod: POST,
          paginationClass: "search_pagination",
          renderComponentsInLoop: {
            type: SEARCH_CARD,
            className: "homeCards",
          },
          cardClickApi: API_ENDPOINTS[GET_CARD_DATA],
          cardClickNavigate: "/builderFloorDetails",
          cardClickApiType: GET,
        },
        FOOTER,
        SCROLLTOP,
        // { type: CHATBOT }
      ],
    },

  ],
};

export const ABOUTUS_SCREEN = {
  name: "About Us",
  className: "about_us",
  children: [
    HEADER,
    {
      type: CONTAINER,
      className: "about_us_container coming_soon_container",
      children: [
        {
          type: HEADING,
          tag: "h3",
          text: "Coming Soon",
          className: "coming_soon_label"
        }
      ],
    },
    FOOTER,
    SCROLLTOP,
    { type: CHATBOT }
  ]
};

export const BLOG_SCREEN = {
  name: "Out Blog",
  className: "our_blog",
  children: [
    HEADER,
    {
      type: CONTAINER,
      className: "our_blog_container coming_soon_container",
      children: [
        {
          type: HEADING,
          tag: "h3",
          text: "Coming Soon",
          className: "coming_soon_label"
        },
        // {
        //   type: CONTAINER,
        //   className: "page_content_container",
        //   children: [
        //     {
        //       type: HEADING,
        //       className: "page_title",
        //       text: "Our Blog",
        //     },
        //     {
        //       type: CONTAINER,
        //       className: "blog_container",
        //       children: [
        //         {
        //           type: HEADING,
        //           tag: "h1",
        //           className: "section_title",
        //           text: "The Perfect Builder Floor Is An Important And Exciting Journey"
        //         },
        //         {
        //           type: HEADING,
        //           tag: "p",
        //           className: "blog_para",
        //           text: "A builder floor refers to an independent residential unit or apartment that is typically constructed by a builder or developer on a single plot of land. In simple terms, it is a low-rise building that consists of multiple floors, with each floor being a separate dwelling unit."
        //         },
        //         {
        //           type: HEADING,
        //           tag: "p",
        //           className: "blog_para",
        //           text: "Builder Floors Are Commonly Found In Urban Areas, Particularly In Cities And Towns Where Land Availability Is Limited. They Are Often Built As A Part Of A Larger Housing Project Or As Standalone Structures. Each Floor Of A Builder Floor Usually Has Its Own Separate Entrance, And The Building Usually Has An Elevator."
        //         },
        //         {
        //           type: HEADING,
        //           tag: "p",
        //           className: "blog_para",
        //           text: "These Residential Units Are Designed To Provide More Privacy And Independence Compared To Traditional Apartment Buildings Or Multi-Story Complexes. Each Floor Is Typically Owned By A Different Individual Or Family, And They May Have Control Over The Design And Layout Of Their Respective Units. Builder Floors Can Vary In Size And Configuration, Ranging From Small Apartments To Spacious Duplexes Or Triplexes."
        //         },
        //         {
        //           type: HEADING,
        //           tag: "p",
        //           className: "blog_para",
        //           text: `It's Important To Note That The Term "Builder Floor" May Have Different Regional Interpretations And Can Vary In Its Exact Meaning And Characteristics Depending On The Specific Location.`
        //         },
        //         {
        //           type: HEADING,
        //           tag: "h1",
        //           className: "section_title",
        //           text: "Advantages Of Purchasing A Builder Floor:"
        //         },
        //         {
        //           type: LIST,
        //           subtype: "ul",
        //           children: [
        //             {
        //               heading: "Privacy:",
        //               text: "Each Floor Is A Separate Unit, Providing More Privacy And Fewer Shared Common Areas Compared To High-Rise Apartment Buildings.",
        //             },
        //             {
        //               heading: "Customization:",
        //               text: "Owners Have More Flexibility In Customizing Their Living Spaces According To Their Preferences And Needs.",
        //             },
        //             {
        //               heading: "Lower Density:",
        //               text: "As Builder Floors Are Usually Low-Rise Buildings, The Number Of Units Per Floor Is Typically Lower, Resulting In A Lower Population Density And Potentially A Quieter Living Environment.",
        //             },
        //             {
        //               heading: "Exclusivity:",
        //               text: "Builder Floors Often Cater To A Niche Market And Can Be Associated With A Certain Level Of Exclusivity Or Premium Status.",
        //             },
        //             {
        //               heading: "Lower Maintenance Charges:",
        //               text: "Builder Floor Has Lower Maintenance Charges As Compared To High Rise Apartment. You Have To Pay Even For Those Services Which You Never Use.",
        //             },
        //             {
        //               heading: "Unbeatable Edge:",
        //               text: "Builder Floor Owner Also Gets Proportionate Land Share Rights Of The Plot Underneath. Since The Prices Of Land Increase Considerably Over A Passage Of Time, The Owner Of Builder Floor Gets Benefit Of The Same Indirectly.",
        //             },
        //             {
        //               heading: "Peace Of Mind:",
        //               text: "Builder Floor Owner Feels Much Safer In The Event Of Earthquake Or Fire.",
        //             },
        //           ]
        //         },
        //         {
        //           type: NAVIGATE_BUTTON,
        //           btnClass: "home_navigate_btn",
        //           navigate: "/",
        //           buttonLabel: "Start Exploring Your Dream Builder Floor Now...",
        //         }
        //       ]
        //     },
        //   ],
        // },
      ],
    },
    FOOTER,
    SCROLLTOP,
    { type: CHATBOT }
  ]
};

export const SCREENS_TO_RENDER = [HOME_SCREEN];

export const REDIRECTION = {
  [HOME_SCREEN]: "/",
  [SEARCH_RESULT]: "/searchResult",
};
// export const SCREENS_TO_RENDER = [HOME_SCREEN];

// export const REDIRECTION = {
//   [HOME_SCREEN]: "/",
//   [SEARCH_RESULT]: "/searchResult",
// };

export const ExpetedHeader = {
  user: ["Name", "Phone Number", "Address", "Email", "Role", "Parent Id"],
  master: ["Field", "Value", "Parent Id"],
  property: [
    "Property id",
    "City",
    "Location",
    "Plot Number",
    "Size",
    "Floor",
    "Accommodation",
    "Possession",
    "Price",
    "Facing",
    "Park Facing",
    "Corner",
    "Description",
    "1st Page Title",
    "2 Page Title",
    "Channel Partner Name",
    "Channel Contact Number",
    "Builder name",
    "Contact",
    "THUMBNAIL IMAGE NAME",
    "FOLDER NAME",
  ],
};
