import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
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

const App = () => {
  const flashMessageRef = useRef<any>(null);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (initialRoute !== null) {
      const timeout = setTimeout(() => {
        SplashScreen.hide();
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [initialRoute]);

  // For Navigation
  useEffect(() => {
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
  }, []);

  // ✅ Setup global loader listener separately
  useEffect(() => {
    setLoaderRef({
      toggleLoader: (show: boolean) => {
        setShowLoader(show);
      },
    });

    // Optional: cleanup on unmount
    return () => setLoaderRef(null);
  }, []);

  if (initialRoute === null) {
    return (
      <View style={styles.vwActivityIndicator}>
        <ActivityIndicator size="large" color={colors.orange1c} />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <StatusBar backgroundColor={colors.orange1c} barStyle={"dark-content"} />
      <MainNavigation initialRoute={initialRoute} />
      <View style={styles.flashMessage}>
        <FlashMessage position={"top"} ref={flashMessageRef} />
      </View>
      {/* ✅ Global Loader */}
      {showLoader && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              backgroundColor: colors.white,
            }}
            size="large"
            color={colors.orange1c}
          />
        </View>
      )}
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  flashMessage: {
    zIndex: 1000,
    elevation: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: "box-none",
  },
  vwActivityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.blue4e,
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 999,
  },
});

export default App;
