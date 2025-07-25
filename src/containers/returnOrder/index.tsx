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
  GlobalVar,
  messages,
  toggleLoader,
} from "../../constants/GConstant";
import { Asset } from "react-native-image-picker";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { CancelOrderReason, SecretKeyItem } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import ImageUpload, { FolderName } from "../../constants/utils/S3ImageUpload";

const ReturnOrderContainer = ({ navigation, route }: any) => {
  // API zustand store
  const cancelReturnOrderReasonListApi = zustandStore.MyOrdersStore(
    (state) => state.cancelReturnOrderReasonList
  );
  const returnOrderApi = zustandStore.MyOrdersStore(
    (state) => state.returnOrder
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);
  console.log("selected item", route?.params?.items);

  const order_id = route.params?.order_id;
  const selectedItems = route.params?.items;
  const arrProductIds = selectedItems.map((item: any) => item.product_id);
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const [s3AccessKey, setS3AccessKey] = useState<string>("");
  const [s3SecretAccessKey, setS3SecretAccessKey] = useState<string>("");
  const uploadedS3ImageUrlsRef = useRef<string[] | null>(null);
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
                  "mixed",
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

  const uploadImagesInS3 = async (
    selectedReason: CancelOrderReason,
    description?: string
  ) => {
    const imagesURIArray =
      multiImagesArray.map((image: Asset) => image.uri) || [];
    __DEV__ && console.log("All Image URIs:", imagesURIArray);

    const baseS3Url = `${GlobalVar.url}somoiapp`;

    // 🔁 Use full Asset objects to detect type
    const newImagesToUpload = multiImagesArray.filter(
      (image: Asset) => image.uri && !image.uri.includes(baseS3Url)
    );

    const alreadyUploadedUrls = multiImagesArray
      .filter((image: Asset) => image.uri && image.uri.includes(baseS3Url))
      .map((image: Asset) => image.uri);

    try {
      toggleLoader(true);

      let newlyUploadedUrls: string[] = [];

      if (newImagesToUpload.length > 0) {
        const uploadPromises = newImagesToUpload.map(
          (image: Asset) =>
            new Promise<string>((resolve, reject) => {
              console.log("Video Asset image", image);

              const isVideo = image.type?.includes("video/mp4");

              if (isVideo) {
                ImageUpload.uploadVideo(
                  s3AccessKey,
                  s3SecretAccessKey,
                  image.uri,
                  FolderName.ORDER_RETURN_MEDIA,
                  "video/mp4",
                  ".mp4",
                  (response: string) => {
                    try {
                      const parsed =
                        typeof response === "string"
                          ? JSON.parse(response)
                          : response;
                      const videoName = parsed?.videoName || "";
                      __DEV__ &&
                        console.log("✅ Extracted videoName:", videoName);
                      resolve(videoName);
                    } catch (err) {
                      console.error("❌ Error parsing video response:", err);
                      resolve(""); // or reject(err);
                    }
                  }
                );
              } else {
                ImageUpload.uploadImage(
                  s3AccessKey,
                  s3SecretAccessKey,
                  image.uri,
                  FolderName.ORDER_RETURN_MEDIA,
                  "image/png",
                  ".png",
                  (response: string) => {
                    __DEV__ && console.log("✅ Uploaded file Image:", response);
                    resolve(response);
                  }
                );
              }
            })
        );

        newlyUploadedUrls = await Promise.all(uploadPromises);
        uploadedS3ImageUrlsRef.current = newlyUploadedUrls;
      }

      const allUrls = [...alreadyUploadedUrls, ...newlyUploadedUrls];

      const allImageFileNames = allUrls.map((url: string | undefined) => {
        try {
          return url?.split("/").pop() || "";
        } catch {
          return "";
        }
      });

      console.log("🧾 Final file names:", allImageFileNames);

      handleReturnOrderApi(selectedReason, description, allImageFileNames);
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      toggleLoader(false);
    }
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
    } else if (
      selectedReason.reason === "Other (please specify)" &&
      !otherReason.trim()
    ) {
      flashMessageWarning("Please specify your reason.");
      otherReasonRef?.current?.focus();
      return;
    } else if (multiImagesArray.length == 0) {
      flashMessageWarning("Please upload at least one image/video.");
      return;
    } else {
      uploadImagesInS3(selectedReason, otherReason.trim());
    }

    // 🟡 If images are selected, upload them to S3 first
    // if (multiImagesArray.length > 0) {
    //   uploadImagesInS3(selectedReason, otherReason.trim());
    // } else {
    //   // 🟢 Directly call API if no media selected
    //   handleReturnOrderApi(selectedReason, otherReason.trim());
    // }
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

  // handleReturnOrderApi
  const handleReturnOrderApi = async (
    selectedReason: CancelOrderReason,
    description?: string,
    media?: string[]
  ) => {
    const dictData: any = {
      order_id: order_id,
      product_id: arrProductIds,
      media: media,
    };
    if (selectedReason.reason === "Other (please specify)") {
      dictData.description = description;
    } else {
      dictData.reason_id = selectedReason.id;
    }

    try {
      const response = await returnOrderApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("RETURN ORDER RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          setIsReturnSuccessModalVisible(true);
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
