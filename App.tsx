import {
  View,
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
import Loader from "./src/constants/Loader";
import { constnatStyles } from "./src/constants/Styles";
import {requestUserForNotificationPermission} from './src/constants/utils/Notification/PushNotificationHelper';
import {PlatformVersion} from './src/constants/utils/Platform';


const App = () => {
  const flashMessageRef = useRef<any>(null);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  

  useEffect(() => {
    if (initialRoute !== null) {
      const timeout = setTimeout(() => {
        SplashScreen.hide();
      }, 1500);

      return () => clearTimeout(timeout);
    }
    PlatformVersion.isAndroid && requestUserForNotificationPermission();
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

  if (initialRoute === null) {
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
