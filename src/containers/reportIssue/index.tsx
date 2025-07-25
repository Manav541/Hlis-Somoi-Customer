import { Text, StatusBar, TextInput } from "react-native";
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
  toggleLoader,
} from "../../constants/GConstant";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { ScreenNames } from "../../routers";
import ReportIssueComponent from "../../components/reportIssue";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import ImageUpload, { FolderName } from "../../constants/utils/S3ImageUpload";
import { SecretKeyItem } from "../../constants/interfaces";

const ReportIssueContainer = ({ navigation, route }: any) => {
  // API zustand store
  const reportIssueApi = zustandStore.MyOrdersStore(
    (state) => state.reportIssue
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const order_id = route?.params?.order_id;
  const [s3AccessKey, setS3AccessKey] = useState<string>("");
  const [s3SecretAccessKey, setS3SecretAccessKey] = useState<string>("");
  const uploadedS3ImageUrlsRef = useRef<string[] | null>(null);
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const [reportIssue, setReportIssue] = useState<string>("");
  const reportIssueRef = useRef<TextInput>(null);
  const [reportIssueFocused, setReportIssueFocused] = useState<boolean>(false);

  // Image uplaod
  const uploadImageInS3 = async () => {
    const imagesURIArray =
      multiImagesArray.map((image: Asset) => image.uri) || [];
    __DEV__ && console.log("All Image URIs:", imagesURIArray);

    try {
      toggleLoader(true);

      let newlyUploadedUrls: string[] = [];

      // 🆕 Only upload new images (local file URIs)
      if (imagesURIArray.length > 0) {
        const uploadPromises = imagesURIArray.map(
          (uri: string | undefined) =>
            new Promise<string>((resolve, reject) => {
              ImageUpload.uploadImage(
                s3AccessKey,
                s3SecretAccessKey,
                uri,
                FolderName.REPORTS_MEDIA,
                "image/png",
                ".png",
                (response: string) => {
                  __DEV__ && console.log("✅ Uploaded image:", response);
                  resolve(response);
                }
              );
            })
        );

        newlyUploadedUrls = await Promise.all(uploadPromises);
        uploadedS3ImageUrlsRef.current = newlyUploadedUrls;
      }

      const allUrls = [...newlyUploadedUrls];

      console.log("🧾 Final image file names:", allUrls);

      await handleReportIssueApi(reportIssue, allUrls);
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      toggleLoader(false);
    }
  };

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
      uploadImageInS3();
      // handleReportIssueApi(reportIssue, multiImagesArray);
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

  // -------------------------API Calling----------------------------
  // handleOrderDetailsApi
  const handleReportIssueApi = async (message: string, media?: string[]) => {
    const dictData: any = {
      order_id: order_id,
      message: message,
    };
    if (media && media.length > 0) {
      dictData.media = media;
    }
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

  // handleSecretKeyApi
  const handleSecretKeyApi = async () => {
    try {
      const response = await secretKeyApi({}, navigation);
      if (
        response?.code === statusCodes.success &&
        Array.isArray(response.data)
      ) {
        const keysData = response.data as SecretKeyItem[];
        keysData.forEach((item) => {
          switch (item.name) {
            case "S3_ACCESS_KEY":
              if (item.keys) setS3AccessKey(item.keys);
              break;
            case "S3_SECRET_KEY":
              if (item.keys) setS3SecretAccessKey(item.keys);
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

  useFocusEffect(
    React.useCallback(() => {
      handleSecretKeyApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

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
