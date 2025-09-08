import { View, ActivityIndicator, StatusBar, Linking } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import MainNavigation from "./src/routers/mainNavigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/localization/i18n/i18n.config";
import FlashMessage from "react-native-flash-message";
import { MmkvManager } from "./src/constants/utils/MmkvManager";
import { ScreenNames } from "./src/routers";
import { colors } from "./src/constants/Colors";
import { setLoaderRef } from "./src/constants/GConstant";
import Loader from "./src/constants/Loader";
import { constnatStyles } from "./src/constants/Styles";
import { requestUserForNotificationPermission } from "./src/constants/utils/Notification/PushNotificationHelper";
import { navigate, navigationRef } from "./src/constants/utils/Notification/notificationNavigation";
import LocationManager, { Coordinates } from "./src/constants/utils/LocationManager";

// Navigation parameter types
interface ProductDetailParams {
  product_id: string | null;
  is_variation: boolean;
  variation_id: string | null;
  size_id: string | null;
  color_id: string | null;
  is_size: boolean;
  is_color: boolean;
  customer_latitude: number;
  customer_longitude: number;
}

interface StoreDetailParams {
  vendor_id: string | null;
  customer_latitude: number;
  customer_longitude: number;
}

interface PendingNavigation {
  screen: string;
  params: ProductDetailParams | StoreDetailParams;
}

// Universal Link Configuration
const linking = {
  prefixes: ["https://devapi.somoi.in"],
};

// Helper to get boolean from MmkvManager
const getMmkvBool = (key: string) =>
  new Promise<boolean>((resolve) => {
    MmkvManager.getData(key, (value: any) => resolve(!!value));
  });

