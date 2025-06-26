import { Text, StatusBar } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import CompareProductComponent from "../../components/compareProduct";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { ComapareProductData } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { flashMessageWarning } from "../../constants/GConstant";

const CompareProductConteiner = ({ navigation, route }: any) => {
  // API Zustand store
  const compareProductDetailApi = zustandStore.CompareProductStore(
    (state) => state.compareProductDetail
  );

  const removeCompareProductApi = zustandStore.CompareProductStore(
    (state) => state.removeCompareProduct
  );

  const itemData = route.params;
  const main_category = itemData?.main_category;
  const customer_latitude = itemData?.customer_latitude;
  const customer_longitude = itemData?.customer_longitude;

  const [arrCompareProducts, setArrCompareProducts] = useState<
    ComapareProductData[]
  >([]);

  const onPressAddButton = () => {
    navigation.navigate(ScreenNames.addCompareProduct, {
      main_category: main_category,
      customer_latitude: customer_latitude,
      customer_longitude: customer_longitude,
    });
  };

  const onPressDeleteButton = (product_id: string) => {
    handleRemoveCompareProductApi(product_id);
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

  // ----------------------API Calling--------------------
  // handleCompareProductDetailApi
  const handleCompareProductDetailApi = async () => {
    try {
      const response = await compareProductDetailApi({}, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "COMPARE PRODUCT DETAIL RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as ComapareProductData[];
        if (response.code === statusCodes.success) {
          setArrCompareProducts(data);
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
  const handleRemoveCompareProductApi = async (product_id: string) => {
    const dictData = {
      product_id: product_id,
    };
    try {
      const response = await removeCompareProductApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "REMOVE COMPARE PRODUCT RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as any;
        if (response.code === statusCodes.success) {
          // Remove the deleted product from the compare list
          setArrCompareProducts((prev) =>
            prev.filter((item) => item.id !== product_id)
          );
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.compareProduct}
        </Text>
      ),
      headerRight: () => (
        <GlobalBackButton
          onPress={onPressAddButton}
          isRight
          rightImage={images.addCircle}
        />
      ),
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleCompareProductDetailApi();
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <CompareProductComponent
      arrCompareProducts={arrCompareProducts}
      onPressDeleteButton={onPressDeleteButton}
      onPressProduct={onPressProduct}
    />
  );
};

export default CompareProductConteiner;
