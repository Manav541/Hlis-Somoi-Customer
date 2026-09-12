# PROJECT_SPECS.md — Somoi Customer App

## 1. Project Overview

| Field | Value |
|---|---|
| App Name | Somoi |
| Display Name | somoi |
| Package / Bundle ID | com.somoi |
| Version | 0.0.1 (versionName: 1.0, versionCode: 1) |
| Type | React Native CLI (not Expo) |
| Repository | https://github.com/RMC-Somoi/SomoiCustomer.git |
| Platform | iOS & Android |
| Architecture | Company Boilerplate (Container / Component pattern) |

Somoi is a multi-vendor e-commerce and food/delivery customer app. It supports product browsing, cart management, order placement, real-time delivery tracking, in-app chat, push notifications, and payment processing via Razorpay.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.79.1 |
| Language | TypeScript 5.0.4 |
| React | 19.0.0 |
| State Management | Zustand 5.0.3 |
| Navigation | React Navigation 7.x (Stack + Bottom Tabs) |
| HTTP Client | Axios 0.27.2 |
| Real-time | Socket.io-client 4.7.5 |
| Local Storage | react-native-mmkv 3.2.0 (encrypted) |
| Push Notifications | Firebase Messaging + Notifee |
| Error Tracking | Sentry (@sentry/react-native 7.0.1) |
| Payments | Razorpay (react-native-razorpay 2.3.0) |
| Maps | react-native-maps 1.20.1 + Google Maps |
| Localization | i18next 25.0.2 + react-i18next 15.5.1 |
| Image Handling | react-native-fast-image, react-native-image-picker, react-native-compressor |
| Cloud Storage | AWS S3 (ap-south-1) |
| Encryption | Native module (NativeEncryption.swift / CryptLib) |
| Testing | Jest 29.6.3 |
| Linting | ESLint 8.19.0 + Prettier 2.8.8 |
| Bundler | Metro (default RN config) |
| Node | ≥ 18 |

---

## 3. Environment & Tool Versions

| Tool | Version |
|---|---|
| React Native | 0.79.1 |
| Node.js | ≥ 18 (dev: 23.11.0) |
| Android Studio | Meerkat \| 2024.3.1 Patch 2 |
| Xcode | 16.2 |
| TypeScript | 5.0.4 |
| Kotlin | Enabled via org.jetbrains.kotlin.android |

---

## 4. Project Folder Structure

