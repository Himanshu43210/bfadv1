import { useSelector } from 'react-redux';

const useApiData = (url) => {
  const apiData = useSelector(state => state.api.data[url]);
  const apiStatus = useSelector(state => state.api.status);
  const apiError = useSelector(state => state.api.error);

  return { data: apiData, status: apiStatus, error: apiError };
};

export default useApiData;
