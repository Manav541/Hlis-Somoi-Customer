import { View, Text, StatusBar, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ReturnOrderComponent from "../../components/returnOrder";
import GlobalBackButton from "../../global/GlobalBackButton";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  galleryPermission,
  messages,
} from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { Asset } from "react-native-image-picker";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { CancelOrderReason } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";

const ReturnOrderContainer = ({ navigation }: any) => {
  // API zustand store
  const cancelReturnOrderReasonListApi = zustandStore.MyOrdersStore(
    (state) => state.cancelReturnOrderReasonList
  );

  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const [arrReturnOrderReason, setArrReturnOrderReason] = useState<
    CancelOrderReason[]
  >([]);

  const [otherReason, setOtherReason] = useState<string>("");
  const otherReasonRef = useRef<TextInput>(null);
  const [otherReasonFocused, setOtherReasonFocused] = useState<boolean>(false);

  const [isReturnSuccessModalVisible, setIsReturnSuccessModalVisible] =
    useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [isRefundReplacement, setIsRefundReplacement] =
    useState<string>("Refund");

  const [finalReturnReason, setFinalReturnReason] = useState<string>("");

  // Image uplaod
  const handleOnPressUploadImages = () => {
    checkPermission(cameraPermission, messages.cameraPermission).then(
      (isAllow) => {
        if (isAllow) {
          checkPermission(galleryPermission, messages.galleryPermission).then(
            (isAllow) => {
              if (isAllow) {
                const isMultiSelection = true;
                ImagePickerManager.choosePickerOptions(
                  "photo",
                  isMultiSelection
                )
                  .then((result: unknown) => {
                    const pickerResponse = result as Asset[];
                    console.log("Response==>", result);
                    if (pickerResponse) {
                      if (multiImagesArray.length == 0) {
                        setMultiImagesArray(pickerResponse);
                      } else {
                        setMultiImagesArray([
                          ...multiImagesArray,
                          ...pickerResponse,
                        ]);
                      }
                    } else {
                      __DEV__ && console.log("No media selected or captured");
                    }
                  })
                  .catch((error: string) => {
                    __DEV__ && console.log("Error capturing media:", error);
                  });
              }
            }
          );
        }
      }
    );
  };

  const handleOnPressDeleteUploadedImage = (index: number) => {
    const updatedArray = [...multiImagesArray];
    updatedArray.splice(index, 1);
    setMultiImagesArray(updatedArray);
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "description") {
      setOtherReason(text);
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "description") {
      setOtherReasonFocused(true);
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

  const handleSelectReason = (index: number) => {
    const reason = arrReturnOrderReason[index].reason;
    console.log("resadon", reason);
    setSelectedReason(reason);
    setArrReturnOrderReason((prev) =>
      prev.map((item, i) => ({
        ...item,
        isSelected: i === index,
      }))
    );
  };

  const onPressSubmit = () => {
    const selectedReason = arrReturnOrderReason.find(
      (item: CancelOrderReason) => item.isSelected
    );

    if (!selectedReason) {
      flashMessageWarning("Please select a reason for Return.");
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

    setFinalReturnReason(reasonToSubmit);
    setIsReturnSuccessModalVisible(true);
  };

  const onPressSelectRefundReplacement = (type: string) => {
    setIsRefundReplacement(type);
  };

  const onPressOkReturn = () => {
    setIsReturnSuccessModalVisible(false);
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
          {ScreenNames.returnOrder}
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
            "RETURN REASON LISTING RESPONSE===>",
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

          setArrReturnOrderReason(finalReasons);
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
    <ReturnOrderComponent
      arrReturnOrderReason={arrReturnOrderReason}
      otherReason={otherReason}
      otherReasonRef={otherReasonRef}
      otherReasonFocused={otherReasonFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnSubmit={handleOnSubmit}
      handleSelectReason={handleSelectReason}
      isReturnSuccessModalVisible={isReturnSuccessModalVisible}
      onPressSubmit={onPressSubmit}
      onPressOkReturn={onPressOkReturn}
      selectedReason={selectedReason}
      isRefundReplacement={isRefundReplacement}
      onPressSelectRefundReplacement={onPressSelectRefundReplacement}
      multiImagesArray={multiImagesArray}
      handleOnPressUploadImages={handleOnPressUploadImages}
      handleOnPressDeleteUploadedImage={handleOnPressDeleteUploadedImage}
    />
  );
};

export default ReturnOrderContainer;
