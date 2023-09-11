import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { callApi } from "../../redux/utils/apiActions"; // Adjust path as needed

export default function ApiHandler({
  method,
  url,
  data = null,
  headers = null,
  children,
}) {
  const dispatch = useDispatch();

  const doFetch = useCallback(() => {
    const options = {
      url: url,
      method: method,
      headers: headers,
      data: data,
    };
    dispatch(callApi(options));
  }, [dispatch, url, method, headers, data]);

  // If there are no children, call the API immediately
  if (!children) {
    doFetch();
    return null;
  }

  // If there are children, pass down the doFetch function
  return children(doFetch);
}
