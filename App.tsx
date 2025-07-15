import {
  View,
  ActivityIndicator,
  StatusBar,
  AppState,
  Linking,
  Alert,
} from "react-native";
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
import { PlatformVersion } from "./src/constants/utils/Platform";
import { zustandStore } from "./src/store";
import LocationManager from "./src/constants/utils/LocationManager";

const App = () => {
  const setCurrentLocation = zustandStore.AddressStore(
    (state) => state.setCurrentLocation
  );
  const setFormattedAddress = zustandStore.AddressStore(
    (state) => state.setFormattedAddress
  );

  const flashMessageRef = useRef<any>(null);
  const hasShownAlertRef = useRef(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "blocked" | null
  >(null);

  // ✅ 1. Location permission logic
  useEffect(() => {
    const checkAndPrompt = async () => {
      // ✅ Step 1: Ensure Device Location is ON (GPS enabled)
      const isLocationEnabled = await LocationManager.ensureDeviceLocationOn();

      if (!isLocationEnabled) {
        // Don't proceed unless GPS is on
        return;
      }

      // ✅ Step 2: Check location permission
      const status = await LocationManager.checkLocationPermission();
      setPermissionStatus(status);

      if (status === "granted") {
        hasShownAlertRef.current = false;
      } else if (!hasShownAlertRef.current) {
        hasShownAlertRef.current = true;

        Alert.alert(
          "Location Permission Required",
          "You must allow location access to use this app.",
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(), // opens app settings
            },
          ],
          { cancelable: false }
        );
      }
    };

    checkAndPrompt();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        hasShownAlertRef.current = false; // allow showing alert again
        checkAndPrompt(); // re-check on app resume
      }
    });

    return () => subscription.remove();
  }, []);

  // ✅ 2. Notification permission logic (unchanged)
  useEffect(() => {
    if (initialRoute !== null) {
      const timeout = setTimeout(() => {
        SplashScreen.hide();
      }, 1500);

      return () => clearTimeout(timeout);
    }

    PlatformVersion.isAndroid && requestUserForNotificationPermission();
  }, [initialRoute]);

  // ✅ 3. Fetch location only if granted
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await LocationManager.getCurrentLocation();
      if (location) {
        setCurrentLocation(location);
        const address = await LocationManager.getFormattedAddress(location);
        setFormattedAddress(address || "");
      }
    };

    if (permissionStatus === "granted") {
      fetchLocation();
    }
  }, [permissionStatus]);

  // ✅ 4. Navigation route setup
  useEffect(() => {
    if (!permissionStatus) return;

    MmkvManager.getData(
      MmkvManager.Keys.isOnBoardingVisisted,
      (isOnBoardingVisited) => {
        if (isOnBoardingVisited) {
          MmkvManager.getData(MmkvManager.Keys.isLoggedIn, (isLoggedIn) => {
            if (isLoggedIn) {
              setInitialRoute(ScreenNames.bottomTabsNavigation);
            } else {
              MmkvManager.getData(
                MmkvManager.Keys.isGuestUser,
                (isGuestUser) => {
                  if (isGuestUser) {
                    setInitialRoute(ScreenNames.bottomTabsNavigation);
                  } else {
                    setInitialRoute(ScreenNames.signup);
                  }
                }
              );
            }
          });
        } else {
          setInitialRoute(ScreenNames.onboarding);
        }
      }
    );
  }, [permissionStatus]);

  // ✅ 5. Show loader until route & permission ready
  if (initialRoute === null || permissionStatus === null) {
    return (
      <View style={constnatStyles.vwActivityIndicator}>
        <ActivityIndicator size="large" color={colors.orange1c} />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar backgroundColor={colors.orange1c} barStyle={"dark-content"} />
      <MainNavigation initialRoute={initialRoute} />
      <View style={constnatStyles.flashMessage}>
        <FlashMessage position={"top"} ref={flashMessageRef} />
      </View>
      <Loader ref={(ref) => setLoaderRef(ref)} />
    </I18nextProvider>
  );
};

export default App;
