import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ProductListingComponent from "../../components/productListing";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";

const ProductListingContainer = ({ navigation, route }: any) => {
  const mainCategoryName = route.params?.mainCategoryName;
  const [arrSubCategory, setArrSubCategory] = useState(
    route.params?.arrSubCategory
  );
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

  const onPressSubCategoryTitle = (selectedIndex: number) => {
    const categoryArray =
      mainCategoryName.toLowerCase() === "food"
        ? subCategoryFoodTitle
        : subCategoryTitle;

    const updated = categoryArray.map((item, index) => ({
      ...item,
      isSelected: index === selectedIndex,
    }));

    if (mainCategoryName.toLowerCase() === "food") {
      setSubCategoryFoodTitle(updated);
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
    navigation.navigate(ScreenNames.restaurantDetail, { item : item });
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={styles.txtHeaderTitle}>{mainCategoryName}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [mainCategoryName]);

  return (
    <ProductListingComponent
      mainCategoryName={mainCategoryName}
      subCategoryTitle={subCategoryTitle}
      subCategoryFoodTitle={subCategoryFoodTitle}
      onPressSubCategoryTitle={onPressSubCategoryTitle}
      arrSubCategory={arrSubCategory}
      handleQuantityChange={handleQuantityChange}
      onPressFavourite={onPressFavourite}
      onPressRestaurant={onPressRestaurant}
    />
  );
};

export default ProductListingContainer;
