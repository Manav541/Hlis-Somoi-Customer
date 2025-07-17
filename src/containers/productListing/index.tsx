import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ProductListingComponent from "../../components/productListing";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import {
  flashMessageWarning,
  showConfirmForGuest,
  toggleLoader,
} from "../../constants/GConstant";
import { constnatStyles } from "../../constants/Styles";
import {
  AddRemoveWishlistDictData,
  AddToCartDictData,
  Product,
  ProductListDictData,
  Restaurant,
  SubCategoryTitle,
} from "../../constants/interfaces";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";
import { MmkvManager } from "../../constants/utils/MmkvManager";

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
  const addToCartApi = zustandStore.ProductListingStore(
    (state) => state.addToCart
  );
  const updateCartQuantityApi = zustandStore.ProductListingStore(
    (state) => state.updateCartQuantity
  );
  const removeFromCartApi = zustandStore.ProductListingStore(
    (state) => state.removeFromCart
  );
  const wishlistStoreApi = zustandStore.MyWishlistStore(
    (state) => state.wishlistStore
  );
  const incrementCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.incrementCartItemCount
  );
  const decrementCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.decrementCartItemCount
  );
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const mainCategoryId = route.params?.mainCategoryId;
  const mainCategoryName = route.params?.mainCategoryName;
  const subCategoryName = route.params?.subCategoryName;
  const [arrSubCategoryProduct, setArrSubCategoryProduct] = useState<Product[]>(
    []
  );
  const [arrRestaurants, setArrRestaurants] = useState<Restaurant[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<any[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] =
    useState<boolean>(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState<boolean>(false);
  const [subCategoryTitle, setSubCategoryTitle] = useState<SubCategoryTitle[]>(
    []
  );
  const [selectedTitle, setSelectedTitle] = useState("");

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
  const currentLatLong = route.params?.currentLatLong;

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

  // Pagination state
  const [productListPageNumber, setProductListPageNumber] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

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

    console.log("selectedName => ", selectedName);
    if (selectedName === "All") {
      handleProductListingApi(1, false, selectedName);
    } else {
      const selectedSub = allSubCategories.find(
        (sub: any) => sub.name === selectedName
      );
      handleProductListingApi(1, false, selectedName, selectedSub?.id);
    }
  };

  const handleQuantityChange = async (
    index: number,
    type: "add" | "remove",
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean
  ) => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
      });
    } else {
      const currentItem = arrSubCategoryProduct[index];
      const currentQty = Number(currentItem.quantity) || 0;
      let newQty = currentQty;

      if (type === "add") {
        newQty = currentQty + 1;
      } else if (type === "remove" && currentQty > 0) {
        newQty = currentQty - 1;
      }

      const { id: product_id, variation_id, color, size } = currentItem;
      const size_id = size?.size_id;
      const color_id = color?.color_id;

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
          variation_id,
          size_id,
          color_id,
          index,
          is_variation,
          is_color,
          is_size
        );
      } else {
        await handleUpdateCartQuantityApi(
          product_id,
          newQty,
          variation_id,
          index,
          is_variation
        );
      }
    }
  };

  const onPressFavourite = (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean
  ) => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
      });
    } else {
      handleWishlistProductApi(product_id, variation_id, is_variation);
    }
  };

  const onPressFavouriteStore = (index: number, vendor_id: string) => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
      });
    } else {
      handleWishlistStoreApi(vendor_id, index);
    }
  };

  const onPressRestaurant = (vendor_id: string) => {
    navigation.navigate(ScreenNames.restaurantDetail, {
      vendor_id: vendor_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      mainCategoryId: mainCategoryId,
    });
  };

  const onPressProduct = (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => {
    console.log("color_id", color_id);
    console.log("size_id", size_id);

    navigation.navigate(ScreenNames.productDetail, {
      product_id: product_id,
      variation_id: variation_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      is_variation: is_variation,
      is_color: is_color,
      is_size: is_size,
      color_id: color_id,
      size_id: size_id,
    });
  };

  const onPressFilter = () => {
    setIsFilterModalVisible(true);
  };

  const onPressSort = () => {
    setIsSortModalVisible(true);
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{mainCategoryName}</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <GlobalBackButton
            isRight
            onPress={onPressSort}
            rightImage={images.sort}
          />
          <GlobalBackButton
            isRight
            onPress={onPressFilter}
            rightImage={images.filter}
          />
        </View>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [mainCategoryName]);

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = productListPageNumber + 1;
      handleProductListingApi(nextPage, true);
    }
  };

  // -------------------------API Calling------------------------
  // handleProductListingApi
  const handleProductListingApi = async (
    page: number,
    isLoadMore = false,
    selectedName?: string,
    subCategoryId?: string
  ) => {
    console.log("subCategoryId in API => ", subCategoryId);
    console.log("selectedTitle in API => ", selectedTitle);
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);
    const selectedSubCategoryId =
      subCategoryId !== undefined
        ? subCategoryId
        : selectedName !== "All"
        ? route?.params?.sub_category_id
        : undefined;

    const dictData: ProductListDictData = {
      category_id: mainCategoryId,
      page_no: page,
      type: mainCategoryName.toLowerCase(),
      customer_latitude: currentLatLong?.latitude.toString(),
      customer_longitude: currentLatLong?.longitude.toString(),
    };

    if (selectedSubCategoryId) {
      dictData.sub_category_id = selectedSubCategoryId;
    }

    try {
      const response = await productListingApi(
        dictData,
        isGuestUser,
        navigation
      );

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("PRODUCT LISTING RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const data = response.data;
          const subCategories = (data as any)?.subCategories ?? [];
          const allRestaurants = (data as any)?.restaurants ?? [];

          // ✅ SET RESTAURANTS if Food category
           if (mainCategoryName === "Food" && Array.isArray(allRestaurants)) {
          const filteredRestaurants = selectedSubCategoryId
            ? allRestaurants.filter(
                (res: any) => res.subCategoryId === selectedSubCategoryId
              )
            : allRestaurants;

          const finalRestaurants =
            filteredRestaurants.length > 0 ? filteredRestaurants : allRestaurants;

          if (page === 1) setArrRestaurants(finalRestaurants);
          else setArrRestaurants((prev) => [...prev, ...finalRestaurants]);

         
        }

          // Save only once if empty
          if (allSubCategories.length === 0) {
            setAllSubCategories(subCategories);
          }

          // Set tabs only once, preserve structure
          if (subCategoryTitle.length === 0) {
            const subCategoryTitleArray = [
              {
                name: "All",
                isSelected: !selectedSubCategoryId,
              },
              ...subCategories.map(
                (sub: { id: string; name: string; icon_image: string }) => ({
                  image: sub.icon_image,
                  name: sub.name,
                  isSelected: sub.id === selectedSubCategoryId,
                })
              ),
            ];
            setSubCategoryTitle(subCategoryTitleArray);
          }

          // Filter product list
          const productList: Product[] = subCategoryId
            ? subCategories.find((sub: any) => sub.id === subCategoryId)
                ?.products || []
            : subCategories.flatMap((sub: any) => sub.products || []);

          if (productList.length > 0) {
            setArrSubCategoryProduct((prev) =>
              isLoadMore ? [...prev, ...productList] : productList
            );
            setProductListPageNumber(page); // update page
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrSubCategoryProduct([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.emptyData) {
          setArrSubCategoryProduct([]);
          setArrRestaurants([]);
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrSubCategoryProduct([]);
          setArrRestaurants([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Product Listing API Error:", error);
    }
  };

  // handleWishlistProductApi
  const handleWishlistProductApi = async (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean
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

  // handleFilterApi
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
      const response = await filterSortApi(dictData, isGuestUser, navigation);

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

  // handleSortApi
  const handleSortApi = async (sort_by?: string, sub_category_id?: string) => {
    const dictData = {
      sort_by: sort_by,
      page: 1,
      category_id: mainCategoryId,
      ...(sub_category_id && { sub_category_id }),
    };

    try {
      const response = await filterSortApi(dictData, isGuestUser, navigation);

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

          // ✅ Update sort selection here
          const updatedSortList = arrSortList.map((item) => ({
            ...item,
            isSelected: item.value === sort_by,
          }));
          setArrSortList(updatedSortList);
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
    index?: number,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean
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
          const updated = [...arrSubCategoryProduct];
          if (index !== undefined) {
            updated[index].quantity = quantity;
          }
          setArrSubCategoryProduct(updated);
          incrementCartItemCount(1);
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
    index?: number,
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
          const updated = [...arrSubCategoryProduct];
          if (index !== undefined) {
            updated[index].quantity = quantity;
          }
          setArrSubCategoryProduct(updated);
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
          const updated = [...arrSubCategoryProduct];
          if (typeof index === "number") {
            updated[index].quantity = 0;
          }
          setArrSubCategoryProduct(updated);
          decrementCartItemCount(1);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Remove From Cart API Error:", error);
    }
  };

  // handleWishlistStoreApi
  const handleWishlistStoreApi = async (vendor_id: string, index: number) => {
    const dictData = {
      vendor_id: vendor_id,
    };
    try {
      const response = await wishlistStoreApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("WISHLIST STORE RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const updatedList = [...arrRestaurants];
          updatedList[index].is_store_wishlisted =
            !updatedList[index].is_store_wishlisted;
          setArrRestaurants(updatedList);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });
      if (route?.params?.subCategoryName) {
        setSelectedTitle(route?.params?.subCategoryName);
      }
      handleProductListingApi(1, false);
      // After API call, set selected tab (subcategory) if passed
      setTimeout(() => {
        if (subCategoryName && allSubCategories.length > 0) {
          const updatedTabs = [
            {
              name: "All",
              isSelected: false,
            },
            ...allSubCategories.map((sub) => ({
              name: sub.name,
              image: sub.icon_image,
              isSelected: sub.name === subCategoryName,
            })),
          ];
          console.log("updatedTabs", updatedTabs);

          // setSubCategoryTitle(updatedTabs);
        }
      }, 500);

      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ProductListingComponent
      mainCategoryName={mainCategoryName}
      subCategoryTitle={subCategoryTitle}
      subCategoryFoodTitle={subCategoryFoodTitle}
      arrRestaurants={arrRestaurants}
      subCategoryFashionTitle={subCategoryFashionTitle}
      onPressSubCategoryTitle={onPressSubCategoryTitle}
      arrSubCategoryProduct={arrSubCategoryProduct}
      handleQuantityChange={handleQuantityChange}
      onPressFavourite={onPressFavourite}
      onPressFavouriteStore={onPressFavouriteStore}
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
      // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default ProductListingContainer;
