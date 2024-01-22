import { useDispatch, useSelector } from "react-redux";
import {
  API_BUTTON,
  AUTO_FETCH_API,
  CONTAINER,
  DETAILED_VIEW,
  DYNAMIC_CARD_CONTAINER,
  GET,
  HEADING,
  IMAGE_BANNER,
  NAVIGATE_BUTTON,
  PAGE_FOOTER,
  SELECT,
  SLIDER,
  HAMBURGER_MENU,
  SELECT_SLIDER,
  API_HEADING,
  TOGGLE_BUTTON,
  SCROLL_TO_TOP,
  PAGE_HEADER,
  HORIZONTAL_LINE,
  LOADING,
  DASHBOARD_LISTING,
  ROUTE_BUTTON,
  LABEL_MAP,
  POST,
  AUTO_FETCH_API_POST,
  TABLE_HEADER,
  AUTO_FETCH_API_USER,
  TITLE,
  PANEL_HEADER,
  LOGIN_REFRESH,
  BUTTON,
  SELECT2,
  CHATBOT,
  OTP_LOGIN,
  TABS,
  LIST,
  ABOUT_HERO,
  CONTACT_US,
  HEADER_COMP,
} from "../utils/Const.js";
import Banner from "./Banner.jsx";
import Footer from "./Footer.jsx";
import Slider from "./Slider.jsx";
import Heading from "./Heading.jsx";
import ApiButton from "./ApiButton.jsx";
import MenuState from "./MenuState.jsx";
import DynamicHeading from "./DynamicHeading.jsx";
import SelectButton from "./SelectButton.jsx";
import AutoFetchApi from "./AutoFetchApi.jsx";
import NavigateButton from "./NavigateButton.jsx";
import SelectSlider from "./SelectSlider.jsx";
import RenderComponent from "./ComponentRenderer.jsx";
import DynamicCardContainer from "./DynamicCardContainer.jsx";
import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
import { callApi } from "../../redux/utils/apiActions.js";
import ScrollToTop from "./ScrollToTop.jsx";
import DetailDataCard from "./DetailedDataCard.jsx";
import Header from "./Header.jsx";
import CustomToogleButton from "./CustomToogleButton.jsx";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress.js";
import { selectApiStatus } from "../../redux/utils/selectors.js";
import DashboardListing from "./DashboardListing.jsx";
import RouteButton from "./RouteButton.jsx";
import LabelMap from "./LabelMap.jsx";
import TableHeader from "./TableHeader.jsx";
import AutoFetchApiPost from "./AutoFetchApiPost.jsx";
import PanelHeader from "./PanelHeader.jsx";
import LoginRefresh from "./LoginRefresh.jsx";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import DropSelect from "./DropSelect.jsx";
import Tabbar from './Tabbar.jsx';
import Chatbot from "./Chatbot.jsx";
import OtpLogin from "./OtpLogin.jsx";
import List from "./List.jsx";
import AboutHero from "./AboutHero.jsx";
import ContactForm from "./ContactForm.jsx";
import Line from "./Line.jsx";
import Title from "./Title.jsx";
import dynamic from 'next/dynamic';
import HeaderComp from "../newComponents/HeaderComp.jsx";