```
/
├── App.tsx                        # Root app component
├── index.js                       # Entry point, notification setup, Sentry init
├── app.json                       # App name config
├── package.json                   # Dependencies & scripts
├── babel.config.js                # Babel config (react-native-reanimated plugin)
├── metro.config.js                # Metro bundler config
├── jest.config.js                 # Jest test config
├── react-native.config.js         # Asset linking config
├── setupSentry.js                 # Sentry initialization
├── Gemfile                        # Ruby gems (CocoaPods)
│
├── android/                       # Android native project
│   ├── app/
│   │   ├── build.gradle           # App-level Gradle config
│   │   ├── google-services.json   # Firebase Android config
│   │   ├── debug.keystore         # Debug signing keystore
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       ├── java/com/somoi/    # Java/Kotlin native code
│   │       └── res/               # Android resources
│   ├── build.gradle               # Project-level Gradle
│   └── settings.gradle
│
├── ios/                           # iOS native project
│   ├── Podfile                    # CocoaPods dependencies
│   ├── GoogleService-Info.plist   # Firebase iOS config
│   ├── CryptLib.h / CryptLib.m    # Crypto native library
│   ├── NativeEncryption.m/.swift  # Native encryption module
│   ├── somoi-Bridging-Header.h    # Swift-ObjC bridge
│   ├── somoi/
│   │   ├── AppDelegate.swift
│   │   ├── Info.plist
│   │   ├── LaunchScreen.storyboard
│   │   ├── somoi.entitlements
│   │   └── Images.xcassets/       # App icons & splash
│   └── somoi.xcworkspace/
│
├── __tests__/
│   └── App.test.tsx               # Root app test
│
└── src/
    ├── api/                       # API layer
    │   ├── APIConstant.tsx        # Base URLs, endpoints, status codes, keys
    │   ├── ApiManager.tsx         # HTTP request handlers
    │   └── AWSUpload.tsx          # S3 upload logic
    │
    ├── assets/
    │   ├── fonts/                 # 51 font files (Golos Text, Montserrat)
    │   └── images/                # App images & icons
    │
    ├── components/                # Feature-specific UI components
    │   ├── authentication/
    │   ├── bottomTabs/
    │   ├── chat/
    │   ├── productListing/
    │   ├── viewProductDetail/
    │   ├── orderSummary/
    │   ├── driverTracking/
    │   ├── manageAddresses/
    │   ├── myWishlist/
    │   ├── notification/
    │   ├── rateAndReview/
    │   ├── returnOrder/
    │   └── [20+ more feature folders]
    │
    ├── containers/                # Screen-level containers (30 screens)
    │   ├── authentication/        # Onboarding, SignIn, SignUp, Verification, ForgotPassword, ChangePassword, AddAddress, GoogleSearchPlaces
    │   ├── bottomTabs/            # Home, Categories, Cart, MyOrders, Setting
    │   ├── addCompareProducts/
    │   ├── addNewCard/
    │   ├── availableOffers/
    │   ├── cancelOrder/
    │   ├── changeEmailPhoneNumber/
    │   ├── chat/
    │   ├── cmsPages/
    │   ├── compareProduct/
    │   ├── contactUs/
    │   ├── driverTracking/
    │   ├── editProfile/
    │   ├── manageAddresses/
    │   ├── managePaymentMethods/
    │   ├── myWishlist/
    │   ├── notification/
    │   ├── orderSummary/
    │   ├── paymentMethod/
    │   ├── productListing/
    │   ├── rateAndReview/
    │   ├── reportIssue/
    │   ├── returnExchangeItemList/
    │   ├── returnOrder/
    │   ├── review/
    │   ├── search/
    │   ├── viewAllBestProducts/
    │   ├── viewAllBestSellers/
    │   ├── viewAllSubCategories/
    │   ├── viewProductDetail/
    │   └── viewRestaurantDetail/
    │
    ├── constants/
    │   ├── Colors.tsx             # App color palette
    │   ├── FontFamily.tsx         # Font family constants
    │   ├── FontSizes.tsx          # Font size scale
    │   ├── GConstant.tsx          # Global constants, notification types, emitter types
    │   ├── Images.tsx             # Centralized image imports
    │   ├── interfaces.tsx         # 50+ TypeScript interfaces
    │   ├── Loader.tsx             # Global loader component
    │   ├── Regex.tsx              # Validation regex patterns
    │   ├── Styles.tsx             # Shared styles
    │   └── utils/
    │       ├── MmkvManager.tsx    # MMKV storage wrapper
    │       ├── LocationManager.ts # Geolocation utilities
    │       ├── Platform.ts        # iOS/Android detection
    │       └── Notification/      # Notification navigation helpers
    │
    ├── global/                    # Reusable global UI components
    │   ├── GlobalButton/
    │   ├── GlobalTextInput/
    │   ├── GlobalBackButton/
    │   ├── GlobalDropdown/
    │   ├── GlobalCountryModal/
    │   ├── GlobalSuccessModal/
    │   ├── GlobalOrderStatusButton/
    │   ├── GlobalEmailPhoneButton/
    │   └── GlobalLogoTitle/
    │
    ├── localization/
    │   ├── i18n/
    │   │   └── i18n.config.ts     # i18next setup
    │   └── translation/
    │       ├── en.tsx             # English strings
    │       └── index.ts           # Translation exports
    │
    ├── routers/
    │   ├── index.tsx              # ScreenNames enum + MyScreens map
    │   ├── mainNavigation.tsx     # Root Stack Navigator
    │   └── bottomTabsNavigation.tsx # Bottom Tab Navigator
    │
    └── store/                     # Zustand state stores
        ├── index.tsx              # Aggregated store exports
        ├── authentication/        # Auth API calls
        ├── home/                  # Home screen data
        ├── productListing/        # Product listing
        ├── cart/                  # Cart operations
        ├── cartItemCount/         # Cart badge count
        ├── myOrders/              # Order history
        ├── myWishlist/            # Wishlist
        ├── chat/                  # Chat history
        ├── chatNotification/      # Chat notification state
        ├── compareProduct/        # Product comparison
        ├── rateAndReview/         # Ratings & reviews
        ├── availableOffers/       # Offers/coupons
        ├── addAddress/            # Address management
        ├── notification/          # Notification list
        ├── s3ImageUpload/         # S3 upload state
        ├── keys/                  # API secret keys
        └── verfication/           # OTP verification
```

