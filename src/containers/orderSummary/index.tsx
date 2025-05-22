import { ImageSourcePropType, Linking, StatusBar, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import OrderSummaryComponent from "../../components/orderSummary";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { ScreenNames } from "../../routers";
import {
  OrderDetail,
  OrderReviewProduct,
  OrderStatus,
} from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";

const ONE_MIN = 60_000;

const OrderSummaryContainer = ({ navigation, route }: any) => {
  const [orderNumber, setOrderNumber] = useState<string>("#12343235");
  const [orderPlacedDate, setOrderPlacedDate] = useState<string>("10/03/2025");
  const [orderPlacedTime, setOrderPlacedTime] = useState<string>("1:00 pm");
  const [totalAmount, setTotalAmount] = useState<string>("$ 732.00");
  const [delivertoName, setDelivertoName] = useState<string>("John");
  const [delivertoAddress, setDelivertoAddress] = useState<string>(
    "3465 Hanover Street, Locust Court Burbank New York, NY 10038"
  );
  const defaultOrderStatus: OrderStatus[] = [
    {
      status_icon: images.orderPlaced,
      status_icon1: images.orderPlacedUn,
      status_title: "Order Placed",
      status_date: "10/03/2025",
      status_time: "10:00 am",
      status_isdone: true,
    },
    {
      status_icon: images.orderConfirmed,
      status_icon1: images.orderConfirmedUn,
      status_title: "Order Confirmed",
      status_date: "17/03/2025",
      status_time: "10:00 am",
      status_isdone: true,
    },
    {
      status_icon: images.preparing,
      status_icon1: images.preparingUn,
      status_title: "Preparing",
      status_date: "17/03/2025",
      status_time: "10:00 am",
      status_isdone: false,
    },
    {
      status_icon: images.onTheWay,
      status_icon1: images.onTheWayUn,
      status_title: "On The Way",
      status_date: "17/03/2025",
      status_time: "10:00 am",
      status_isdone: false,
    },
    {
      status_icon: images.orderDelivered,
      status_icon1: images.orderDeliveredUn,
      status_title: "Order Delivered",
      status_date: "17/03/2025",
      status_time: "10:00 am",
      status_isdone: false,
    },
  ];

  const [arrOrderStatus, setArrOrderStatus] = useState(defaultOrderStatus);

  const pickupDateTimeStatus = {
    status_icon: images.orderReturnedUn,
    status_icon1: images.orderReturnedUn,
    status_title: "Order pickup date & Time",
    status_date: "18/03/2025",
    status_time: "10:00 am",
    status_isdone: false,
  };

  const orederReturnedStatus = {
    status_icon: images.orderReturned,
    status_icon1: images.orderReturned,
    status_title: "Order Returned",
    status_date: "20/03/2025",
    status_time: "10:00 am",
    status_isdone: false,
  };

  const [arrProducts, setArrProducts] = useState<OrderReviewProduct[]>([
    {
      product_name: `India Gate Basmati ${"\n"}Rice`,
      product_img: images.rice,
      product_price: "$199",
      product_quantity: 1,
      product_weight: "1 kg",
      height: 61.6,
      width: 42.3,
      product_rating: "4.5",
      isRateReview: true,
      isSelected: false
    },
    {
      product_name: `Fortune Premium Mustard ${"\n"}Oil`,
      product_img: images.oil,
      product_price: "$499",
      product_quantity: 1,
      product_weight: "500 ml",
      height: 66,
      width: 47.52,
      product_rating: "4.5",
      isRateReview: false,
      isSelected: false
    },
  ]);

  const [arrOrderDetails, setArrOrderDetails] = useState<OrderDetail[]>([
    {
      orderDetailTitle: getTranslation("itemTotal"),
      orderDetailValue: "2",
    },
    {
      orderDetailTitle: getTranslation("subTotal"),
      orderDetailValue: "$698",
    },
    {
      orderDetailTitle: getTranslation("tax"),
      orderDetailValue: "$34",
    },
    {
      orderDetailTitle: getTranslation("discount"),
      orderDetailValue: "-$10.00",
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
  const [driverProfile, setDriverProfile] = useState<ImageSourcePropType>(
    images.driverProfile
  );
  const [driverName, setDriverName] = useState<string>("Jaylon Carder");
  const [driverMobileNumber, setDriverMobileNumber] =
    useState<string>("9876543210");
  const [cancelOrderDate, setCancelOrderDate] = useState<string>("22/03/2025");
  const [cancelReason, setCancelReason] = useState<string>(
    () => getTranslation("cancelOrderSelectedReason") || ""
  );
  const [orderMainStatus, setOrderMainStatus] = useState<string>("");

  const [isEditReviewModalVisible, setIsEditReviewModalVisible] =
    useState<boolean>(false);

  const onPressOpenEditReview = () => {
    setIsEditReviewModalVisible(true);
  };

  const onPressCloseEditReviewModal = () => {
    setIsEditReviewModalVisible(false);
  };

  const onPressEditReview = () => {
    setIsEditReviewModalVisible(false);
    navigation.navigate(ScreenNames.rateAndReview);
  };

  const onPressDeleteReview = () => {
    setArrProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        isRateReview: false,
      }))
    );
    setIsEditReviewModalVisible(false);
  };

  const onPressReportIssue = () => {
    navigation.navigate(ScreenNames.reportIssue);
  };

  const onPressCancelOrder = () => {
    navigation.navigate(ScreenNames.cancelOrder);
  };

  const onPressReturnOrder = () => {
    navigation.navigate(ScreenNames.returnExchangeItemList,{arrProducts : arrProducts});
  };

  const onPressRateReview = (item: OrderReviewProduct) => {
    navigation.navigate(ScreenNames.rateAndReview, { item: item });
  };

  const onPressTrackDriver = () => {
    navigation.navigate(ScreenNames.driverTracking, {
      driverProfile: driverProfile,
      driverName: driverName,
      driverMobileNumber: driverMobileNumber,
      delivertoName: delivertoName,
      delivertoAddress: delivertoAddress,
    });
  };

  const onPressChatDriver = () => {
    navigation.navigate(ScreenNames.chat, {
      driverName: driverName,
      driverMobileNumber: driverMobileNumber,
    });
  };

  const onPressCallDriver = () => {
    Linking.openURL(`tel:${driverMobileNumber}`);
  };

  // Satus update simulation

  useEffect(() => {
    if (orderMainStatus !== "Confirmed") return;

    let index = 0;
    const interval = setInterval(() => {
      setArrOrderStatus((prev) => {
        if (index >= prev.length) {
          clearInterval(interval);
          return prev;
        }

        const updated = prev.map((item, i) =>
          i === index ? { ...item, status_isdone: true } : item
        );
        setCurrentStatus(updated[index].status_title);
        index++;
        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [orderMainStatus]);

  useEffect(() => {
    if (orderMainStatus === "Request_return") {
      const updatedStatus = defaultOrderStatus.map((item) => ({
        ...item,
        status_isdone: true,
      }));

      updatedStatus.push({
        ...pickupDateTimeStatus,
        status_isdone: true,
      });

      setArrOrderStatus(updatedStatus);
    } else if (orderMainStatus === "Returned") {
      const updatedStatus = defaultOrderStatus.map((item) => ({
        ...item,
        status_isdone: true,
      }));

      updatedStatus.push({
        ...orederReturnedStatus,
        status_isdone: true,
      });

      setArrOrderStatus(updatedStatus);
    } else if (orderMainStatus === "Delivered") {
      // ✅ Mark all items in the main array as done
      const updatedStatus = defaultOrderStatus.map((item) => ({
        ...item,
        status_isdone: true,
      }));

      setArrOrderStatus(updatedStatus);
    } else {
      // Default: show base status with isdone false
      setArrOrderStatus(defaultOrderStatus);
    }
  }, [orderMainStatus]);

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
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.orderSummary}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
    if (route?.params) {
      console.log("route?.params", route?.params);
      setOrderMainStatus(route?.params?.orderMainStatus);
    } else {
      setCancelReason("");
    }
  }, [route]);

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
      onPressTrackDriver={onPressTrackDriver}
      onPressChatDriver={onPressChatDriver}
      onPressCallDriver={onPressCallDriver}
      cancelReason={cancelReason}
      orderMainStatus={orderMainStatus}
      cancelOrderDate={cancelOrderDate}
      onPressReturnOrder={onPressReturnOrder}
      onPressRateReview={onPressRateReview}
      isEditReviewModalVisible={isEditReviewModalVisible}
      onPressOpenEditReview={onPressOpenEditReview}
      onPressCloseEditReviewModal={onPressCloseEditReviewModal}
      onPressEditReview={onPressEditReview}
      onPressDeleteReview={onPressDeleteReview}
      onPressReportIssue={onPressReportIssue}
    />
  );
};

export default OrderSummaryContainer;
