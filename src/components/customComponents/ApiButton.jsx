import React from "react";
import { useNavigate } from "react-router-dom";
import ApiHandler from "../../redux/utils/apiHandler";
import { DELETE, GET, POST, PUT } from "../utils/Const";

export default function ApiButton({
  apiType,
  api,
  data,
  buttonLabel,
  navigate,
}) {
  const apiHeader = { "Content-Type": "application/json" };
  const navigateTo = useNavigate();

  const handleApiCall = async (doFetch) => {
    await doFetch(); // Wait for API call
    if (navigate) {
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
            <button onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For POST request */}
      {apiType === POST && (
        <ApiHandler method={POST} url={api} data={data} headers={apiHeader}>
          {(doFetch) => (
            <button onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For PUT request */}
      {apiType === PUT && (
        <ApiHandler method={PUT} url={api} data={data} headers={apiHeader}>
          {(doFetch) => (
            <button onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
      {/* For DELETE request */}
      {apiType === DELETE && (
        <ApiHandler method={DELETE} url={api}>
          {(doFetch) => (
            <button onClick={() => handleApiCall(doFetch)}>
              {buttonLabel}
            </button>
          )}
        </ApiHandler>
      )}
    </>
  );
}
