import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectApiData } from "../../redux/utils/selectors";

export default function ApiHeading({ component }) {
  const name = component.name;
  const tag = component.tag;
  const className = component.className;
  const text = component.text;
  const dynamicDetails = component.dynamicDetails;
  const Tag = tag || "h1";

  const dataList = useSelector((state) =>
    selectApiData(state, dynamicDetails.api)
  );
  useEffect(() => {}, [dataList]);

  return (
    <Tag key={name} className={className}>
      {text.replace(
        dynamicDetails.textReplace,
        typeof dataList === "object" ? dataList?.totalItems : dataList?.length
      )}
    </Tag>
  );
}
