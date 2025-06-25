import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  Share,
} from "react-native";
import React, { useCallback, useState } from "react";
import ViewRestaurantDetailComponent from "../../components/viewRestaurantDetail";
import { appName, flashMessageWarning } from "../../constants/GConstant";
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
      price: selectedVariation?.price || 0,
      quantity: selectedVariation?.quantity || 0,
    });
  };

  const handleQuantityChange = async (
    index: number,
    type: "add" | "remove",
    product_id: string,
    is_variation?: boolean,
    variation_id?: string
  ) => {
    const currentItem = arrSubCategoryFoodData[index];
    console.log("currentItem => ", currentItem);

    const currentQty = Number(currentItem.quantity) || 0;
    let newQty = currentQty;

    if (type === "add") {
      newQty = currentQty + 1;
    } else if (type === "remove" && currentQty > 0) {
      newQty = currentQty - 1;
    }

    // const { id: product_id, variation_id } = currentItem;

    if (newQty === 0) {
      await handleRemoveFromCartApi(
        product_id,
        index,
        variation_id,
        is_variation
      );
    } else if (currentQty === 0 && newQty === 1) {
      await handleAddToCartApi(
        product_id,
        newQty,
        index,
        variation_id,
        is_variation
      );
    } else {
      await handleUpdateCartQuantityApi(
        product_id,
        newQty,
        index,
        variation_id,
        is_variation
      );
    }
  };

  const handleCloseFoodModal = () => {
    setIsFoodModalVisible(false);
  };

  const onPressFavourite = (product_id: string, index: number) => {
    handleWishlistProductApi(product_id, index);
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
      const response = await foodDetailsApi(dictData, navigation);
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
            updated[index].quantity = quantity;
          }
          setArrSubCategoryFoodData(updated);
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
            updated[index].quantity = quantity;
          }
          setArrSubCategoryFoodData(updated);
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
            updated[index].quantity = 0;
          }
          setArrSubCategoryFoodData(updated);
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
      handleProductDetailsApi(vendor_id);
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation, vendor_id])
  );

  return (
    <ViewRestaurantDetailComponent
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
  );
};

export default ViewRestaurantDetailContainer;
