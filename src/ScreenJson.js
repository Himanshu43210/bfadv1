import { newPropertyConst } from "./components/fieldConsts/PropertiesFieldConst.js";
import { editUserConst, newUserConst } from "./components/fieldConsts/UserFieldConst.js";
import {
  ALTER_PROPERTY_DATA,
  ALTER_USER_DATA,
  API_BUTTON,
  API_HEADING,
  APPROVE_AGENT,
  APPROVE_PROPERTY_DATA,
  AUTO_FETCH_API,
  AUTO_FETCH_API_POST,
  AUTO_FETCH_API_USER,
  BUTTON,
  CHATBOT,
  CONTAINER,
  DASHBOARD_LISTING,
  DELETE_PROPERTY_DATA,
  DELETE_USER_DATA,
  DETAILED_VIEW,
  DYNAMIC_CARD_CONTAINER,
  GET,
  GET_ADMIN_PROPERTY_DATA,
  GET_ADMIN_USER_DATA,
  GET_APPROVAL_PROPERTIES,
  GET_CARD_DATA,
  GET_HOME_SCREEN_DATA,
  GET_LISTING_DATA,
  GET_MASTER_DATA_ON_HOME,
  GET_PROPERTY_LIST_BY_USER_ID,
  GET_PROPERTY_USER,
  GET_SEARCH_RESULT,
  GET_SIMILAR_PROPERTY_DATA,
  GET_UNAPPROVED_AGENTS_DATA,
  HAMBURGER_MENU,
  HEADING,
  HOME_CARD,
  HORIZONTAL_LINE,
  IMAGE_BANNER,
  INSTAGRAM_ICON,
  LABEL_MAP,
  LINKEDIN_ICON,
  LIST,
  LOGIN_REFRESH,
  NAVIGATE_BUTTON,
  OTP_LOGIN,
  PAGE_FOOTER,
  PAGE_HEADER,
  PANEL_HEADER,
  POST,
  PUT,
  REJECT_PROPERTY,
  ROUTE_BUTTON,
  SCROLL_TO_TOP,
  SEARCH_CARD,
  SELECT,
  SELECT2,
  SELECT_SLIDER,
  SLIDER,
  TABS,
  TITLE,
  TOGGLE_BUTTON,
} from "./components/utils/Const.js";
import { API_ENDPOINTS } from "./redux/utils/api.js";

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
    },
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
    {
      type: OTP_LOGIN,
      className: "ol_comp_wrapper",
    }
  ],
};

const SCROLLTOP = {
  type: SCROLL_TO_TOP,
  name: "ScrollToTop",
};

export const HOME_SCREEN = {
  name: "Home Screen",
  pageClass: "home-screen",
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
    { type: CHATBOT }
  ],
};

export const ACCOUNT_TABS_SCREEN = {
  name: "Account Tabs",
  pageClass: "account-tabs-screen",
  children: [
    HEADER,
    {
      type: TABS,
      tabs: [
        // { label: "Recent Searches", key: "recentSearches" },
        { label: "Viewed", key: "viewed" },
        { label: "Contacted", key: "contacted" },
        { label: "Recommendations", key: "recommendations" },
      ],
      className: "tabs_wrapper"
    },
    {
      type: CONTAINER,
      className: 'coming_soon_container',
      children: [
        {
          type: HEADING,
          tag: 'h3',
          text: 'Coming Soon...',
          className: 'coming_soon'
        }
      ]
    },
    {
      type: DYNAMIC_CARD_CONTAINER,
      loadingApi: GET_SEARCH_RESULT,
      sliceName: "filter",
      className: "result-searchdiv tab_data",
      apiName: GET_SEARCH_RESULT,
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
      showOptions: true,
    },
    FOOTER,
    SCROLLTOP,
    { type: CHATBOT }
  ]
};

export const CARD_DETAILS_SCREEN = {
  name: "Card Detail Screen",
  pageClass: "property_page detail-screen",
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
    { type: CHATBOT }
  ],
};

export const SEARCH_RESULT = {
  name: "Search Result",
  pageClass: "search-result-screen",
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
        { type: CHATBOT }
      ],
    },

  ],
};

