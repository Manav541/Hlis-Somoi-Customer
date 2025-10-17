import { Text, StatusBar } from "react-native";
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
import {
  AWS_FOLDER_NAME,
  getMimeTypeFromPath,
  uploadMultipleFilesToS3,
} from "../../api/AWSUpload";

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
  const s3ImageUploadApi = zustandStore.S3ImageUploadStore(
    (state) => state.s3ImageUpload
  );

  const itemData = route?.params;
  console.log("Item Data", itemData?.prodcutDetail?.rating_summary);
  const navigateFromStoreReview = itemData?.navigateFromStoreReview;
  const storeDetail: RestaurantInfo = itemData?.storeDetail;
  const prodcutDetail: OrderItem = itemData?.prodcutDetail;
  const isEditRating = itemData?.isEditRating;

  const [product_rating, setProduct_rating] = useState(0);
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);
  const uploadedS3ImageUrlsRef = useRef<string[] | null>(null);
  const [product_review, setproduct_review] = useState<string>("");
  const product_reviewRef = useRef<TextInput>(null);
  const [product_reviewFocused, setproduct_reviewFocused] =
    useState<boolean>(false);

  const [isReviewSuccessModalVisible, setIsReviewSuccessModalVisible] =
    useState(false);

  // handleApiUploadImages
  const handleApiUploadImages = async () => {
    try {
      // Filter new media (local URIs not containing S3 base URL)
      const baseS3Url = `${GlobalVar.url}somoiapp`;
      const newImagesToUpload = multiImagesArray.filter(
        (item) => item.uri && !item.uri.includes(baseS3Url)
      );
      const alreadyUploadedUrls = multiImagesArray
        .filter((item) => item.uri && item.uri.includes(baseS3Url))
        .map((item) => item.uri);

      const localFormattedImages = newImagesToUpload.map((item, index) => ({
        folder_name: AWS_FOLDER_NAME.RATING_MEDIA,
        file_type: item?.type
          ? item.type.includes("/")
            ? item.type.split("/")[1]
            : item.type
          : "",
        is_video: item.type?.includes("video/") ? true : false,
        local_path: item.uri ? item.uri : "",
      }));

      let uploadedFileNames: string[] = [];

      if (newImagesToUpload.length > 0) {
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
              console.log(
                `❌ Upload failed: ${result.localPath}`,
                result.error
              );
            } else {
              console.log(
                `✅ Uploaded: ${result.localPath} -> ${result.uploadedUrl}`
              );
            }
          });

          // 4️⃣ Extract uploaded URLs
          const uploadedUrls = uploadResults
            .map((r) => r.uploadedUrl)
            .filter(Boolean) as string[];

          console.log("UPLOADED S3 URLS===>", uploadedUrls);

          // 5️⃣ Extract only file names from uploaded URLs
          uploadedFileNames = uploadedUrls.map((url) => {
            return url.substring(url.lastIndexOf("/") + 1);
          });

          console.log("UPLOADED S3 FILE NAMES===>", uploadedFileNames);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
          return;
        }
      }

      // Combine already uploaded file names with newly uploaded ones
      const alreadyUploadedFileNames = alreadyUploadedUrls.map((url) => {
        return url ? url.substring(url.lastIndexOf("/") + 1) : "";
      });
      const allFileNames = [...alreadyUploadedFileNames, ...uploadedFileNames];

      console.log("ALL S3 FILE NAMES===>", allFileNames);

      // Call the appropriate API with all file names
      if (isEditRating === true) {
        handleEditRateApi(allFileNames);
      } else {
        handleRateProductApi(allFileNames);
      }
    } catch (error) {
      console.error("Error===>", error);
      flashMessageWarning("Failed to upload media");
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
        // uploadImagesInS3();
        handleApiUploadImages();
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
    const dictData: any = {
      vendor_id: storeDetail?.id,
      rating: product_rating.toString(),
    };

    if (product_review.trim() !== "") {
      dictData.review = product_review;
    }
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
    const dictData: any = {
      product_id: prodcutDetail?.product_id,
      rating: product_rating.toString(),
    };

    if (product_review.trim() !== "") {
      dictData.review = product_review;
    }

    if (media && media.length > 0) {
      dictData.media = media;
    }

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
    const dictData: any = {
      rating_id: prodcutDetail?.rating_summary?.rating_id,
      rating: product_rating.toString(),
    };

    if (typeof product_review === "string" && product_review.trim() !== "") {
      dictData.review = product_review;
    }

    if (media && media.length > 0) {
      dictData.media = media;
    }
    console.log("Dict data edit", dictData);

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