const comp = ({ component }) => {
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state[component.sliceName]);
  const apiStatus = useSelector((state) =>
    selectApiStatus(state, component.loadingApi || "")
  );
  const userProfile = useSelector((state) => state.profile);
  const [refresh, setRefresh] = useState(true);

  const getData = (payload) => {
    console.log('++++++++++ payload : get data ++++++++++', payload, component.paginatioName || component.name);
    const page = (component.paginatioName || component.name) !== "page" ? sliceData.page : 0;
    let reqPayload = {};
    if (payload == null) {
      reqPayload = {
        budget: sliceData?.budget,
        city: sliceData?.city,
        page: page,
      };
    } else {
      reqPayload = {
        ...sliceData,
        [component.paginatioName || component.name]: (typeof payload === "object")
          ? Array.isArray(payload)
            ? payload
            : payload.value
          : payload,
      };
    }
    const markForDeletion = [];
    Object.keys(reqPayload).forEach((key) => {
      if (
        reqPayload[key] === false ||
        (Array.isArray(reqPayload[key]) && reqPayload[key].length === 0)
      ) {
        markForDeletion.push(key);
      }
      if (reqPayload[key] === true) {
        reqPayload[key] = "YES";
      }
    });
    markForDeletion.forEach(key => {
      delete reqPayload[key];
    });
    const options = {
      url: component.onClickApi,
      method: component.onClickApiMethod,
      headers: { "Content-Type": "application/json" },
      data: reqPayload,
    };
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    if (Object.keys(reqPayload).includes("budget")) {
      dispatch(callApi(options));
    }
  };

  const handleValueChange = (value) => {
    console.log('--------------- HANDLE VALUE CHANGE -------------', component.paginatioName || component.name, value, sliceData);
    if ((component.paginatioName || component.name) === "Reset") {
      // reset filters
      dispatch(resetFilterData({
        budget: sliceData?.budget,
        city: sliceData?.city,
        page: 0
      }));
      if (component.onClickApi) {
        getData(null);
      }
    } else {
      dispatch(
        storeFilterData({
          key: component.paginatioName || component.name,
          value:
            typeof value === "object"
              ? Array.isArray(value)
                ? value
                : value.value
              : value,
        })
      );
      console.log('============ CALLING THE GET DATA ONLY IF onClickApi ==============', component.onClickApi);
      if (component.onClickApi) {
        getData(value);
      }
    }
  };

  const handleLoadMore = (payload) => {
    console.log('============== HANDLE LOAD MORE ================', payload);
    const options = {
      url: component.api,
      method: component.apiType,
      headers: { "Content-Type": "application/json" },
      params: payload,
    };
    if (component.api) {
      dispatch(callApi(options));
    }
  };

  useEffect(() => {
    // just read the querystring & update the filters accordingly and also update the querystring on filters change

    // if component.slicename is budget then set the slicedata budget to the components default
    if ((component.paginatioName || component.name) === "budget" && refresh && window.location.pathname === "/") {
      setRefresh(false);
      dispatch(
        storeFilterData({
          key: "budget",
          value: component.defaultValue,
        })
      );
    }
  }, []);

  return (
    <>
      {component.loadingApi && apiStatus === LOADING && (
        <CircularProgress className="loader-class" />
      )}
      {component.type === AUTO_FETCH_API && (
        <AutoFetchApi component={component} url={component.api} method={GET} params={component.params} />
      )}
      {component.type === AUTO_FETCH_API_POST && (
        <AutoFetchApi component={component} />
      )}
      {component.type === AUTO_FETCH_API_USER && (
        <AutoFetchApiPost component={component} />
      )}
      {component.type === TITLE && <Title component={component} />}
      {component.type === CONTAINER && (
        <RenderComponent jsonToRender={component} />
      )}
      {
        component.type === PANEL_HEADER && <PanelHeader component={component} />
      }
      {component.type === IMAGE_BANNER && <Banner component={component} />}
      {component.type === SELECT && (
        <SelectButton
          component={component}
          handleValueChange={handleValueChange}
          value={sliceData[component.name]}
        />
      )}
      {component.type === SELECT2 && (
        <DropSelect
          component={component}
          values={sliceData[component.name]}
          onSubmit={handleValueChange}
        />
      )}
      {component.type === SLIDER && (
        <Slider
          component={component}
          handleValueChange={handleValueChange}
          value={sliceData[component.name]}
        />
      )}
      {component.type === API_BUTTON && (
        <ApiButton
          component={component}
          data={sliceData}
        />
      )}
      {component.type === HEADING && <Heading component={component} />}
      {component.type === API_HEADING && (
        <DynamicHeading component={component} />
      )}
      {component.type === LIST && <List component={component} />}
      {component.type === DYNAMIC_CARD_CONTAINER && (
        <DynamicCardContainer
          component={component}
          handleValueChange={handleValueChange}
          onLoadMore={handleLoadMore}
        />
      )}
      {component.type === DETAILED_VIEW && (
        <DetailDataCard component={component} />
      )}
      {component.type === NAVIGATE_BUTTON && (
        <NavigateButton component={component} />
      )}
      {component.type === PAGE_FOOTER && <Footer component={component} />}
      {component.type === PAGE_HEADER && <Header component={component} isMobile={isMobile} />}
      {component.type === OTP_LOGIN && <OtpLogin />}
      {component.type === HEADER_COMP && <HeaderComp />}
      {component.type === HAMBURGER_MENU && (
        <MenuState component={component} />
      )}
      {component.type === TABS && (
        <Tabbar component={component} />
      )}
      {component.type === SELECT_SLIDER && (
        <SelectSlider
          component={component}
          handleValueChange={handleValueChange}
          stateValue={sliceData[component.name]}
        />
      )}
      {component.type === TOGGLE_BUTTON && (
        <CustomToogleButton
          component={component}
          handleValueChange={handleValueChange}
          value={sliceData[component.name]}
        />
      )}
      {component.type === BUTTON && (
        <Button
          component={component}
          handleOnClick={handleValueChange}
        />
      )}
      {component.type === SCROLL_TO_TOP && (
        <ScrollToTop component={component} />
      )}
      {component.type === CHATBOT && (
        <Chatbot />
      )}
      {component.type === DASHBOARD_LISTING && (
        <DashboardListing component={component} />
      )}
      {component.type === ROUTE_BUTTON && (
        <RouteButton component={component} />
      )}
      {component.type === LABEL_MAP && <LabelMap component={component} />}
      {component.type === HORIZONTAL_LINE && <Line />}
      {component.type === TABLE_HEADER && <TableHeader component={component} />}
      {component.type === LOGIN_REFRESH && (
        <LoginRefresh component={component} />
      )}
      {component.type === ABOUT_HERO && <AboutHero />}
      {component.type === CONTACT_US && <ContactForm />}
    </>
  );
};


