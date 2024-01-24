import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../redux/utils/apiActions.js"; // Adjust path as needed
import { USER_ROLE } from "@/ScreenJson.js";

export default function AutoFetchApiPost({
  component,
  headers = null,
  children,
}) {
  const data = component?.data || null;
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);

  let uurl = component?.api;
  // if (component?.user) {
  //   uurl =
  //     component?.api +
  //     (component?.userId ? "?userId=" : "?id=") +
  //     userProfile?._id;
  // }

  if (
    component?.user &&
    (userProfile.role == USER_ROLE.channelPartner ||
      userProfile.role == USER_ROLE.salesUser)
  ) {
    uurl = component?.api + "?id=" + userProfile?._id;
  }
  console.log(uurl, "arijit");

  const doFetch = useCallback(() => {
    const options = {
      url: uurl,
      method: component.method,
      headers: headers,
      data: data,
    };
    dispatch(callApi(options));
  }, [dispatch, uurl, component.method, headers, data]);

  // If there are no children, call the API immediately
  if (!children) {
    doFetch();
    return null;
  }

  // If there are children, pass down the doFetch function
  return children(doFetch);
}
