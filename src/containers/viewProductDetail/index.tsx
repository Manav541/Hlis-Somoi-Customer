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
import { colors } from "../../constants/Colors";
import {
  FashionColor,
  FashionSize,
  Media,
  ProductData,
  RatingSummary,
  Review,
  SimilarProduct,
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
const [selectedMedia, setSelectedMedia] = useState<{ link: string; type: 'image' | 'video' } | null>(null);
const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleCloseMediaModal = () => {
    setMediaModalVisible(false);
    // setSelectedMedia(null);
  // setAllMedia([]);
  };

  const handleSelectMedia = (
    mediaList: { link: string; type: 'image' | 'video' }[],
    index: number
  ) => {
    setAllMedia(mediaList);
    setSelectedIndex(index);
    setMediaModalVisible(true);
  };

  const [arrFashionSize, setArrFashionSize] = useState<FashionSize[]>([
    {
      size: "S",
      isSelected: false,
    },
    {
      size: "M",
      isSelected: true,
    },
    {
      size: "L",
      isSelected: false,
    },
    {
      size: "XL",
      isSelected: false,
    },
  ]);

  const [arrFashionColor, setArrFashionColor] = useState<FashionColor[]>([
    {
      color: colors.brown08,
      isSelected: false,
    },
    {
      color: colors.blue4e,
      isSelected: true,
    },
    {
      color: colors.black,
      isSelected: false,
    },
    {
      color: colors.brown46,
      isSelected: false,
    },
    {
      color: colors.green9f,
      isSelected: false,
    },
    {
      color: colors.grey72,
      isSelected: false,
    },
  ]);

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

  const onPressSize = (selectedSize: string) => {
    const updatedSizes = arrFashionSize.map((item) => ({
      ...item,
      isSelected: item.size === selectedSize,
    }));
    setArrFashionSize(updatedSizes);
  };

  const onPressColor = (selectedColor: string) => {
    const updatedColor = arrFashionColor.map((item) => ({
      ...item,
      isSelected: item.color === selectedColor,
    }));
    setArrFashionColor(updatedColor);
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
    } else if (hrs > 0) {
      return `${hrs} hr${hrs > 1 ? "s" : ""}`;
    } else {
      return `${mins} min${mins > 1 ? "s" : ""}`;
    }
  };

  // ------------------- API Call ---------------------------
  // handleProductDetailsApi
  const handleProductDetailsApi = async () => {
    const dictData = {
      product_id: product_id,
      variation_id: variation_id,
      customer_latitude: customer_latitude,
      customer_longitude: customer_longitude,
    };
    try {
      const response = await productDetailsApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PRODUCT DETAILS RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const rawData = response.data as ProductData;

          // ✅ Dynamically build tag array based on response
          const tempTags = [];
          if (rawData.is_product_returnable) {
            tempTags.push({
              icon: images.productReturn,
              title: "3 day Return/\nExchange",
            });
          }
          if (rawData.is_cod_available) {
            tempTags.push({
              icon: images.cashOnDelivery,
              title: "Cash on\nDelivery",
            });
          }
          if (rawData.is_fast_delivery) {
            tempTags.push({
              icon: images.fastDelivery,
              title: "Fast\nDelivery",
            });
          }
          setArrTags(tempTags);

          // Convert estimated_delivery_time: "1548 mins" => "25 hrs 48 mins"
          const estimatedMinsString = rawData.estimated_delivery_time || "0";
          const estimatedMins = Number(
            estimatedMinsString.replace(" mins", "")
          );
          const formattedDeliveryTime = formatDeliveryTime(estimatedMins);

          // Convert string[] to { image: string }[]
          const formattedImages = ((rawData as any).images || []).map(
            (img: string) => ({
              image: img,
            })
          );

          // Convert rating_summary object to array
          const ratingArray: RatingSummary[] = Object.entries(
            rawData.rating_summary || {}
          )
            .map(([key, value]) => ({
              rateNumber: Number(key),
              ratePercentage: Number(value),
            }))
            .reverse();

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
            rating_summary: ratingArray,
            estimated_delivery_time: formattedDeliveryTime,
            reviews: formattedReviews,
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
      handleProductDetailsApi();
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation])
  );

  return (
    // <View style={{flex : 1, backgroundColor : colors.blue4e}}></View>
    <ViewProductDetailComponent
      productDetails={productDetails}
      arrTags={arrTags}
      arrFashionSize={arrFashionSize}
      arrFashionColor={arrFashionColor}
      currentIndex={currentIndex}
      handleScroll={handleScroll}
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
