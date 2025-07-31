import {  Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AddCompareProductsComponent from "../../components/addCompareProducts";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import {
  SimilarCompareProductData,
} from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { flashMessageWarning, toggleLoader } from "../../constants/GConstant";
import { ScreenNames } from "../../routers";

const AddCompareProductsContainer = ({ navigation, route }: any) => {
  // API Zustand store
  const similarProductListApi = zustandStore.CompareProductStore(
    (state) => state.similarProductList
  );

  const addCompareProductApi = zustandStore.CompareProductStore(
    (state) => state.addCompareProduct
  );
  const itemData = route.params;
  const main_category = itemData?.main_category;
  const customer_latitude = itemData?.customer_latitude;
  const customer_longitude = itemData?.customer_longitude;

  const [arrSimilarCompareProducts, setArrSimilarCompareProducts] = useState<
    SimilarCompareProductData[]
  >([]);
  // Pagination state
  const [
    similarCompareProductListPageNumber,
    setSimilarCompareProductListPageNumber,
  ] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const onPressProduct = (
    product_id: string,
    variation_id?: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    color_id?: string,
    size_id?: string
  ) => {
    navigation.navigate(ScreenNames.productDetail, {
      product_id: product_id,
      variation_id: variation_id,
      is_variation: is_variation,
      is_color: is_color,
      is_size: is_size,
      color_id: color_id,
      size_id: size_id,
      customer_latitude: customer_latitude,
      customer_longitude: customer_longitude,
      navigateFromCompareProduct: true,
    });
  };

  const onPressAdd = (product_id: string) => {
    handleAddCompareProductApi(product_id);
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{main_category}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [main_category]);

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = similarCompareProductListPageNumber + 1;
      handleSimilarProductListApi(nextPage, true);
    }
  };

  // ----------------------API Calling--------------------
  // handleSimilarProductListApi
  const handleSimilarProductListApi = async (
    page: number,
    isLoadMore = false
  ) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);
    const dictData = {
      page_no: page,
    };
    try {
      const response = await similarProductListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "SIMILAR PRODUCT LIST RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          const rawData = response.data as SimilarCompareProductData[];
          if (Array.isArray(rawData) && rawData.length > 0) {
            setArrSimilarCompareProducts((prev) =>
              isLoadMore ? [...prev, ...rawData] : rawData
            );
            setSimilarCompareProductListPageNumber(page);
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrSimilarCompareProducts([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrSimilarCompareProducts([]);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrSimilarCompareProducts([]);
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

  // handleAddCompareProductApi
  const handleAddCompareProductApi = async (product_id: string) => {
    const dictData = {
      product_id: product_id,
    };
    try {
      const response = await addCompareProductApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "ADD COMPARE PRODUCT RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          navigation.goBack();
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleSimilarProductListApi(1, false);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <AddCompareProductsComponent
      arrSimilarCompareProducts={arrSimilarCompareProducts}
      onPressAdd={onPressAdd}
      onPressProduct={onPressProduct}
      // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default AddCompareProductsContainer;
