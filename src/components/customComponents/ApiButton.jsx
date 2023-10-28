import React from "react";
import { useNavigate } from "react-router-dom";
import ApiHandler from "../../redux/utils/apiHandler.js";
import { DELETE, GET, POST, PUT } from "../utils/Const.js";

export default function ApiButton({
  component,
  data,
  newTab = false
}) {
  const apiHeader = { "Content-Type": "application/json" };
  const navigateTo = useNavigate();

  const handleApiCall = async (doFetch) => {
    await doFetch(); // Wait for API call
    if (component.navigate) {
      if (newTab) {
        window.open(component.navigate, "_blank");
      }
      // If navigate prop is provided
      navigateTo(component.navigate); // Navigate to the given page
    }
  };

  return (
    <>
      {/* For GET request */}
      {component.apiType === GET && (
        <ApiHandler method={GET} url={component.api} params={data}>
          {(doFetch) => (
            <button className={`api_btn ${component.btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {component.buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For POST request */}
      {component.apiType === POST && (
        <ApiHandler method={POST} url={component.api} data={data} headers={apiHeader}>
          {(doFetch) => (
            <button className={`api_btn ${component.btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {component.buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For PUT request */}
      {component.apiType === PUT && (
        <ApiHandler method={PUT} url={component.api} data={data} headers={apiHeader}>
          {(doFetch) => (
            <button className={`api_btn ${component.btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {component.buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For DELETE request */}
      {component.apiType === DELETE && (
        <ApiHandler method={DELETE} url={component.api}>
          {(doFetch) => (
            <button className={`api_btn ${component.btnClass}`} onClick={() => handleApiCall(doFetch)}>
              {component.buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
    </>
  );
}
