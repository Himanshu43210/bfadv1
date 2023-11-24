import React from "react";
import TableButtonHeader from "../utils/TableButtonHeader.js";
import { useSelector } from "react-redux";

const TableHeader = ({ component }) => {
  const apiData = useSelector((state) => state.api.data)[component.endpoint];
  const userProfile = useSelector((state) => state.profile);
  const dataApi =
    component.dataApi + "?id=" + userProfile._id + "&role=" + userProfile.role;
  return (
    <TableButtonHeader
      fieldConst={component.fieldConst}
      tableData={apiData}
      saveDataApi={component.saveApi}
      refreshDataApi={dataApi}
      addHeader={component.header}
    />
  );
};

export default TableHeader;