export const ABOUTUS_SCREEN = {
  name: "About Us",
  pageClass: "aboutus-screen",
  className: "about_us",
  children: [
    HEADER,
    {
      type: CONTAINER,
      className: "about_us_container",
      children: [
        { type: "ABOUT_HERO" },
        {
          type: CONTAINER,
          className: "aboutus_section",
          children: [
            {
              type: CONTAINER,
              className: "about_content",
              children: [
                {
                  type: HEADING,
                  tag: "h1",
                  className: "section_title aboutus_title",
                  text: "About Us?"
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "At BuilderFloor.com, we are dedicated to helping you find your dream builder floor in the vibrant city of Gurgaon. We understand that finding the perfect builder floor is an important and exciting journey, and we are here to make that process seamless and enjoyable for you."
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "Our platform exclusively focuses on new builder floors in Gurgaon, offering a wide range of options at all price points and locations. Whether you're a first-time buyer, a growing family, or an investor looking for a lucrative opportunity, we have the right builder floor to meet your unique requirements."
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "We know and very well understand that finding and selecting a Builder Floor for one self is really a tough job. It is our endeavour to help you find the best match for you within your budget and also according to your taste & requirement. We have brought the world of builder floors at your door steps with the help of our verified channel partners."
                },
                {
                  type: HEADING,
                  tag: "h1",
                  className: "section_title aboutus_title",
                  text: "Why Choose BuilderFloor.Com?"
                },
                {
                  type: LIST,
                  subtype: "ul",
                  children: [
                    {
                      heading: "Extensive Selection:",
                      text: "Our comprehensive database showcases a diverse collection of new builder floors in Gurgaon. From affordable options to luxury residences, we have something to suit every taste and budget.",
                    },
                    {
                      heading: "Trusted Channel Partners:",
                      text: "We collaborate with reputed Channel Partners who in turn contact different builders and developers in Gurgaon with a proven track record of delivering quality constructions and enlist the best builder floors on our platform which meet the highest standards of craftsmanship and design.",
                    },
                    {
                      heading: "Location Expertise:",
                      text: "Gurgaon is a dynamic city with numerous neighborhoods and localities, each with its own charm and amenities. Our channel partners are a team of real estate professionals, who have in-depth knowledge of the Gurgaon market and can guide you towards the ideal location that aligns with your lifestyle and preferences.",
                    },
                    {
                      heading: "Personalized Assistance:",
                      text: "Our channel partners will provide a personalized experience to every customer. They, as a team, are dedicatedly ready to assist you throughout your home-buying journey, offering expert advice, answering your queries, and facilitating smooth transactions.",
                    },
                    {
                      heading: "Transparent Information:",
                      text: "We understand the importance of transparency in the real estate industry. On BuilderFloor.com, you will find detailed information, including floor plans, specifications, amenities, and pricing, empowering you to make informed decisions.",
                    },
                  ]
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "At BuilderFloor.com, our mission is to simplify your search for the perfect builder floor and help you embark on a new chapter of your life. We are passionate about real estate and committed to exceeding your expectations."
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "Start exploring our listings today and let us be your trusted partner in finding your dream builder floor in Gurgaon."
                },
              ]
            },
          ],
        },
        { type: "CONTACT_US" }
      ],
    },
    FOOTER,
    SCROLLTOP,
    { type: CHATBOT }
  ]
};

export const BLOG_SCREEN = {
  name: "Out Blog",
  pageClass: "blog-screen",
  className: "our_blog",
  children: [
    HEADER,
    {
      type: CONTAINER,
      className: "our_blog_container",
      children: [
        {
          type: CONTAINER,
          className: "page_content_container",
          children: [
            {
              type: HEADING,
              className: "page_title",
              text: "Our Blog",
            },
            {
              type: CONTAINER,
              className: "blog_container",
              children: [
                {
                  type: HEADING,
                  tag: "h1",
                  className: "section_title",
                  text: "The Perfect Builder Floor Is An Important And Exciting Journey"
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "A builder floor refers to an independent residential unit or apartment that is typically constructed by a builder or developer on a single plot of land. In simple terms, it is a low-rise building that consists of multiple floors, with each floor being a separate dwelling unit."
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "Builder Floors are commonly found in urban areas, particularly in cities and towns where land availability is limited. They are often built as a part of a larger housing project or as standalone structures. Each floor of a Builder Floor usually has its own separate entrance, and the building usually has an elevator."
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: "These residential units are designed to provide more privacy and independence compared to traditional apartment buildings or multi-story complexes. Each floor is typically owned by a different individual or family, and they may have control over the design and layout of their respective units. Builder floors can vary in size and configuration, ranging from small apartments to spacious duplexes or triplexes."
                },
                {
                  type: HEADING,
                  tag: "p",
                  className: "blog_para",
                  text: `It's important to note that the term "Builder Floor" may have different regional interpretations and can vary in its exact meaning and characteristics depending on the specific location.`
                },
                {
                  type: HEADING,
                  tag: "h1",
                  className: "section_title",
                  text: "Advantages Of Purchasing A Builder Floor:"
                },
                {
                  type: LIST,
                  subtype: "ul",
                  children: [
                    {
                      heading: "Privacy:",
                      text: "Each floor is a separate unit, providing more privacy and fewer shared common areas compared to high-rise apartment buildings.",
                    },
                    {
                      heading: "Customization:",
                      text: "Owners have more flexibility in customizing their living spaces according to their preferences and needs.",
                    },
                    {
                      heading: "Lower Density:",
                      text: "As builder floors are usually low-rise buildings, the number of units per floor is typically lower, resulting in a lower population density and potentially a quieter living environment.",
                    },
                    {
                      heading: "Exclusivity:",
                      text: "Builder floors often cater to a niche market and can be associated with a certain level of exclusivity or premium status.",
                    },
                    {
                      heading: "Lower Maintenance Charges:",
                      text: "Builder Floor has lower maintenance charges as compared to high rise Apartment. You have to pay even for those services which you never use.",
                    },
                    {
                      heading: "Unbeatable Edge:",
                      text: "Builder floor owner also gets proportionate land share rights of the plot underneath. Since the prices of land increase considerably over a passage of time, the owner of builder floor gets benefit of the same indirectly.",
                    },
                    {
                      heading: "Peace Of Mind:",
                      text: "Builder floor owner feels much safer in the event of earthquake or fire.",
                    },
                  ]
                },
                {
                  type: NAVIGATE_BUTTON,
                  btnClass: "home_navigate_btn",
                  navigate: "/",
                  buttonLabel: "Start exploring your dream builder floor now...",
                }
              ]
            },
          ],
        },
      ],
    },
    FOOTER,
    SCROLLTOP,
    { type: CHATBOT }
  ]
};

