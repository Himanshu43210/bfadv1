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
} from "../utils/Const";
import Banner from "./Banner";
import Footer from "./Footer";
import Slider from "./Slider";
import Heading from "./Heading";
import ApiButton from "./ApiButton";
import MenuState from "./MenupState";
import DynamicHeading from "./ApiHeading";
import SelectButton from "./SelectButton";
import AutoFetchApi from "./AutoFetchApi";
import NavigateButton from "./NavigateButton";
import { SelectSlider } from "./SelectSlider";
import RenderComponent from "./ComponentRenderer";
import DynamicCardContainer from "./DynamicCardContainer";
import { resetFilterData, storeFilterData } from "../../redux/slice/filterSlice";
import { callApi } from "../../redux/utils/apiActions";
import { ScrollToTop } from "./ScrollToTop";
import DetailDataCard from "./DetailedDataCard";
import Header from "./Header";
import CustomToogleButton from "./ToggleButton";
import { CircularProgress } from "@material-ui/core";
import { selectApiStatus } from "../../redux/utils/selectors";
import DashboardListing from "./DashboardListingTable";
import CustomRouteButton from "./RouteButton";
import LabelMap from "./LabelMap";
import TableHeader from "./TableHeader";
import ApiHandler from "./AutoFetchApiPost";
import { USER_ROLE } from "../../ScreenJson";
import PanelHeader from "./PanelHeader";
import LoginRefresh from "./LoginRefresh";
import { useEffect, useState } from "react";
import Button from "./Button";
import DropSelect from "./DropSelect";
import { useLocation } from "react-router-dom";
import Chatbot from "./Chatbot";
import OtpLogin from "./OtpLogin";

const ComponentSelector = ({ component }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state[component.sliceName]);
  const apiStatus = useSelector((state) =>
    selectApiStatus(state, component.loadingApi || "")
  );
  const userProfile = useSelector((state) => state.profile);
  const [refresh, setRefresh] = useState(true);

  const updateLocalFilters = (key = null, value = null) => {
    console.log('================ UPDATING LOCAL FILTERS ==================', sliceData?.budget, sliceData?.city, sliceData?.page);
    localStorage.setItem("searchFilters", JSON.stringify({
      budget: sliceData?.budget,
      city: sliceData?.city,
      // page: sliceData?.page,
    }));
    console.log('------------ READING LOCALSTORAGE AFTER SAVE ------------', localStorage.getItem("searchFilters"));
    // if (key === null && value === null) {
    //   const page = (component.paginatioName || component.name) !== "page" ? sliceData.page : 0;
    //   console.log('================ UPDATE LOCAL FILTER : RESETTED ===============', key);
    // } else {
    //   const searchFilters = localStorage.getItem("searchFilters");
    //   if (searchFilters) {
    //     console.log('------------- SEARCH FILTERS ------------', searchFilters);
    //     const parsedFilters = JSON.parse(searchFilters);
    //     parsedFilters[key] = (typeof value === "object")
    //       ? Array.isArray(value)
    //         ? value
    //         : value.value
    //       : value;
    //     console.log('+++++++++++++ UPDATED LOCAL FILTER ++++++++++++++++', parsedFilters);
    //     localStorage.setItem("searchFilters", JSON.stringify(parsedFilters));
    //   } else {
    //     const filters = {};
    //     filters[key] = (typeof value === "object")
    //       ? Array.isArray(value)
    //         ? value
    //         : value.value
    //       : value;
    //     console.log('+++++++++++++ UPDATED LOCAL FILTER ++++++++++++++++', filters);
    //     localStorage.setItem("searchFilters", JSON.stringify(filters));
    //   }
    // }
  };

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
      updateLocalFilters();
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
      updateLocalFilters();
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
        <NavigateButton to={component.navigate} label={component.buttonLabel} />
      )}
      {component.type === PAGE_FOOTER && <Footer component={component} />}
      {component.type === PAGE_HEADER && <Header component={component} />}
      {component.type === OTP_LOGIN && <OtpLogin />}
      {component.type === HAMBURGER_MENU && (
        <MenuState MenuItems={component.items} />
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
    </>
  );
};

export default ComponentSelector;
