import { View, Text, StatusBar, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { Asset } from "react-native-image-picker";
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  galleryPermission,
  messages,
} from "../../constants/GConstant";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { ScreenNames } from "../../routers";
import ReportIssueComponent from "../../components/reportIssue";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";

const ReportIssueContainer = ({ navigation, route }: any) => {
  // API zustand store
  const reportIssueApi = zustandStore.MyOrdersStore(
    (state) => state.reportIssue
  );
  const order_id = route?.params?.order_id;
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const [reportIssue, setReportIssue] = useState<string>("");
  const reportIssueRef = useRef<TextInput>(null);
  const [reportIssueFocused, setReportIssueFocused] = useState<boolean>(false);

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
      setReportIssue(text);
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "description") {
      setReportIssueFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "description") {
      setReportIssueFocused(true);
    }
  };

  const handleOnSubmit = (type: string) => {
    reportIssueRef?.current?.focus();
  };

  const onPressSubmit = () => {
    if (reportIssue.trim() === "") {
      flashMessageWarning("Please specify your issue.");
      reportIssueRef?.current?.focus();
      return;
    } else {
      handleReportIssueApi(reportIssue, multiImagesArray);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.reportIssue}
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

  // -------------------------API Calling----------------------------
  // handleOrderDetailsApi
  const handleReportIssueApi = async (message: string, media?: Asset[]) => {
    const dictData = {
      order_id: order_id,
      message: message,
      media: media,
    };
    try {
      const response = await reportIssueApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("REPORT ISSUE RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          navigation.goBack();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };
  return (
    <ReportIssueComponent
      reportIssue={reportIssue}
      reportIssueRef={reportIssueRef}
      reportIssueFocused={reportIssueFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnSubmit={handleOnSubmit}
      onPressSubmit={onPressSubmit}
      multiImagesArray={multiImagesArray}
      handleOnPressUploadImages={handleOnPressUploadImages}
      handleOnPressDeleteUploadedImage={handleOnPressDeleteUploadedImage}
    />
  );
};

export default ReportIssueContainer;
