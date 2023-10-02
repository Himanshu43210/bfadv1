import React, { useEffect } from "react";
import RenderComponent from "../../customComponents/ComponentRenderer";
import { VIEW_LISTING } from "../../../UserJson";
import { API_ENDPOINTS } from "../../../redux/utils/api";
import { GET, GET_PROPERTY_LIST_BY_USER_ID } from "../../utils/Const";
import { callApi } from "../../../redux/utils/apiActions";
import { useDispatch } from "react-redux";

export default function ViewListing() {
  const pathname = window.location.href;
  const id = pathname.split("id=").pop();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const options = {
        url: API_ENDPOINTS[GET_PROPERTY_LIST_BY_USER_ID] + "?id=" + id,
        method: GET,
        headers: { "Content-Type": "application/json" },
      };
      dispatch(callApi(options));
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
