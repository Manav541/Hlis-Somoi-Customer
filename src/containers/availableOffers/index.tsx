import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import AvailableOffersComponent from "../../components/availableOffers";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { AvailableOfferItem } from "../../constants/interfaces";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";
import Clipboard from "@react-native-clipboard/clipboard";
import {
  flashMessageSucess,
  flashMessageWarning,
  rupeeSymbol,
} from "../../constants/GConstant";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";

const AvailableOffersContainer = ({ navigation }: any) => {
  // API Zustand Store
  const availableOffersApi = zustandStore.AvailableOffersStore(
    (state) => state.availableOffers
  );
  const [arrAvailableOffers, setArrAvailableOffers] = useState<
    AvailableOfferItem[]
  >([]);

  const copyToClipboard = (offerCode: string) => {
    Clipboard.setString(offerCode);
    flashMessageSucess(getTranslation("offerCodeCopySuccess"));
  };

  const handleAvailableOffersApi = async () => {
    try {
      const response = await availableOffersApi({}, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "AVAILABLE OFFERS RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          setArrAvailableOffers(response.data as AvailableOfferItem[]);
        } else if (response.code === statusCodes.invaildOrFail) {
          // flashMessageWarning(response.message);
          setArrAvailableOffers([]);
        } else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
          setArrAvailableOffers([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.availableOffers}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleAvailableOffersApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <AvailableOffersComponent
      arrAvailableOffers={arrAvailableOffers}
      copyToClipboard={copyToClipboard}
    />
  );
};

export default AvailableOffersContainer;
