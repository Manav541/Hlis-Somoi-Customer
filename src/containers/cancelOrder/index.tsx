import { View, Text, StatusBar, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import CancelOrderComponent from "../../components/cancelOrder";
import { flashMessageWarning } from "../../constants/GConstant";
import { ScreenNames } from "../../routers";
import { CancelOrderReason } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";

const CancelOrderContainer = ({ navigation }: any) => {
  const [arrCancelOrderReason, setArrCancelOrderReason] = useState<
    CancelOrderReason[]
  >([
    {
      reason: "Change of mind",
      isSelected: false,
    },
    {
      reason: "Found a better price",
      isSelected: false,
    },
    {
      reason: "Order error",
      isSelected: false,
    },
    {
      reason: "Delayed delivery",
      isSelected: false,
    },
    {
      reason: "Other (please specify)",
      isSelected: false,
    },
  ]);

  const [otherReason, setOtherReason] = useState<string>("");
  const otherReasonRef = useRef<TextInput>(null);
  const [otherReasonFocused, setOtherReasonFocused] = useState(false);

  const [isCancelSuccessModalVisible, setIsCancelSuccessModalVisible] =
    useState(false);

  const [finalCancelReason, setFinalCancelReason] = useState<string>("");

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

    // ✅ Set final reason
    const reasonToSubmit =
      selectedReason.reason === "Other (please specify)"
        ? otherReason.trim()
        : selectedReason.reason;

    setFinalCancelReason(reasonToSubmit);
    setIsCancelSuccessModalVisible(true);
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

  useFocusEffect(
    React.useCallback(() => {
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
