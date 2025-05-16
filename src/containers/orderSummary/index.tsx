import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import OrderSummaryComponent from "../../components/orderSummary";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import Animated from "react-native-reanimated";
import { images } from "../../constants/Images";

const OrderSummaryContainer = ({ navigation }: any) => {
    const arrOrderSteps = [
        {
          title: 'Order Placed',
          date: '10 Mar, 2025',
          icon: images.box,
        },
        {
          title: 'Order Confirmed',
          date: '17 Feb, 2024',
          icon: images.boxTick,
        },
        {
          title: 'Preparing',
          date: '17 Feb, 2024',
          icon: images.boxtime,
        },
        {
          title: 'On the way',
          date: '17 Feb, 2024',
          icon: images.delivery,
        },
        {
          title: 'Order Delivered',
          date: '17 Feb, 2024',
          icon: images.Check,
        },
      ];
      const [currentStep, setCurrentStep] = useState(0);
      const [arrProductList, seArrProductList] = useState([
        {
          product_name: `India Gate Basmati ${'\n'}Rice`,
          product_img: images.rice,
          price: '$499',
          quantity: 1,
          unit: '1 kg',
          height: 61.6,
          width: 42.3,
          rate:4.5
        },
        {
          product_name: `Fortune Premium ${'\n'}Mustard Oil`,
          product_img: images.oil,
          price: '$199',
          quantity: 1,
          unit: '500 ml',
          height: 66,
          width: 42.52,
          rate:0,
    
        },
      ]);
      const [showCancelButton, setShowCancelButton] = useState(true);
    
      const progressAnim = useRef(
        arrOrderSteps.map(() => new Animated.Value(0)),
      ).current;

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
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
  return <OrderSummaryComponent />;
};

export default OrderSummaryContainer;
