// Base url
export const apiBaseURL = {
  development: "https://hyperlinkdevteam.link:7753/api/v1", // It is use localhost for API.
  stage: "https://hyperlinkdevteam.link:7753/api/v1", //It is use hyperlink server for API.
  production: "", //It is use live server for API.
};

// API end points
export const apiEndPoint = {
  //Authentication
  signup: "/auth/customer/signup",
  login: "/auth/customer/login",
  requestOtp: "/auth/customer/request-otp",
  otpVerification: "/auth/customer/otp-verification",
  forgotPasswordEmailVerification:
    "/auth/customer/forgot-password-email-verification",
  changeForgotPassword: "/auth/customer/change-forgot-password",
  changePassword :"/auth/customer/change-password",
  addUpdateLocation :"home/customer/add-update-location",
  getCustomerDetail :"auth/customer/get-customer-details",
  updatePhoneEmailVerification :"/auth/customer/update-phone-email-verification",
  updatePhoneEmail : "/auth/customer/update-phone-email",
};

// API status codes
export const statusCodes = {
  invaildOrFail: 0,
  emptyData: 2,
  success: 1,
  userSessionExpire: -1,
};

// API keys
export const apiKeys = {
  secretKey: "DLNnPAmcTEBcLLQ8VtpJzzir7trF0ssE",
  iv: "DLNnPAmcTEBcLLQ8",
};

// API Header key
export const apiHeaderKeyValue = {
  apiKey: "api-key",
  apiKeyValue: "QYp3JjmtmNGe3Xy/+2Ensw==",
  contentTypeKey: "content-type",
};
