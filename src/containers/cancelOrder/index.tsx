import { View, Text, StatusBar, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import CancelOrderComponent from "../../components/cancelOrder";
import { flashMessageWarning } from "../../constants/GConstant";
import { ScreenNames } from "../../routers";
import { CancelOrderReason } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";

const CancelOrderContainer = ({ navigation, route }: any) => {
  // API zustand store
  const cancelReturnOrderReasonListApi = zustandStore.MyOrdersStore(
    (state) => state.cancelReturnOrderReasonList
  );
  const cancelOrderApi = zustandStore.MyOrdersStore(
    (state) => state.cancelOrder
  );
  const order_id = route?.params?.order_id;

  const [arrCancelOrderReason, setArrCancelOrderReason] = useState<
    CancelOrderReason[]
  >([]);

  const [otherReason, setOtherReason] = useState<string>("");
  const otherReasonRef = useRef<TextInput>(null);
  const [otherReasonFocused, setOtherReasonFocused] = useState(false);

  const [isCancelSuccessModalVisible, setIsCancelSuccessModalVisible] =
    useState(false);

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "description") {
      setOtherReason(text);
    }
  };

  const handleOnFocus = (type: string) => {
    if (selectedReason === "Other (please specify)") {
      if (type === "description") {
        setOtherReasonFocused(true);
      }
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "description") {
      setOtherReasonFocused(true);
    }
  };

  const handleOnSubmit = (type: string) => {
    otherReasonRef?.current?.focus();
  };

  // Add this state at the top with other state declarations
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleSelectReason = (index: number) => {
    const reason = arrCancelOrderReason[index].reason;
    console.log("resadon", reason);
    setSelectedReason(reason);
    setArrCancelOrderReason((prev) =>
      prev.map((item, i) => ({
        ...item,
        isSelected: i === index,
      }))
    );
  };

  const onPressSubmit = () => {
    const selectedReason = arrCancelOrderReason.find((item) => item.isSelected);

    if (!selectedReason) {
      flashMessageWarning("Please select a reason for cancellation.");
      return;
    }

    if (
      selectedReason.reason === "Other (please specify)" &&
      !otherReason.trim()
    ) {
      flashMessageWarning("Please specify your reason.");
      otherReasonRef?.current?.focus();
      return;
    }

    // ✅ Call cancel API here
    handleCancelOrderApi(selectedReason, otherReason.trim());
  };

  const onPressOkCancel = () => {
    setIsCancelSuccessModalVisible(false);
    setOtherReason("");
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

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.cancelOrder}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  // ----------------------- API Calling -------------------------
  // handleCancelOrderReasonListApi
  const handleCancelOrderReasonListApi = async () => {
    const dictData = {
      type: "cancel",
    };
    try {
      const response = await cancelReturnOrderReasonListApi(
        dictData,
        navigation
      );
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "CANCEL REASON LISTING RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          const rawData = response.data as CancelOrderReason[];
          // Map API reasons to your CancelOrderReason type
          const apiReasons: CancelOrderReason[] = rawData.map((item: any) => ({
            id: item.id,
            reason: item.reason,
            isSelected: false,
          }));

          // Add 'Other (please specify)' at the end
          const finalReasons: CancelOrderReason[] = [
            ...apiReasons,
            {
              reason: "Other (please specify)",
              isSelected: false,
            },
          ];

          setArrCancelOrderReason(finalReasons);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleCancelOrderApi
  const handleCancelOrderApi = async (
    selectedReason: CancelOrderReason,
    description?: string
  ) => {
    const dictData: any = {
      order_id: order_id,
    };
    if (selectedReason.reason === "Other (please specify)") {
      dictData.description = description;
    } else {
      dictData.reason_id = selectedReason.id;
    }
    try {
      const response = await cancelOrderApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("CANCEL ORDER RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          setIsCancelSuccessModalVisible(true);
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
      handleCancelOrderReasonListApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <CancelOrderComponent
      arrCancelOrderReason={arrCancelOrderReason}
      otherReason={otherReason}
      otherReasonRef={otherReasonRef}
      otherReasonFocused={otherReasonFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnSubmit={handleOnSubmit}
      handleSelectReason={handleSelectReason}
      isCancelSuccessModalVisible={isCancelSuccessModalVisible}
      onPressSubmit={onPressSubmit}
      onPressOkCancel={onPressOkCancel}
      selectedReason={selectedReason}
    />
  );
};

export default CancelOrderContainer;
