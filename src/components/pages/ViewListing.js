import React, { useEffect } from "react";
import RenderComponent from "../customComponents/ComponentRenderer.jsx";
import { VIEW_LISTING } from "../../ScreenJson.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import { GET, GET_PROPERTY_LIST_BY_USER_ID } from "../utils/Const.js";
import { callApi } from "../../redux/utils/apiActions.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router.js";

export default function ViewListing() {
  // let pathname = '';
  const router = useRouter();
  const { id } = router.query;
  console.log('==================== LISTING DATA : id =====================', id);
  // const id = pathname.split("id=").pop();
  const dispatch2 = useDispatch();
  // useEffect(() => {
  //   if (window !== "undefined") {
  //     pathname = window.location.href;
  //   }
  // }), [];
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
