import { View, Text } from "react-native";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import MainNavigation from "./src/routers/mainNavigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/localization/i18n/i18n.config";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <MainNavigation />
    </I18nextProvider>
  );
};

export default App;
