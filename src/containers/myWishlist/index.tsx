import React, { useEffect, useRef, useState, useCallback } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import MyWishlistComponent from "../../components/myWishlist";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import {
  AddRemoveWishlistDictData,
  AddToCartDictData,
  Product,
  Restaurant,
} from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";
import { flashMessageWarning, toggleLoader } from "../../constants/GConstant";

const MyWishlistContainer = ({ navigation }: any) => {
  // API Zustand store
  const currentLatLong = zustandStore.AddressStore(
    (state) => state.currentLocation
  );
  const myWhilistApi = zustandStore.MyWishlistStore(
    (state) => state.myWishlist
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
  const wishlistStoreApi = zustandStore.MyWishlistStore(
    (state) => state.wishlistStore
  );
  const incrementCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.incrementCartItemCount
  );
  const decrementCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.decrementCartItemCount
  );

  const [search, setSearch] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("Product");
  const [arrMyWhislistProduct, setArrMyWishlistProduct] = useState<Product[]>([]);
  const [arrMyWhislistStore, setArrMyWishlistStore] = useState<Restaurant[]>([]);
  // Pagination state
  const [wishlistPageNumber, setWishlistPageNumber] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(false);

  // Ref to track if an API call is in progress
  const isFetchingRef = useRef(false);

  const onChangeSearch = (text: string) => {
    setSearch(text);
    setWishlistPageNumber(1); // Reset page number on search change
    setHasMoreData(true);
  };

  const handleTabPress = (tab: string) => {
    setSearch("");
    setSelectedTab(tab);
    setWishlistPageNumber(1);
    setHasMoreData(true);
    setArrMyWishlistProduct([]);
    setArrMyWishlistStore([]);
  };

  // Consolidated API call function
  const handleMyWhilistApi = useCallback(
    async (text: string, type: string, page: number, isLoadMore = false) => {
      if (isFetchingRef.current || (isLoadMore && !hasMoreData)) return;

      isFetchingRef.current = true;
      if (!isLoadMore) toggleLoader(true);
      else setIsLoadingMore(true);

      const dictData: any = {
        page_number: page,
        type: type.toLowerCase(),
        customer_latitude: currentLatLong?.latitude?.toString() || "",
        customer_longitude: currentLatLong?.longitude?.toString() || "",
      };

      if (text.trim().length > 0) {
        dictData.search_text = text.trim();
      }

      try {
        const response = await myWhilistApi(dictData, navigation);
        if (response !== undefined && response !== null) {
          __DEV__ &&
            console.log("MY WISHLIST RESPONSE===>", JSON.stringify(response));

          if (response.code === statusCodes.success) {
            const wishlistData = response.data;
            if (Array.isArray(wishlistData) && wishlistData.length > 0) {
              if (type === "Store") {
                setArrMyWishlistStore((prev) =>
                  isLoadMore ? [...prev, ...wishlistData] : wishlistData
                );
              } else {
                setArrMyWishlistProduct((prev) =>
                  isLoadMore ? [...prev, ...wishlistData] : wishlistData
                );
              }
              setWishlistPageNumber(page);
              setHasMoreData(wishlistData.length >= 10); // Assume 10 items per page
            } else {
              if (!isLoadMore) {
                setArrMyWishlistProduct([]);
                setArrMyWishlistStore([]);
              }
              setHasMoreData(false);
            }
          } else if (
            response.code === statusCodes.invaildOrFail ||
            response.code === statusCodes.emptyData
          ) {
            if (!isLoadMore) {
              setArrMyWishlistProduct([]);
              setArrMyWishlistStore([]);
            }
            setHasMoreData(false);
          }
        }
      } catch (error) {
        __DEV__ && console.log("My Wishlist API Error:", error);
      } finally {
        isFetchingRef.current = false;
        if (!isLoadMore) toggleLoader(false);
        else setIsLoadingMore(false);
      }
    },
    [currentLatLong, myWhilistApi, navigation]
  );

  // Handle quantity change for cart
  const handleQuantityChange = async (
    index: number,
    type: "add" | "remove",
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean
  ) => {
    const currentItem = arrMyWhislistProduct[index];
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
        variation_id,
        index,
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
  };

  // Navigation handlers
  const onPressProduct = (
    product_id: string,
    variation_id: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => {
    navigation.navigate(ScreenNames.productDetail, {
      product_id,
      variation_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      is_variation,
      is_color,
      is_size,
      color_id,
      size_id,
    });
  };

  const onPressRestaurant = (vendor_id: string) => {
    navigation.navigate(ScreenNames.restaurantDetail, {
      vendor_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      mainCategoryId: "2",
    });
  };

  // Wishlist removal handlers
  const handleRemoveProductFromWishlist = (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean
  ) => {
    handleWishlistProductApi(product_id, variation_id, is_variation);
  };

  const handleRemoveStoreFromWishlist = (index: number, vendor_id: string) => {
    handleWishlistStoreApi(vendor_id, index);
  };

  // Load more data for pagination
  const loadMoreCategories = useCallback(() => {
    if (hasMoreData && !isLoadingMore && !isFetchingRef.current) {
      const nextPage = wishlistPageNumber + 1;
      handleMyWhilistApi(search, selectedTab, nextPage, true);
    }
  }, [hasMoreData, isLoadingMore, wishlistPageNumber, search, selectedTab, handleMyWhilistApi]);

  // API call handlers
  const handleWishlistProductApi = async (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean
  ) => {
    const dictData: AddRemoveWishlistDictData = { product_id };
    if (is_variation) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await wishlistProductApi(dictData, navigation);
      if (response?.code === statusCodes.success) {
        setArrMyWishlistProduct((prev) =>
          prev.filter((item) => item.id !== product_id)
        );
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Wishlist Product API Error:", error);
    }
  };

  const handleWishlistStoreApi = async (vendor_id: string, index: number) => {
    const dictData = { vendor_id };
    try {
      const response = await wishlistStoreApi(dictData, navigation);
      if (response?.code === statusCodes.success) {
        setArrMyWishlistStore((prev) =>
          prev.filter((item) => item.id !== vendor_id)
        );
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Wishlist Store API Error:", error);
    }
  };

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
    const dictData: AddToCartDictData = { product_id, quantity };
    if (is_variation) {
      dictData.variation_id = variation_id;
      if (is_size) dictData.size_id = size_id;
      if (is_color) dictData.color_id = color_id;
    }

    try {
      const response = await addToCartApi(dictData, navigation);
      if (response?.code === statusCodes.success) {
        const updated = [...arrMyWhislistProduct];
        if (index !== undefined) {
          updated[index].quantity = quantity;
        }
        setArrMyWishlistProduct(updated);
        incrementCartItemCount(1);
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Add to Cart API Error:", error);
    }
  };

  const handleUpdateCartQuantityApi = async (
    product_id: string,
    quantity: number,
    variation_id?: string,
    index?: number,
    is_variation?: boolean
  ) => {
    const dictData: AddToCartDictData = { product_id, quantity };
    if (is_variation) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await updateCartQuantityApi(dictData, navigation);
      if (response?.code === statusCodes.success) {
        const updated = [...arrMyWhislistProduct];
        if (index !== undefined) {
          updated[index].quantity = quantity;
        }
        setArrMyWishlistProduct(updated);
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Update Cart API Error:", error);
    }
  };

  const handleRemoveFromCartApi = async (
    product_id: string,
    variation_id?: string,
    index?: number,
    is_variation?: boolean
  ) => {
    const dictData: AddToCartDictData = { product_id };
    if (is_variation) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await removeFromCartApi(dictData, navigation);
      if (response?.code === statusCodes.success) {
        const updated = [...arrMyWhislistProduct];
        if (index !== undefined) {
          updated[index].quantity = 0;
        }
        setArrMyWishlistProduct(updated);
        decrementCartItemCount(1);
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("Remove From Cart API Error:", error);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.myWishlist}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  // Handle initial load and tab/search changes
  useEffect(() => {
    if (hasMountedOnce.current) {
      handleMyWhilistApi(search, selectedTab, 1, false);
    }
  }, [search, selectedTab, handleMyWhilistApi]);

  useFocusEffect(
    useCallback(() => {
      if (!hasMountedOnce.current) {
        handleMyWhilistApi(search, selectedTab, 1, false);
        hasMountedOnce.current = true;
      }
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [handleMyWhilistApi, search, selectedTab])
  );

  return (
    <MyWishlistComponent
      arrMyWhislistProduct={arrMyWhislistProduct}
      arrMyWhislistStore={arrMyWhislistStore}
      search={search}
      onChangeSearch={onChangeSearch}
      handleRemoveProductFromWishlist={handleRemoveProductFromWishlist}
      handleRemoveStoreFromWishlist={handleRemoveStoreFromWishlist}
      handleQuantityChange={handleQuantityChange}
      onPressProduct={onPressProduct}
      onPressRestaurant={onPressRestaurant}
      selectedTab={selectedTab}
      handleTabPress={handleTabPress}
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default MyWishlistContainer;