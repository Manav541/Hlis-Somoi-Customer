import { ImageSourcePropType } from "react-native";
import { Source as FastImageSource } from "react-native-fast-image";

export interface SecretKeyItem {
  id: number;
  name: string;
  keys: string | null;
}

export interface editProfileResponse {
  name: string;
  profile_image?: string | null;
}

export interface ConatctUsResponse {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface CustomerDetails {
  country_code: string;
  created_at: string;
  email: string;
  id: string;
  is_active: boolean;
  is_block: boolean;
  is_delete: boolean;
  is_verified: boolean;
  last_login: string | null;
  login_status: "offline" | "online";
  mobile_number: string;
  name: string;
  otp: number;
  password: string;
  profile_image: string;
  steps: string;
  updated_at: string;
}

export interface DeviceInfo {
  created_at: string;
  customer_id: string;
  device_name: string;
  device_token: string;
  device_type: "I" | "A"; // I = iOS, A = Android
  id: string;
  ip: string;
  is_active: boolean;
  is_delete: boolean;
  model_name: string;
  os_version: string;
  token: string;
  updated_at: string;
  user_type: string;
  uuid: string;
}

export interface LocationData {
  id: string;
  customer_id: string;
  address: string;
  latitude: string;
  longitude: string;
  is_active: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  building_details: string;
  description: string;
  is_default: boolean;
}

export interface SignupResponse {
  customer_details: CustomerDetails;
  device_info: DeviceInfo;
  location_data: LocationData;
}

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
  type: string;
  customer_id?: string;
}

export interface updatePhoneEmailVerificationApiResponseType {
  email?: string;
  mobile_number?: number;
  country_code?: string;
  change_type?: string;
}

export interface updatePhoneEmailApiResponseType {
  new_email?: string;
  new_mobile_number?: number;
  new_country_code?: string;
  change_type?: string;
  otp: number;
}

