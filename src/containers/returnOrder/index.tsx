import { View, Text, StatusBar, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ReturnOrderComponent from "../../components/returnOrder";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { cameraPermission, checkPermission, flashMessageWarning, galleryPermission, messages } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { Asset } from "react-native-image-picker";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { CancelOrderReason } from "../../constants/utils/interfaces";

const ReturnOrderContainer = ({ navigation }: any) => {
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const [arrReturnOrderReason, setArrReturnOrderReason] = useState<CancelOrderReason[]>([
    {
      reason: "Faulty item",
      isSelected: false,
    },
    {
      reason: "Wrong item received",
      isSelected: false,
    },
    {
      reason: "Item not as described",
      isSelected: false,
    },
    {
      reason: "Other (please specify)",
      isSelected: false,
    },
  ]);

  const [otherReason, setOtherReason] = useState<string>("");
  const otherReasonRef = useRef<TextInput>(null);
  const [otherReasonFocused, setOtherReasonFocused] = useState<boolean>(false);

  const [isReturnSuccessModalVisible, setIsReturnSuccessModalVisible] =
    useState(false);

  const [finalReturnReason, setFinalReturnReason] = useState<string>("");

  // Image uplaod
  const handleOnPressUploadImages = () => {
    checkPermission(cameraPermission, messages.cameraPermission).then(
      isAllow => {
        if (isAllow) {
          checkPermission(galleryPermission, messages.galleryPermission).then(
            isAllow => {
              if (isAllow) {
                const isMultiSelection = true;
                ImagePickerManager.choosePickerOptions(
                  'photo',
                  isMultiSelection,
                )
                  .then((result: unknown) => {
                    const pickerResponse = result as Asset[];
                    console.log('Response==>', result);
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
                      __DEV__ && console.log('No media selected or captured');
                    }
                  })
                  .catch((error: string) => {
                    __DEV__ && console.log('Error capturing media:', error);
                  });
              }
            },
          );
        }
      },
    );
  };

  const handleOnPressDeleteUploadedImage = (index: number) => {
    const updatedArray = [...multiImagesArray];
    updatedArray.splice(index, 1);
    setMultiImagesArray(updatedArray);
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "otherReason") {
      setOtherReason(text.replace(/\s/g, ""));
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "otherReason") {
      setOtherReasonFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "otherReason") {
      setOtherReasonFocused(true);
    }
  };

  const handleOnSubmit = (type: string) => {
    otherReasonRef?.current?.focus();
  };

  const handleSelectReason = (index: number) => {
    setArrReturnOrderReason((prev: CancelOrderReason[]) =>
      prev.map((item, i) => ({
        ...item,
        isSelected: i === index
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

  const onPressOkReturn = () => {
    setIsReturnSuccessModalVisible(false);
    navigation.navigate(ScreenNames.bottomTabsNavigation, {
      screen: ScreenNames.myOrders,
    });
  };

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

      multiImagesArray={multiImagesArray}
      handleOnPressUploadImages={handleOnPressUploadImages}
      handleOnPressDeleteUploadedImage={handleOnPressDeleteUploadedImage}
    />
  );
};

export default ReturnOrderContainer;
