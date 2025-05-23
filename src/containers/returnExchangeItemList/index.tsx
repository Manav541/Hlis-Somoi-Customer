import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ReturnExchangeItemListComponent from "../../components/returnExchangeItemList";
import GlobalBackButton from "../../global/GlobalBackButton";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { OrderReviewProduct } from "../../constants/interfaces";
import { flashMessageWarning } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";

const ReturnExchangeItemListContainer = ({ navigation, route }: any) => {
  const [arrProducts, setArrProducts] = useState<OrderReviewProduct[]>([]);

  const onPressItem = (item: OrderReviewProduct, index: number) => {
    const updatedProducts = arrProducts.map((product, i) => {
      if (i === index) {
        return {
          ...product,
          isSelected: !product.isSelected, // Toggle selection
        };
      }
      return product;
    });

    setArrProducts(updatedProducts);
  };

  const onPressContinue = () => {
    // Get all selected items
    const selectedItems = arrProducts.filter((product) => product.isSelected);
    
    // Validate at least one item is selected
    if (selectedItems.length === 0) {
      // You can use your app's alert/toast mechanism here
     flashMessageWarning(getTranslation('selectProductItem'))
      return;
    }
    
    navigation.navigate(ScreenNames.returnOrder, { items: selectedItems });
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} style={{marginBottom : 0}} />
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
      onPressContinue={onPressContinue}
    />
  );
};

export default ReturnExchangeItemListContainer;
