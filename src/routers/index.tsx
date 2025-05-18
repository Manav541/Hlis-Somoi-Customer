import AddCompareProductsContainer from "../containers/addCompareProducts";
import AddNewCardContainer from "../containers/addNewCard";
import AddAddressContainer from "../containers/authentication/addAddress";
import ChangePasswordContainer from "../containers/authentication/changePassword";
import ForgotPasswordContainer from "../containers/authentication/forgotPassword";
import OnboardingContainer from "../containers/authentication/onboarding";
import SignInContainer from "../containers/authentication/signin";
import SignupContainer from "../containers/authentication/signup";
import VerificationContainer from "../containers/authentication/verification";
import AvailableOffersContainer from "../containers/availableOffers";
import CartContainer from "../containers/bottomTabs/cart";
import CategoriesContainer from "../containers/bottomTabs/categories";
import HomeContainer from "../containers/bottomTabs/home";
import MyOrdersContainer from "../containers/bottomTabs/myOrders";
import SettingContainer from "../containers/bottomTabs/setting";
import CancelOrderContainer from "../containers/cancelOrder";
import ChangeEmailPhoneNumberContainer from "../containers/changeEmailPhoneNumber";
import ChatContainer from "../containers/chat";
import CMSPageContainer from "../containers/cmsPages";
import CompareProductConteiner from "../containers/compareProduct";
import ContactUsContainer from "../containers/contactUs";
import DriverTrackingContainer from "../containers/driverTracking";
import EditProfileContainer from "../containers/editProfile";
import ManageAddressesContainer from "../containers/manageAddresses";
import ManagePaymentMethodsContainer from "../containers/managePaymentMethods";
import MyWishlistContainer from "../containers/myWishlist";
import NotificationContainer from "../containers/notification";
import OrderSummaryContainer from "../containers/orderSummary";
import PaymentMethodContainer from "../containers/paymentMethod";
import ProductListingContainer from "../containers/productListing";
import RateAndReviewContainer from "../containers/rateAndReview";
import ReportIssueContainer from "../containers/reportIssue";
import ReturnOrderContainer from "../containers/returnOrder";
import ReviewContainer from "../containers/review";
import SearchContainer from "../containers/search";
import ViewAllBestSellersContainer from "../containers/viewAllBestSellers";
import ViewAllCategoriesContainer from "../containers/viewAllCategories";
import ViewProductDetailContainer from "../containers/viewProductDetail";
import ViewRestaurantDetailContainer from "../containers/viewRestaurantDetail";
import BottomTabsNavigation from "./bottomTabsNavigation";

export const ScreenNames = {
  // Authentication
  onboarding: "Onboarding",
  signup: "Sign Up",
  signin: "Sign In",
  verification: "Verification",
  forgotPassword: "Forgot Password",
  changePassword: "Change Password",
  addAddress: "Add Address",

  // Home page screens
  allCategories: "All Categories",
  allBestSellers: "Best Sellers",
  search: "Search",
  notification: "Notification",

  // Categories tabs
  productListing: "Product Listing",
  productDetail:"Product Detail",
  restaurantDetail:"Restaurant Detail",
  review:"Review",
  compareProduct : "Compare Product",
  addCompareProduct : "Add Compare Product",

  // Payment Method
  paymentMethod: "Payment Method",

  // My Orders
  orderSummary : "Order Summary",
  cancelOrder:"Cancel Order",
  returnOrder:"Return Order",
  rateAndReview : "Rate & Review",
  reportIssue : "Report Issue", 

  // Driver Tracking
  driverTracking : "Tracking",
  chat : "Chat",

  // Bottom Tabs
  bottomTabsNavigation: "BottomTabs",
  home: "Home",
  categories: "Categories",
  cart: "Your Cart",
  myOrders: "My Orders",
  settings: "Setting",

  // Setting tab
  editProfile: "Edit Profile",
  cmsPage: "CMS Page",
  availableOffers: "Available Offers",
  contactUs: "Contact Us",
  manageAddress: "Manage Address",
  myWishlist: "My Wishlist",
  changeEmailPhoneNumber: "ChangeEmailPhoneNumberContainer",
  managePaymentMethods: "Manage Payment Methods",
  addNewCard: "Add New Card",
};

export const MyScreens = {
  // Authentication

  OnboardingContainer,
  SignupContainer,
  SignInContainer,
  VerificationContainer,
  ForgotPasswordContainer,
  ChangePasswordContainer,
  AddAddressContainer,

  // bottom tabs
  BottomTabsNavigation,
  HomeContainer,
  CategoriesContainer,
  CartContainer,
  MyOrdersContainer,
  SettingContainer,

  // Home page
  ViewAllCategoriesContainer,
  ViewAllBestSellersContainer,
  SearchContainer,
  NotificationContainer,

  // Categories tab
  ProductListingContainer,

  // Product Detail
  ViewProductDetailContainer,
  ViewRestaurantDetailContainer,
  ReviewContainer,
  CompareProductConteiner,
  AddCompareProductsContainer,

  // Payment Method
  PaymentMethodContainer,

  // My Orders
  OrderSummaryContainer,
  CancelOrderContainer,
  ReturnOrderContainer,
  RateAndReviewContainer,
  ReportIssueContainer,

  // Driver Tracking
  DriverTrackingContainer,
  ChatContainer,

  // Setting tab
  EditProfileContainer,
  CMSPageContainer,
  AvailableOffersContainer,
  ContactUsContainer,
  ManageAddressesContainer,
  MyWishlistContainer,
  ChangeEmailPhoneNumberContainer,
  ManagePaymentMethodsContainer,
  AddNewCardContainer,
};
