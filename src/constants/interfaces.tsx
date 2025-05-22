import { ImageSourcePropType } from "react-native";

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
  image: ImageSourcePropType;
}

export interface AdItem {
  image: ImageSourcePropType;
}

export interface SubCategory {
  image: ImageSourcePropType;
  name: string;
}

export interface BestProduct {
  image: ImageSourcePropType;
  name: string;
  used: string;
  height: number;
  width: number;
}

// Category tab
export interface ProductImage {
  imgMain: ImageSourcePropType;
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
  product_img: ImageSourcePropType;
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
  restaurant_img: ImageSourcePropType;
  restaurant_logo: ImageSourcePropType;
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
    | "Delivered"
    | "Request_return"
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
  product_img: ImageSourcePropType;
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
  product_img: ImageSourcePropType;
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
