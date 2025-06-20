import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import MyWishlistComponent from "../../components/myWishlist";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { AddToCartDictData, Product } from "../../constants/interfaces";
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

  const currentLatLong = route?.params?.currentLatLong;
  const [search, setSearch] = useState<string>("");
  const debounce = debounceQuery(search, 300);
  const [selectedTab, setSelectedTab] = useState<string>("Product");
  const [arrMyWhislist, setArrMyWishlist] = useState<Product[]>([]);

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
    type: "add" | "remove"
  ) => {
    const currentItem = arrMyWhislist[index];
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
      await handleRemoveFromCartApi(product_id, variation_id, index);
    } else if (currentQty === 0 && newQty === 1) {
      await handleAddToCartApi(
        product_id,
        variation_id,
        newQty,
        size_id,
        color_id,
        index
      );
    } else {
      await handleUpdateCartQuantityApi(
        product_id,
        variation_id,
        newQty,
        index
      );
    }
  };

  // On Press Product
  const onPressProduct = (item: any) => {
    navigation.navigate(ScreenNames.productDetail, {
      item: item,
      currentLatLong: currentLatLong,
    });
  };

  //   Remove from wishlist
  const handleRemoveFromWishlist = (
    product_id: string,
    variation_id: string
  ) => {
    handleWishlistProductApi(product_id, variation_id);
  };

  // -----------------------API Call-----------------------

  // handleMyWhilistApi
  const handleMyWhilistApi = async (text: string, type: string) => {
    const dictData = {
      search_text: text.trim(),
      page_number: 1,
      type: type.toLowerCase(),
    };
    try {
      const response = await myWhilistApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("MY WISHLIST RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const wishlistData = response.data;
          if (Array.isArray(wishlistData)) {
            setArrMyWishlist(wishlistData);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          // flashMessageWarning(response.message);
          setArrMyWishlist([]);
        } else if (response.code === statusCodes.emptyData) {
          // flashMessageWarning(response.message);
          setArrMyWishlist([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Customer Detail API Error:", error);
    }
  };

  // handleWishlistProductApi
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
          setArrMyWishlist((prev: Product[]) =>
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

  // handleAddToCartApi
  const handleAddToCartApi = async (
    product_id: string,
    variation_id: string,
    quantity: number,
    size_id?: string,
    color_id?: string,
    index?: number
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
      variation_id: variation_id,
      quantity: quantity,
    };

    // if (mainCategoryId == "9") {
    //   dictData.size_id = size_id;
    //   dictData.color_id = color_id;
    // }

    try {
      const response = await addToCartApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ADD TO CART RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const updated = [...arrMyWhislist];
          if (index !== undefined) {
            updated[index].quantity = quantity;
          }
          setArrMyWishlist(updated);
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
    variation_id: string,
    quantity: number,
    index?: number
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
      variation_id: variation_id,
      quantity: quantity,
    };

    try {
      const response = await updateCartQuantityApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "UPDATE CART QUANTITY RESPONSE===>",
            JSON.stringify(response)
          );

        if (response.code === statusCodes.success) {
          const updated = [...arrMyWhislist];
          if (index !== undefined) {
            updated[index].quantity = quantity;
          }
          setArrMyWishlist(updated);
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
    variation_id: string,
    index?: number
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
      variation_id: variation_id,
    };

    try {
      const response = await removeFromCartApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "REMOVE FROM CART RESPONSE===>",
            JSON.stringify(response)
          );

        if (response.code === statusCodes.success) {
          const updated = [...arrMyWhislist];
          if (typeof index === "number") {
            updated[index].quantity = 0;
          }
          setArrMyWishlist(updated);
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
      handleMyWhilistApi(search, selectedTab);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  useFocusEffect(
    React.useCallback(() => {
      // Call your API function here
      if (debounce) {
        console.log("Search Text==>", debounce);
        handleMyWhilistApi(debounce, selectedTab);
      }
      // Cleanup interval on component unmount or dependency change
      return () => {};
    }, [debounce])
  );

  return (
    <MyWishlistComponent
      arrMyWhislist={arrMyWhislist}
      search={search}
      onChangeSearch={onChangeSearch}
      handleRemoveFromWishlist={handleRemoveFromWishlist}
      handleQuantityChange={handleQuantityChange}
      onPressProduct={onPressProduct}
      selectedTab={selectedTab}
      handleTabPress={handleTabPress}
    />
  );
};

export default MyWishlistContainer;
