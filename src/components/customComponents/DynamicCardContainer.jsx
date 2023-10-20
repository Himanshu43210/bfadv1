import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectApiData } from "../../redux/utils/selectors";
import HomeCard from "./HomeCard";
import SearchCard from "./SearchCard";
import { HOME_CARD, SEARCH_CARD } from "../utils/Const";
import BasicPagination from "./Pagination";
import MuiButton from "@mui/material/Button";

export default function DynamicCardContainer({ component, handleValueChange, onLoadMore }) {
  const showOptions = component.showOptions;
  const apiName = component.apiName;
  const onClickApi = component.cardClickApi;
  const onClickNavigate = component.cardClickNavigate;
  const defaultPage = component.defaultPage;
  let ComponentType = component.renderComponentsInLoop.type;
  const [limit, setLimit] = useState(component.defaultLimit);
  const [cumulatedData, setCumulatedData] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(0);
  let prevScrollY = useRef(0);
  let page = useRef(defaultPage);

  const dataSelector = useSelector((state) => selectApiData(state, apiName));

  const dataToRender =
    typeof dataSelector === "object"
      ? Array.isArray(dataSelector)
        ? dataSelector
        : dataSelector.data
      : dataSelector;

  const handleScroll = () => {
    if (prevScrollY < window.scrollY) {
      const offsetHeight = document.documentElement.offsetHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 400;
      if (hasReachedBottom && isBottom === false) {
        setIsBottom(true);
        handleLoadMore();
      }
    }
    prevScrollY = window.scrollY;
  };

  const throttle = (fn, wait) => {
    let time = Date.now();
    return function () {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  };

  useLayoutEffect(() => {
    window.scroll({ top: pageYOffset });
  }, [dataToRender]);

  useEffect(() => {
    setIsBottom(false);
    if (Array.isArray(dataToRender) && (cumulatedData?.[0]?._id !== dataToRender?.[0]?._id)) {
      if (component.loadMore) {
        setCumulatedData([...cumulatedData, ...dataToRender]);
      } else {
        setCumulatedData([...dataToRender]);
      }
    }
  }, [dataToRender]);

  const handleLoadMore = () => {
    setPageYOffset(window.scrollY);
    onLoadMore({ page: page.current + 1, limit });
    page.current = page.current + 1;
  };

  useEffect(() => {
    if (component.loadMore) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className={`searchdiv ${component.className}`}>
      {cumulatedData?.map((element) => {
        return (
          <>
            {ComponentType === HOME_CARD && (
              <HomeCard
                element={element}
                onClickApi={onClickApi}
                onClickNavigate={onClickNavigate}
                apiType={component.cardClickApiType}
              />
            )}
            {ComponentType === SEARCH_CARD && (
              <SearchCard
                element={element}
                onClickApi={onClickApi}
                onClickNavigate={onClickNavigate}
                classname={component.renderComponentsInLoop.className}
                apiType={component.cardClickApiType}
                showOptions={showOptions}
              />
            )}
          </>
        );
      })}
      {/* {dataToRender?.map((element) => {
        return (
          <>
            {ComponentType === HOME_CARD && (
              <HomeCard
                element={element}
                onClickApi={onClickApi}
                onClickNavigate={onClickNavigate}
                apiType={component.cardClickApiType}
              />
            )}
            {ComponentType === SEARCH_CARD && (
              <SearchCard
                element={element}
                onClickApi={onClickApi}
                onClickNavigate={onClickNavigate}
                classname={component.renderComponentsInLoop.className}
                apiType={component.cardClickApiType}
                showOptions={showOptions}
              />
            )}
          </>
        );
      })} */}
      {component.loadMore && dataToRender && (
        <div className="load_more_btn_container">
          <MuiButton variant="contained" className="dcc_load_more_btn" onClick={handleLoadMore}>{component.loadMore}</MuiButton>
        </div>
      )}
      {component.paginatioName && dataToRender && (
        <BasicPagination
          paginationClass={component.paginationClass}
          handlePageChange={(e, newPage) => {
            handleValueChange({ label: "page", value: (newPage - 1) });
            page.current = newPage;
          }}
          currentPage={page.current || defaultPage}
          totalPages={
            typeof dataSelector === "object"
              ? dataSelector?.totalPages
              : dataToRender?.length / component.cardPerPage
          }
        />
      )}
    </div>
  );
}
