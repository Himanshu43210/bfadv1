import { useDispatch } from "react-redux";
import { callApi } from "./apiActions";

const ApiHandler = ({ method, url, data, params, headers, children }) => {
  const dispatch = useDispatch();

  const handleApiCall = () => {
    dispatch(callApi({ method, url, data, params, headers }));
  };

  // children is a function that receives handleApiCall as an argument
  return children(handleApiCall);
};

export default ApiHandler;
