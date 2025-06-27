import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import PaymentMethodComponent from "../../components/paymentMethod";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { ScreenNames } from "../../routers";
import { CardDetails } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { flashMessageWarning } from "../../constants/GConstant";

const PaymentMethodContainer = ({ navigation, route }: any) => {
  // API zustand store
  const placeOrderApi = zustandStore.CartStore((state) => state.placeOrder);
  const location_id = route?.params?.location_id;
  const total_bill= route?.params?.total_bill;
  console.log("location_id", location_id);
  const [orderNumber, setOrderNumber] = useState<string>("");
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
  const [payment_type, setpayment_type] = useState<string>("card");

  const onPressCodSelect = () => {
    setIsCodSelected(true);
    setpayment_type("cod");
    setArrCards((prev: CardDetails[]) =>
      prev.map((card) => ({ ...card, isSelected: false }))
    );
  };

  const onPressCardSelect = (index: number) => {
    setIsCodSelected(false);
    setpayment_type("card");
    setArrCards((prev: CardDetails[]) =>
      prev.map((card, i) => ({
        ...card,
        isSelected: i === index,
      }))
    );
  };

  const onPressPlaceOrder = () => {
    console.log("location_id, payment_type", location_id, payment_type);

    handlePlaceOrderApi(location_id, payment_type);
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

  // ----------------------- API Calling -------------------------
  // handlePlaceOrderApi
  const handlePlaceOrderApi = async (
    location_id: string,
    payment_type: string
  ) => {
    const dictData = {
      location_id: location_id,
      payment_type: payment_type,
    };
    try {
      const response = await placeOrderApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PLACE ORDER RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          setOrderNumber(rawData?.order_number)
          setIsSuccessModalVisible(true);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <PaymentMethodComponent
      total_bill={total_bill}
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