// const comp = ({ component }) => {
//   let isMobile = false; // Adjust the breakpoint as per your needs
//   if (typeof window !== "undefined") {
//     isMobile = window.innerWidth <= 768
//   }
//   const dispatch = useDispatch();
//   // const sliceData = useSelector((state) => state[component.sliceName]);
//   const [sliceData, setSliceData] = useState({});

//   useEffect(() => {
//     if (window !== "undefined") {
//       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//     }
//   }, []);

//   const getData = (payload, component) => {
//     console.log('++++++++++ payload : get data ++++++++++', payload, component.paginatioName || component.name);
//     const page = (component.paginatioName || component.name) !== "page" ? sliceData.page : 0;
//     let reqPayload = {};
//     if (payload == null) {
//       reqPayload = {
//         budget: sliceData?.budget,
//         city: sliceData?.city,
//         page: page,
//       };
//     } else {
//       reqPayload = {
//         ...sliceData,
//         [component.paginatioName || component.name]: (typeof payload === "object")
//           ? Array.isArray(payload)
//             ? payload
//             : payload.value
//           : payload,
//       };
//     }
//     const markForDeletion = [];
//     Object.keys(reqPayload).forEach((key) => {
//       if (
//         reqPayload[key] === false ||
//         (Array.isArray(reqPayload[key]) && reqPayload[key].length === 0)
//       ) {
//         markForDeletion.push(key);
//       }
//       if (reqPayload[key] === true) {
//         reqPayload[key] = "YES";
//       }
//     });
//     markForDeletion.forEach(key => {
//       delete reqPayload[key];
//     });
//     const options = {
//       url: component.onClickApi,
//       method: component.onClickApiMethod,
//       headers: { "Content-Type": "application/json" },
//       data: reqPayload,
//     };
//     if (Object.keys(reqPayload).includes("budget")) {
//       dispatch(callApi(options));
//     }
//   };

//   const handleValueChange = (value, component) => {
//     console.log('--------------- HANDLE VALUE CHANGE -------------', component.paginatioName || component.name, value, sliceData);
//     if ((component.paginatioName || component.name) === "Reset") {
//       // reset filters
//       dispatch(resetFilterData({
//         budget: sliceData?.budget,
//         city: sliceData?.city,
//         page: 0
//       }));
//       if (component.onClickApi) {
//         getData(null, component);
//       }
//     } else {
//       dispatch(
//         storeFilterData({
//           key: component.paginatioName || component.name,
//           value:
//             typeof value === "object"
//               ? Array.isArray(value)
//                 ? value
//                 : value.value
//               : value,
//         })
//       );
//       console.log('============ CALLING THE GET DATA ONLY IF onClickApi ==============', component.onClickApi);
//       if (component.onClickApi) {
//         getData(value, component);
//       }
//     }
//   };

//   const handleLoadMore = (payload, component) => {
//     const options = {
//       url: component.api,
//       method: component.apiType,
//       headers: { "Content-Type": "application/json" },
//       params: payload,
//     };
//     if (component.api) {
//       dispatch(callApi(options));
//     }
//   };

