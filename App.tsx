import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import MainNavigation from "./src/routers/mainNavigation";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/localization/i18n/i18n.config";
import FlashMessage from "react-native-flash-message";

const App = () => {
  const flashMessageRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 3000);

    
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <MainNavigation />
      <View style={styles.flashMessage}>
        <FlashMessage position={"top"} ref={flashMessageRef} />
      </View>
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
});

export default App;
