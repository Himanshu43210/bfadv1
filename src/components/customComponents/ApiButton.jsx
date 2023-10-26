import React from "react";
import { useNavigate } from "react-router-dom";
import ApiHandler from "../../redux/utils/apiHandler.js";
import { DELETE, GET, POST, PUT } from "../utils/Const.js";

export default function ApiButton({
  apiType,
  api,
  data,
  buttonLabel,
  navigate,
  btnClass,
  newTab = false
}) {
  const apiHeader = { "Content-Type": "application/json" };
  const navigateTo = useNavigate();

  const handleApiCall = async (doFetch) => {
    await doFetch(); // Wait for API call
    if (navigate) {
      if (newTab) {
        window.open(navigate, "_blank");
      }
      // If navigate prop is provided
      navigateTo(navigate); // Navigate to the given page
    }
  };

  return (
    <>
      {/* For GET request */}
      {apiType === GET && (
        <ApiHandler method={GET} url={api} params={data}>
          {(doFetch) => (
            <button className={`api_btn ${btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For POST request */}
      {apiType === POST && (
        <ApiHandler method={POST} url={api} data={data} headers={apiHeader}>
          {(doFetch) => (
            <button className={`api_btn ${btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For PUT request */}
      {apiType === PUT && (
        <ApiHandler method={PUT} url={api} data={data} headers={apiHeader}>
          {(doFetch) => (
            <button className={`api_btn ${btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For DELETE request */}
      {apiType === DELETE && (
        <ApiHandler method={DELETE} url={api}>
          {(doFetch) => (
            <button className={`api_btn ${btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
    </>
  );
}
