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
  const wishlistProductApi = zustandStore.MyWishlistStore(
    (state) => state.wishlistProduct
  );
  const filterSortApi = zustandStore.ProductListingStore(
    (state) => state.filterSort
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
  const [isSortModalVisible, setIsSortModalVisible] = useState<boolean>(false);
  const [subCategoryTitle, setSubCategoryTitle] = useState<SubCategoryTitle[]>(
    []
  );

  const subCategoryImageMap: Record<string, any> = {
    Rice: images.riceSubIcon,
    Flour: images.flourSubIcon,
    "Cooking Oil": images.cookingoilSubIcon,
    Milk: images.cookingoilSubIcon,
  };

  const [selectedTitle, setSelectedTitle] = useState("All");

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
  const [arrSortList, setArrSortList] = useState<any[]>([
    {
      name: "Newest",
      value: "newest",
      isSelected: false,
    },
    {
      name: "Low Price",
      value: "low_price",
      isSelected: false,
    },
    {
      name: "High Price",
      value: "high_price",
      isSelected: false,
    },
    {
      name: "Low Ratings",
      value: "low_rating",
      isSelected: false,
    },
    {
      name: "High Ratings",
      value: "high_rating",
      isSelected: false,
    },
  ]);
  const [selectedSortTitle, setSelectedSortTitle] = useState("");

  const onPressInstantDelivery = () => {
    setIsCheckInstantDelivery(!isCheckInstantDelivery);
  };

  const onPressRating = (index: number) => {
    setRating(index + 1);
  };

  const onPressCloseFilterModal = () => {
    setIsFilterModalVisible(false);
    setRating(4);
    setRange([150, 300]);
    setIsCheckInstantDelivery(false);
  };

  const onPressCloseSortModal = () => {
    setIsSortModalVisible(false);
  };

  const onPressApplyFilter = async () => {
    setIsFilterModalVisible(false);
    if (selectedTitle === "All") {
      await handleFilterApi(isCheckInstantDelivery, range[0], range[1], rating);
    } else {
      const selectedSub = allSubCategories.find(
        (sub: any) => sub.name === selectedTitle
      );
      handleProductListingApi(selectedSub?.id);
      await handleFilterApi(
        isCheckInstantDelivery,
        range[0],
        range[1],
        rating,
        selectedSub?.id
      );
    }
  };

  const onPressSortList = async (sort_by: string) => {
    setIsSortModalVisible(false);
    if (selectedTitle === "All") {
      await handleSortApi(sort_by);
    } else {
      const selectedSub = allSubCategories.find(
        (sub: any) => sub.name === selectedTitle
      );
      handleProductListingApi(selectedSub?.id);
      await handleSortApi(sort_by, selectedSub?.id);
    }
  };

  const onPressSubCategoryTitle = (selectedName: string) => {
    setSelectedTitle(selectedName);
    const updatedSubCategories = subCategoryTitle.map((item) => ({
      ...item,
      isSelected: item.name === selectedName,
    }));
    setSubCategoryTitle(updatedSubCategories);

    // ✅ Reset Filters when subcategory changes
    setRating(4);
    setRange([150, 300]);
    setIsCheckInstantDelivery(false);
    setSelectedSortTitle("");

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

  const onPressFavourite = (product_id: string, variation_id: string) => {
    handleWishlistProductApi(product_id, variation_id);
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

  const onPressSort = () => {
    setIsSortModalVisible(true);
  };

  const header = () => {
    navigation.setOptions({
      header: () => (
        <View
          style={[constnatStyles.vwHeader, { paddingTop: insets.top + 10 }]}
        >
          <GlobalBackButton onPress={() => navigation.goBack()} />

          <Text style={constnatStyles.lblHeaderTitle}>{mainCategoryName}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <GlobalBackButton
              isRight
              onPress={onPressSort}
              rightImage={images.sort}
              style={{ marginBottom: 0 }}
            />
            <GlobalBackButton
              isRight
              onPress={onPressFilter}
              rightImage={images.filter}
              style={{ marginBottom: 0 }}
            />
          </View>
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
      ...(subCategoryId && { sub_category_id: subCategoryId }),
    };

    try {
      const response = await productListingApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PRODUCT LISTING RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const subCategories = (response.data as any)?.subCategories ?? [];

          // Save only once if empty
          if (allSubCategories.length === 0) {
            setAllSubCategories(subCategories);
          }

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
          const updatedList = [...arrSubCategoryProduct];
          const productIndex = updatedList.findIndex(
            (product) =>
              product.id === product_id && product.variation_id === variation_id
          );
          if (productIndex !== -1) {
            updatedList[productIndex].isFavorite =
              !updatedList[productIndex].isFavorite;
          }
          setArrSubCategoryProduct(updatedList);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Product Listing API Error:", error);
    }
  };

  const handleFilterApi = async (
    is_instant_delivery?: boolean,
    min_price?: number,
    max_price?: number,
    rating?: number,
    sub_category_id?: string
  ) => {
    const dictData = {
      is_instant_delivery,
      min_price,
      max_price,
      rating,
      page: 1,
      category_id: mainCategoryId,
      ...(sub_category_id && { sub_category_id }),
    };

    try {
      const response = await filterSortApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("FILTER PRODUCT RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const subCategories = (response.data as any)?.subCategories ?? [];

          // Update filtered products
          const productList: Product[] = sub_category_id
            ? subCategories.find((sub: any) => sub.id === sub_category_id)
                ?.products || []
            : subCategories.flatMap((sub: any) => sub.products || []);

          setArrSubCategoryProduct(productList);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          setArrSubCategoryProduct([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Product Listing API Error:", error);
    }
  };

  const handleSortApi = async (sort_by?: string, sub_category_id?: string) => {
    const dictData = {
      sort_by: sort_by,
      page: 1,
      category_id: mainCategoryId,
      ...(sub_category_id && { sub_category_id }),
    };

    try {
      const response = await filterSortApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("SORT PRODUCT RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const subCategories = (response.data as any)?.subCategories ?? [];

          // Update filtered products
          const productList: Product[] = sub_category_id
            ? subCategories.find((sub: any) => sub.id === sub_category_id)
                ?.products || []
            : subCategories.flatMap((sub: any) => sub.products || []);

          setArrSubCategoryProduct(productList);
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
      isSortModalVisible={isSortModalVisible}
      arrSortList={arrSortList}
      range={range}
      setRange={setRange}
      rating={rating}
      onPressRating={onPressRating}
      onPressCloseFilterModal={onPressCloseFilterModal}
      onPressCloseSortModal={onPressCloseSortModal}
      onPressApplyFilter={onPressApplyFilter}
      onPressSortList={onPressSortList}
      isCheckInstantDelivery={isCheckInstantDelivery}
      onPressInstantDelivery={onPressInstantDelivery}
    />
  );
};

export default ProductListingContainer;
