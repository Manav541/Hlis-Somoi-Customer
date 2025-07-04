import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Share,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ViewRestaurantDetailComponent from "../../components/viewRestaurantDetail";
import {
  activityOpacity,
  appName,
  flashMessageWarning,
  hitSlop,
  showConfirmForGuest,
} from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { ScreenNames } from "../../routers";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import {
  AddRemoveWishlistDictData,
  AddToCartDictData,
  Category,
  FoodDetailsDictData,
  ProductRestaurant,
  RestaurantDetailResponse,
} from "../../constants/interfaces";
import { MmkvManager } from "../../constants/utils/MmkvManager";
import { styles } from "./styles";
import { colors } from "../../constants/Colors";
import GlobalBackButton from "../../global/GlobalBackButton";

const ViewRestaurantDetailContainer = ({ navigation, route }: any) => {
  // API Zustand store
  const foodDetailsApi = zustandStore.ProductListingStore(
    (state) => state.foodDetails
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
  const cartItemCount = zustandStore.CartItemCountStore(
    (state) => state.cartItemCount
  );
  const incrementCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.incrementCartItemCount
  );
  const decrementCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.decrementCartItemCount
  );
  const cartItemTotal = cartItemCount;
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  // console.log("route", route.params?.item);
  const itemData = route.params;
  const vendor_id = itemData?.vendor_id;
  const customer_latitude = itemData?.customer_latitude;
  const customer_longitude = itemData?.customer_longitude;
  const mainCategoryId = itemData?.mainCategoryId;
  const [isSharing, setIsSharing] = useState<boolean>(true);

  const [foodData, setFoodData] = useState<RestaurantDetailResponse>();

  const [arrSubCategoryType, setArrSubCategoryType] = useState<Category[]>([]);

  const [arrSubCategoryFoodData, setArrSubCategoryFoodData] = useState<
    ProductRestaurant[]
  >([]);

  const [isFoodModalVisible, setIsFoodModalVisible] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<any>(null);
  const [selectedFoodItemIndex, setSelectedFoodItemIndex] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleOnPressFoodItem = (item: ProductRestaurant, index: number) => {
    setIsFoodModalVisible(true);
    setSelectedFoodItem(item);
    setSelectedFoodItemIndex(index);
  };

  const onPressVariationFood = (variationId: string) => {
    if (!selectedFoodItem) return;

    const updatedVariations = selectedFoodItem.variations.map(
      (variation: any) => ({
        ...variation,
        is_selected: variation.variation_id === variationId,
      })
    );

    const selectedVariation = updatedVariations.find(
      (variation: any) => variation.variation_id === variationId
    );
    console.log("selectedVariation => ", selectedVariation);

    // Update selectedFoodItem with updated variations
    setSelectedFoodItem({
      ...selectedFoodItem,
      variations: updatedVariations,
      selected_variation: selectedVariation,
      variation_id: selectedVariation?.variation_id,
      price: selectedVariation?.price,
      quantity: selectedVariation?.quantity,
    });
  };

  const handleQuantityChange = async (
    index: number,
    type: "add" | "remove",
    product_id: string,
    is_variation?: boolean,
    variation_id?: string
  ) => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
      });
    } else {
      const currentItem = arrSubCategoryFoodData[index];

      let variationQty = 0;

      if (is_variation && variation_id) {
        const selectedVar = currentItem.variations.find(
          (v: any) => v.variation_id === variation_id
        );
        variationQty = Number(selectedVar?.quantity) || 0;
      } else {
        variationQty = Number(currentItem.quantity) || 0;
      }

      let newQty = variationQty;

      if (type === "add") {
        newQty = variationQty + 1;
      } else if (type === "remove" && variationQty > 0) {
        newQty = variationQty - 1;
      }

      if (newQty === 0) {
        await handleRemoveFromCartApi(
          product_id,
          index,
          variation_id,
          is_variation
        );
      } else if (variationQty === 0 && newQty === 1) {
        // ✅ CORRECT: Only call this for first-time add
        await handleAddToCartApi(
          product_id,
          newQty,
          index,
          variation_id,
          is_variation
        );
      } else {
        // ✅ Now only calls update if already present
        await handleUpdateCartQuantityApi(
          product_id,
          newQty,
          index,
          variation_id,
          is_variation
        );
      }
    }
  };

  const handleCloseFoodModal = () => {
    setIsFoodModalVisible(false);
  };

  const onPressFavourite = (product_id: string, index: number) => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
      });
    } else {
      handleWishlistProductApi(product_id, index);
    }
  };

  const onPressSubCategoryType = (selectedId: string, selectedName: string) => {
    const updated = arrSubCategoryType.map((item) => ({
      ...item,
      isSelected: item.id === selectedId,
    }));
    setArrSubCategoryType(updated);

    if (selectedName === "Recommended") {
      handleProductDetailsApi(vendor_id);
    } else {
      handleProductDetailsApi(vendor_id, selectedId);
    }
  };

  const onPressReview = () => {
    navigation.navigate(ScreenNames.review, {
      storeDetail: foodData?.restaurant,
      type: "vendor",
    });
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

  const onPressCartIcon = useCallback(() => {
    if (isNavigating) return;

    setIsNavigating(true);
    setIsFoodModalVisible(false);

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

    setTimeout(() => setIsNavigating(false), 1000);
  }, [isNavigating, navigation]);

  const onPressBack = () => {
    navigation.goBack();
  };

  // --------------------------API Calling-----------------------
  // handleProductDetailsApi
  const handleProductDetailsApi = async (
    vendor_id: string,
    subCategoryId?: string
  ) => {
    const dictData: FoodDetailsDictData = {
      vendor_id: vendor_id,
      customer_latitude: customer_latitude.toString(),
      customer_longitude: customer_longitude.toString(),
      page_no: 1,
    };

    if (subCategoryId) {
      dictData.sub_category_id = subCategoryId;
    }

    try {
      const response = await foodDetailsApi(dictData, isGuestUser, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("STORE DETAILS RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const foodData = response.data as RestaurantDetailResponse;
          setFoodData(foodData);

          const subArrFood = foodData?.products as ProductRestaurant[];
          setArrSubCategoryFoodData(subArrFood);

          if (arrSubCategoryType.length === 0) {
            const subCategoryTitleArray = [
              {
                name: "Recommended",
                isSelected: !subCategoryId,
                id: "0",
              },
              ...foodData?.categories.map((item: Category) => ({
                name: item.name,
                isSelected: item.id === subCategoryId,
                id: item.id,
              })),
            ];
            setArrSubCategoryType(subCategoryTitleArray);
          }
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
    index: number
  ) => {
    const dictData: AddRemoveWishlistDictData = {
      product_id: product_id,
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
          const updatedList = [...arrSubCategoryFoodData];
          updatedList[index].is_favorite = !updatedList[index].is_favorite;
          setArrSubCategoryFoodData(updatedList);
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
    index: number,
    variation_id?: string,
    is_variation?: boolean
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
      quantity: quantity,
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await addToCartApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ADD TO CART RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const updated = [...arrSubCategoryFoodData];

          if (index !== undefined) {
            // Find the correct variation and update quantity
            if (is_variation && variation_id) {
              const item = updated[index];
              item.variations = item.variations.map((v) =>
                v.variation_id === variation_id
                  ? { ...v, quantity: quantity }
                  : v
              );

              // Also update main product quantity if needed
              if (item.variation_id === variation_id) {
                item.quantity = quantity;
              }
            } else {
              updated[index].quantity = quantity;
            }
          }

          setArrSubCategoryFoodData(updated);

          // Update selected food modal quantity (if open)
          if (selectedFoodItem?.id === product_id) {
            const updatedVariations = selectedFoodItem.variations.map(
              (v: any) =>
                v.variation_id === variation_id ? { ...v, quantity } : v
            );

            const selectedVariation = updatedVariations.find(
              (v: any) => v.variation_id === variation_id
            );

            setSelectedFoodItem((prev: any) => ({
              ...prev,
              quantity: selectedVariation?.quantity ?? quantity,
              variations: updatedVariations,
              selected_variation: selectedVariation,
            }));
          }
          console.log("cartItemCount ===>> ", cartItemCount);

          incrementCartItemCount(1);
          // header();
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
    index?: number,
    variation_id?: string,
    is_variation?: boolean
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
          const updated = [...arrSubCategoryFoodData];

          if (index !== undefined) {
            const product = updated[index];

            if (is_variation && variation_id) {
              // ✅ Update variation-specific quantity
              product.variations = product.variations.map((v) =>
                v.variation_id === variation_id ? { ...v, quantity } : v
              );

              // Update main quantity only if current variation is selected
              if (product.variation_id === variation_id) {
                product.quantity = quantity;
              }
            } else {
              // Not variation-based product
              product.quantity = quantity;
            }
          }

          setArrSubCategoryFoodData(updated);

          // ✅ Update selectedFoodItem if modal is open
          if (selectedFoodItem?.id === product_id) {
            const updatedVariations = selectedFoodItem.variations.map(
              (v: any) =>
                v.variation_id === variation_id ? { ...v, quantity } : v
            );

            const selectedVariation = updatedVariations.find(
              (v: any) => v.variation_id === variation_id
            );

            setSelectedFoodItem((prev: any) => ({
              ...prev,
              quantity: selectedVariation?.quantity ?? quantity,
              variations: updatedVariations,
              selected_variation: selectedVariation,
            }));
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
    index?: number,
    variation_id?: string,
    is_variation?: boolean
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
          const updated = [...arrSubCategoryFoodData];

          if (typeof index === "number") {
            const product = updated[index];

            if (is_variation && variation_id) {
              // ✅ Set selected variation's quantity to 0
              product.variations = product.variations.map((v) =>
                v.variation_id === variation_id ? { ...v, quantity: 0 } : v
              );

              // Set product quantity = 0 only if this was the selected variation
              if (product.variation_id === variation_id) {
                product.quantity = 0;
              }
            } else {
              // ✅ For non-variation products
              product.quantity = 0;
            }
          }

          setArrSubCategoryFoodData(updated);

          // ✅ Update modal view if open
          if (selectedFoodItem?.id === product_id) {
            const updatedVariations = selectedFoodItem.variations.map(
              (v: any) =>
                v.variation_id === variation_id ? { ...v, quantity: 0 } : v
            );

            const selectedVariation = updatedVariations.find(
              (v: any) => v.variation_id === variation_id
            );

            setSelectedFoodItem((prev: any) => ({
              ...prev,
              quantity: selectedVariation?.quantity ?? 0,
              variations: updatedVariations,
              selected_variation: selectedVariation,
            }));
          }
          decrementCartItemCount(1);
          // header();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Remove From Cart API Error:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });
      handleProductDetailsApi(vendor_id);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation, vendor_id])
  );

  const header = () => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <View style={styles.vwHeaderRight}>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={onPressShare}
          >
            <Image
              style={styles.imgButton}
              source={images.shareIcon}
              tintColor={colors.blue4e}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={onPressCartIcon}
            disabled={isNavigating}
          >
            <Image
              style={styles.imgButton}
              source={images.cartBagIcon}
              tintColor={colors.blue4e}
            />
            {cartItemTotal > 0 && (
              <View style={styles.vwBedge}>
                <Text style={styles.lblBedge}>{cartItemTotal}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [cartItemTotal]);

  return (
    <>
      {foodData ? (
        <ViewRestaurantDetailComponent
          cartItemTotal={cartItemTotal}
          foodData={foodData || ({} as RestaurantDetailResponse)}
          arrSubCategoryType={arrSubCategoryType}
          onPressSubCategoryType={onPressSubCategoryType}
          arrSubCategoryFoodData={arrSubCategoryFoodData}
          handleQuantityChange={handleQuantityChange}
          onPressFavourite={onPressFavourite}
          isFoodModalVisible={isFoodModalVisible}
          handleOnPressFoodItem={handleOnPressFoodItem}
          onPressVariationFood={onPressVariationFood}
          selectedFoodItem={selectedFoodItem}
          selectedFoodItemIndex={selectedFoodItemIndex}
          handleCloseFoodModal={handleCloseFoodModal}
          onPressShare={onPressShare}
          onPressReview={onPressReview}
          onPressCartIcon={onPressCartIcon}
          onPressBack={onPressBack}
          isNavigating={isNavigating}
        />
      ) : (
        <View style={{ flex: 1, backgroundColor: colors.blue4e }}></View>
      )}
    </>
  );
};

export default ViewRestaurantDetailContainer;
