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
import {
  AWS_FOLDER_NAME,
  getMimeTypeFromPath,
  uploadMultipleFilesToS3,
} from "../../api/AWSUpload";

const ReturnOrderContainer = ({ navigation, route }: any) => {
  // API zustand store
  const cancelReturnOrderReasonListApi = zustandStore.MyOrdersStore(
    (state) => state.cancelReturnOrderReasonList
  );
  const returnOrderApi = zustandStore.MyOrdersStore(
    (state) => state.returnOrder
  );
  const s3ImageUploadApi = zustandStore.S3ImageUploadStore(
    (state) => state.s3ImageUpload
  );
  console.log("selected item", route?.params?.items);

  const order_id = route.params?.order_id;
  const selectedItems = route.params?.items;
  const arrProductIds = selectedItems.map((item: any) => item.product_id);
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
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

  // handleApiUploadImages
  const handleApiUploadImages = async (
    selectedReason: CancelOrderReason,
    description?: string
  ) => {
    try {
      const localFormattedImages = multiImagesArray.map((item, index) => ({
        folder_name: AWS_FOLDER_NAME.ORDER_RETURN_MEDIA,
        file_type: item?.type ? item.type.split("/")[1] : "",
        is_video: item.type?.includes("video/mp4") ? true : false,
        local_path: item.uri ? item.uri : "",
      }));

      const dictData = { images: localFormattedImages };

      const response = await s3ImageUploadApi(dictData, navigation);
      console.log("UPLOAD IMAGES RESPONSE===>", JSON.stringify(response));

      if (response.code === statusCodes.success) {
        const imageData = response.data as any[];
        // 1️⃣ Prepare array of files for S3 upload
        const filesToUpload = imageData.map((fileItem) => ({
          localPath: fileItem.local_path,
          signedUrl: fileItem.link,
          mimeType: getMimeTypeFromPath(fileItem.local_path),
        }));

        // 2️⃣ Upload all files in parallel
        const uploadResults = await uploadMultipleFilesToS3(filesToUpload);

        // 3️⃣ Log results and extract uploaded URLs
        uploadResults.forEach((result) => {
          if (result.error) {
            console.log(`❌ Upload failed: ${result.localPath}`, result.error);
          } else {
            console.log(
              `✅ Uploaded: ${result.localPath} -> ${result.uploadedUrl}`
            );
          }
        });

        // 4️⃣ Call your final form API with uploaded URLs
        const uploadedUrls = uploadResults
          .map((r) => r.uploadedUrl)
          .filter(Boolean) as string[];

        console.log("UPLOADED S3 URLS===>", uploadedUrls);

        // 5️⃣ Extract only file names from uploaded URLs
        const uploadedFileNames = uploadedUrls.map((url) => {
          // Split by '/' and take the last part of the URL
          return url.substring(url.lastIndexOf("/") + 1);
        });

        console.log("UPLOADED S3 FILE NAMES===>", uploadedFileNames);

        handleReturnOrderApi(selectedReason, description, uploadedFileNames);
      } else if (response.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      console.log("Error===>", error);
    }
  };

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
      // uploadImagesInS3(selectedReason, otherReason.trim());
      handleApiUploadImages(selectedReason, otherReason.trim());
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
    const defaultReasons: CancelOrderReason[] = [
      {
        reason: "Other (please specify)",
        isSelected: false,
      },
    ];

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
        if (
          response.code === statusCodes.success &&
          Array.isArray(response.data)
        ) {
          const rawData = response.data as CancelOrderReason[];
          // Map API reasons to CancelOrderReason type
          const apiReasons: CancelOrderReason[] = rawData.map((item: any) => ({
            id: item.id,
            reason: item.reason,
            isSelected: false,
          }));
          // Add 'Other (please specify)' at the end
          setArrReturnOrderReason([...apiReasons, ...defaultReasons]);
        } else {
          // Set default reason if API fails or returns no data
          setArrReturnOrderReason(defaultReasons);
          if (response.code === statusCodes.invaildOrFail) {
            flashMessageWarning(response.message);
          }
        }
      } else {
        // Set default reason if response is null or undefined
        setArrReturnOrderReason(defaultReasons);
      }
    } catch (error) {
      __DEV__ && console.log("Error fetching reasons:", error);
      // Set default reason on error
      setArrReturnOrderReason(defaultReasons);
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