export const MANAGE_USER = {
  name: "Master table",
  pageClass: "standalone_page user_management_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_ADMIN_USER_DATA],
        },
        {
          type: TITLE,
          titles: ["Manage Broker", "Manage Sub User"],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    State: "state",
                    Status: "status",
                    // "Address": "address",
                    // "Email": "email",
                    // "Role": "role",
                    // "Parent Id": "parentId",
                    // "Status": "status",
                  },
                  mobileHeaders: {
                    Name: "name",
                    Role: "role"
                  },
                  fieldConst: editUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_ADMIN_USER_DATA,
                  // approveApi: APPROVE_PROPERTY_DATA,
                  endpoint: API_ENDPOINTS[GET_ADMIN_USER_DATA],
                  dataPoint: GET_ADMIN_USER_DATA,
                  showPreviewButton: false,
                  disableRowModal: true,
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const MANAGE_AGENT = {
  name: "Master table",
  pageClass: "standalone_page user_management_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
        },
        {
          type: TITLE,
          titles: ["Approve Brokers"],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    State: "state",
                    Status: "status",
                    // "Address": "address",
                    // "Email": "email",
                    // "Role": "role",
                    // "Parent Id": "parentId",
                    // "Status": "status",
                  },
                  mobileHeaders: {
                    Name: "name",
                    Role: "role"
                  },
                  fieldConst: editUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_UNAPPROVED_AGENTS_DATA,
                  approveApi: APPROVE_AGENT,
                  approveApiMethod: PUT,
                  endpoint: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
                  dataPoint: GET_UNAPPROVED_AGENTS_DATA,
                  showPreviewButton: false,
                  disableRowModal: true,
                  showEditAction: true,
                  hideAlterActions: true,
                  showDeleteAction: true,
                  showApproveAction: true
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const CP_CUSTOMERS = {
  name: "Customers",
  pageClass: "standalone_page cp_customers_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
        },
        {
          type: TITLE,
          titles: ["Approve Brokers"],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  roleSpecific: false,
                  desktopHeaders: {
                    Name: "name",
                    "Company Name": "companyName",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    State: "state",
                    Status: "status",
                    // "Address": "address",
                    // "Email": "email",
                    // "Role": "role",
                    // "Parent Id": "parentId",
                    // "Status": "status",
                  },
                  mobileHeaders: {
                    Name: "name",
                    Role: "role"
                  },
                  fieldConst: editUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_UNAPPROVED_AGENTS_DATA,
                  approveApi: APPROVE_AGENT,
                  approveApiMethod: PUT,
                  endpoint: API_ENDPOINTS[GET_UNAPPROVED_AGENTS_DATA],
                  dataPoint: GET_UNAPPROVED_AGENTS_DATA,
                  showPreviewButton: false,
                  disableRowModal: true,
                  showEditAction: true,
                  hideAlterActions: true,
                  showDeleteAction: true,
                  showApproveAction: true
                },
                {
                  type: ROUTE_BUTTON,
                  className: "toogle-filter",
                  label: "Back",
                  name: "Back",
                  route: "/admin",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const STATS_LIST = {
  name: "Master table",
  pageClass: "standalone_page stats_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: TITLE,
          titles: ["Statistics"],
          common: true,
        },
        {
          type: LABEL_MAP,
          className: "lableded-map-dashboard",
          api: API_ENDPOINTS[GET_LISTING_DATA],
          method: GET,
          endpoint: GET_LISTING_DATA,
        },
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          userId: true,
          method: GET,
          api: API_ENDPOINTS[GET_PROPERTY_USER],
        },
        {
          type: CONTAINER,
          name: "",
          className: "",
          children: [
            {
              type: CONTAINER,
              name: "",
              className: "",
              children: [
                {
                  type: DASHBOARD_LISTING,
                  data: {},
                  desktopHeaders: {
                    "Company Name": "name",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    "Total Listings": "total_count",
                    Approved: "approved_count",
                    Pending: "pending_count",
                    Rejected: "rejected_count",
                    // "View all Listings": "",
                  },
                  removeApi: REJECT_PROPERTY,
                  user: true,
                  mobileHeaders: {
                    "Company Name": "name",
                    "Mobile Number": "phoneNumber",
                    City: "city",
                    "Total Listings": "total_count",
                    Approved: "approved_count",
                    Pending: "pending_count",
                    Rejected: "rejected_count",
                  },
                  fieldConst: newUserConst,
                  editApi: ALTER_USER_DATA,
                  deleteApi: DELETE_USER_DATA,
                  getDataApi: GET_PROPERTY_USER,
                  approveApi: APPROVE_PROPERTY_DATA,
                  endpoint: API_ENDPOINTS[GET_PROPERTY_USER],
                  dataPoint: GET_PROPERTY_USER,
                  hideActions: true,
                  showViewAllListing: "listingData",
                },
              ],
            },
          ],
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin",
        },
      ],
    },
  ],
};