---

## 5. Navigation Architecture

### Stack Navigator (MainNavigation)

All screens are registered in a single root Stack Navigator with `slide_from_right` animation.

**Authentication Group**
| Screen Name | Container |
|---|---|
| Onboarding | OnboardingContainer |
| Sign Up | SignupContainer |
| Sign In | SignInContainer |
| Verification | VerificationContainer |
| Forgot Password | ForgotPasswordContainer |
| Change Password | ChangePasswordContainer |
| Add Address | AddAddressContainer |
| Search Address | GoogleSearchPlacesContainer |

**Main App (post-login)**
| Screen Name | Container |
|---|---|
| BottomTabs | BottomTabsNavigation |
| Search | SearchContainer |
| All Categories | ViewAllSubCategoriesContainer |
| Best Products | ViewAllBestProductsContainer |
| Best Sellers | ViewAllBestSellersContainer |
| Notification | NotificationContainer |
| Product Detail | ViewProductDetailContainer |
| Restaurant Detail | ViewRestaurantDetailContainer |
| Review | ReviewContainer |
| Compare Product | CompareProductConteiner |
| Add Compare Product | AddCompareProductsContainer |
| Payment Method | PaymentMethodContainer |
| Product Listing | ProductListingContainer |
| Order Summary | OrderSummaryContainer |
| Cancel Order | CancelOrderContainer |
| Item List (Return) | ReturnExchangeItemListContainer |
| Return Order | ReturnOrderContainer |
| Rate & Review | RateAndReviewContainer |
| Report Issue | ReportIssueContainer |
| Tracking | DriverTrackingContainer |
| Chat | ChatContainer |
| Edit Profile | EditProfileContainer |
| CMS Page | CMSPageContainer |
| Available Offers | AvailableOffersContainer |
| Contact Us | ContactUsContainer |
| Manage Address | ManageAddressesContainer |
| My Wishlist | MyWishlistContainer |
| Change Email/Phone | ChangeEmailPhoneNumberContainer |
| Manage Payment Methods | ManagePaymentMethodsContainer |
| Add New Card | AddNewCardContainer |

### Bottom Tab Navigator

Custom tab bar (`CustomBottomTabsContainer`) with 5 tabs:

| Tab | Screen |
|---|---|
| Home | HomeContainer |
| Categories | CategoriesContainer |
| Your Cart | CartContainer |
| My Orders | MyOrdersContainer |
| Setting | SettingContainer |

---

## 6. State Management (Zustand)

All API calls are encapsulated in Zustand stores. Each store uses `create<Store>()` and returns Promises resolving to `APIResponseType`.

### Store Registry (`src/store/index.tsx`)

| Store Key | Module |
|---|---|
| KeyStore | API secret key fetching |
| AuthStore | Auth operations (signup, signin, logout, profile, etc.) |
| OtpVerificationStore | OTP request & verification |
| HomeStore | Home screen data (banners, categories, products) |
| NotificationListStore | Notification listing |
| ProductListingStore | Category-wise product listing, filter/sort |
| CompareProductStore | Product comparison operations |
| RateAndReviewStore | Ratings & reviews CRUD |
| MyOrdersStore | Order listing, details, cancel, return |
| CartStore | Cart CRUD, coupon apply/remove, place order |
| CartItemCountStore | Reactive cart item count |
| AddressStore | Address CRUD |
| AvailableOffersStore | Offers listing |
| MyWishlistStore | Wishlist add/remove/list |
| ChatHistoryStore | Chat message history |
| ChatNotificationStore | Active chat receiver tracking |
| S3ImageUploadStore | S3 pre-signed upload |

