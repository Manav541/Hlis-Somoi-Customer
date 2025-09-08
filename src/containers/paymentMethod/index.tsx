import { Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import PaymentMethodComponent from "../../components/paymentMethod";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { ScreenNames } from "../../routers";
import { CardDetails, SecretKeyItem } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { flashMessageWarning } from "../../constants/GConstant";
import RazorpayCheckout from "react-native-razorpay";
import { images } from "../../constants/Images";
import { colors } from "../../constants/Colors";

const PaymentMethodContainer = ({ navigation, route }: any) => {
  // API zustand store
  const placeOrderApi = zustandStore.CartStore((state) => state.placeOrder);
  const createOrderIdApi = zustandStore.CartStore(
    (state) => state.createOrderId
  );
  const getCODStatusApi = zustandStore.CartStore((state) => state.getCODStatus);
  const setCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.setCartItemCount
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);
  const [razorpay_key_id, setRazorpay_key_id] = useState<string>("");
  // const [createOrderId, setCreateOrderId] = useState<string>("");
  const location_id = route?.params?.location_id;
  const total_bill = route?.params?.total_bill;
  const [isCod, setIsCod] = useState<boolean>(false);
  const customer_details = route?.params?.customer_details;
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

  const onPressSelectPaymentType = (type: string) => {
    // setIsCodSelected(true);
    setpayment_type(type);
    // setArrCards((prev: CardDetails[]) =>
    //   prev.map((card) => ({ ...card, isSelected: false }))
    // );
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

  const convertRupeesToPaise = (rupees: number): number => {
    return Math.round(rupees * 100);
  };
  const totalRupees = Number(total_bill);
  const amountInPaise = convertRupeesToPaise(totalRupees);

  const openRazorpay = (createOrderId: string) => {
    if (!razorpay_key_id || !createOrderId) {
      console.log("Missing Razorpay Key ID or Order ID");
      return;
    }
    const options = {
      description: "Order Payment",
      image: images.logoTitle, // optional
      currency: "INR",
      key: razorpay_key_id, // Your Razorpay Key ID
      amount: amountInPaise.toString(), // amount in paise (₹50.00)
      name: "Somoi App",
      order_id: createOrderId, // From backend (recommended)
      prefill: {
        email: customer_details?.email,
        contact: customer_details?.contact,
        name: customer_details?.name,
      },
      theme: { color: colors.blue4e },
    };

    RazorpayCheckout.open(options as any)
      .then((data) => {
        console.log(`Success: `, data);
        console.log(`Success: ${data.razorpay_payment_id}`);
        const payment_id = data.razorpay_payment_id;
        // Call backend API to verify payment
        // handlePlaceOrderApi(location_id, payment_type, payment_id);
        setIsSuccessModalVisible(true);
        setCartItemCount(0);
      })
      .catch((error) => {
        console.log(`Error: ${error.code} | ${error.description}`);
        // Handle failure or cancellation
      });
  };

  // const startPayment = async () => {
  //   try {
  //     toggleLoader(true);

  //     // Step 1: Get order details from your backend
  //     // const orderResponse = await axios.post('https://your-backend-api.com/orders', {
  //     //   amount: 50000, // amount in paise (e.g., ₹500)
  //     //   currency: 'INR',
  //     //   // other order details
  //     // });

  //     // const { orderId, amount } = orderResponse.data;

  //     // Step 2: Open Razorpay checkout with multiple payment options
  //     const options = {
  //       description: "Order Payment",
  //       image: images.logoTitle, // optional
  //       currency: "INR",
  //       key: "rzp_test_Rxht1N8StSV1cJ", // Your Razorpay Key ID
  //       amount: amountInPaise.toString(), // amount in paise (₹50.00)
  //       name: "Somoi App",
  //       // order_id: "order_DBJOWzybf0sJbb", // From backend (recommended)
  //       prefill: {
  //         email: customer_details?.email,
  //         contact: customer_details?.contact,
  //         name: customer_details?.name,
  //       },
  //       theme: { color: "#3399cc" },
  //       // Payment method configuration - enable specific methods
  //       config: {
  //         display: {
  //           // Control which payment methods appear and in what order
  //           preferences: {
  //             show_default_blocks: true, // Show all payment blocks by default
  //           },
  //           blocks: {
  //             upi: {
  //               name: "Pay using UPI",
  //               instruments: [
  //                 {
  //                   method: "upi",
  //                   apps: ["google_pay", "phonepe", "paytm"], // Specify UPI apps (include Google Pay)
  //                   flows: ["intent", "qr"],
  //                 },
  //               ],
  //             },
  //             card: {
  //               name: "Pay using Cards",
  //               instruments: [
  //                 {
  //                   method: "card",
  //                   types: ["credit", "debit"], // Enable both credit and debit cards
  //                 },
  //               ],
  //             },
  //             netbanking: {
  //               name: "Pay using Netbanking",
  //               instruments: [
  //                 {
  //                   method: "netbanking",
  //                 },
  //               ],
  //             },
  //           },
  //           sequence: ["block.upi", "block.card", "block.netbanking"], // Order of payment methods
  //           paymentPreferences: {
  //             show_default_blocks: false, // Show only the blocks configured above
  //           },
  //         },
  //       },
  //     };

  //     RazorpayCheckout.open(options as any)
  //       .then((data) => {
  //         // Handle success
  //         axios
  //           .post("https://your-backend-api.com/verify-payment", {
  //             razorpay_order_id: data.razorpay_order_id,
  //             razorpay_payment_id: data.razorpay_payment_id,
  //             razorpay_signature: data.razorpay_signature,
  //             payment_method: data.payment_method, // This will tell which method was used
  //           })
  //           .then((response: any) => {
  //             Alert.alert("Success", "Payment successful!", response);
  //           })
  //           .catch((error: any) => {
  //             Alert.alert("Error", "Payment verification failed", error);
  //           });
  //       })
  //       .catch((error) => {
  //         Alert.alert("Error", `Payment failed: ${error.description}`);
  //       });
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to process payment");
  //   } finally {
  //     toggleLoader(false);
  //   }
  // };

  const onPressPlaceOrder = () => {
    console.log("location_id, payment_type", location_id, payment_type);
    if (payment_type == "cod") {
      handlePlaceOrderApi(location_id, payment_type);
    } else {
      handleCreateOrderIdApi(location_id);
      // openRazorpay();
      // handlePlaceOrderApi(location_id, payment_type);
    }
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
    // payment_id?: string
  ) => {
    const dictData: any = {
      location_id: location_id,
      payment_type: payment_type,
    };

    // if (payment_type === "card") {
    //   dictData.payment_id = payment_id;
    // }
    try {
      const response = await placeOrderApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PLACE ORDER RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          setOrderNumber(rawData?.order_number);
          setIsSuccessModalVisible(true);
          setCartItemCount(0);
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

  const handleCreateOrderIdApi = async (location_id: string) => {
    const dictData = {
      location_id: location_id,
    };
    try {
      const response = await createOrderIdApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("CREATE ORDER ID RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          // setCreateOrderId(rawData?.id);
          openRazorpay(rawData?.id);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
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
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleSecretKeyApi = async () => {
    try {
      const response = await secretKeyApi({}, navigation);
      if (
        response?.code === statusCodes.success &&
        Array.isArray(response.data)
      ) {
        const keysData = response.data as SecretKeyItem[];
        console.log("keysData", keysData);

        keysData.forEach((item) => {
          switch (item.name) {
            case "razorpay_key_id":
              if (item.keys) setRazorpay_key_id(item.keys);
              break;
            default:
              break;
          }
        });
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Secret Key API Error:", error);
    }
  };

  const handleCODStatusApi = async () => {
    const dictData = {
      role: "customer",
    };
    try {
      const response = await getCODStatusApi(dictData, navigation);
      console.log("COD STATUS RESPONSE", JSON.stringify(response));

      if (response?.code === statusCodes.success) {
        const rawData = response.data as any;
        console.log("hdkshf => ", rawData?.cod_checkbox);

        if (rawData?.cod_checkbox) {
          setIsCod(rawData?.cod_checkbox);
        }
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Secret Key API Error:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      handleSecretKeyApi();
      handleCODStatusApi();
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
      onPressSelectPaymentType={onPressSelectPaymentType}
      onPressCardSelect={onPressCardSelect}
      isSuccessModalVisible={isSuccessModalVisible}
      orderNumber={orderNumber}
      onPressTrackOrder={onPressTrackOrder}
      onPressContinueShopping={onPressContinueShopping}
      payment_type={payment_type}
      isCod={isCod}
    />
  );
};

export default PaymentMethodContainer;
