import AddressStore from "./addAddress";
import AuthStore from "./authentication";
import AvailableOffersStore from "./availableOffers";
import HomeStore from "./home";
import KeyStore from "./keys";
import MyWishlistStore from "./myWishlist";
import userOtpVerificationStore from "./verfication";

export const zustandStore = {
  AuthStore: AuthStore,
  OtpVerificationStore: userOtpVerificationStore,
  AddressStore: AddressStore,
  KeyStore :KeyStore,
  AvailableOffersStore:AvailableOffersStore,
  MyWishlistStore : MyWishlistStore,
  HomeStore : HomeStore,
};