---

## 7. API Layer

### Base URL
```
Development: https://devapi.somoi.in/api/v1
Socket:      https://devapi.somoi.in/chat?user_id=<id>
```

### APIManager Methods

| Method | Auth | Description |
|---|---|---|
| `getServerRequestWithToken` | Yes | Authenticated GET |
| `getServerRequestWithoutToken` | No | Public GET |
| `postServerRequestWithToken` | Yes | Authenticated POST |
| `postServerRequestWithoutToken` | No | Public POST |

### Request Encryption
- All request bodies are encrypted using `NativeEncryption` native module
- Secret Key: `DLNnPAmcTEBcLLQ8VtpJzzir7trF0ssE`
- IV: `DLNnPAmcTEBcLLQ8`
- API Key Header: `api-key: QYp3JjmtmNGe3Xy/+2Ensw==`

### API Status Codes

| Code | Meaning |
|---|---|
| 1 | Success |
| 0 | Invalid / Failed |
| 2 | Empty Data |
| -1 | Session Expired (auto-logout) |
| 12 | Cart Quantity Not Found |
| 13 | Invalid Location ID |

### API Endpoint Groups

**Authentication**
- `/auth/customer/signup`, `/auth/customer/login`
- `/auth/customer/request-otp`, `/auth/customer/otp-verification`
- `/auth/customer/forgot-password-email-verification`, `/auth/customer/change-forgot-password`
- `/auth/customer/change-password`, `/auth/customer/edit-profile`
- `/auth/customer/update-phone-email-verification`, `/auth/customer/update-phone-email`
- `/auth/customer/logout`, `/auth/customer/delete-account`
- `/auth/customer/get-customer-details`, `/auth/customer/cms-pages`

**Home**
- `/home/customer/categories-listing`, `/home/customer/banner-listing`
- `/home/customer/sub-listing`, `/home/customer/home-product-listing`
- `/home/customer/search-product`, `/home/customer/notification-listing`

**Products & Categories**
- `/home/customer/categroywise-products`, `/home/customer/filter-sort`
- `/home/customer/product-details`, `/home/customer/food-details`
- `/home/customer/add-to-cart`, `/home/customer/update-cart-quantity`, `/home/customer/remove-cart-data`

**Compare Products**
- `/home/customer/compare-products-details`, `/home/customer/similar-compare-products-listing`
- `/home/customer/compare-products-insert`, `/home/customer/remove-product-from-compare`

**Rate & Review**
- `/home/customer/rate-review-listing`, `/home/customer/rate-vendor`, `/home/customer/rate-product`
- `/home/customer/edit-ratings`, `/home/customer/delete-ratings`

**Cart & Orders**
- `/home/customer/apply-offer`, `/home/customer/remove-offer`
- `/home/customer/get-cart-data`, `/home/customer/insert-order`, `/home/customer/create-payment`
- `/home/customer/order-listing`, `/home/customer/order-details`
- `/home/customer/cancel-reject-order-reason-listing`, `/home/customer/cancel-order`
- `/home/customer/insert-report`, `/home/customer/return-order`

**Tracking & Chat**
- `/home/customer/delivery-boy-location`
- `/chat/chat_history`

**Settings & Address**
- `/home/customer/contact-us`
- `/home/customer/location-data`, `/home/customer/add-update-location`
- `/home/customer/update-location-data`, `/home/customer/delete-location`
- `/home/customer/list-offer-listing`
- `/home/customer/wishlist-product`, `/home/customer/wishlist-list`, `/home/customer/wishlist-store`

**Admin / Utility**
- `/admin/secret-key`, `/admin/get-cod-status`, `/admin/get-driver-directions`
- `/admin/search-places`, `/home/customer/get-address-from-coords`
- `/home/customer/upload-images`

---

## 8. Authentication Flow

```
App Launch
    │
    ├── First Time → Onboarding → Sign Up → OTP Verification → Add Address → Home
    │
    ├── Returning User → Sign In → Home
    │
    ├── Forgot Password → Email Verification → Change Password → Sign In
    │
    └── Guest Mode → Browse (limited features, prompt to sign in on restricted actions)

Token Storage: MMKV encrypted storage
Session Expiry: API status -1 triggers auto-logout and navigation reset to Sign In
```