export const APPROVAL_PROPERTIES = {
  name: "Master table",
  pageClass: "standalone_page approve_listing_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: AUTO_FETCH_API_USER,
          user: true,
          method: GET,
          api: API_ENDPOINTS[GET_APPROVAL_PROPERTIES],
        },
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: TITLE,
          titles: [
            "Approve Broker Listings",
            "Approve Sub User Listings",
          ],
        },
        {
          type: LABEL_MAP,
          className: "lableded-map-dashboard",
          api: API_ENDPOINTS[GET_LISTING_DATA],
          method: GET,
          endpoint: GET_LISTING_DATA,
        },
        {
          type: DASHBOARD_LISTING,
          desktopHeaders: {
            "Company Name": "createdByName",
            "Mobile Number": "createdByPhoneNumber",
            City: "city",
            "Primary Title": "title",
            Location: "location",
            "Plot No.": "plotNumber",
            Floor: "floor",
            Title: "title",
            Accommodation: "accommodation",
            Facing: "facing",
            Possession: "possession",
            Price: "price",
            "Builder Name": "builderName",
            "Builder Contact Name": "builderContact",
          },
          roleSpecificDesktopHeaders: {
            [USER_ROLE.bfAdmin]: {
              "Company Name": "createdByName",
              "Mobile Number": "createdByPhoneNumber",
              City: "city",
              "Primary Title": "title",
            },
            [USER_ROLE.channelPartner]: {
              "Sub User Name": "createdByName",
              "Mobile Number": "createdByPhoneNumber",
              City: "city",
              "Primary Title": "title",
            },
          },
          user: true,
          getDataApi: GET_APPROVAL_PROPERTIES,
          dataApi: GET_APPROVAL_PROPERTIES,
          endpoint: API_ENDPOINTS[GET_APPROVAL_PROPERTIES],
          dataPoint: GET_APPROVAL_PROPERTIES,
          editApi: ALTER_PROPERTY_DATA,
          // deleteApi: DELETE_PROPERTY_DATA,
          fieldConst: newPropertyConst,
          hideAlterActions: true,
          showPreviewButton: true,
          showEditAction: true,
          approveApi: APPROVE_PROPERTY_DATA,
          removeApi: REJECT_PROPERTY,
          disableRowModal: true,
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin",
        },
      ],
    },
  ],
};

