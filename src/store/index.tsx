import AddressStore from "./addAddress";
import AuthStore from "./authentication";
import AvailableOffersStore from "./availableOffers";
import CartStore from "./cart";
import { CartItemCountStore } from "./cartItemCount";
import ChatHistoryStore from "./chat";
import ChatNotificationStore from "./chatNotification";
import CompareProductStore from "./compareProduct";
import HomeStore from "./home";
import KeyStore from "./keys";
import MyOrdersStore from "./myOrders";
import MyWishlistStore from "./myWishlist";
import NotificationListStore from "./notification";
import ProductListingStore from "./productListing";
import RateAndReviewStore from "./rateAndReview";
import userOtpVerificationStore from "./verfication";

export const zustandStore = {
  KeyStore: KeyStore,
  ChatHistoryStore: ChatHistoryStore,
  ChatNotificationStore: ChatNotificationStore,

  // Authentication Module
  AuthStore: AuthStore,
  OtpVerificationStore: userOtpVerificationStore,

  // Home Module
  HomeStore: HomeStore,
  NotificationListStore: NotificationListStore,

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
