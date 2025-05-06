import AddAddressContainer from '../containers/authentication/addAddress';
import ChangePasswordContainer from '../containers/authentication/changePassword';
import ForgotPasswordContainer from '../containers/authentication/forgotPassword';
import OnboardingContainer from '../containers/authentication/onboarding';
import SignInContainer from '../containers/authentication/signin';
import SignupContainer from '../containers/authentication/signup';
import VerificationContainer from '../containers/authentication/verification';
import AvailableOffersContainer from '../containers/availableOffers';
import SettingContainer from '../containers/bottomTabs/setting';
import ChangeEmailPhoneNumberContainer from '../containers/changeEmailPhoneNumber';
import CMSPageContainer from '../containers/cmsPages';
import ContactUsContainer from '../containers/contactUs';
import EditProfileContainer from '../containers/editProfile';
import ManageAddressesContainer from '../containers/manageAddresses';
import ManagePaymentMethodsContainer from '../containers/managePaymentMethods';
import MyWishlistContainer from '../containers/myWishlist';

export const MyScreens = {
  // Authentication

  OnboardingContainer,
  SignupContainer,
  SignInContainer,
  VerificationContainer,
  ForgotPasswordContainer,
  ChangePasswordContainer,
  AddAddressContainer,

  // bottom tab
  SettingContainer,
  EditProfileContainer,
  CMSPageContainer,
  AvailableOffersContainer,
  ContactUsContainer,
  ManageAddressesContainer,
  MyWishlistContainer,
  ChangeEmailPhoneNumberContainer,
  ManagePaymentMethodsContainer
};
