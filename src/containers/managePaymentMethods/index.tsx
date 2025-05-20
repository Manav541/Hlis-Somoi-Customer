import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import ManagePaymentMethodsComponent from "../../components/managePaymentMethods";
import {
  flashMessageSucess,
  showConfirmAlert,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text, View } from "react-native";
import { CardDetails } from "../../constants/interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { ScreenNames } from "../../routers";
import { styles } from "./styles";

const ManagePaymentMethodsContainer = ({ navigation, route }: any) => {
  console.log("route", route.params?.newCardData);
  const insets = useSafeAreaInsets();
  const [arrCards, setArrCards] = useState<CardDetails[]>([
    {
      card_number: "4567890123456789",
      card_expirydate: "12/23",
      card_holdername: "John Doe",
      card_cvv: "123",
      card_type: "visa",
      isSelected: false,
    },
    {
      card_number: "4567890123456789",
      card_expirydate: "12/23",
      card_holdername: "John Doe",
      card_cvv: "123",
      card_type: "mastercard",
      isSelected: false,
    },
  ]);

  const handleOnPressAddCard = () => {
    navigation.navigate("Add New Card");
  };
  const handleDelete = (index: number) => {
    showConfirmAlert("Are you sure want to delete this card?", () => {
      const updatedData = [...arrCards];
      updatedData.splice(index, 1);
      setArrCards(updatedData);
      flashMessageSucess(getTranslation("deleteCardSuccess"));
    });
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <View
          style={{
            paddingTop: insets.top,
            backgroundColor: colors.orange1c,
            paddingBottom: 14,
            flexDirection: "row",
          }}
        >
          <GlobalBackButton
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 0 }}
          />

          <Text style={{...styles.txtHeaderTitle,top : insets.top}}>
            {ScreenNames.managePaymentMethods}
          </Text>
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useEffect(() => {
    if (route?.params?.newCardData) {
      setArrCards((prevCards: CardDetails[]) => {
        const newCard = route.params.newCardData as CardDetails;
        return [...prevCards, newCard];
      });
    }
  }, [route?.params?.newCardData]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ManagePaymentMethodsComponent
      arrCards={arrCards}
      handleOnPressAddCard={handleOnPressAddCard}
      handleDelete={handleDelete}
    />
  );
};

export default ManagePaymentMethodsContainer;
