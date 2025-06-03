import AddressStore from "./addAddress";
import AuthStore from "./authentication";
import userOtpVerificationStore from "./verfication";

export const zustandStore = {
  AuthStore: AuthStore,
  OtpVerificationStore: userOtpVerificationStore,
  AddressStore: AddressStore,
};