//   return (
//     <>
//       {component.type === AUTO_FETCH_API && (
//         <AutoFetchApi component={component} />
//       )}
//       {component.type === AUTO_FETCH_API_POST && (
//         <AutoFetchApi component={component} />
//       )}
//       {component.type === AUTO_FETCH_API_USER && (
//         <AutoFetchApiPost component={component} />
//       )}
//       {component.type === TITLE && <Title component={component} />}
//       {component.type === CONTAINER && (
//         <RenderComponent jsonToRender={component} />
//       )}
//       {
//         component.type === PANEL_HEADER && <PanelHeader component={component} />
//       }
//       {component.type === IMAGE_BANNER && <Banner component={component} />}
//       {component.type === SELECT && (
//         <SelectButton
//           component={component}
//           handleValueChange={handleValueChange}
//           // value={sliceData[component.name]}
//           setSliceData={setSliceData}
//         />
//       )}
//       {component.type === SELECT2 && (
//         <DropSelect
//           component={component}
//           // values={sliceData[component.name]}
//           handleValueChange={handleValueChange}
//           setSliceData={setSliceData}
//         />
//       )}
//       {component.type === SLIDER && (
//         <Slider
//           component={component}
//           // value={sliceData[component.name]}
//           handleValueChange={handleValueChange}
//           setSliceData={setSliceData}
//         />
//       )}
//       {component.type === API_BUTTON && (
//         <ApiButton
//           component={component}
//           // data={sliceData}
//           setSliceData={setSliceData}
//         />
//       )}
//       {component.type === HEADING && <Heading component={component} />}
//       {component.type === API_HEADING && (
//         <DynamicHeading component={component} />
//       )}
//       {component.type === LIST && <List component={component} />}
//       {component.type === DYNAMIC_CARD_CONTAINER && (
//         <DynamicCardContainer
//           component={component}
//           handleValueChange={handleValueChange}
//           onLoadMore={handleLoadMore}
//           setSliceData={setSliceData}
//         />
//       )}
//       {component.type === DETAILED_VIEW && (
//         <DetailDataCard component={component} />
//       )}
//       {component.type === NAVIGATE_BUTTON && (
//         <NavigateButton component={component} />
//       )}
//       {component.type === PAGE_FOOTER && <Footer component={component} />}
//       {component.type === PAGE_HEADER && <Header component={component} isMobile={isMobile} />}
//       {component.type === OTP_LOGIN && <OtpLogin />}
//       {component.type === HAMBURGER_MENU && (
//         <MenuState component={component} />
//       )}
//       {component.type === TABS && (
//         <Tabbar component={component} />
//       )}
//       {/* {component.type === SELECT_SLIDER && (
//         <SelectSlider
//           component={component}
//           // stateValue={sliceData[component.name]}
//           handleValueChange={handleValueChange}
//           setSliceData={setSliceData}
//         />
//       )} */}
//       {component.type === TOGGLE_BUTTON && (
//         <CustomToogleButton
//           component={component}
//           handleValueChange={handleValueChange}
//           setSliceData={setSliceData}
//         // value={sliceData[component.name]}
//         />
//       )}
//       {component.type === BUTTON && (
//         <Button
//           component={component}
//           handleOnClick={handleValueChange}
//           setSliceData={setSliceData}
//         />
//       )}
//       {component.type === SCROLL_TO_TOP && (
//         <ScrollToTop component={component} />
//       )}
//       {component.type === CHATBOT && (
//         <Chatbot />
//       )}
//       {component.type === DASHBOARD_LISTING && (
//         <DashboardListing component={component} />
//       )}
//       {component.type === ROUTE_BUTTON && (
//         <RouteButton component={component} />
//       )}
//       {component.type === LABEL_MAP && <LabelMap component={component} />}
//       {component.type === HORIZONTAL_LINE && <Line />}
//       {component.type === TABLE_HEADER && <TableHeader component={component} />}
//       {component.type === LOGIN_REFRESH && (
//         <LoginRefresh component={component} />
//       )}
//       {component.type === ABOUT_HERO && <AboutHero />}
//       {component.type === CONTACT_US && <ContactForm />}
//     </>
//   );
// };

const ComponentSelector = dynamic(() => Promise.resolve(comp), { ssr: false })

export default ComponentSelector;
