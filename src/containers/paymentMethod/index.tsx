import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import PaymentMethodComponent from "../../components/paymentMethod";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { ScreenNames } from "../../routers";

const PaymentMethodContainer = ({ navigation }: any) => {
  const onPressAddNewCard = () => {};
  const [total, setTotal] = useState<string>("$ 732");
  const [orderNumber, setOrderNumber] = useState<string>("#123456789");
  const [isCodSelected, setIsCodSelected] = useState<boolean>(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);

  const [arrCards, setArrCards] = useState<any>([
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
    setArrCards((prev: any) =>
      prev.map((card: any) => ({ ...card, isSelected: false }))
    );
  };

  const onPressCardSelect = (index: number) => {
    setIsCodSelected(false);
    setArrCards((prev: any) =>
      prev.map((card: any, i: number) => ({
        ...card,
        isSelected: i === index,
      }))
    );
  };

  const onPressPlaceOrder = () => {
    setIsSuccessModalVisible(true);
  };

  const onPressTrackOrder=()=>{
    setIsSuccessModalVisible(false);
  };

  const onPressContinueShopping =()=>{
    setIsSuccessModalVisible(false);
    navigation.replace(ScreenNames.bottomTabsNavigation)
  }

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
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
