import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ViewAllBestProductsComponent from "../../components/viewAllBestProducts";
import GlobalBackButton from "../../global/GlobalBackButton";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { MmkvManager } from "../../constants/utils/MmkvManager";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { BestProductSellerData } from "../../constants/interfaces";
import { toggleLoader } from "../../constants/GConstant";

const ViewAllBestProductsContainer = ({ navigation, route }: any) => {
  const bestProductsSellerListApi = zustandStore.HomeStore(
    (state) => state.bestProductsSellerList
  );
  const mainCategoryId = route.params.mainCategoryId;
  const type = route.params.type;
  const currentLatLong = route.params?.currentLatLong;
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const [arrBestProductsSellers, setArrBestProductsSellers] = useState<
    BestProductSellerData[]
  >([]);
  //   Pagination State
  const [bestProductsSellerPageNumber, setBestProductsSellerPageNumber] =
    useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const onPressBestProducts = (
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
          {ScreenNames.allBestProducts}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = bestProductsSellerPageNumber + 1;
      handleBestProductsSellerListApi(
        mainCategoryId,
        type,
        currentLatLong?.latitude ?? 0,
        currentLatLong?.longitude ?? 0,
        nextPage,
        true
      );
    }
  };

  //   ---------------------------- API Calling ----------------------------
  // handleBestProductsSellerListApi
  const handleBestProductsSellerListApi = async (
    mainCategoryId: String,
    name: string,
    customer_latitude: number,
    customer_longitude: number,
    page: number,
    isLoadMore = false
  ) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);

    const dictData = {
      category_id: mainCategoryId,
      page_number: page,
      type: name,
      customer_latitude: customer_latitude?.toString(),
      customer_longitude: customer_longitude?.toString(),
    };
    try {
      const response = await bestProductsSellerListApi(
        dictData,
        isGuestUser,
        navigation
      );
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "BEST PRODUCTS SELLERS LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const rawData = response.data as BestProductSellerData;
        if (response.code === statusCodes.success) {
          if (Array.isArray(rawData) && rawData.length > 0) {
            setArrBestProductsSellers((prev) =>
              isLoadMore ? [...prev, ...rawData] : rawData
            );
            setBestProductsSellerPageNumber(page);
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrBestProductsSellers([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrBestProductsSellers([]);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrBestProductsSellers([]);
          setHasMoreData(false);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    } finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });
      handleBestProductsSellerListApi(
        mainCategoryId,
        type,
        currentLatLong?.latitude ?? 0,
        currentLatLong?.longitude ?? 0,
        1,
        false
      );
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <ViewAllBestProductsComponent
      arrBestProductsSellers={arrBestProductsSellers}
      onPressBestProducts={onPressBestProducts}
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default ViewAllBestProductsContainer;
