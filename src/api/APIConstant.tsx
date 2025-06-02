// Base url
export const apiBaseURL = {
  development: 'https://hyperlinkdevteam.link:7753/api/v1', // It is use localhost for API.
  stage: 'https://hyperlinkdevteam.link:7753/api/v1', //It is use hyperlink server for API.
  production: '', //It is use live server for API.
};
 
// API end points
export const apiEndPoint = {
  //Authentication
  signup: '/auth/customer/signup',
  login: '/auth/customer/login',
};
 
// API status codes
export const statusCode = {
  invaildOrFail: 0,
  emptyData: 2,
  success: 1,
  userSessionExpire: -1,
};
 
// API keys
export const apiKeys = {
  secretKey: 'DLNnPAmcTEBcLLQ8VtpJzzir7trF0ssE',
  iv: 'DLNnPAmcTEBcLLQ8',
};
 
// API Header key
export const apiHeaderKeyValue = {
  apiKey: 'api-key',
  apiKeyValue: 'QYp3JjmtmNGe3Xy/+2Ensw==',
  contentTypeKey: 'content-type',
};
 
 