const App = () => {
  const flashMessageRef = useRef<any>(null);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<PendingNavigation | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [formattedAddress, setFormattedAddress] = useState<string>("");

  // Check and fetch current location
  useEffect(() => {
    const checkAndFetchLocation = async () => {
      const granted = await LocationManager.ensureLocationPermission();
      if (granted) {
        // ✅ Permission granted – now fetch and store location
        const location = await LocationManager.getCurrentLocation();
        if (location) {
          setCurrentLocation(location);
          const address = await LocationManager.getFormattedAddress(location);
          setFormattedAddress(address || "");
        }
      }
    };
    checkAndFetchLocation();
  }, []);

  // Handle notifications and splash screen
  useEffect(() => {
    if (initialRoute !== null) {
      const timeout = setTimeout(() => SplashScreen.hide(), 1500);
      return () => clearTimeout(timeout);
    }
    requestUserForNotificationPermission();
  }, [initialRoute]);

  // Handle deep links and initial route
  useEffect(() => {
    const parseUrl = (url: string | null) => {
      if (!url) return null;

      // Extract path (last segment before '?')
      const pathPart = url.replace(/^https?:\/\/[^/]+/, "").split("?")[0];
      const path = pathPart.split("/").filter(Boolean).pop() || null;

      // Extract query parameters
      const queryString = url.split("?")[1] || "";
      const params: { [key: string]: string } = {};
      queryString.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        if (key && value) params[key] = decodeURIComponent(value);
      });

      return { path, params };
    };

    const handleDeepLink = async ({ url, isInitial }: { url: string | null; isInitial: boolean }) => {
      if (!url) return false;

      console.log("Deep link URL:", url);
      const parsed = parseUrl(url);
      if (!parsed) return false;

      const { path, params } = parsed;
      console.log("Path:", path);

      const isLoggedIn = await getMmkvBool(MmkvManager.Keys.isLoggedIn);
      if (!isLoggedIn) {
        console.log("Not logged in, redirecting to login if possible");
        if (!isInitial && navigationRef.current) {
          navigate(ScreenNames.signup, {});
        }
        return false;
      }

      if (path === "product-details" && params["product_id"]) {
        // Ensure location services are enabled
        const isLocationEnabled = await LocationManager.ensureDeviceLocationOn();
        if (!isLocationEnabled) {
          console.log("Location services are disabled, cannot navigate to product details");
          return false;
        }

        // Check if currentLocation is available
        if (!currentLocation) {
          console.log("Current location not available, cannot navigate to product details");
          return false;
        }

        const navParams: ProductDetailParams = {
          product_id: params["product_id"],
          is_variation: params["is_variation"] === "true",
          variation_id: params["is_variation"] === "true" ? params["variation_id"] || null : null,
          size_id: params["is_size"] === "true" ? params["size_id"] || null : null,
          color_id: params["is_color"] === "true" ? params["color_id"] || null : null,
          is_size: params["is_size"] === "true",
          is_color: params["is_color"] === "true",
          customer_latitude: currentLocation.latitude,
          customer_longitude: currentLocation.longitude,
        };
        console.log("Queueing navigation to productDetail:", navParams);
        setPendingNavigation({ screen: ScreenNames.productDetail, params: navParams });
        return true;
      } else if (path === "store-details" && params["vendor_id"]) {
        // Ensure location services are enabled
        const isLocationEnabled = await LocationManager.ensureDeviceLocationOn();
        if (!isLocationEnabled) {
          console.log("Location services are disabled, cannot navigate to store details");
          return false;
        }

        // Check if currentLocation is available
        if (!currentLocation) {
          console.log("Current location not available, cannot navigate to store details");
          return false;
        }

        const navParams: StoreDetailParams = {
          vendor_id: params["vendor_id"],
          customer_latitude: currentLocation.latitude,
          customer_longitude: currentLocation.longitude,
        };
        console.log("Queueing navigation to storeDetail:", navParams);
        setPendingNavigation({ screen: ScreenNames.restaurantDetail, params: navParams });
        return true;
      } else {
        console.log(
          path === "product-details" ? "Missing product_id" :
          path === "store-details" ? "Missing vendor_id" :
          `Unhandled path: ${path}`
        );
        return false;
      }
    };

    const initializeApp = async () => {
      // Wait for location to be available
      const granted = await LocationManager.ensureLocationPermission();
      if (!granted || !currentLocation) {
        console.log("Location not available, proceeding with default route");
        // Proceed with default route if location is not available
      } 

      // Check for deep link
      let deepLinkHandled = false;
      let hasValidDeepLink = false;
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        const parsed = parseUrl(initialUrl);
        if (parsed && 
            ((parsed.path === "product-details" && parsed.params["product_id"]) || 
             (parsed.path === "store-details" && parsed.params["vendor_id"]))) {
          hasValidDeepLink = true;
        }
        deepLinkHandled = await handleDeepLink({ url: initialUrl, isInitial: true });
      }

      // Always proceed with MmkvManager logic
      MmkvManager.getData(MmkvManager.Keys.isOnBoardingVisisted, (visited) => {
        if (visited) {
          MmkvManager.getData(MmkvManager.Keys.isLoggedIn, (loggedIn) => {
            if (loggedIn) {
              setInitialRoute(ScreenNames.bottomTabsNavigation);
            } else {
              MmkvManager.getData(MmkvManager.Keys.isGuestUser, (isGuest) => {
                if (hasValidDeepLink && !deepLinkHandled) {
                  setInitialRoute(ScreenNames.signup);
                } else {
                  setInitialRoute(isGuest ? ScreenNames.bottomTabsNavigation : ScreenNames.signup);
                }
              });
            }
          });
        } else {
          setInitialRoute(ScreenNames.onboarding);
        }
      });
    };

    initializeApp();

    // Handle dynamic deep links
    const subscription = Linking.addEventListener("url", ({ url }) => handleDeepLink({ url, isInitial: false }));
    return () => subscription.remove();
  }, [currentLocation]);

  // Execute queued navigation for dynamic links
  useEffect(() => {
    if (pendingNavigation && navigationRef.current) {
      console.log("Navigating to:", pendingNavigation.screen, pendingNavigation.params);
      navigate(pendingNavigation.screen, pendingNavigation.params);
      setPendingNavigation(null);
    }
  }, [pendingNavigation]);

  if (initialRoute === null) {
    return (
      <View style={constnatStyles.vwActivityIndicator}>
        <ActivityIndicator size="large" color={colors.orange1c} />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar backgroundColor={colors.orange1c} barStyle="dark-content" />
      <MainNavigation initialRoute={initialRoute} linkingUrl={linking} />
      <View style={constnatStyles.flashMessage}>
        <FlashMessage position="top" ref={flashMessageRef} />
      </View>
      <Loader ref={(ref) => setLoaderRef(ref)} />
    </I18nextProvider>
  );
};

export default App;