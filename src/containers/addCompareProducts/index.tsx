import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import AddCompareProductsComponent from "../../components/addCompareProducts";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { useFocusEffect } from "@react-navigation/native";
import {
  GroceryProduct,
  SimilarCompareProductData,
} from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { flashMessageWarning } from "../../constants/GConstant";
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
      navigateFromCompareProduct: true
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

  // ----------------------API Calling--------------------
  // handleSimilarProductListApi
  const handleSimilarProductListApi = async () => {
    try {
      const response = await similarProductListApi({}, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "SIMILAR PRODUCT LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as SimilarCompareProductData[];
        if (response.code === statusCodes.success) {
          setArrSimilarCompareProducts(data);
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
      handleSimilarProductListApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <AddCompareProductsComponent
      arrSimilarCompareProducts={arrSimilarCompareProducts}
      onPressAdd={onPressAdd}
      onPressProduct={onPressProduct}
    />
  );
};

export default AddCompareProductsContainer;