---

## 9. Third-Party Integrations

### Firebase
- **Android**: `google-services.json` (Project: somoi-3c4b0)
- **iOS**: `GoogleService-Info.plist`
- **Usage**: FCM push notifications (foreground, background, initial)
- **Packages**: `@react-native-firebase/app`, `@react-native-firebase/messaging`

### Notifee
- Local notification display and channel management
- Android channel: `default-channel-id` (HIGH importance, vibration, sound)
- Handles notification tap events for navigation

### Sentry
- DSN: `https://431ae41749f45853ad04f2746e20f2f0@o4509723310686208.ingest.us.sentry.io/4509727911641088`
- Traces sample rate: 1.0 (100%)
- PII collection enabled
- Initialized in `setupSentry.js` before app mount

### AWS S3
- Region: `ap-south-1`
- Bucket (dev): `somoi-delivery-app-dev`
- URL: `https://somoi-delivery-app-dev.s3.ap-south-1.amazonaws.com/`
- Upload folders: `customers_images`, `reports_media`, `rating_media`, `chat_media`, `order_return_media`
- Signed URL upload with MIME type detection

### Razorpay
- Payment gateway for order checkout
- Package: `react-native-razorpay`

### Google Maps / Places
- Maps: `react-native-maps` with Google Maps provider
- Places search: `react-native-google-places-textinput`
- Route polyline: `@mapbox/polyline`
- Geolocation: `@react-native-community/geolocation` + `geolib`

### Socket.io
- Real-time chat between customer and delivery driver
- URL: `https://devapi.somoi.in/chat?user_id=<id>`

---

## 10. Notification System

### Notification Types (from GConstant)

| Category | Types |
|---|---|
| Admin | ADMIN_NOTIFICATION |
| Support | CONTACT_US |
| Payment | PAYMENT_SUCCESS, PAYMENT_FAILED, REFUND |
| Orders | ORDER_PLACED, ORDER_ACCEPTED, ORDER_PREPARING, ORDER_PREPARED, ORDER_PACKAGING, ORDER_OUT_FOR_DELIVERY, ORDER_DELIVERED, ORDER_CANCELLED, ORDER_REJECTED |
| Returns | ORDER_RETURN_REQUESTED, ORDER_RETURN_ACCEPTED, ORDER_RETURNED |
| Delivery | DELIVERY_PERSON_NOT_AVAILABLE |
| Chat | NEW_CHAT_RECEIVED |

### Notification Handlers (index.js)
- `setBackgroundMessageHandler` — Firebase background messages
- Foreground message handler
- Initial notification handler (app opened from killed state)
- Notifee foreground & background event handlers
- `DeviceEventEmitter` for order status updates within the app

---

## 11. Local Storage (MMKV)

All persistent data is stored via `MmkvManager` (encrypted MMKV):

| Key | Data |
|---|---|
| Language | Selected app language |
| Onboarding | Whether onboarding was shown |
| IsLoggedIn | Login state boolean |
| AuthToken | JWT authentication token |
| CustomerDetails | Serialized customer profile |
| FCMToken | Firebase Cloud Messaging token |

---

## 12. Permissions

### iOS (Podfile)
- Camera
- LocationAccuracy, LocationAlways, LocationWhenInUse
- MediaLibrary
- Notifications
- PhotoLibrary, PhotoLibraryAddOnly

### Android (AndroidManifest.xml)
- Camera, Gallery, Location, Notifications, Internet, etc.

---

## 13. Android Configuration

| Property | Value |
|---|---|
| Application ID | com.somoi |
| Namespace | com.somoi |
| Min SDK | rootProject.ext.minSdkVersion |
| Target SDK | rootProject.ext.targetSdkVersion |
| Version Code | 1 |
| Version Name | 1.0 |
| Build Tools | rootProject.ext.buildToolsVersion |
| Kotlin | org.jetbrains.kotlin.android |
| Google Services | com.google.gms.google-services |
| JS Engine | Hermes (default) |
| Proguard | Disabled in release (configurable) |

