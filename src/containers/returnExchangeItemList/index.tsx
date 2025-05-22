import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ReturnExchangeItemListComponent from "../../components/returnExchangeItemList";
import GlobalBackButton from "../../global/GlobalBackButton";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { OrderReviewProduct } from "../../constants/interfaces";

const ReturnExchangeItemListContainer = ({ navigation, route }: any) => {
  const [arrProducts, setArrProducts] = useState<OrderReviewProduct[]>([]);

  const onPressItem = (item: OrderReviewProduct, index: number) => {
    const updatedProducts = arrProducts.map((product, i) => ({
      ...product,
      isSelected: i === index
    }));
  
    setArrProducts(updatedProducts);
    navigation.navigate(ScreenNames.returnOrder, { item });
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.returnExchangeItemList}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
    if (route?.params) {
      console.log("route?.params", route?.params);
      setArrProducts(route?.params?.arrProducts);
    }
  }, [route]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <ReturnExchangeItemListComponent
      arrProducts={arrProducts}
      onPressItem={onPressItem}
    />
  );
};

export default ReturnExchangeItemListContainer;
