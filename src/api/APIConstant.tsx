import { invalid } from "moment";

// Base url
export const apiBaseURL = {
  development: "https://devapi.somoi.in/api/v1",
  stage: "", 
  production: "",
  socketUrl: "https://devapi.somoi.in/chat?user_id=",

 
};



// API end points
export const apiEndPoint = {
  // Secret Key
  secretKey: "/admin/secret-key",
  getCODStatus: "/admin/get-cod-status",

  // Chat
  chatHistory: "/chat/chat_history",

  //Authentication
  signup: "/auth/customer/signup",
  login: "/auth/customer/login",
  requestOtp: "/auth/customer/request-otp",
  otpVerification: "/auth/customer/otp-verification",
  forgotPasswordEmailVerification:
    "/auth/customer/forgot-password-email-verification",
  changeForgotPassword: "/auth/customer/change-forgot-password",
  changePassword: "/auth/customer/change-password",
  editProfile: "/auth/customer/edit-profile",
  updatePhoneEmailVerification:
    "/auth/customer/update-phone-email-verification",
  updatePhoneEmail: "/auth/customer/update-phone-email",
  logout: "/auth/customer/logout",
  deleteAccount: "/auth/customer/delete-account",
  getCustomerDetail: "/auth/customer/get-customer-details",
  cmsPages: "/auth/customer/cms-pages",

  // Home
  mainCategoryList: "/home/customer/categories-listing",
  bannerList: "/home/customer/banner-listing",
  subCategoryList: "/home/customer/sub-listing",
  bestProductsSellerList: "/home/customer/home-product-listing",
  searchProduct: "/home/customer/search-product",
  notificationList: "/home/customer/notification-listing",

  // Categories Module
  productListing: "/home/customer/categroywise-products",
  filterSort: "/home/customer/filter-sort",
  productDetails: "/home/customer/product-details",
  foodDetails: "/home/customer/food-details",
  addToCart: "/home/customer/add-to-cart",
  updateCartQuantity: "/home/customer/update-cart-quantity",
  removeFromCart: "/home/customer/remove-cart-data",

  // Compare Products
  compareProductDetails: "/home/customer/compare-products-details",
  similarProductListing: "/home/customer/similar-compare-products-listing",
  addCompareProduct: "/home/customer/compare-products-insert",
  removeCompareProduct: "/home/customer/remove-product-from-compare",

  // Rate & Review
  rateAndReviewList: "/home/customer/rate-review-listing",
  rateVendor: "/home/customer/rate-vendor",
  rateProduct: "/home/customer/rate-product",
  editRate: "/home/customer/edit-ratings",
  deleteRate: "/home/customer/delete-ratings",

  // Cart Module
  applyCouponCode: "/home/customer/apply-offer",
  removeCouponCode: "/home/customer/remove-offer",
  cartListing: "/home/customer/get-cart-data",
  placeOrder: "/home/customer/insert-order",
  createOrderId: "/home/customer/create-payment",

  // My Orders Module
  orderList: "/home/customer/order-listing",
  orderDetails: "/home/customer/order-details",
  cancelReturnOrderReasonList:
    "/home/customer/cancel-reject-order-reason-listing",
  cancelOrder: "/home/customer/cancel-order",
  reportIssue: "/home/customer/insert-report",
  returnOrder: "/home/customer/return-order",

  // Tracking
  deliveryBoyLocation: "/home/customer/delivery-boy-location",

  // Setting Module
  contactUs: "/home/customer/contact-us",

  // Address
  locationList: "/home/customer/location-data",
  addLocation: "/home/customer/add-update-location",
  updateLocation: "/home/customer/update-location-data",
  deleteLocation: "/home/customer/delete-location",

  // Available Offers
  availableOffers: "/home/customer/list-offer-listing",

  // Wishlist
  wishlistProduct: "/home/customer/wishlist-product",
  wishlistList: "/home/customer/wishlist-list",
  wishlistStore: "/home/customer/wishlist-store",
};

// API status codes
export const statusCodes = {
  invaildOrFail: 0,
  emptyData: 2,
  success: 1,
  userSessionExpire: -1,
  cartQuantityNotFound: 12,
  invalidLocationId: 13,
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