**Dependencies**
- `com.facebook.react:react-android`
- `com.google.firebase:firebase-messaging`
- `com.google.android.gms:play-services-location:21.0.1`

---

## 14. iOS Configuration

| Property | Value |
|---|---|
| Bundle ID | com.somoi |
| Min iOS | min_ios_version_supported (RN default) |
| Xcode | 16.2 |
| Workspace | somoi.xcworkspace |
| Scheme | somoi |
| Frameworks | Static linkage (`use_frameworks! :linkage => :static`) |
| Bridging Header | somoi-Bridging-Header.h |
| Certificates | ios/SomoiDevelopmentCertificates.zip |

**Native Modules**
- `NativeEncryption.swift` — AES encryption/decryption
- `CryptLib.h / CryptLib.m` — Cryptography utilities

---

## 15. Fonts

Two font families, 51 total `.ttf` files:

**Golos Text** — Black, Bold, ExtraBold, Medium, Regular, SemiBold

**Montserrat** — Black, BlackItalic, Bold, BoldItalic, ExtraBold, ExtraBoldItalic, ExtraLight, ExtraLightItalic, Italic, Light, LightItalic, Medium, MediumItalic, Regular, SemiBold, SemiBoldItalic, Thin, ThinItalic (+ Variable variants)

---

## 16. Scripts

```bash
npm start              # Start Metro bundler
npm run android        # Run on Android emulator/device
npm run ios            # Run on iOS simulator/device
npm test               # Run Jest tests
npm run lint           # Run ESLint
npm run build          # Clean + bundle + assembleDebug APK (Android)
```

**Full build command:**
```bash
cd android && ./gradlew clean && cd .. && \
npx react-native bundle --dev false --platform android \
  --entry-file index.js \
  --bundle-output ./android/app/src/main/assets/index.android.bundle \
  --assets-dest ./android/app/src/main/res && \
cd android && ./gradlew assembleDebug
```

---

## 17. Testing

- **Framework**: Jest 29.6.3
- **Preset**: react-native
- **Test file**: `__tests__/App.test.tsx`
- **Types**: `@types/jest`, `@types/react`, `@types/react-test-renderer`
- **Renderer**: react-test-renderer 19.0.0

---

## 18. Installation & Setup

```bash
# 1. Clone
git clone https://github.com/RMC-Somoi/SomoiCustomer.git
cd SomoiCustomer

# 2. Install JS dependencies
npm install
# If peer dependency issues:
npm install --legacy-peer-deps

# 3. iOS pods
cd ios && pod install && cd ..

# 4. Start Metro
npx react-native start

# 5. Run
npx react-native run-ios
npx react-native run-android
```

### Known Issues & Fixes

**Emoji Picker (react-native-emoji-selector)**
In `node_modules/react-native-emoji-selector/index.js` line 95, change:
```js
// Before
fontSize: 24 + tabSize
// After
fontSize: 16
```

**Pod Installation Errors**
```bash
pod deintegrate
rm -rf Podfile.lock
pod repo update
pod install
```

---

## 19. Key Features Summary

| Feature | Details |
|---|---|
| Authentication | Signup, Login, OTP, Forgot Password, Guest Mode |
| Home | Banners, Categories, Best Products, Best Sellers, Search |
| Shopping | Product listing, Details, Compare, Wishlist, Cart |
| Checkout | Coupon/Offer codes, Razorpay payment, COD |
| Orders | History, Details, Cancel, Return/Exchange, Report Issue |
| Tracking | Real-time driver location on map, route polyline |
| Chat | In-app chat with driver via Socket.io |
| Notifications | FCM push + in-app, order lifecycle events |
| Profile | Edit profile, Change email/phone, Change password, Delete account |
| Addresses | Add, edit, delete delivery addresses with Google Places |
| Payments | Manage payment methods, Add new card |
| Offers | Browse available offers/coupons |
| CMS | Dynamic CMS pages (Terms, Privacy, etc.) |
| Localization | i18next multi-language support |
| Ratings | Rate products and vendors, edit/delete ratings |
