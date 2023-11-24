import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { callApi } from "../../redux/utils/apiActions.js"; // Adjust path as needed

export default function ApiHandler({
  component,
  children,
}) {
  const dispatch = useDispatch();

  const doFetch = useCallback(() => {
    const options = {
      url: component.api,
      method: component.method,
      headers: component.headers,
      data: component.data,
      params: component.params
    };
    dispatch(callApi(options));
  }, [dispatch, component]);

  // If there are no children, call the API immediately
  if (!children) {
    doFetch();
    return null;
  }

  // If there are children, pass down the doFetch function
  return children(doFetch);
}
