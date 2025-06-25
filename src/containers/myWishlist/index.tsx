import React, { useEffect, useState } from "react";
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
import { flashMessageWarning } from "../../constants/GConstant";
import { debounceQuery } from "../../constants/utils/Debounce";

const MyWishlistContainer = ({ navigation, route }: any) => {
  // API Zustand store
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

  const currentLatLong = route?.params?.currentLatLong;

  const [search, setSearch] = useState<string>("");
  const debounce = debounceQuery(search, 300);
  const [selectedTab, setSelectedTab] = useState<string>("Product");
  const [arrMyWhislistProduct, setArrMyWishlistProduct] = useState<Product[]>(
    []
  );
  const [arrMyWhislistStore, setArrMyWishlistStore] = useState<Restaurant[]>(
    []
  );

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  const handleTabPress = (tab: string) => {
    setSearch("");
    setSelectedTab(tab);
    handleMyWhilistApi(search, tab);
  };

  // Add to cart
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

  // On Press Product
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

  const onPressRestaurant = (vendor_id: string) => {
    navigation.navigate(ScreenNames.restaurantDetail, {
      vendor_id: vendor_id,
      customer_latitude: currentLatLong?.latitude,
      customer_longitude: currentLatLong?.longitude,
      mainCategoryId: "2",
    });
  };

  //   Remove from wishlist
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

  // -----------------------API Call-----------------------

  // handleMyWhilistApi
  const handleMyWhilistApi = async (text: string, type: string) => {
    const dictData: any = {
      page_number: 1,
      type: type.toLowerCase(),
      customer_latitude: currentLatLong?.latitude.toString(),
      customer_longitude: currentLatLong?.longitude.toString(),
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
          if (Array.isArray(wishlistData)) {
            if (type == "Store") {
              setArrMyWishlistStore(wishlistData);
            } else {
              setArrMyWishlistProduct(wishlistData);
            }
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          // flashMessageWarning(response.message);
          setArrMyWishlistProduct([]);
          setArrMyWishlistStore([]);
        } else if (response.code === statusCodes.emptyData) {
          // flashMessageWarning(response.message);
          setArrMyWishlistProduct([]);
          setArrMyWishlistStore([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Customer Detail API Error:", error);
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
          setArrMyWishlistStore((prev: Restaurant[]) =>
            prev.filter((item) => item.id !== product_id)
          );
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Product Listing API Error:", error);
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
          setArrMyWishlistProduct((prev: Product[]) =>
            prev.filter((item) => item.id !== vendor_id)
          );
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
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
          const updated = [...arrMyWhislistProduct];
          if (index !== undefined) {
            updated[index].quantity = quantity;
          }
          setArrMyWishlistProduct(updated);
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
          const updated = [...arrMyWhislistProduct];
          if (index !== undefined) {
            updated[index].quantity = quantity;
          }
          setArrMyWishlistProduct(updated);
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
    variation_id?: string,
    index?: number,
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
          const updated = [...arrMyWhislistProduct];
          if (typeof index === "number") {
            updated[index].quantity = 0;
          }
          setArrMyWishlistProduct(updated);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Remove From Cart API Error:", error);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
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

  useFocusEffect(
    React.useCallback(() => {
      handleMyWhilistApi(debounce, selectedTab);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation, debounce])
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
    />
  );
};

export default MyWishlistContainer;
