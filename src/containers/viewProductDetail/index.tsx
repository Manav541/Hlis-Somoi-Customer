import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Alert,
  Share,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import {
  activityOpacity,
  appName,
  flashMessageWarning,
  hitSlop,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import ViewProductDetailComponent from "../../components/viewProductDetail";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { ScreenNames } from "../../routers";
import {
  ColorVariation,
  Media,
  ProductData,
  Review,
  SizeVariation,
  Tag,
} from "../../constants/interfaces";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";

const ViewProductDetailContainer = ({ navigation, route }: any) => {
  // API Zustand store
  const productDetailsApi = zustandStore.ProductListingStore(
    (state) => state.productDetails
  );
  const wishlistProductApi = zustandStore.MyWishlistStore(
    (state) => state.wishlistProduct
  );

  const itemData = route.params;
  const product_id = itemData?.product_id;
  const variation_id = itemData?.variation_id;
  const customer_latitude = itemData?.customer_latitude;
  const customer_longitude = itemData?.customer_longitude;

  const [productDetails, setProductDetails] = useState<ProductData | null>(
    null
  );
  const [arrTags, setArrTags] = useState<Tag[]>([]);
  const [isSharing, setIsSharing] = useState<boolean>(true);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [allMedia, setAllMedia] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<{
    link: string;
    type: "image" | "video";
  } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [arrSizeVariations, setArrSizeVariations] = useState<SizeVariation[]>(
    []
  );
  const [arrColorVariations, setArrColorVariations] = useState<
    ColorVariation[]
  >([]);

  const handleCloseMediaModal = () => {
    setMediaModalVisible(false);
    // setSelectedMedia(null);
    // setAllMedia([]);
  };

  const handleSelectMedia = (
    mediaList: { link: string; type: "image" | "video" }[],
    index: number
  ) => {
    setAllMedia(mediaList);
    setSelectedIndex(index);
    setMediaModalVisible(true);
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / ScreenDimensions.screenWidth);
    setCurrentIndex(index);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressShare = async () => {
    if (!isSharing) return;

    setIsSharing(false);
    try {
      const result = await Share.share({
        message: `${appName} App`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }

    setTimeout(() => {
      setIsSharing(true);
    }, 1000);
  };

  const onPressGoToCompareProduct = () => {
    navigation.navigate(ScreenNames.compareProduct);
  };

  const onPressFavourite = (product_id: string, variation_id: string) => {
    handleWishlistProductApi(product_id, variation_id);
  };

  const onPressVariationProduct = (variation_id: string) => {
    handleProductDetailsApi(product_id, variation_id);
  };

  const onPressBuyNow = (type: "add" | "remove") => {
    // if (type === "add") {
    //   setProduct_Quantity((prevQuantity: number) => prevQuantity + 1);
    // } else if (type === "remove") {
    //   setProduct_Quantity((prevQuantity: number) =>
    //     prevQuantity > 0 ? prevQuantity - 1 : 0
    //   );
    // }
  };

  const onPressImageVideo = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressViewAll = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressSize = (selectedSize: string, size_id: string) => {
    // Step 1: Update the size selection
    const updatedSizes = arrSizeVariations.map((item) => ({
      ...item,
      is_selected: item.size === selectedSize,
    }));
    setArrSizeVariations(updatedSizes);

    // Step 2: Get the selected size object
    const selectedSizeObj = updatedSizes.find(
      (item) => item.size === selectedSize
    );

    if (selectedSizeObj && Array.isArray(selectedSizeObj.colors)) {
      // Step 3: Get the color where is_selected is true
      const selectedColor = selectedSizeObj.colors.find(
        (color) => color.is_selected
      );

      console.log("selectedColor", selectedColor);

      // Step 4: Update the color variation state
      setArrColorVariations(selectedSizeObj.colors);

      // Step 5: Call API with selected values
      handleProductDetailsApi(
        product_id,
        selectedColor?.variation_id ?? "",
        size_id,
        selectedColor?.color_id ?? ""
      );
    } else {
      setArrColorVariations([]);
    }
  };

  const onPressColor = (selectedHex: string) => {
    // Step 1: Update color selection
    const updatedColors = arrColorVariations.map((item) => ({
      ...item,
      is_selected: item.hex === selectedHex,
    }));
    setArrColorVariations(updatedColors);
  
    // Step 2: Get selected color object
    const selectedColor = updatedColors.find((color) => color.is_selected);
  
    // Step 3: Get the selected size object
    const selectedSizeObj = arrSizeVariations.find((item) => item.is_selected);
  
    // Step 4: Call API with selected values
    if (selectedSizeObj && selectedColor) {
      handleProductDetailsApi(
        product_id,
        selectedColor.variation_id,
        selectedSizeObj.size_id,
        selectedColor.color_id
      );
    }
  };

  const onPressCartIcon = useCallback(() => {
    if (isNavigating) return;

    setIsNavigating(true);

    requestAnimationFrame(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: ScreenNames.bottomTabsNavigation,
              state: {
                index: 0,
                routes: [{ name: ScreenNames.cart }],
              },
            },
          ],
        })
      );
    });

    setTimeout(() => setIsNavigating(false), 1000); // unlock after 1 sec
  }, [isNavigating, navigation]);

  const onPressReview = () => {
    navigation.navigate(ScreenNames.review);
  };

  // Utility to format delivery time
  const formatDeliveryTime = (minutes: number): string => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs > 0 && mins > 0) {
      return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} min${mins > 1 ? "s" : ""}`;
    } else if (hrs > 0 && mins === 0) {
      return `${hrs} hr${hrs > 1 ? "s" : ""}`;
    } else {
      return `${mins} min${mins > 1 ? "s" : ""}`;
    }
  };

  // ------------------- API Call ---------------------------
  // handleProductDetailsApi
  const handleProductDetailsApi = async (
    product_id: string,
    variation_id: string,
    size_id?: string,
    color_id?: string
  ) => {
    const dictData = {
      product_id: product_id,
      variation_id: variation_id,
      customer_latitude: customer_latitude,
      customer_longitude: customer_longitude,
      size_id: size_id,
      color_id: color_id,
    };
    try {
      const response = await productDetailsApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PRODUCT DETAILS RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const rawData = response.data as ProductData;

          // ✅ Store size variations if Fashion category
          if (
            rawData.main_category === "Fashion" &&
            Array.isArray(rawData.variations)
          ) {
            setArrSizeVariations(rawData.variations as SizeVariation[]);

            // ✅ Set default selected size and its colors
            const selectedSizeObj = rawData.variations.find(
              (item) => item.is_selected
            );
            if (
              selectedSizeObj &&
              "colors" in selectedSizeObj &&
              Array.isArray(selectedSizeObj.colors)
            ) {
              setArrColorVariations(selectedSizeObj.colors);
            }
          }

          // Format delivery time from minutes to string
          const estimatedMins = Number(rawData.estimated_delivery_time || 0);
          const formattedDeliveryTime = formatDeliveryTime(estimatedMins);

          // ✅ Dynamically build tag array based on response
          const tempTags = [];
          if (rawData.is_product_returnable) {
            tempTags.push({
              icon: images.productReturn,
              title: "3 day Return/ Exchange",
            });
          }
          if (rawData.is_cod_available) {
            tempTags.push({
              icon: images.cashOnDelivery,
              title: "Cash on Delivery",
            });
          }
          if (rawData.is_fast_delivery) {
            tempTags.push({
              icon: images.fastDelivery,
              title: "Fast Delivery",
            });
          }
          setArrTags(tempTags);

          // Convert string[] to { image: string }[]
          const formattedImages = ((rawData as any).images || []).map(
            (img: string) => ({
              image: img,
            })
          );

          const formattedReviews: Review[] = (rawData.reviews || []).map(
            (review: any) => ({
              ...review,
              media: Array.isArray(review.media)
                ? review.media.map((url: string) => {
                    const isVideo =
                      url.endsWith(".mp4") ||
                      url.endsWith(".mov") ||
                      url.includes("video");
                    return {
                      link: url,
                      type: isVideo ? "video" : "image",
                    };
                  })
                : [],
            })
          );

          // Apply the transformation and set to state
          const finalData = {
            ...rawData,
            images: formattedImages,
            reviews: formattedReviews,
            estimated_delivery_time: formattedDeliveryTime,
          };

          setProductDetails(finalData);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleWishlistProductApi
  const handleWishlistProductApi = async (
    product_id: string,
    variation_id: string
  ) => {
    const dictData = {
      product_id: product_id,
      variation_id: variation_id,
    };

    try {
      const response = await wishlistProductApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "WISHLIST PRODUCT RESPONSE===>",
            JSON.stringify(response)
          );

        if (response.code === statusCodes.success) {
          // ✅ Toggle is_wishlist in local state
          setProductDetails((prevDetails) => {
            if (!prevDetails) return prevDetails;
            return {
              ...prevDetails,
              is_wishlist: !prevDetails.is_wishlist,
            };
          });
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Product Listing API Error:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleProductDetailsApi(product_id, variation_id);
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation, product_id, variation_id])
  );

  return (
    <ViewProductDetailComponent
      productDetails={productDetails}
      arrTags={arrTags}
      arrSizeVariations={arrSizeVariations}
      arrColorVariations={arrColorVariations}
      currentIndex={currentIndex}
      handleScroll={handleScroll}
      onPressVariationProduct={onPressVariationProduct}
      onPressGoToCompareProduct={onPressGoToCompareProduct}
      onPressBuyNow={onPressBuyNow}
      onPressSize={onPressSize}
      onPressColor={onPressColor}
      onPressImageVideo={onPressImageVideo}
      onPressViewAll={onPressViewAll}
      onPressFavourite={onPressFavourite}
      onPressReview={onPressReview}
      onPressBack={onPressBack}
      onPressShare={onPressShare}
      onPressCartIcon={onPressCartIcon}
      isNavigating={isNavigating}
      mediaModalVisible={mediaModalVisible}
      handleCloseMediaModal={handleCloseMediaModal}
      selectedMedia={selectedMedia}
      handleSelectMedia={handleSelectMedia}
      allMedia={allMedia}
      selectedIndex={selectedIndex}
    />
  );
};

export default ViewProductDetailContainer;
