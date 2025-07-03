import AddressStore from "./addAddress";
import AuthStore from "./authentication";
import AvailableOffersStore from "./availableOffers";
import CartStore from "./cart";
import { CartItemCountStore } from "./cartItemCount";
import ChatHistoryStore from "./chat";
import CompareProductStore from "./compareProduct";
import HomeStore from "./home";
import KeyStore from "./keys";
import MyOrdersStore from "./myOrders";
import MyWishlistStore from "./myWishlist";
import ProductListingStore from "./productListing";
import RateAndReviewStore from "./rateAndReview";
import userOtpVerificationStore from "./verfication";

export const zustandStore = {
  KeyStore: KeyStore,
  ChatHistoryStore: ChatHistoryStore,

  // Authentication Module
  AuthStore: AuthStore,
  OtpVerificationStore: userOtpVerificationStore,

  // Home Module
  HomeStore: HomeStore,

  // Category Module
  ProductListingStore: ProductListingStore,
  CompareProductStore: CompareProductStore,
  RateAndReviewStore: RateAndReviewStore,

  // My Orders Module
  MyOrdersStore: MyOrdersStore,

  // Cart Module
  CartStore: CartStore,

  // Setting Module
  AddressStore: AddressStore,
  AvailableOffersStore: AvailableOffersStore,
  MyWishlistStore: MyWishlistStore,

  // Cart Item Count
  CartItemCountStore: CartItemCountStore,
};
