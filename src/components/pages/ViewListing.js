import React, { useEffect } from "react";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import { VIEW_LISTING } from "../../ScreenJson.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { GET, GET_PROPERTY_LIST_BY_USER_ID } from "../utils/Const.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { useDispatch } from "react-redux";

export default function ViewListing() {
  const pathname = window.location.href;
  const id = pathname.split("id=").pop();
  const dispatch2 = useDispatch();
  useEffect(() => {
    try {
      const options = {
        url: API_ENDPOINTS[GET_PROPERTY_LIST_BY_USER_ID] + "?userId=" + id,
        method: GET,
        headers: { "Content-Type": "application/json" },
      };
      dispatch2(callApi(options));
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  return (
    <>
      <div className="standalone_page ">
        <RenderComponent jsonToRender={VIEW_LISTING} />
      </div>
    </>
  );
}