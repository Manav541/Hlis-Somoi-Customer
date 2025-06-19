import AddressStore from "./addAddress";
import AuthStore from "./authentication";
import AvailableOffersStore from "./availableOffers";
import CartStore from "./cart";
import HomeStore from "./home";
import KeyStore from "./keys";
import MyWishlistStore from "./myWishlist";
import ProductListingStore from "./productListing";
import userOtpVerificationStore from "./verfication";

export const zustandStore = {
  AuthStore: AuthStore,
  OtpVerificationStore: userOtpVerificationStore,
  AddressStore: AddressStore,
  KeyStore :KeyStore,
  AvailableOffersStore:AvailableOffersStore,
  MyWishlistStore : MyWishlistStore,
  HomeStore : HomeStore,
  ProductListingStore : ProductListingStore,
  CartStore : CartStore
};
