import React from "react";
import ListingTable from "../utils/ListingTable.js";
import { useSelector } from "react-redux";
import { selectApiStatus } from "../../redux/utils/selectors.js";

const DashboardListing = ({ component }) => {
  const url = window.location.href;
  let qps;
  if (url.split("?").length > 1) {
    qps = url.split("?").pop().split("&");
  }
  const queries = {};
  qps?.forEach((qp) => {
    const kv = qp.split("=");
    queries[kv[0]] = kv[1];
  });
  const userProfile = useSelector((state) => state.profile);
  const dataApi =
    component.endpoint +
    (component.user ? "?userId=" : "?id=") +
    `${component.useParamsFromUrl?.userId ? queries[component.useParamsFromUrl.userId] : userProfile._id}` +
    "&role=" +
    userProfile.role;
  // const dataApi =
  //   component.endpoint + "?id=" + userProfile._id + "&role=" + userProfile.role;
  const apiStatus = useSelector((state) =>
    selectApiStatus(state, component.dataPoint || "")
  );
  const apiData = useSelector((state) => state.api.data)[component.dataPoint];

  return (
    <ListingTable
      data={component.data}
      headersDesktop={component.desktopHeaders}
      headersMobile={component.mobileHeaders}
      fieldConst={component.fieldConst}
      addApi={component.addApi}
      editApi={component.editApi}
      deleteApi={component.deleteApi}
      getDataApi={component.getDataApi}
      removeApi={component.removeApi}
      approveApi={component.approveApi}
      filterDataUrl={dataApi}
      itemCount={apiData?.itemCount}
      isproperty={component.showPreviewButton}
      onRefreshApiType={component.onRefreshApiType}
      hideActions={component.hideActions}
      showEditAction={component.showEditAction}
      showDeleteAction={component.showDeleteAction}
      showViewAllListing={component.showViewAllListing}
      hideAlterActions={component.hideAlterActions}
      roleSpecificDesktopHeaders={component.roleSpecificDesktopHeaders}
      disableRowModal={component.disableRowModal}
      showColumnFilter={component.showColumnFilter}
      refreshDataApi={dataApi}
      useParamsFromUrl={component.useParamsFromUrl}
    />
  );
};

export default DashboardListing;
