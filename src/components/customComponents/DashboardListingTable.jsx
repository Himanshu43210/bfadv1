import React from "react";
import ListingTable from "../utils/ListingTable";
import { useSelector } from "react-redux";
import { selectApiStatus } from "../../redux/utils/selectors";

const DashboardListing = ({ component }) => {
  const userProfile = useSelector((state) => state.profile);
  const dataApi =
    component.endpoint +
    (component.user ? "?userId=" : "?id=") +
    userProfile._id +
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
    />
  );
};

export default DashboardListing;
