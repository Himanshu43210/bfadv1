import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../redux/utils/apiActions.js"; // Adjust path as needed

export default function ApiHandler({
  method,
  url,
  data = null,
  headers = null,
  children,
  user,
  userId,
}) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);

  let uurl = url;
  if (user) {
    uurl =
      url +
      (userId ? "?userId=" : "?id=") +
      userProfile._id +
      (userProfile.role ? "&role=" + userProfile.role : "");
  }

  const doFetch = useCallback(() => {
    const options = {
      url: uurl,
      method: method,
      headers: headers,
      data: data,
    };
    dispatch(callApi(options));
  }, [dispatch, uurl, method, headers, data]);

  // If there are no children, call the API immediately
  if (!children) {
    doFetch();
    return null;
  }

  // If there are children, pass down the doFetch function
  return children(doFetch);
}
