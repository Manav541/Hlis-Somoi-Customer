import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import NotificationComponent from "../../components/notification";
import GlobalBackButton from "../../global/GlobalBackButton";
import { flashMessageWarning } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import { NotificationGroup } from "../../constants/utils/interfaces";

const NotificationContainer = ({ navigation }: any) => {
  const [arrNotification, setArrNotification] = useState<NotificationGroup[]>([
    {
      titleMain: "Today",
      data: [
        {
          title: "Payment Successful!",
          desc: "Your payment of $49.99 for order #123456 has been processed successfully.",
          time: "01:00 PM",
        },
        {
          title: "John Doe",
          desc: "please hurry up i need urgent basis,before 25 min",
          time: "05:00 PM",
        },
        {
          title: "Your Order is On Its Way!",
          desc: "Your order #123456 has been shipped and is expected to arrive by Today",
          time: "05:00 PM",
        },
      ],
    },
    {
      titleMain: "Yesterday",
      data: [
        {
          title: "Your Order is Delivered ",
          desc: "Your order has been delivered. order  id #123456.",
          time: "04:30 PM",
        },
        {
          title: "Payment Failed",
          desc: "Your payment for order #321 was declined.",
          time: "04:30 PM",
        },
        {
          title: "Jaylon Carder Assign as Driver",
          desc: "Jaylon Carder Delivery Your Order",
          time: "03:34 PM",
        },
      ],
    },
  ]);

  const onPressNotification = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
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
    <NotificationComponent
      arrNotification={arrNotification}
      onPressNotification={onPressNotification}
    />
  );
};

export default NotificationContainer;
