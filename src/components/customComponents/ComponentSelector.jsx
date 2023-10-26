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
} from "../utils/Const.js";
import Banner from "./Banner.jsx";
import Footer from "./Footer.jsx";
import Slider from "./Slider.jsx";
import Heading from "./Heading.jsx";
import ApiButton from "./ApiButton.jsx";
import MenuState from "./MenupState.jsx";
import DynamicHeading from "./ApiHeading.jsx";
import SelectButton from "./SelectButton.jsx";
import AutoFetchApi from "./AutoFetchApi.jsx";
import NavigateButton from "./NavigateButton.jsx";
import { SelectSlider } from "./SelectSlider.jsx";
import RenderComponent from "./ComponentRenderer.jsx";
import DynamicCardContainer from "./DynamicCardContainer.jsx";
import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { ScrollToTop } from "./ScrollToTop.jsx";
import DetailDataCard from "./DetailedDataCard.jsx";
import Header from "./Header.jsx";
import CustomToogleButton from "./ToggleButton.jsx";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress.js";
import { selectApiStatus } from "../../redux/utils/selectors.js";
import DashboardListing from "./DashboardListingTable.jsx";
import CustomRouteButton from "./RouteButton.jsx";
import LabelMap from "./LabelMap.jsx";
import TableHeader from "./TableHeader.jsx";
import ApiHandler from "./AutoFetchApiPost.jsx";
import { USER_ROLE } from "../../ScreenJson.js";
import PanelHeader from "./PanelHeader.jsx";
import LoginRefresh from "./LoginRefresh.jsx";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import DropSelect from "./DropSelect.jsx";
import Tabbar from './Tabbar.jsx';
import { useLocation } from "react-router-dom";
import Chatbot from "./Chatbot.jsx";
import OtpLogin from "./OtpLogin.jsx";
import List from "./List.jsx";
import AboutHero from "./AboutHero.jsx";
import ContactForm from "./ContactForm.jsx";

const ComponentSelector = ({ component }) => {
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs
  const location = useLocation();
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state[component.sliceName]);
  const apiStatus = useSelector((state) =>
    selectApiStatus(state, component.loadingApi || "")
  );
  const userProfile = useSelector((state) => state.profile);
  const [refresh, setRefresh] = useState(true);

  function hasValueProperty(input) {
    // Check if the input is an object
    if (typeof input === "object" && input !== null) {
      // Check if the object has a property named "value"
      return "value" in input;
    } else {
      return false;
    }
  }

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

  const getTitle = () => {
    let idx = component.common
      ? 0
      : userProfile.role === USER_ROLE.bfAdmin
        ? 0
        : userProfile.role === USER_ROLE.channelPartner
          ? 1
          : 2;
    return (
      <Heading
        component={{
          text: component?.titles[idx],
          className: "formheadingcontainer",
        }}
      />
    );
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
        <AutoFetchApi url={component.api} method={GET} params={component.params} />
      )}
      {component.type === AUTO_FETCH_API_POST && (
        <AutoFetchApi url={component.api} method={POST} data={component.data} />
      )}
      {component.type === AUTO_FETCH_API_USER && (
        <ApiHandler
          url={component.api}
          method={component.method}
          data={component.data}
          userId={component.userId}
          user={component.user}
        />
      )}
      {component.type === TITLE && getTitle()}
      {component.type === CONTAINER && (
        <RenderComponent jsonToRender={component} />
      )}
      {
        component.type === PANEL_HEADER && <PanelHeader component={component} />
      }
      {component.type === IMAGE_BANNER && <Banner component={component} />}
      {component.type === SELECT && (
        <SelectButton
          name={component.name}
          options={component.options}
          defaultValue={component.defaultValue}
          handleValueChange={handleValueChange}
          label={component.label}
          value={sliceData[component.name]}
          zIndex={component.zIndex}
        />
      )}
      {component.type === SELECT2 && (
        <DropSelect
          component={component}
          values={sliceData[component.name]}
          onSubmit={handleValueChange}
          key={location.key}
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
          apiType={component.apiType}
          api={component.api}
          buttonLabel={component.buttonLabel}
          navigate={component.navigate}
          data={sliceData}
          btnClass={component.btnClass}
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
        // <DetailCard apiName={component.apiName} />
        <DetailDataCard component={component} />
      )}
      {component.type === NAVIGATE_BUTTON && (
        <NavigateButton to={component.navigate} label={component.buttonLabel} btnClass={component.btnClass} />
      )}
      {component.type === PAGE_FOOTER && <Footer component={component} />}
      {component.type === PAGE_HEADER && <Header component={component} isMobile={isMobile} />}
      {component.type === OTP_LOGIN && <OtpLogin />}
      {component.type === HAMBURGER_MENU && (
        <MenuState MenuItems={component.items} />
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
        <Button className={component.className} label={component.label} handleOnClick={handleValueChange} />
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
        <CustomRouteButton component={component} />
      )}
      {component.type === LABEL_MAP && <LabelMap component={component} />}
      {component.type === HORIZONTAL_LINE && <hr />}
      {component.type === TABLE_HEADER && <TableHeader component={component} />}
      {component.type === LOGIN_REFRESH && (
        <LoginRefresh component={component} />
      )}
      {component.type === "ABOUT_HERO" && <AboutHero />}
      {component.type === "CONTACT_US" && <ContactForm />}
    </>
  );
};

export default ComponentSelector;
