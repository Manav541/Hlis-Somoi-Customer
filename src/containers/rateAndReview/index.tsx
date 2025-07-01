import { View, Text, StatusBar, ImageSourcePropType } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RateAndReviewComponent from "../../components/rateAndReview";
import { useFocusEffect } from "@react-navigation/native";
import GlobalBackButton from "../../global/GlobalBackButton";
import { Asset } from "react-native-image-picker";
import {
  cameraPermission,
  checkPermission,
  flashMessageWarning,
  galleryPermission,
  GlobalVar,
  messages,
  toggleLoader,
} from "../../constants/GConstant";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { TextInput } from "react-native-gesture-handler";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import {
  OrderItem,
  RestaurantInfo,
  SecretKeyItem,
} from "../../constants/interfaces";
import ImageUpload, { FolderName } from "../../constants/utils/S3ImageUpload";

const RateAndReviewContainer = ({ navigation, route }: any) => {
  // API Store
  const rateVendorApi = zustandStore.RateAndReviewStore(
    (state) => state.rateVendor
  );
  const rateProductApi = zustandStore.RateAndReviewStore(
    (state) => state.rateProduct
  );
  const editRateApi = zustandStore.RateAndReviewStore(
    (state) => state.editRate
  );
  const secretKeyApi = zustandStore.KeyStore((state) => state.secretKey);

  const itemData = route?.params;
  console.log("Item Data", itemData?.prodcutDetail?.rating_summary);
  const navigateFromStoreReview = itemData?.navigateFromStoreReview;
  const storeDetail: RestaurantInfo = itemData?.storeDetail;
  const prodcutDetail: OrderItem = itemData?.prodcutDetail;
  const isEditRating = itemData?.isEditRating;

  const [product_rating, setProduct_rating] = useState(0);
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const [s3AccessKey, setS3AccessKey] = useState<string>("");
  const [s3SecretAccessKey, setS3SecretAccessKey] = useState<string>("");
  const uploadedS3ImageUrlsRef = useRef<string[] | null>(null);
  const [product_review, setproduct_review] = useState<string>("");
  const product_reviewRef = useRef<TextInput>(null);
  const [product_reviewFocused, setproduct_reviewFocused] =
    useState<boolean>(false);

  const [isReviewSuccessModalVisible, setIsReviewSuccessModalVisible] =
    useState(false);

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

  const uploadImagesInS3 = async () => {
    const imagesURIArray =
      multiImagesArray.map((image: Asset) => image.uri) || [];
    __DEV__ && console.log("All Image URIs:", imagesURIArray);

    const baseS3Url = `${GlobalVar.url}somoiapp`;

    const newImagesToUpload = imagesURIArray.filter(
      (uri) => uri && !uri.includes(baseS3Url)
    );
    __DEV__ && console.log("🆕 New images to upload:", newImagesToUpload);

    const alreadyUploadedUrls = imagesURIArray.filter(
      (uri) => uri && uri.includes(baseS3Url)
    );

    try {
      toggleLoader(true);

      let newlyUploadedUrls: string[] = [];

      // 🆕 Only upload new images (local file URIs)
      if (newImagesToUpload.length > 0) {
        const uploadPromises = newImagesToUpload.map(
          (uri: string | undefined) =>
            new Promise<string>((resolve, reject) => {
              ImageUpload.uploadImage(
                s3AccessKey,
                s3SecretAccessKey,
                uri,
                FolderName.RATING_MEDIA,
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

      const allUrls = [...alreadyUploadedUrls, ...newlyUploadedUrls];

      const allImageFileNames = allUrls.map((url: string | undefined) => {
        try {
          return url?.split("/").pop() || "";
        } catch {
          return "";
        }
      });

      console.log("🧾 Final image file names:", allImageFileNames);

      if (isEditRating == true) {
        handleEditRateApi(allImageFileNames);
      } else {
        handleRateProductApi(allImageFileNames);
      }
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
      setproduct_review(text);
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "description") {
      setproduct_reviewFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "description") {
      setproduct_reviewFocused(true);
    }
  };

  const handleOnSubmit = (type: string) => {
    if (type === "description") {
      product_reviewRef?.current?.focus();
    }
  };

  const onPressSubmit = () => {
    // Validate rating
    if (product_rating === 0) {
      flashMessageWarning("Please select a rating");
      return;
    } else {
      if (navigateFromStoreReview == true) {
        handleRateVendorApi();
      } else {
        uploadImagesInS3();
      }
    }
  };

  const onPressOkReturn = () => {
    setIsReviewSuccessModalVisible(false);
    navigation.goBack();
  };

  const onPressRating = (index: number) => {
    setProduct_rating(index + 1);
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.rateAndReview}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useEffect(() => {
    if (isEditRating && prodcutDetail?.rating_summary) {
      setProduct_rating(Number(prodcutDetail.rating_summary.rating));
      setproduct_review(prodcutDetail.rating_summary.review);
    }
  }, [isEditRating, prodcutDetail]);

  // --------------------------API Calling--------------------------
  // handleRateVendorApi
  const handleRateVendorApi = async () => {
    const dictData = {
      vendor_id: storeDetail?.id,
      rating: product_rating.toString(),
      review: product_review,
    };
    try {
      const response = await rateVendorApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("RATE VENDOR RESPONSE===>", JSON.stringify(response));
        const data = response.data as any;
        if (response.code === statusCodes.success) {
          setIsReviewSuccessModalVisible(true);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleRateProductApi
  const handleRateProductApi = async (media: string[]) => {
    const dictData = {
      product_id: prodcutDetail?.product_id,
      rating: product_rating.toString(),
      review: product_review,
      media: media,
    };
    try {
      const response = await rateProductApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("RATE VENDOR RESPONSE===>", JSON.stringify(response));
        const data = response.data as any;
        if (response.code === statusCodes.success) {
          setIsReviewSuccessModalVisible(true);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleEditRateApi
  const handleEditRateApi = async (media: string[]) => {
    const dictData = {
      rating_id: prodcutDetail?.rating_summary?.rating_id,
      rating: product_rating.toString(),
      review: product_review,
      media: media,
    };
    try {
      const response = await editRateApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("RATE VENDOR RESPONSE===>", JSON.stringify(response));
        const data = response.data as any;
        if (response.code === statusCodes.success) {
          setIsReviewSuccessModalVisible(true);
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

  useEffect(() => {
    if (!isEditRating || !prodcutDetail?.rating_summary?.rating_media) return;

    const mediaArray = prodcutDetail.rating_summary.rating_media;

    const mappedAssets = mediaArray
      .map((item: any) => {
        const uri = typeof item === "string" ? item : item?.image;
        if (!uri) return null;

        const fileName = uri.split("/").pop() || "";
        const ext = fileName.split(".").pop()?.toLowerCase();

        const isVideo = ext === "mp4" || ext === "mov";
        const type = isVideo ? "video/mp4" : "image/png";

        return { uri, fileName, type } as Asset;
      })
      .filter(Boolean);

    console.log("🧾 mappedAssets:", mappedAssets);
    setMultiImagesArray(mappedAssets as Asset[]);
  }, [isEditRating, prodcutDetail]);

  useFocusEffect(
    React.useCallback(() => {
      handleSecretKeyApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <RateAndReviewComponent
      navigateFromStoreReview={navigateFromStoreReview}
      isEditRating={isEditRating}
      storeDetail={storeDetail}
      prodcutDetail={prodcutDetail}
      product_rating={product_rating}
      onPressRating={onPressRating}
      product_review={product_review}
      product_reviewRef={product_reviewRef}
      product_reviewFocused={product_reviewFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnSubmit={handleOnSubmit}
      isReviewSuccessModalVisible={isReviewSuccessModalVisible}
      onPressSubmit={onPressSubmit}
      onPressOkReturn={onPressOkReturn}
      multiImagesArray={multiImagesArray}
      handleOnPressUploadImages={handleOnPressUploadImages}
      handleOnPressDeleteUploadedImage={handleOnPressDeleteUploadedImage}
    />
  );
};

export default RateAndReviewContainer;
