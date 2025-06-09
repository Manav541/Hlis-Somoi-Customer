import {
  View,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import {  toggleLoader } from "../../constants/GConstant";
import WebView from "react-native-webview";

interface PropsType {
  webViewLink: string;
}

const CMSPageComponent = (props: PropsType) => {
  return (
    <View style={styles.vwMain}>
      {props?.webViewLink !== "" && (
        <WebView
          showsVerticalScrollIndicator={false}
          containerStyle={{ flexGrow: 1 }}
          source={{ uri: props?.webViewLink }}
          onLoadStart={() => {
            toggleLoader(true);
          }}
          onLoadEnd={() => {
            toggleLoader(false);
          }}
        />
      )}
    </View>
  );
};

export default CMSPageComponent;
