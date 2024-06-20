import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET } from "../utils/Const.js";
import { callApi } from "../../redux/utils/apiActions.js";

const LabelMap = ({ component }) => {
  const data = useSelector((state) => state.profile);

  // const api = component.api+`?userId=${data?._id?data._id:""}`
  const userProfile = useSelector((state) => state.profile);
  const api = component.api + `?userId=` + userProfile._id;
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleApiCall = () => {
    dispatch(
      callApi({
        method: GET,
        url: api,
        headers: { "Content-Type": "application/json" },
      })
    );
  };
  // (data._id, component.api, api);
  useEffect(() => {
    if (!checked) {
      // (api)
      handleApiCall();
      setChecked(true);
    }
  });
  const apiData = useSelector((state) => state.api.data)[component.endpoint]
    ?.response;

  return (
    <>
      {apiData?.map((item, i) => {
        return (
          <div
            key={i}
            className={`label_map_item ${component.parentClassName}`}
          >
            <p className="item_label">{item?.label}</p>
            <p className="item_value">{item?.value}</p>
          </div>
        );
      })}
    </>
  );
};

const RealLabelMap = ({ component }) => {
  const userProfile = useSelector((state) => state.profile);

  if (userProfile._id) {
    return <LabelMap component={component} />;
  } else {
    return <></>;
  }
};

export default RealLabelMap;
