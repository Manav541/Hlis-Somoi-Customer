import { StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import OrderSummaryComponent from "../../components/orderSummary";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { ScreenNames } from "../../routers";

const ONE_MIN = 60_000;

const OrderSummaryContainer = ({ navigation }: any) => {
  const [orderNumber, setOrderNumber] = useState<string>("#12343235");
  const [orderPlacedDate, setOrderPlacedDate] = useState<string>("10/03/2025");
  const [orderPlacedTime, setOrderPlacedTime] = useState<string>("1:00 pm");
  const [totalAmount, setTotalAmount] = useState<string>("$ 732.00");
  const [delivertoName, setDelivertoName] = useState<string>("John");
  const [delivertoAddress, setDelivertoAddress] = useState<string>(
    "3465 Hanover Street, Locust Court Burbank New York, NY 10038"
  );
  const [arrOrderStatus, setArrOrderStatus] = useState<any>([
    {
      status_icon: images.orderPlaced,
      status_icon1: images.orderPlacedUn,
      status_title: "Order Placed",
      status_date: "10/03/2025",
      status_isdone: true,
    },
    {
      status_icon: images.orderConfirmed,
      status_icon1: images.orderConfirmedUn,
      status_title: "Order Confirmed",
      status_date: "17/03/2025",
      status_isdone: false,
    },
    {
      status_icon: images.preparing,
      status_icon1: images.preparingUn,
      status_title: "Preparing",
      status_date: "17/03/2025",
      status_isdone: false,
    },
    {
      status_icon: images.onTheWay,
      status_icon1: images.onTheWayUn,
      status_title: "On The Way",
      status_date: "17/03/2025",
      status_isdone: false,
    },
    {
      status_icon: images.orderDelivered,
      status_icon1: images.orderDeliveredUn,
      status_title: "Order Delivered",
      status_date: "17/03/2025",
      status_isdone: false,
    },
  ]);
  const [arrProducts, setArrProducts] = useState([
    {
      product_name: `India Gate Basmati ${"\n"}Rice`,
      product_img: images.rice,
      product_price: "₹199",
      product_quantity: 1,
      product_weight: "1 kg",
      height: 61.6,
      width: 42.3,
      product_rating : "4.5",
      isRateReview: true,
    },
    {
      product_name: `Fortune Premium Mustard ${"\n"}Oil`,
      product_img: images.oil,
      product_price: "₹499",
      product_quantity: 1,
      product_weight: "500 ml",
      height: 66,
      width: 47.52,
      product_rating : "4.5",
      isRateReview: false,
    },
  ]);
  const [arrOrderDetails, setArrOrderDetails] = useState<any[]>([
    {
      orderDetailTitle: getTranslation("itemTotal"),
      orderDetailValue: "2",
    },
    {
      orderDetailTitle: getTranslation("subTotal"),
      orderDetailValue: "₹698",
    },
    {
      orderDetailTitle: getTranslation("tax"),
      orderDetailValue: "₹34",
    },
    {
      orderDetailTitle: getTranslation("discount"),
      orderDetailValue: "-₹10.00",
    },
    {
      orderDetailTitle: getTranslation("delivery"),
      orderDetailValue: "Free",
    },
    {
      orderDetailTitle: getTranslation("paymentType"),
      orderDetailValue: "Cash on Delivery",
    },
  ]);
  const [currentStatus, setCurrentStatus] = useState<string>(
    arrOrderStatus[0].status_title
  );
  const [cancelDisabled, setCancelDisabled] = useState<boolean>(false);
  const [driverProfile, setDriverProfile] = useState<any>(images.driverProfile);
  const [driverName, setDriverName] = useState<string>("Jaylon Carder");

  const onPressCancelOrder = () => {
    navigation.navigate(ScreenNames.cancelOrder);
  };

  // Satus update simulation
  useEffect(() => {
    const nextIndex = arrOrderStatus.findIndex((s: any) => !s.status_isdone);
    if (nextIndex === -1) return; // all done

    const t = setTimeout(() => {
      setArrOrderStatus((prev: any) =>
        prev.map((item: any, i: number) =>
          i === nextIndex ? { ...item, status_isdone: true } : item
        )
      );
      setCurrentStatus(arrOrderStatus[nextIndex].status_title);
    }, 10000);

    return () => clearTimeout(t);
  }, [arrOrderStatus]);

  // Cancel button disabled simulation
  useEffect(() => {
    const timer = setTimeout(() => setCancelDisabled(true), ONE_MIN);
    return () => clearTimeout(timer);
  }, []);

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
  return (
    <OrderSummaryComponent
      orderNumber={orderNumber}
      orderPlacedDate={orderPlacedDate}
      orderPlacedTime={orderPlacedTime}
      totalAmount={totalAmount}
      arrOrderStatus={arrOrderStatus}
      arrProducts={arrProducts}
      delivertoName={delivertoName}
      delivertoAddress={delivertoAddress}
      arrOrderDetails={arrOrderDetails}
      onPressCancelOrder={onPressCancelOrder}
      currentStatus={currentStatus}
      cancelDisabled={cancelDisabled}
      driverProfile={driverProfile}
      driverName={driverName}
    />
  );
};

export default OrderSummaryContainer;
