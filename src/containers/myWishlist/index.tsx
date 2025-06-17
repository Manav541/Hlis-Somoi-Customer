import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import MyWishlistComponent from "../../components/myWishlist";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { Product } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";
import { flashMessageWarning } from "../../constants/GConstant";
import { debounceQuery } from "../../constants/utils/Debounce";

const MyWishlistContainer = ({ navigation }: any) => {
  // API Zustand store
  const myWhilistApi = zustandStore.MyWishlistStore(
    (state) => state.myWishlist
  );
  const wishlistProductApi = zustandStore.MyWishlistStore(
    (state) => state.wishlistProduct
  );

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
    handleMyWhilistApi(search,tab);
  };

  // Add to cart
  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const updated = [...arrMyWhislist];
    if (type === "add") {
      updated[index].quantity += 1;
    } else if (type === "remove" && updated[index].quantity > 0) {
      updated[index].quantity -= 1;
    }
    setArrMyWishlist(updated);
  };

  // On Press Product
  const onPressProduct = (item: any) => {
    navigation.navigate(ScreenNames.productDetail, { item: item });
  };

  //   Remove from wishlist
  const handleRemoveFromWishlist = (
    product_id: string,
    variation_id: string
  ) => {
    handleWishlistProductApi(product_id, variation_id);
  };

  // -----------------------API Call-----------------------

  const handleMyWhilistApi = async (text : string,type: string) => {
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
      handleMyWhilistApi(search,selectedTab);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  useFocusEffect(
    React.useCallback(() => {
      // Call your API function here
      if (debounce) {
        console.log("Search Text==>", debounce);
        handleMyWhilistApi(debounce,selectedTab);
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
