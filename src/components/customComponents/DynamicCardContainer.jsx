import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectApiData } from "../../redux/utils/selectors";
import HomeCard from "./HomeCard";
import SearchCard from "./SearchCard";
import { HOME_CARD, SEARCH_CARD } from "../utils/Const";
import BasicPagination from "./Pagination";
import MuiButton from "@mui/material/Button";

export default function DynamicCardContainer({ component, handleValueChange }) {
  const apiName = component.apiName;
  const onClickApi = component.cardClickApi;
  const onClickNavigate = component.cardClickNavigate;
  const defaultPage = component.defaultPage;
  let ComponentType = component.renderComponentsInLoop.type;
  const [page, setPage] = React.useState(defaultPage);

  const dataSelector = useSelector((state) => selectApiData(state, apiName));

  const dataToRender =
    typeof dataSelector === "object"
      ? Array.isArray(dataSelector)
        ? dataSelector
        : dataSelector.data
      : dataSelector;

  useEffect(() => { }, [dataToRender]);

  const handleLoadMore = () => {
    console.log('+++++++++++ HANDLE LOAD MORE ++++++++++++');
  };

  return (
    <div className={`searchdiv ${component.className}`}>
      {dataToRender?.map((element) => {
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
              />
            )}
          </>
        );
      })}
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
            setPage(newPage);
          }}
          currentPage={page || defaultPage}
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
