import _ from "lodash";

const API_DOMAIN = "https://builder-floor-backend-n2ib.onrender.com/api/";
// const API_DOMAIN = "http://localhost:5000/api/";

export const getApiName = (api) => {
  const apiWithoutParams = api.split("?")[0]; //remove any qurey params
  return _.findKey(API_ENDPOINTS, (value) => {
    return value === api || value === apiWithoutParams;
  });
};

export const API_ENDPOINTS = {
  rejectProperty: API_DOMAIN + "properties/rejectProperty",
  getPropertiesCountsByUserId:
    API_DOMAIN + "properties/getPropertiesCountsByUserId",
  adminDashboardLogin: API_DOMAIN + "users/auth/login",
  getHomeScreenData: API_DOMAIN + "properties/getHomeData",
  getSimilarPropertyData:
    API_DOMAIN + "properties/getSimilarProperties?limit=5",
  getCardData: API_DOMAIN + "properties",
  getSearchResult: API_DOMAIN + "properties/searchPropertiesData",
  getUserData: API_DOMAIN + "users/list",
  getAdminUserData: API_DOMAIN + "users/adminUserList",
  alterUserData: API_DOMAIN + "users/editUser",
  addUserData: API_DOMAIN + "users/addUser",
  deleteUserData: API_DOMAIN + "users/deleteUser",
  getPropertyData: API_DOMAIN + "properties/list",
  getAdminPropertyData: API_DOMAIN + "properties/adminPropertyList",
  addPropertyData: API_DOMAIN + "properties/addProperty",
  alterPropertyData: API_DOMAIN + "properties/editProperty",
  deletePropertyData: API_DOMAIN + "properties/deleteProperty",
  approvePropertyData: API_DOMAIN + "properties/approveProperty",
  getMasterData: API_DOMAIN + "masters/list",
  addMasterData: API_DOMAIN + "masters/addMaster",
  alterMasterData: API_DOMAIN + "masters/editMaster",
  deleteMasterData: API_DOMAIN + "masters/deleteMaster",
  getPropertiesListingCounts:
    API_DOMAIN + "properties/getPropertiesListingCounts",
};
