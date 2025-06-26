import {
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Alert,
  Share,
} from "react-native";
import React, { useCallback, useState } from "react";
import { images } from "../../constants/Images";
import { appName, flashMessageWarning } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import ViewProductDetailComponent from "../../components/viewProductDetail";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { ScreenNames } from "../../routers";
import {
  AddRemoveWishlistDictData,
  AddToCartDictData,
  ColorVariation,
  Media,
  ProductData,
  ProductDetailsDictData,
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
  const addToCartApi = zustandStore.ProductListingStore(
    (state) => state.addToCart
  );
  const updateCartQuantityApi = zustandStore.ProductListingStore(
    (state) => state.updateCartQuantity
  );
  const removeFromCartApi = zustandStore.ProductListingStore(
    (state) => state.removeFromCart
  );
  const addCompareProductApi = zustandStore.CompareProductStore(
    (state) => state.addCompareProduct
  );
  const cartListingApi = zustandStore.CartStore((state) => state.cartListing);

  const itemData = route.params;
  console.log("itemData", itemData);

  const product_id = itemData?.product_id;
  const variation_id = itemData?.variation_id;
  const customer_latitude = itemData?.customer_latitude;
  const customer_longitude = itemData?.customer_longitude;
  const is_variation = itemData?.is_variation;
  const is_color = itemData?.is_color;
  const is_size = itemData?.is_size;
  const color_id = itemData?.color_id;
  const size_id = itemData?.size_id;
  const navigateFromCompareProduct = itemData?.navigateFromCompareProduct;

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
  const [cartItemTotal, setCartItemTotal] = useState<string>("");

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
    navigation.pop();
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
    handleAddCompareProductApi(product_id);
  };

  const onPressFavourite = (product_id: string, variation_id: string) => {
    handleWishlistProductApi(product_id, variation_id);
  };

  const onPressVariationProduct = (variation_id: string) => {
    handleProductDetailsApi(product_id, variation_id);
  };

  // onPressBuyNow
  const onPressBuyNow = (type: "add" | "remove") => {
    if (!productDetails) return;

    const currentQty = Number(productDetails.cart?.quantity) || 0;
    let newQty = currentQty;

    if (type === "add") {
      newQty = currentQty + 1;
    } else if (type === "remove") {
      newQty = currentQty > 0 ? currentQty - 1 : 0;
    }

    // ✅ Extract selected size and color from variations
    const selectedSize = productDetails.variations?.find((v) => v.is_selected);
    const selectedColor = (selectedSize as SizeVariation)?.colors?.find(
      (c) => c.is_selected
    );

    const product_id = productDetails?.product_id;
    const variation_id = productDetails?.variation_id; // You must pass this
    const size_id = (selectedSize as SizeVariation)?.size_id;
    const color_id = selectedColor?.color_id;

    if (newQty === 1 && currentQty === 0) {
      // Add to cart first time
      handleAddToCartApi(
        product_id,
        newQty,
        variation_id,
        size_id,
        color_id,
        productDetails,
        setProductDetails
      );
    } else if (newQty === 0) {
      // Remove from cart
      handleRemoveFromCartApi(
        product_id,
        variation_id,
        productDetails,
        setProductDetails
      );
    } else {
      // Update quantity
      handleUpdateCartQuantityApi(
        product_id,
        newQty,
        variation_id,
        productDetails,
        setProductDetails
      );
    }
  };

  const onPressImageVideo = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressViewAllReview = (product_id: string) => {
    navigation.navigate(ScreenNames.review, {
      product_id: product_id,
      type: "product",
    });
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
    variation_id?: string,
    size_id?: string,
    color_id?: string
  ) => {
    const dictData: ProductDetailsDictData = {
      product_id: product_id,
      customer_latitude: customer_latitude.toString(),
      customer_longitude: customer_longitude.toString(),
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
      if (is_size == true) {
        dictData.size_id = size_id;
      }
      if (is_color == true) {
        dictData.color_id = color_id;
      }
    }

    try {
      const response = await productDetailsApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PRODUCT DETAILS RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const rawData = response.data as ProductData;

          // ✅ Store size variations if Fashion category
          if (
            rawData.is_variation === true &&
            Array.isArray(rawData.variations)
          ) {
            // ✅ CASE 1: BOTH SIZE AND COLOR EXIST
            if (is_size === true && is_color === true) {
              setArrSizeVariations(rawData.variations as SizeVariation[]);

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

            // ✅ CASE 2: ONLY SIZE EXISTS
            else if (is_size === true && is_color !== true) {
              setArrSizeVariations(rawData.variations as SizeVariation[]);
              setArrColorVariations([]); // Clear any previous color data
            }

            // ✅ CASE 3: ONLY COLOR EXISTS
            else if (is_color === true && is_size !== true) {
              // No size variations; directly use the first entry's color array
              const firstItem = rawData.variations[0];
              if (
                firstItem &&
                "colors" in firstItem &&
                Array.isArray(firstItem.colors)
              ) {
                setArrColorVariations(firstItem.colors);
              }
              setArrSizeVariations([]); // Clear any previous size data
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
    variation_id?: string
  ) => {
    const dictData: AddRemoveWishlistDictData = {
      product_id: product_id,
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
    }

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

  // handleAddToCartApi
  const handleAddToCartApi = async (
    product_id: string,
    quantity: number,
    variation_id?: string,
    size_id?: string,
    color_id?: string,
    productDetails?: ProductData,
    setProductDetails?: React.Dispatch<React.SetStateAction<ProductData | null>>
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
      quantity: quantity,
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
      if (is_size == true) {
        dictData.size_id = size_id;
      }
      if (is_color == true) {
        dictData.color_id = color_id;
      }
    }

    try {
      const response = await addToCartApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ADD TO CART RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          // ✅ Update quantity in productDetails
          if (productDetails && setProductDetails) {
            setProductDetails({
              ...productDetails,
              cart: {
                ...productDetails.cart,
                quantity: quantity,
              },
            });
          }
          // handleCartListingApi();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Product Listing API Error:", error);
    }
  };

  // handleUpdateCartQuantityApi
  const handleUpdateCartQuantityApi = async (
    product_id: string,
    quantity: number,
    variation_id?: string,
    productDetails?: ProductData,
    setProductDetails?: React.Dispatch<React.SetStateAction<ProductData | null>>
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
      quantity: quantity,
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await updateCartQuantityApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "UPDATE CART QUANTITY RESPONSE===>",
            JSON.stringify(response)
          );

        if (response.code === statusCodes.success) {
          // ✅ Update quantity in productDetails
          if (productDetails && setProductDetails) {
            setProductDetails({
              ...productDetails,
              cart: {
                ...productDetails.cart,
                quantity: quantity,
              },
            });
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Update Cart API Error:", error);
    }
  };

  // handleRemoveFromCartApi
  const handleRemoveFromCartApi = async (
    product_id: string,
    variation_id?: string,
    productDetails?: ProductData,
    setProductDetails?: React.Dispatch<React.SetStateAction<ProductData | null>>
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await removeFromCartApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "REMOVE FROM CART RESPONSE===>",
            JSON.stringify(response)
          );

        if (response.code === statusCodes.success) {
          // ✅ Set quantity to 0 in productDetails
          if (productDetails && setProductDetails) {
            setProductDetails({
              ...productDetails,
              cart: {
                ...productDetails.cart,
                quantity: 0,
              },
            });
          }
          // handleCartListingApi();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Remove From Cart API Error:", error);
    }
  };

  // handleAddCompareProductApi
  const handleAddCompareProductApi = async (product_id: string) => {
    const dictData = {
      product_id: product_id,
    };
    try {
      const response = await addCompareProductApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "ADD COMPARE PRODUCT RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          navigation.navigate(ScreenNames.compareProduct, {
            main_category: productDetails?.main_category,
            customer_latitude: customer_latitude,
            customer_longitude: customer_longitude,
          });
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

  useFocusEffect(
    React.useCallback(() => {
      handleProductDetailsApi(product_id, variation_id, size_id, color_id);
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation, product_id, variation_id, size_id, color_id])
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
      onPressViewAllReview={onPressViewAllReview}
      onPressFavourite={onPressFavourite}
      onPressBack={onPressBack}
      onPressShare={onPressShare}
      onPressCartIcon={onPressCartIcon}
      isNavigating={isNavigating}
      onPressImageVideo={onPressImageVideo}
      mediaModalVisible={mediaModalVisible}
      handleCloseMediaModal={handleCloseMediaModal}
      selectedMedia={selectedMedia}
      handleSelectMedia={handleSelectMedia}
      allMedia={allMedia}
      selectedIndex={selectedIndex}
      cartItemTotal={cartItemTotal}
      is_variation={is_variation}
      is_size={is_size}
      is_color={is_color}
      navigateFromCompareProduct={navigateFromCompareProduct}
    />
  );
};

export default ViewProductDetailContainer;
