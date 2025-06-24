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
  FoodDetailsDictData,
  ProductDetailsDictData,
  ProductRestaurant,
  RestaurantDetailResponse,
} from "../../constants/interfaces";

const ViewRestaurantDetailContainer = ({ navigation, route }: any) => {
  // API Zustand store
  const foodDetailsApi = zustandStore.ProductListingStore(
    (state) => state.foodDetails
  );
  // console.log("route", route.params?.item);
  const itemData = route.params;
  const vendor_id = itemData?.vendor_id;
  const customer_latitude = itemData?.customer_latitude;
  const customer_longitude = itemData?.customer_longitude;
  const [isSharing, setIsSharing] = useState<boolean>(true);

  const [foodData, setFoodData] = useState<RestaurantDetailResponse>();

  const [arrSubCategoryType, setArrSubCategoryType] = useState([
    {
      name: "Recommended",
      isSelected: true,
    },
    {
      name: "Burgers, Wraps & Tacos",
      isSelected: false,
    },
    {
      name: "Fast Food & Snacks",
      isSelected: false,
    },
    {
      name: "Indian & Asian Cuisine",
      isSelected: false,
    },
    {
      name: "Non-Vegetarian Specials",
      isSelected: false,
    },
    {
      name: "Vegetarian & Healthy Options",
      isSelected: false,
    },
    {
      name: "Spices",
      isSelected: false,
    },
    {
      name: "Snacks",
      isSelected: false,
    },
    {
      name: "Beverages",
      isSelected: false,
    },
  ]);

  const [arrSubCategoryData, setArrSubCategoryData] = useState([
    {
      food_img: images.burger,
      food_name: "Crispy Veggie Burger",
      food_price: "200",
      food_rate: "4.5",
      food_quantity: 0,
      food_description:
        "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce. Qty: 137 Gms| Kcal: 362 | Carbs 53.4 Gms| Sugar: 6.5 Gms| Fat: 12.8 Gms| Saturated fat: 4.9 Gms| Protein: 8.4 Gms| Sodium: 798.2 Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      food_AdditionalInfo:
        "330 kcal - 8.5 g Protein - 50.27 Carbs - 11.31. Fat",
      isFavourite: false,
    },
    {
      food_img: images.burger,
      food_name: "Crispy Chicken Burger",
      food_price: "100",
      food_rate: "4.5",
      food_quantity: 0,
      food_description:
        "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce. Qty: 137 Gms| Kcal: 362 | Carbs 53.4 Gms| Sugar: 6.5 Gms| Fat: 12.8 Gms| Saturated fat: 4.9 Gms| Protein: 8.4 Gms| Sodium: 798.2 Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      food_AdditionalInfo:
        "330 kcal - 8.5 g Protein - 50.27 Carbs - 11.31. Fat",
      isFavourite: false,
    },
    {
      food_img: images.burger,
      food_name: "Crispy Veggie Burger",
      food_price: "200",
      food_rate: "4.5",
      food_quantity: 0,
      food_description:
        "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce. Qty: 137 Gms| Kcal: 362 | Carbs 53.4 Gms| Sugar: 6.5 Gms| Fat: 12.8 Gms| Saturated fat: 4.9 Gms| Protein: 8.4 Gms| Sodium: 798.2 Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      food_AdditionalInfo:
        "330 kcal - 8.5 g Protein - 50.27 Carbs - 11.31. Fat",
      isFavourite: false,
    },
    {
      food_img: images.burger,
      food_name: "Crispy Chicken Burger",
      food_price: "100",
      food_rate: "4.5",
      food_quantity: 0,
      food_description:
        "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce. Qty: 137 Gms| Kcal: 362 | Carbs 53.4 Gms| Sugar: 6.5 Gms| Fat: 12.8 Gms| Saturated fat: 4.9 Gms| Protein: 8.4 Gms| Sodium: 798.2 Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      food_AdditionalInfo:
        "330 kcal - 8.5 g Protein - 50.27 Carbs - 11.31. Fat",
      isFavourite: false,
    },
    {
      food_img: images.burger,
      food_name: "Crispy Veggie Burger",
      food_price: "200",
      food_rate: "4.5",
      food_quantity: 0,
      food_description:
        "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce. Qty: 137 Gms| Kcal: 362 | Carbs 53.4 Gms| Sugar: 6.5 Gms| Fat: 12.8 Gms| Saturated fat: 4.9 Gms| Protein: 8.4 Gms| Sodium: 798.2 Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      food_AdditionalInfo:
        "330 kcal - 8.5 g Protein - 50.27 Carbs - 11.31. Fat",
      isFavourite: false,
    },
    {
      food_img: images.burger,
      food_name: "Crispy Chicken Burger",
      food_price: "100",
      food_rate: "4.5",
      food_quantity: 0,
      food_description:
        "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce. Qty: 137 Gms| Kcal: 362 | Carbs 53.4 Gms| Sugar: 6.5 Gms| Fat: 12.8 Gms| Saturated fat: 4.9 Gms| Protein: 8.4 Gms| Sodium: 798.2 Mg Contains: Gluten, Soybean, Milk, Sesame seeds",
      food_AdditionalInfo:
        "330 kcal - 8.5 g Protein - 50.27 Carbs - 11.31. Fat",
      isFavourite: false,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFoodModalVisible, setIsFoodModalVisible] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<any>(null);
  const [selectedFoodItemIndex, setSelectedFoodItemIndex] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleOnPressFoodItem = (item: ProductRestaurant, index: number) => {
    setIsFoodModalVisible(true);
    setSelectedFoodItem(item);
    setSelectedFoodItemIndex(index);
  };

  const handleCloseFoodModal = () => {
    setIsFoodModalVisible(false);
  };

  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const updated = foodData?.products ? [...foodData.products] : [];
    if (type === "add") {
      updated[index].quantity += 1;
    } else if (type === "remove" && updated[index].quantity > 0) {
      updated[index].quantity -= 1;
    }
    setFoodData((prev) => ({
      ...prev!,
      products: updated,
    }));
  };

  const onPressFavourite = (index: number) => {
    const updatedList = [...arrSubCategoryData];
    updatedList[index].isFavourite = !updatedList[index].isFavourite;
    setArrSubCategoryData(updatedList);
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.ceil(scrollPosition / ScreenDimensions.screenWidth);
    setCurrentIndex(index);
  };

  const onPressSubCategoryType = (selectedIndex: number) => {
    const updated = arrSubCategoryType.map((item, index) => ({
      ...item,
      isSelected: index === selectedIndex,
    }));
    setArrSubCategoryType(updated);

    // if (mainCategoryName.toLowerCase() === "food") {
    //   setSubCategoryFoodTitle(updated);
    // } else {
    //   setSubCategoryTitle(updated);
    // }

    const selectedTitle = updated[selectedIndex].name.toLowerCase();

    // if (selectedTitle === "all") {
    //   setArrSubCategory(route.params?.arrSubCategory);
    // } else {
    //   const filtered = route.params?.arrSubCategory.filter(
    //     (item: any) => item.subCategoryTitle.toLowerCase() === selectedTitle
    //   );
    //   setArrSubCategory(filtered);
    // }
  };

  const onPressReview = () => {
    navigation.navigate(ScreenNames.review);
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
  const handleProductDetailsApi = async (vendor_id: string) => {
    const dictData: FoodDetailsDictData = {
      vendor_id: vendor_id,
      customer_latitude: customer_latitude.toString(),
      customer_longitude: customer_longitude.toString(),
      category_id: "2",
      page_no: 1,
      // sub_category_id:"5"
    };

    try {
      const response = await foodDetailsApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("STORE DETAILS RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const foodData = response.data as RestaurantDetailResponse;
          setFoodData(foodData);
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
      handleProductDetailsApi(vendor_id);
      // handleCartListingApi();
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation, vendor_id])
  );

  return (
    <ViewRestaurantDetailComponent
      foodData={foodData || ({} as RestaurantDetailResponse)}
      arrSubCategoryType={arrSubCategoryType}
      onPressSubCategoryType={onPressSubCategoryType}
      arrSubCategoryData={arrSubCategoryData}
      currentIndex={currentIndex}
      handleScroll={handleScroll}
      handleQuantityChange={handleQuantityChange}
      onPressFavourite={onPressFavourite}
      isFoodModalVisible={isFoodModalVisible}
      handleOnPressFoodItem={handleOnPressFoodItem}
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
