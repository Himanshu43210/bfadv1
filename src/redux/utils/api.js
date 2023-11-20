import _ from "lodash";

const API_DOMAIN = "https://builder-floor-backend-n2ib.onrender.com/api/";
const CHAT_API_DOMAIN = "https://itsolutionshub.com/chat";
// const API_DOMAIN = "http://localhost:5000/api/";

export const getApiName = (api) => {
  if (api) {
    const apiWithoutParams = api.split("?")[0]; //remove any qurey params
    return _.findKey(API_ENDPOINTS, (value) => {
      return value === api || value === apiWithoutParams;
    });
  } else {
    return "";
  }
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
  getUnapprovedBrokerCounts: API_DOMAIN + "users/upapprovedBrokerCounts",
  getPropertiesListByUserId:
    API_DOMAIN + "properties/getPropertiesListByUserId",
  getApprovalProperties: API_DOMAIN + "properties/getApprovalProperties",
  getMasterDataOnHome: API_DOMAIN + "masters/getMasterDataOnHome",
  addCustomer: API_DOMAIN + "customers/addCustomer",
  signInCustomer: API_DOMAIN + "customers/signIn",
  chat: CHAT_API_DOMAIN,
  addPropertySearched: API_DOMAIN + "properties/createUserHistory/searches",
  addPropertyViewed: API_DOMAIN + "properties/createUserHistory/visited",
  addPropertyContacted: API_DOMAIN + "properties/createUserHistory/contacted",
  addPropertyRecommended: API_DOMAIN + "properties/createUserHistory/recommendation",
  getPropertySearched: API_DOMAIN + "properties/getUserHistory/searches",
  getPropertyViewed: API_DOMAIN + "properties/getUserHistory/visited",
  getPropertyContacted: API_DOMAIN + "properties/getUserHistory/contacted",
  getPropertyRecommended: API_DOMAIN + "properties/getUserHistory/recommendation",
  getCustomerContacted: API_DOMAIN + "properties/getCpUserHistory/recommendation",
  getUnapprovedAgentsData: API_DOMAIN + "users/getCpApporovalUsersList",
  approveAgent: API_DOMAIN + "users/approveCp",
  getAdminUserDataById: API_DOMAIN + "users/adminUserDataById",
  getCustomersList: API_DOMAIN + "customers/customersList",
  deleteCustomer: API_DOMAIN + "customers/deleteCustomer",
  editCustomer: API_DOMAIN + "customers/editCustomer",
};
