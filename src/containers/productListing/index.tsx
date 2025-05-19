import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ProductListingComponent from "../../components/productListing";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";

const ProductListingContainer = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const mainCategoryName = route.params?.mainCategoryName;
  const [arrSubCategory, setArrSubCategory] = useState(
    route.params?.arrSubCategory
  );
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);
  const [subCategoryTitle, setSubCategoryTitle] = useState([
    {
      subIcon: images.allSubIcon,
      name: "All",
      isSelected: true,
    },
    {
      subIcon: images.riceSubIcon,
      name: "Rice",
      isSelected: false,
    },
    {
      subIcon: images.flourSubIcon,
      name: "Flour",
      isSelected: false,
    },
    {
      subIcon: images.cookingoilSubIcon,
      name: "Cooking Oil",
      isSelected: false,
    },
    {
      subIcon: images.cookingoilSubIcon,
      name: "milk",
      isSelected: false,
    },
  ]);

  const [subCategoryFoodTitle, setSubCategoryFoodTitle] = useState([
    {
      subIcon: images.allSubIcon,
      name: "All",
      isSelected: true,
    },
    {
      subIcon: images.riceSubIcon,
      name: "Local & Regional Cuisine",
      isSelected: false,
    },
    {
      subIcon: images.fastfoodSubIcon,
      name: "Fast Food & Snacks",
      isSelected: false,
    },
  ]);
  const [subCategoryFashionTitle, setSubCategoryFashionTitle] = useState([
    {
      subIcon: images.allSubIcon,
      name: "All",
      isSelected: true,
    },
    {
      subIcon: images.tshirtIcon,
      name: "T-shirt",
      isSelected: false,
    },
  ]);

  const [range, setRange] = useState([150, 300]);
  const [rating, setRating] = useState(4);

  const onPressRating = (index: number) => {
    setRating(index + 1);
  };

  const onPressCloseFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const onPressApplyFilter = () => {
    setIsFilterModalVisible(false);
  };

  const onPressSubCategoryTitle = (selectedIndex: number) => {
    const categoryArray =
      mainCategoryName.toLowerCase() === "food"
        ? subCategoryFoodTitle
        : mainCategoryName.toLowerCase() === "fashion"
        ? subCategoryFashionTitle
        : subCategoryTitle;

    const updated = categoryArray.map((item, index) => ({
      ...item,
      isSelected: index === selectedIndex,
    }));

    if (mainCategoryName.toLowerCase() === "food") {
      setSubCategoryFoodTitle(updated);
    } else if (mainCategoryName.toLowerCase() === "fashion") {
      setSubCategoryFashionTitle(updated);
    } else {
      setSubCategoryTitle(updated);
    }

    const selectedTitle = updated[selectedIndex].name.toLowerCase();

    if (selectedTitle === "all") {
      setArrSubCategory(route.params?.arrSubCategory);
    } else {
      const filtered = route.params?.arrSubCategory.filter(
        (item: any) => item.subCategoryTitle.toLowerCase() === selectedTitle
      );
      setArrSubCategory(filtered);
    }
  };

  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const updated = [...arrSubCategory];
    if (type === "add") {
      updated[index].product_quantity += 1;
    } else if (type === "remove" && updated[index].product_quantity > 0) {
      updated[index].product_quantity -= 1;
    }
    setArrSubCategory(updated);
  };

  const onPressFavourite = (index: number) => {
    const updatedList = [...arrSubCategory];
    updatedList[index].isFavourite = !updatedList[index].isFavourite;
    setArrSubCategory(updatedList);
  };

  const onPressRestaurant = (item: any) => {
    navigation.navigate(ScreenNames.restaurantDetail, { item: item });
  };
  const onPressProduct = (item: any) => {
    navigation.navigate(ScreenNames.productDetail, { item: item });
  };

  const onPressFilter = () => {
    setIsFilterModalVisible(true);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <View
          style={{
            paddingTop: insets.top,
            backgroundColor: colors.orange1c,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 14,
          }}
        >
          <GlobalBackButton onPress={() => navigation.goBack()} style={{ marginBottom: 0 }} />

          <Text style={styles.txtHeaderTitle}>{mainCategoryName}</Text>

          <GlobalBackButton
            isRight
            onPress={onPressFilter}
            rightImage={images.sort}
            style={{ marginBottom: 0 }}
          />
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [mainCategoryName]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ProductListingComponent
      mainCategoryName={mainCategoryName}
      subCategoryTitle={subCategoryTitle}
      subCategoryFoodTitle={subCategoryFoodTitle}
      subCategoryFashionTitle={subCategoryFashionTitle}
      onPressSubCategoryTitle={onPressSubCategoryTitle}
      arrSubCategory={arrSubCategory}
      handleQuantityChange={handleQuantityChange}
      onPressFavourite={onPressFavourite}
      onPressRestaurant={onPressRestaurant}
      onPressProduct={onPressProduct}
      isFilterModalVisible={isFilterModalVisible}
      range={range}
      setRange={setRange}
      rating={rating}
      onPressRating={onPressRating}
      onPressCloseFilterModal={onPressCloseFilterModal}
      onPressApplyFilter={onPressApplyFilter}
    />
  );
};

export default ProductListingContainer;