export interface AddressResponseType {
  address: string;
  latitude: string;
  longitude: string;
  building_details: string;
  description?: string;
  is_default?: boolean;
  location_id?: string;
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

// Home
export interface BestProductSellerData {
  id: string;
  vendor_id: string;
  category_id: string;
  sub_category_id: string;
  name: string;
  description: string;
  is_product_available: boolean;
  is_product_returnable: boolean;
  is_cod_available: boolean;
  is_active: boolean;
  is_delete: boolean;
  created_at: string; // ISO string
  updated_at: string;
  gst_percentage: string;
  set_alert: string;
  store_name: string;
  store_image: string;
  store_cover_image: string;
  store_location: string;
  opening_time: string; // e.g., "08:00:00"
  closing_time: string;
  distance: string;
  is_store_wishlisted: boolean;
  store_rating: string; // Can be converted to number if needed
  image: string;
  rating: string;
  total_reviews: string;
  category_name: string;
  sub_category_name: string;
  total_products: string;
  is_size: boolean;
  is_color: boolean;
  is_variation: boolean;
  variation_data: VariationData;
}

export interface VariationData {
  variation_id: string;
  price: string;
  quantity: string;
  unit: string;
  amount: string;
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
export interface MainCategoryListItem {
  id: string;
  name: string;
  image: string;
  parent_id: string | null;
  is_active: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubCategoryListItem {
  id: string;
  name: string;
  image: string;
  parent_id: string;
  is_active: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdItem {
  image: string;
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
export interface SubCategoryTitle {
  id: string;
  image: any;
  name: string;
  isSelected: boolean;
}

export interface Product {
  id: string;
  image: string;
  inStock: boolean;
  isFavorite: boolean;
  name: string;
  originalPrice: string;
  price: string;
  quantity: number;
  rating: string;
  weight: string;
  variation_id: string;
  is_size: boolean;
  is_color: boolean;
  is_variation: boolean;
  color?: {
    color_id: string;
    name: string;
    code: string;
    image: string;
  };

  size?: {
    size_id: string;
    name: string;
    value: string;
    image: string;
  };

  is_selected?: boolean;
}

export interface ProductListDictData {
  category_id: string;
  sub_category_id?: string;
  page_no: number;
  type?: string;
  customer_latitude?: string;
  customer_longitude?: string;
}

// Product Detail Page

export interface ProductDetailsDictData {
  product_id: string;
  vendor_id?: string;
  variation_id?: string;
  customer_latitude: string;
  customer_longitude: string;
  size_id?: string; // optional
  color_id?: string; // optional
}

export interface FoodDetailsDictData {
  vendor_id: string;
  customer_latitude: string;
  customer_longitude: string;
  category_id?: string;
  page_no: number;
  sub_category_id?: string;
}

export interface ProductData {
  main_category: string;
  sub_category: string;
  product_id: string;
  product_name: string;
  is_product_available: boolean;
  is_product_returnable: boolean;
  is_cod_available: boolean;
  is_fast_delivery: boolean;
  is_variation: boolean;
  is_size: boolean;
  is_color: boolean;
  images: ProductImages[];
  is_wishlist: boolean;
  in_stock: boolean;
  average_rating: string;
  total_reviews: string;
  price: string;
  original_price: string;
  variation_id: string;
  product_weight: string;
  distance: string;
  estimated_delivery_time: string;
  variations: (GroceryProductVariation | SizeVariation | ColorVariation)[];
  tags: Tag[];
  highlights: Highlight[];
  description: string;
  rating_summary: RatingSummary[];
  reviews: Review[];
  cart: Cart;
}

export interface ColorVariation {
  name: string;
  hex: string;
  image: string;
  variation_id: string;
  color_id: string;
  price: string;
  quantity: string;
  is_selected: boolean;
}

export interface SizeVariation {
  size: string;
  size_id: string;
  is_selected: boolean;
  colors: ColorVariation[];
}

export interface ProductImages {
  image: string;
}

export interface GroceryProductVariation {
  product_id: string;
  variation_id: string;
  price: string;
  original_price: string;
  quantity: string;
  is_selected: boolean;
  image: string;
  weight: string;
}

export interface Tag {
  title?: string;
  icon?: ImageSourcePropType;
}

export interface Highlight {
  label?: string;
  value?: string;
}

export interface ReviewData {
  average_rating: string;
  total_reviews: string;
  rating_summary: RatingSummary[];
  reviews: Review[];
}

export interface RatingSummary {
  rate_number: number;
  rate_percentage: number;
}

export interface Review {
  name: string;
  rating: string;
  comment: string;
  date: string;
  media: Media[];
}

export interface Media {
  link: string;
  type: "image" | "video";
}

export interface Cart {
  is_added: boolean;
  quantity: number;
}

// Food Data
export interface RestaurantDetailResponse {
  restaurant: RestaurantInfo;
  categories: Category[];
  products: ProductRestaurant[];
}

export interface RestaurantInfo {
  id: string;
  name: string;
  location: string;
  delivery_time: string;
  distance_km: string;
  rating: string;
  review_count: number;
  logo: string;
  banner_image: string;
  opening_time: string; // e.g., "08:00:00"
  closing_time: string;
}

export interface Category {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface ProductRestaurant {
  id: string;
  name: string;
  category_id: string;
  price: number;
  rating: string;
  image: string;
  is_added_to_cart: boolean;
  quantity: number;
  is_favorite: boolean;
  description: string;
  is_variation: boolean;
  variation_id: string;
  variations: FoodProductVariation[];
  selected_variation: {
    variation_id: string;
    product_id: string;
    price: string;
    quantity: number;
    unit_id: string;
    unit: string;
    amount: string;
    in_stock: boolean;
    is_selected: boolean;
    weight: string;
  };
}

export interface FoodProductVariation {
  variation_id: string;
  product_id: string;
  price: string;
  quantity: number;
  unit_id: string;
  unit: string;
  amount: string;
  in_stock: boolean;
  is_selected: boolean;
}

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
  id: string;
  name: string;
  location: string;
  open_time: string;
  close_time: string;
  distance_km: string;
  rating: string;
  subcategory_id: string;
  logo: string;
  image: string;
  is_store_wishlisted: boolean;
  distance: string;
}

export interface SimilarProduct {
  product_img: ImageSourcePropType;
  product_final_price: string;
  product_price: string;
  product_weight: string;
}

export interface AddToCartDictData {
  product_id: string;
  variation_id?: string;
  quantity?: number;
  size_id?: string;
  color_id?: string;
  is_variation?: boolean;
  is_color?: boolean;
  is_size?: boolean;
}

// Compare Product
export interface ComapareProductData {
  id: string;
  name: string;
  description: string;
  gst_percentage: string;
  is_size: boolean;
  is_color: boolean;
  is_variation: boolean;
  image: string;
  rating: string;
  price: string;
  color_id: string;
  size_id: string;
  variation_id: string;
}

export interface SimilarCompareProductData {
  id: string;
  name: string;
  description: string;
  gst_percentage: string;
  is_size: boolean;
  is_color: boolean;
  is_variation: boolean;
  image: string;
  rating: string;
  price: string;
  weight?: string;
  color_id: string;
  size_id: string;
  variation_id: string;
}

// Cart
export interface OfferData {
  id: number;
  vendor_id: number | null;
  name: string;
  minimum_price: number | null;
  discount_percentage: string;
  coupon_code: string;
  type: string;
  description: string;
  duration_date: string | null;
  created_by: string;
  admin_id: number;
  is_block: boolean;
  is_approve: string;
  is_active: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  start_date: string; // ISO date format
  end_date: string; // ISO date format
}

export interface ApplyCouponResponseData {
  discount_price: string;
  total_bill: string;
  offer_data: OfferData;
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

export interface AddRemoveWishlistDictData {
  product_id: string;
  variation_id?: string;
  is_variation?: boolean;
}

// Manage Address
export interface AddressItem {
  title: string;
  default: boolean;
}

// Available Offers
export interface AvailableOfferItem {
  id: number;
  vendor_id: string | null;
  name: string;
  minimum_price: string | null;
  discount_percentage: string;
  coupon_code: string;
  type: string;
  description: string;
  duration_date: string | null;
  created_by: string;
  admin_id: number;
  is_block: boolean;
  is_approve: string;
  is_active: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  start_date: string;
  end_date: string;
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

// extra

export interface GroceriesFoodItem {
  type: string | null;
  image: FastImageSource;
}
