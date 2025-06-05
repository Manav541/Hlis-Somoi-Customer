import AddressStore from "./addAddress";
import AuthStore from "./authentication";
import AvailableOffersStore from "./availableOffers";
import KeyStore from "./keys";
import userOtpVerificationStore from "./verfication";

export const zustandStore = {
  AuthStore: AuthStore,
  OtpVerificationStore: userOtpVerificationStore,
  AddressStore: AddressStore,
  KeyStore :KeyStore,
  AvailableOffersStore:AvailableOffersStore,
};
