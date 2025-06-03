import { ImageSourcePropType } from "react-native";
import { Source as FastImageSource } from "react-native-fast-image";

export interface DeviceInfoType {
  device_type: string;
  device_token: string;
  os_version: string;
  device_name: string;
  model_name: string;
  ip: string;
  uuid: string;
  sign_in_type: "email" | "phone";
  mobile_number?: number;
  country_code?: string;
  email?: string;
  password?: string;
  name?: string;
}

export interface APIResponseType {
  code: number;
  message: string;
  data: object;
}

export interface VerifyOTPResponseType {
  mobile_number?: number;
  country_code?: string;
  otp: number;
  email?: string;
}

export interface RequestOTPResponseType {
  mobile_number?: number;
  country_code?: string;
  email?: string;
}

export interface AddressResponseType {
  address: string;
  latitude: string;
  longitude: string;
  building_details: string;
  description?: string;
  is_default?: boolean;
  customer_id: string;
}

export interface CountryDataType {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}

export interface ChatMessage {
  text: string;
  time: string;
  isSender: boolean;
  status?: "Read" | "Delivered" | "Sent";
  type: "text" | "image" | "video";
  image?: string;
}

// Notification
export interface NotificationData {
  title: string;
  desc: string;
  time: string;
}

export interface NotificationGroup {
  titleMain: string;
  data: NotificationData[];
}

// Home Tab
export interface GroceriesFoodItem {
  type: string | null;
  image: FastImageSource;
}

export interface AdItem {
  image: FastImageSource;
}

export interface SubCategory {
  image: FastImageSource;
  name: string;
}

export interface BestProduct {
  image: FastImageSource;
  name: string;
  used: string;
  height: number;
  width: number;
}

// Category tab
export interface ProductImage {
  imgMain: FastImageSource;
}

export interface ProductHighlight {
  highlightTitle: string;
  highlightDesc: string;
}

export interface DeliveryData {
  deliveryDataImage: ImageSourcePropType;
  deliveryDataTitle: string;
}

export interface GroceryProduct {
  mainCategoryTitle: string;
  subCategoryTitle: string;
  product_imgMain: ProductImage[];
  product_img: FastImageSource;
  product_name: string;
  product_price: string;
  product_weight: string;
  product_final_price: string;
  product_rating: string;
  product_review?: number;
  isFavourite: boolean;
  product_quantity: number;
  product_deliverytime: string;
  product_distance: string;
  product_desc: string;
  product_highlight: ProductHighlight[];
  product_inStock: boolean;
  product_deliveryData: DeliveryData[];
  height: number;
  width: number;
}

export interface Restaurant {
  restaurant_imgMain: ProductImage[];
  subCategoryTitle: string;
  restaurant_img: FastImageSource;
  restaurant_logo: FastImageSource;
  restaurant_name: string;
  restaurant_address: string;
  restaurant_time: string;
  restaurant_deliverytime: string;
  restaurant_distance: string;
  restaurant_ratings: number;
  restaurant_reviews: number;
  isFavourite: boolean;
}

export interface FashionHighlight {
  highlightTitle: string;
  highlightDesc: string;
}

export interface FashionImage {
  imgMain: ImageSourcePropType;
}

export interface FashionProduct {
  mainCategoryTitle: string;
  subCategoryTitle: string;
  product_imgMain: FashionImage[];
  product_img: ImageSourcePropType;
  product_name: string;
  product_price: string;
  product_final_price: string;
  product_rating: string;
  product_review: number;
  isFavourite: boolean;
  product_quantity: number;
  product_deliverytime: string;
  product_distance: string;
  product_desc: string;
  product_highlight: FashionHighlight[];
  product_inStock: boolean;
  product_deliveryData: DeliveryData[];
  height: number;
  width: number;
}

export interface Category {
  image: ImageSourcePropType;
  name: string;
  arrSubCategory: (GroceryProduct | Restaurant | FashionProduct)[];
}

export interface FashionSize {
  size: "S" | "M" | "L" | "XL";
  isSelected: boolean;
}

export interface FashionColor {
  color: string;
  isSelected: boolean;
}
export interface SimilarProduct {
  product_img: ImageSourcePropType;
  product_final_price: string;
  product_price: string;
  product_weight: string;
}

// My Order Tab
export interface OrderProduct {
  product_name: string;
  product_img: ImageSourcePropType;
  price: string;
  quantity: number;
  unit: string;
  height: number;
  width: number;
}

export interface Order {
  order_number: string;
  total: string;
  items_Count: number;
  status:
    | "Confirmed"
    | "Preparing"
    | "On_the_way"
    | "Delivered"
    | "Request_return"
    | "Request_exchange"
    | "Returned"
    | "Cancelled";
  date: string;
  arrProduct: OrderProduct[];
}

export interface FilterOrderType {
  id: number;
  type: string;
}

export interface FilterDate {
  id: number;
  date: string;
}

// Order Summary
export interface OrderStatus {
  status_icon: ImageSourcePropType;
  status_icon1: ImageSourcePropType;
  status_title: string;
  status_date: string;
  status_time: string;
  status_isdone: boolean;
}

export interface OrderReviewProduct {
  product_name: string;
  product_img: FastImageSource;
  product_price: string;
  product_quantity: number;
  product_weight: string;
  height: number;
  width: number;
  product_rating: string;
  isRateReview: boolean;
  isSelected: boolean;
}

// Cancel Order
export interface CancelOrderReason {
  reason: string;
  isSelected: boolean;
}

// Rate & Review
export interface RateProgress {
  rate_number: number;
  rate_percentage: number;
}

export interface Review {
  review_personName: string;
  review_rate: string;
  review_date: string;
  review_description: string;
  review_image: ImageSourcePropType;
  type: "image" | "video";
}

// Order Details
export interface OrderDetail {
  orderDetailTitle: string | null;
  orderDetailValue: string;
}

// Setting Tab
export interface SettingSubItem {
  icon: ImageSourcePropType;
  title: string | null;
  height: number;
  width: number;
  onPress: () => void;
  disabled?: boolean;
}

export interface SettingDataItem {
  titleMain: string | null;
  subArr: SettingSubItem[];
}

// Manage Payment Methods
export interface CardDetails {
  card_number: string;
  card_expirydate: string;
  card_holdername: string;
  card_cvv: string;
  card_type: "visa" | "mastercard";
  isSelected: boolean;
}

// My Wishlist
export interface WishlistItem {
  product_img: FastImageSource;
  product_name: string;
  product_price: string;
  product_weight: string;
  product_final_price: string;
  product_rating: string;
  favourite: boolean;
  height: number;
  width: number;
}

// Manage Address
export interface AddressItem {
  title: string;
  default: boolean;
}

// Available Offers
export interface AvailableOfferItem {
  title: string;
  offer: string;
  offerDesc: string;
  offerPrice: string;
  offerCode: string;
  offerValidity: string;
}

// FAQ
export interface FaqArrProps {
  faqTitle: string | null;
  faqDesc: string | null;
  isSelected: boolean;
}

// Category Drop down
export interface CategoryItem {
  label: string;
  value: string;
}

export interface SubCategoryItem {
  label: string;
  value: string;
}

export interface SubCategoryData {
  category: string;
  subCategory: SubCategoryItem[];
}
