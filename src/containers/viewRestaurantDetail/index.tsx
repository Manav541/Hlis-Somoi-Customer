import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ViewRestaurantDetailComponent from "../../components/viewRestaurantDetail";
import GlobalBackButton from "../../global/GlobalBackButton";
import { activityOpacity, flashMessageWarning, hitSlop } from "../../constants/GConstant";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { colors } from "../../constants/Colors";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { ScreenNames } from "../../routers";

const ViewRestaurantDetailContainer = ({ navigation, route }: any) => {
  // console.log("route", route.params?.item);
  const itemData = route.params?.item;
  const restaurant_imgMain = itemData?.restaurant_imgMain;
  const restaurant_img = itemData?.restaurant_img;
  const restaurant_logo = itemData?.restaurant_logo;
  const restaurant_name = itemData?.restaurant_name;
  const restaurant_address = itemData?.restaurant_address;
  const restaurant_ratings = itemData?.restaurant_ratings;
  const restaurant_distance = itemData?.restaurant_distance;
  const restaurant_reviews = itemData?.restaurant_reviews;
  const restaurant_deliverytime = itemData?.restaurant_deliverytime;

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
      food_price: "₹200",
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
      food_price: "₹100",
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
      food_price: "₹200",
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
      food_price: "₹100",
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
      food_price: "₹200",
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
      food_price: "₹100",
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

  const handleOnPressFoodItem = (item: any, index: number) => {
    setIsFoodModalVisible(true);
    setSelectedFoodItem(item)
    setSelectedFoodItemIndex(index)
  };

  const handleCloseFoodModal = () => {
    setIsFoodModalVisible(false);
  };

  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const updated = [...arrSubCategoryData];
    if (type === "add") {
      updated[index].food_quantity += 1;
    } else if (type === "remove" && updated[index].food_quantity > 0) {
      updated[index].food_quantity -= 1;
    }
    setArrSubCategoryData(updated);
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

  const onPressShare = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const header = () => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
      },
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} isWhite />
      ),
      headerRight: () => (
        <View style={styles.vwHeaderRight}>
          <TouchableOpacity activeOpacity={activityOpacity} hitSlop={hitSlop} onPress={onPressShare}>
            <Image
              style={styles.imgButton}
              source={images.shareIcon}
              tintColor={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={activityOpacity} hitSlop={hitSlop}>
            <Image
              style={styles.imgButton}
              source={images.cartBagIcon}
              tintColor={colors.white}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  return (
    <ViewRestaurantDetailComponent
      restaurant_imgMain={restaurant_imgMain}
      restaurant_img={restaurant_img}
      restaurant_logo={restaurant_logo}
      restaurant_name={restaurant_name}
      restaurant_address={restaurant_address}
      restaurant_ratings={restaurant_ratings}
      restaurant_distance={restaurant_distance}
      restaurant_reviews={restaurant_reviews}
      restaurant_deliverytime={restaurant_deliverytime}
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
    />
  );
};

export default ViewRestaurantDetailContainer;
