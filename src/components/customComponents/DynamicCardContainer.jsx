import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectApiData } from "../../redux/utils/selectors";
import HomeCard from "./HomeCard";
import SearchCard from "./SearchCard";
import { HOME_CARD, SEARCH_CARD } from "../utils/Const";
import BasicPagination from "./Pagination";

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

  useEffect(() => {}, [dataToRender]);

  return (
    <div className="searchdiv">
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
      {component.paginatioName && dataToRender && (
        <BasicPagination
          handlePageChange={(e, newPage) => {
            handleValueChange(newPage);
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
