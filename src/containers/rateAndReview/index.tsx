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
  messages,
} from "../../constants/GConstant";
import { ImagePickerManager } from "../../constants/utils/NativeImagePicker";
import { TextInput } from "react-native-gesture-handler";
import { ScreenNames } from "../../routers";
import { images } from "../../constants/Images";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { RestaurantInfo } from "../../constants/interfaces";

const RateAndReviewContainer = ({ navigation, route }: any) => {
  // API Store
  const rateVendorApi = zustandStore.RateAndReviewStore(
    (state) => state.rateVendor
  );

  console.log("route?.params", route?.params?.storeDetail);
  const itemData = route?.params;
  const navigateFromStoreReview = itemData?.navigateFromStoreReview;
  const storeDetail: RestaurantInfo = itemData?.storeDetail;
  const [product_img, setProduct_img] = useState<any>(images.rice);
  const [product_name, setProduct_name] = useState<string>(
    `India Gate Basmati ${"\n"}Rice`
  );
  const [product_price, setProduct_price] = useState<string>("199");
  const [product_quantity, setProduct_quantity] = useState<string>("1");
  const [product_weight, setProduct_weight] = useState<string>("1 kg");
  const [height, setHeight] = useState<number>(61.6);
  const [width, setWidth] = useState<number>(42.3);
  const [product_rating, setProduct_rating] = useState(0);
  const [multiImagesArray, setMultiImagesArray] = useState<Asset[]>([]);

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
    if (route?.params) {
      if (!route?.params?.navigateFromStoreReview) {
        setProduct_img(route.params?.item.product_img);
        setProduct_name(route.params?.item.product_name);
        setProduct_price(route.params?.item.product_price);
        setProduct_quantity(route.params?.item.product_quantity);
        setProduct_weight(route.params?.item.product_weight);
        setHeight(route.params?.item.height);
        setWidth(route.params?.item.width);
      }
    } else {
    }
  }, [route]);

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

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <RateAndReviewComponent
      navigateFromStoreReview={navigateFromStoreReview}
      storeDetail={storeDetail}
      product_img={product_img}
      product_name={product_name}
      product_price={product_price}
      product_quantity={product_quantity}
      product_weight={product_weight}
      height={height}
      width={width}
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
