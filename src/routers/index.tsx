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
import ChangeEmailPhoneNumberContainer from "../containers/changeEmailPhoneNumber";
import CMSPageContainer from "../containers/cmsPages";
import ContactUsContainer from "../containers/contactUs";
import EditProfileContainer from "../containers/editProfile";
import ManageAddressesContainer from "../containers/manageAddresses";
import ManagePaymentMethodsContainer from "../containers/managePaymentMethods";
import MyWishlistContainer from "../containers/myWishlist";
import NotificationContainer from "../containers/notification";
import ProductListingContainer from "../containers/productListing";
import SearchContainer from "../containers/search";
import ViewAllBestSellersContainer from "../containers/viewAllBestSellers";
import ViewAllCategoriesContainer from "../containers/viewAllCategories";
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

  // Bottom Tabs
  bottomTabsNavigation: "BottomTabs",
  home: "Home",
  categories: "Categories",
  cart: "Your Cart",
  myOrders: "My Orders",
  settings: "Setting",
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
