import { View, Text, StatusBar, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ProductListingComponent from "../../components/productListing";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import {
  activityOpacity,
  flashMessageWarning,
  hitSlop,
} from "../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { constnatStyles } from "../../constants/Styles";
import {
  CategoryItem,
  Product,
  SubCategoryData,
  SubCategoryItem,
  SubCategoryTitle,
} from "../../constants/interfaces";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";

const ProductListingContainer = ({ navigation, route }: any) => {
  // API Zustand store
  const productListingApi = zustandStore.ProductListingStore(
    (state) => state.productListing
  );

  const insets = useSafeAreaInsets();
  const mainCategoryId = route.params?.mainCategoryId;
  const mainCategoryName = route.params?.mainCategoryName;
  const [arrSubCategoryProduct, setArrSubCategoryProduct] = useState<Product[]>(
    []
  );
  const [allSubCategories, setAllSubCategories] = useState<any[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);
  const [subCategoryTitle, setSubCategoryTitle] = useState<SubCategoryTitle[]>(
    []
  );

  const subCategoryImageMap: Record<string, any> = {
    Rice: images.riceSubIcon,
    Flour: images.flourSubIcon,
    "Cooking Oil": images.cookingoilSubIcon,
    Milk: images.cookingoilSubIcon,
  };

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
  const [filteredSubCategories, setFilteredSubCategories] = useState<
    SubCategoryItem[]
  >([]);

  useEffect(() => {
    if (categoryValue) {
      const found = subCategoryItems.find(
        (item) => item.category === categoryValue
      );
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
    setIsFilterModalVisible(false);
  };

  const onPressSubCategoryTitle = (selectedName: string) => {
    const updatedSubCategories = subCategoryTitle.map((item) => ({
      ...item,
      isSelected: item.name === selectedName,
    }));
    setSubCategoryTitle(updatedSubCategories);

    if (selectedName === "All") {
      handleProductListingApi();
    } else {
      const selectedSub = allSubCategories.find(
        (sub: any) => sub.name === selectedName
      );
      handleProductListingApi(selectedSub?.id);
    }
  };

  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const updated = [...arrSubCategoryProduct];
    if (type === "add") {
      updated[index].quantity += 1;
    } else if (type === "remove" && updated[index].quantity > 0) {
      updated[index].quantity -= 1;
    }
    setArrSubCategoryProduct(updated);
  };

  const onPressFavourite = (index: number) => {
    const updatedList = [...arrSubCategoryProduct];
    updatedList[index].isFavorite = !updatedList[index].isFavorite;
    setArrSubCategoryProduct(updatedList);
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
          style={[constnatStyles.vwHeader, { paddingTop: insets.top + 10 }]}
        >
          <GlobalBackButton onPress={() => navigation.goBack()} />

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

  // -------------------------API Calling------------------------
  const handleProductListingApi = async (subCategoryId?: string) => {
    const dictData = {
      category_id: mainCategoryId,
    };

    try {
      const response = await productListingApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PRODUCT LISTING RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const subCategories = (response.data as any)?.subCategories ?? [];

          // Save all subcategories once
          setAllSubCategories(subCategories);

          // Set tabs only once, preserve structure
          if (subCategoryTitle.length === 0) {
            const subCategoryTitleArray = [
              {
                image: images.allSubIcon,
                name: "All",
                isSelected: !subCategoryId,
              },
              ...subCategories.map((sub: { id: string; name: string }) => ({
                image: subCategoryImageMap[sub.name] || images.allSubIcon,
                name: sub.name,
                isSelected: sub.id === subCategoryId,
              })),
            ];
            setSubCategoryTitle(subCategoryTitleArray);
          }

          // Filter product list
          const productList: Product[] = subCategoryId
            ? subCategories.find((sub: any) => sub.id === subCategoryId)
                ?.products || []
            : subCategories.flatMap((sub: any) => sub.products || []);

          setArrSubCategoryProduct(productList);
        } else {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Product Listing API Error:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleProductListingApi();
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
      arrSubCategoryProduct={arrSubCategoryProduct}
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
