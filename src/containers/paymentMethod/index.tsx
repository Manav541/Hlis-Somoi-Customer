import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import PaymentMethodComponent from "../../components/paymentMethod";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { ScreenNames } from "../../routers";
import { CardDetails } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";

const PaymentMethodContainer = ({ navigation }: any) => {
  const [total, setTotal] = useState<string>("₹ 732");
  const [orderNumber, setOrderNumber] = useState<string>("#123456789");
  const [isCodSelected, setIsCodSelected] = useState<boolean>(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);

  const [arrCards, setArrCards] = useState<CardDetails[]>([
    {
      card_number: "4567890123453266",
      card_expirydate: "12/23",
      card_holdername: "John Doe",
      card_cvv: "123",
      card_type: "visa",
      isSelected: true,
    },
    {
      card_number: "4567890123453266",
      card_expirydate: "12/23",
      card_holdername: "John Doe",
      card_cvv: "123",
      card_type: "mastercard",
      isSelected: false,
    },
  ]);

  const onPressCodSelect = () => {
    setIsCodSelected(true);
    setArrCards((prev: CardDetails[]) =>
      prev.map((card) => ({ ...card, isSelected: false }))
    );
  };

  const onPressCardSelect = (index: number) => {
    setIsCodSelected(false);
    setArrCards((prev: CardDetails[]) =>
      prev.map((card, i) => ({
        ...card,
        isSelected: i === index,
      }))
    );
  };

  const onPressPlaceOrder = () => {
    setIsSuccessModalVisible(true);
  };

  const onPressTrackOrder = () => {
    setIsSuccessModalVisible(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: ScreenNames.bottomTabsNavigation,
            state: {
              routes: [{ name: ScreenNames.myOrders }],
              index: 0,
            },
          },
        ],
      })
    );
  };

  const onPressContinueShopping = () => {
    setIsSuccessModalVisible(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: ScreenNames.bottomTabsNavigation,
            state: {
              routes: [{ name: ScreenNames.home }],
              index: 0,
            },
          },
        ],
      })
    );
  };

  const onPressAddNewCard = () => {
    navigation.navigate(ScreenNames.addNewCard);
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
          {ScreenNames.paymentMethod}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <PaymentMethodComponent
      total={total}
      onPressAddNewCard={onPressAddNewCard}
      arrCards={arrCards}
      onPressPlaceOrder={onPressPlaceOrder}
      isCodSelected={isCodSelected}
      onPressCodSelect={onPressCodSelect}
      onPressCardSelect={onPressCardSelect}
      isSuccessModalVisible={isSuccessModalVisible}
      orderNumber={orderNumber}
      onPressTrackOrder={onPressTrackOrder}
      onPressContinueShopping={onPressContinueShopping}
    />
  );
};

export default PaymentMethodContainer;