export const AD_MASTER_TABLE = {
  name: "Master table",
  pageClass: "standalone_page master_table_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: AUTO_FETCH_API_USER,
          api: API_ENDPOINTS[GET_ADMIN_PROPERTY_DATA],
          data: {
            sortType: "desc",
            sortColumn: "updatedAt"
          },
          method: POST,
          className: "header",
          user: true,
        },
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: TITLE,
          titles: [
            "Master Data of Super Admin",
            "Master Data of Broker",
            "Master Data of Sub User",
          ],
        },
        // { type: HORIZONTAL_LINE },

        {
          type: DASHBOARD_LISTING,
          data: {},
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
            "Created By": "channelPartner",
            "Mobile Number": "phoneNumber",
            "Company Name": "companyName",
            City: "city",
            State: "state",
            "Dated of Posting": "createdAt",
            "Link Share": "",
          },
          mobileHeaders: {
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
            "Created By": "channelPartner",
            "Mobile Number": "",
            "Company Name": "",
            City: "Gurgaon",
            State: "Haryana",
            "Dated of Posting": "createdAt",
            "Link Share": "",
          },
          roleSpecificDesktopHeaders: {
            [USER_ROLE.bfAdmin]: {
              Location: "sectorNumber",
              "Plot No.": "plotNumber",
              Size: "size",
              Floor: "floor",
              Price: "price",
              Accommodation: "accommodation",
              Facing: "facing",
              "Park Facing": "parkFacing",
              Corner: "corner",
              Possession: "possession",
              "Builder Name": "builderName",
              "Builder Contact": "builderContact",
              "Created By": "parentId.name",
              "Mobile Number": "parentId.phoneNumber",
              "Company Name": "parentId.companyName",
              City: "city",
              State: "state",
              "Updated At": "updatedAt",
              "Link Share": "",
            },
            [USER_ROLE.channelPartner]: {
              Location: "sectorNumber",
              "Plot No.": "plotNumber",
              Size: "size",
              Floor: "floor",
              Price: "price",
              Accommodation: "accommodation",
              Facing: "facing",
              "Park Facing": "parkFacing",
              Corner: "corner",
              Possession: "possession",
              "Builder Name": "builderName",
              "Builder Contact": "builderContact",
              "Created By": "parentId.name",
              "Updated At": "updatedAt",
              "Link Share": "",
            },
            [USER_ROLE.salesUser]: {
              Location: "sectorNumber",
              "Plot No.": "plotNumber",
              Size: "size",
              Floor: "floor",
              Price: "price",
              Accommodation: "accommodation",
              Facing: "facing",
              "Park Facing": "parkFacing",
              Corner: "corner",
              Possession: "possession",
              "Builder Name": "builderName",
              "Builder Contact Name": "builderContact",
              "Created By": "parentId.name",
              "Updated At": "updatedAt",
              "Link Share": "",
            },
          },
          fieldConst: newPropertyConst,
          editApi: ALTER_PROPERTY_DATA,
          deleteApi: DELETE_PROPERTY_DATA,
          getDataApi: GET_ADMIN_PROPERTY_DATA,
          approveApi: APPROVE_PROPERTY_DATA,
          endpoint: API_ENDPOINTS[GET_ADMIN_PROPERTY_DATA],
          dataPoint: GET_ADMIN_PROPERTY_DATA,
          onRefreshApiType: POST,
          disableRowModal: true,
          showPreviewButton: true,
          // showColumnFilter: true
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin",
        },
      ],
    },
  ],
};

export const VIEW_LISTING = {
  name: "Master table",
  pageClass: "standalone_page",
  className: "klk",
  children: [
    {
      type: LOGIN_REFRESH,
      name: "",
      className: "",
      children: [
        {
          type: CONTAINER,
          // className: "superAdminDashboard",
          children: [
            {
              type: PANEL_HEADER,
              mainHeading: "WELCOME TO BUILDERFLOOR.COM",
              panelTitles: {
                [USER_ROLE.bfAdmin]: "SUPER ADMIN PANEL",
                [USER_ROLE.channelPartner]: "BROKER ADMIN PANEL",
                [USER_ROLE.salesUser]: "SUB USER PANEL",
              },
              classes: "formheadingcontainer",
              mainHeaderClass: "formheadingcontainer",
              panelTitleClass: "formheadingcontainer",
            },
          ],
        },
        {
          type: HEADING,
          name: "allListing",
          text: "All Listing",
          className: "formheadingcontainer",
        },
        {
          type: DASHBOARD_LISTING,
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
        },
        {
          type: ROUTE_BUTTON,
          className: "toogle-filter",
          label: "Back",
          name: "Back",
          route: "/admin/statistics",
        },
      ],
    },
  ],
};

export const SCREENS_TO_RENDER = [HOME_SCREEN];

export const REDIRECTION = {
  [HOME_SCREEN]: "/",
  [SEARCH_RESULT]: "/searchResult",
};

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
