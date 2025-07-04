import {
  ImageSourcePropType,
  Linking,
  StatusBar,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import OrderSummaryComponent from "../../components/orderSummary";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import {
  OrderDetailsData,
  OrderItem,
  StatusTimeline,
} from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import {
  backendToUIStatusMap,
  flashMessageWarning,
} from "../../constants/GConstant";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { colors } from "../../constants/Colors";

const OrderSummaryContainer = ({ navigation, route }: any) => {
  // API zustand store
  const orderDetailsApi = zustandStore.MyOrdersStore(
    (state) => state.orderDetails
  );
  const deleteRateApi = zustandStore.RateAndReviewStore(
    (state) => state.deleteRate
  );

  const order_id = route?.params?.order_id;
  const [orderDetails, setOrderDetails] = useState<OrderDetailsData | null>(
    null
  );
  const [cancelledDate, setCancelledDate] = useState<string>("");
  const [rejectedDate, setRejectedDate] = useState<string>("");

  const defaultOrderStatus: StatusTimeline[] = [
    {
      status_icon: images.orderPlaced,
      status_icon1: images.orderPlacedUn,
      status: "Order Placed",
      created_at: "",
      updated_at: "",
      time: "",
      is_active: false,
    },
    {
      status_icon: images.orderConfirmed,
      status_icon1: images.orderConfirmedUn,
      status: "Order Confirmed",
      created_at: "",
      updated_at: "",
      time: "",
      is_active: false,
    },
    {
      status_icon: images.preparing,
      status_icon1: images.preparingUn,
      status: "Preparing",
      created_at: "",
      updated_at: "",
      time: "",
      is_active: false,
    },
    {
      status_icon: images.orderConfirmed,
      status_icon1: images.orderConfirmedUn,
      status: "Order Prepared",
      created_at: "",
      updated_at: "",
      time: "",
      is_active: false,
    },
    {
      status_icon: images.onTheWay,
      status_icon1: images.onTheWayUn,
      status: "On The Way",
      created_at: "",
      updated_at: "",
      time: "",
      is_active: false,
    },
    {
      status_icon: images.orderDelivered,
      status_icon1: images.orderDeliveredUn,
      status: "Order Delivered",
      created_at: "",
      updated_at: "",
      time: "",
      is_active: false,
    },
  ];
  const [arrOrderStatus, setArrOrderStatus] =
    useState<StatusTimeline[]>(defaultOrderStatus);
  const pickupDateTimeStatus = {
    status_icon: images.orderReturnedUn,
    status_icon1: images.orderReturnedUn,
    status: "Order pickup date & Time",
    created_at: "",
    updated_at: "",
    time: "",
    is_active: false,
  };
  const orederReturnedStatus = {
    status_icon: images.orderReturned,
    status_icon1: images.orderReturned,
    status: "Order Returned",
    created_at: "",
    updated_at: "",
    time: "",
    is_active: false,
  };
  const [arrProducts, setArrProducts] = useState<OrderItem[]>([]);
  const [cancelDisabled, setCancelDisabled] = useState<boolean>(true);
  const [ratingData, setRatingData] = useState<OrderItem>();
  const [isEditReviewModalVisible, setIsEditReviewModalVisible] =
    useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await handleOrderDetailsApi(order_id);
    setIsRefreshing(false);
  };

  const onPressOpenEditReview = (item: OrderItem) => {
    setIsEditReviewModalVisible(true);
    setRatingData(item);
  };

  const onPressCloseEditReviewModal = () => {
    setIsEditReviewModalVisible(false);
  };

  const onPressEditReview = (prodcutDetail: OrderItem) => {
    setIsEditReviewModalVisible(false);
    navigation.navigate(ScreenNames.rateAndReview, {
      prodcutDetail: prodcutDetail,
      isEditRating: true,
    });
  };

  const onPressDeleteReview = (rating_id: string) => {
    handleDeleteRateApi(rating_id);
  };

  const onPressReportIssue = () => {
    navigation.navigate(ScreenNames.reportIssue, {
      order_id: order_id,
    });
  };

  const onPressCancelOrder = () => {
    navigation.navigate(ScreenNames.cancelOrder, {
      order_id: order_id,
    });
  };

  const onPressReturnOrder = () => {
    navigation.navigate(ScreenNames.returnExchangeItemList, {
      arrProducts: arrProducts,
      order_id: order_id,
    });
  };

  const onPressRateReview = (prodcutDetail: OrderItem) => {
    navigation.navigate(ScreenNames.rateAndReview, {
      prodcutDetail: prodcutDetail,
    });
  };

  const onPressTrackDriver = () => {
    navigation.navigate(ScreenNames.driverTracking, {
      driver_details: orderDetails?.driver_details,
      customer_details: orderDetails?.delivery_details,
    });
  };

  const onPressChatDriver = () => {
    navigation.navigate(ScreenNames.chat, {
      driver_details: orderDetails?.driver_details,
      customer_details: orderDetails?.delivery_details,
    });
  };

  const onPressCallDriver = () => {
    Linking.openURL(`tel:${orderDetails?.driver_details?.mobile_number}`);
  };

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

  // cancel order after 1 minute
  useEffect(() => {
    header();
    if (!orderDetails?.placed_on_time) return;

    const placedTime = new Date(orderDetails.placed_on_time).getTime();
    const now = Date.now();
    const ONE_MIN = 60 * 1000;

    const timeElapsed = now - placedTime;

    if (timeElapsed >= 0 && timeElapsed < ONE_MIN) {
      const remaining = ONE_MIN - timeElapsed;
      console.log("Cancel allowed for next (ms):", remaining);

      setCancelDisabled(false);

      const timer = setTimeout(() => {
        console.log("Cancel disabled");
        setCancelDisabled(true);
      }, remaining);

      return () => clearTimeout(timer);
    } else {
      console.log("More than 1 min passed — cancel disabled");
      setCancelDisabled(true);
    }
  }, [orderDetails?.placed_on_time]);

  // -------------------------API Calling----------------------------
  // handleOrderDetailsApi
  const handleOrderDetailsApi = async (order_id: string) => {
    const dictData = {
      order_id: order_id,
    };
    try {
      const response = await orderDetailsApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ORDER DETAILS RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          setIsRefreshing(false);
          const rawData = response.data as OrderDetailsData;
          setOrderDetails(rawData);
          setArrProducts(rawData?.items as OrderItem[]);

          // ✅ Extract "Order Cancelled" created_at time
          const cancelledStatus = rawData.status_timeline.find(
            (item) => item.status === "Order Cancelled"
          );

          if (cancelledStatus) {
            const cancelledDate = cancelledStatus.created_at;
            console.log("Cancelled Date:", cancelledDate);

            // 💡 Optionally store it in a state variable
            setCancelledDate(cancelledDate);
          }

          // ✅ Extract "Order Rejected" created_at time
          const rejectedStatus = rawData.status_timeline.find(
            (item) => item.status === "Order Rejected"
          );

          if (rejectedStatus) {
            const rejectedDate = rejectedStatus.created_at;
            console.log("Rejected Date:", rejectedDate);

            // 💡 Optionally store it in a state variable
            setRejectedDate(rejectedDate);
          }

          // ✅ Map backend status to UI status
          const mappedTimeline = rawData.status_timeline.map((item) => ({
            ...item,
            mapped_status: backendToUIStatusMap[item.status] || "", // fallback to empty if not found
          }));

          // ✅ Update defaultOrderStatus
          const updatedStatusArray = defaultOrderStatus.map((defaultStatus) => {
            const matched = mappedTimeline.find(
              (item) => item.mapped_status === defaultStatus.status
            );

            return matched
              ? {
                  ...defaultStatus,
                  created_at: matched.created_at,
                  updated_at: matched.updated_at,
                  time: matched.time,
                  is_active: true,
                }
              : {
                  ...defaultStatus,
                  is_active: false,
                };
          });

          setArrOrderStatus(updatedStatusArray);
        } else if (response.code === statusCodes.invaildOrFail) {
          setOrderDetails(null);
        } else if (response.code === statusCodes.emptyData) {
          setOrderDetails(null);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleDeleteRateApi
  const handleDeleteRateApi = async (rating_id: string) => {
    const dictData = {
      rating_id: rating_id,
    };
    try {
      const response = await deleteRateApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("RATE VENDOR RESPONSE===>", JSON.stringify(response));
        const data = response.data as any;
        if (response.code === statusCodes.success) {
          setIsEditReviewModalVisible(false);
          setArrProducts((prevProducts) =>
            prevProducts.map((product) => ({
              ...product,
              is_rated: false,
            }))
          );
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleOrderDetailsApi(order_id);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <>
      {orderDetails ? (
        <OrderSummaryComponent
          orderDetails={orderDetails || ({} as OrderDetailsData)}
          arrProducts={arrProducts || []}
          cancelledDate={cancelledDate}
          rejectedDate={rejectedDate}
          arrOrderStatus={arrOrderStatus}
          onPressCancelOrder={onPressCancelOrder}
          cancelDisabled={cancelDisabled}
          onPressTrackDriver={onPressTrackDriver}
          onPressChatDriver={onPressChatDriver}
          onPressCallDriver={onPressCallDriver}
          onPressReturnOrder={onPressReturnOrder}
          onPressRateReview={onPressRateReview}
          ratingData={ratingData || ({} as OrderItem)}
          isEditReviewModalVisible={isEditReviewModalVisible}
          onPressOpenEditReview={onPressOpenEditReview}
          onPressCloseEditReviewModal={onPressCloseEditReviewModal}
          onPressEditReview={onPressEditReview}
          onPressDeleteReview={onPressDeleteReview}
          onPressReportIssue={onPressReportIssue}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: colors.blue4e }}></View>
      )}
    </>
  );
};

export default OrderSummaryContainer;
