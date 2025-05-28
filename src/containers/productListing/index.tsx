import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ProductListingComponent from "../../components/productListing";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { activityOpacity, flashMessageWarning, hitSlop } from "../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { constnatStyles } from "../../constants/Styles";
import { CategoryItem, SubCategoryData, SubCategoryItem } from "../../constants/interfaces";

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

  // Filer Modal
  const [range, setRange] = useState([150, 300]);
  const [rating, setRating] = useState(4);
  const [isCheckInstantDelivery, setIsCheckInstantDelivery] = useState(false);

  // Category Dropdown
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([
    { label: "Groceries", value: "groceries" },
    { label: "Food", value: "food" },
    { label: "Fruits & Vegetables", value: "fruits & vegetables" },
    { label: "Beauty & Personal Care", value: "beauty & personal care" },
    {
      label: "Electronics & Accessories ",
      value: "electronics & accessories ",
    },
    { label: "Household Essentials", value: "household essentials" },
    { label: "Fashion", value: "fashion" },
  ]);

  // Sub Category Dropdown
  const [openSubCategory, setOpenSubCategory] = useState<boolean>(false);
  const [subCategoryValue, setSubCategoryValue] = useState<string>("");
  const [subCategoryItems, setSubCategoryItems] = useState<SubCategoryData[]>([
    {
      category: "groceries",
      subCategory: [
        {
          label: "Rice",
          value: "rice",
        },
        {
          label: "Flour",
          value: "flour",
        },
        {
          label: "Cooking Oil",
          value: "cooking oil",
        },
        {
          label: "Milk",
          value: "milk",
        },
      ],
    },
    {
      category: "food",
      subCategory: [
        {
          label: "Local & Regional Cuisine",
          value: "local & regional cuisine",
        },
        {
          label: "Fast Food & Snacks",
          value: "fast food & snacks",
        },
      ],
    },
    {
      category: "fruits & vegetables",
      subCategory: [
        {
          label: "Rice",
          value: "rice",
        },
        {
          label: "Flour",
          value: "flour",
        },
      ],
    },
    {
      category: "beauty & personal care",
      subCategory: [
        {
          label: "Rice",
          value: "rice",
        },
        {
          label: "Flour",
          value: "flour",
        },
      ],
    },
    {
      category: "electronics & accessories ",
      subCategory: [
        {
          label: "Rice",
          value: "rice",
        },
        {
          label: "Flour",
          value: "flour",
        },
      ],
    },
    {
      category: "household essentials",
      subCategory: [
        {
          label: "Rice",
          value: "rice",
        },
        {
          label: "Flour",
          value: "flour",
        },
      ],
    },
    {
      category: "fashion",
      subCategory: [
        {
          label: "T-shirt",
          value: "t-shirt",
        },
      ],
    },
  ]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategoryItem[]>([]);

  useEffect(() => {
    if (categoryValue) {
      const found = subCategoryItems.find(item => item.category === categoryValue);
      setFilteredSubCategories(found?.subCategory || []);
      setSubCategoryValue(""); 
    }
  }, [categoryValue]);

  const onPressInstantDelivery = () => {
    setIsCheckInstantDelivery(!isCheckInstantDelivery);
  };

  const onPressRating = (index: number) => {
    setRating(index + 1);
  };

  const onPressCloseFilterModal = () => {
    setIsFilterModalVisible(false);
    setCategoryValue("");
    setSubCategoryValue("");
    setRating(4);
    setRange([150, 300]);
    setIsCheckInstantDelivery(false);
    setOpenCategory(false);
    setOpenSubCategory(false);
  };

  const onPressApplyFilter = () => {
    // Check if any filter is applied
    const isAnyFilterApplied = 
      categoryValue !== "" || 
      rating !== 4 || 
      range[0] !== 150 || 
      range[1] !== 300 || 
      isCheckInstantDelivery;

    if (!isAnyFilterApplied) {
      flashMessageWarning("Please apply at least one filter");
      return;
    }

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
            paddingTop: insets.top + 10,
            backgroundColor: colors.orange1c,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 14,
          }}
        >
          <GlobalBackButton
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 0 }}
          />

          <Text style={constnatStyles.lblHeaderTitle}>{mainCategoryName}</Text>

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
      isCheckInstantDelivery={isCheckInstantDelivery}
      onPressInstantDelivery={onPressInstantDelivery}
      // Category Dropdown
      openCategory={openCategory}
      setOpenCategory={setOpenCategory}
      categoryValue={categoryValue}
      setCategoryValue={setCategoryValue}
      categoryItems={categoryItems}
      setCategoryItems={setCategoryItems}
      // Sub Category Dropdown
      openSubCategory={openSubCategory}
      setOpenSubCategory={setOpenSubCategory}
      subCategoryValue={subCategoryValue}
      setSubCategoryValue={setSubCategoryValue}
      subCategoryItems={subCategoryItems}
      setSubCategoryItems={setSubCategoryItems}
      filteredSubCategories={filteredSubCategories}
      setFilteredSubCategories={setFilteredSubCategories}
    />
  );
};

export default ProductListingContainer;
