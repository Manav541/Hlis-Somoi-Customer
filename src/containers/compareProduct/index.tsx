import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import CompareProductComponent from "../../components/compareProduct";
import GlobalBackButton from "../../global/GlobalBackButton";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { ScreenNames } from "../../routers";
import { useFocusEffect } from "@react-navigation/native";
import { GroceryProduct } from "../../constants/utils/interfaces";

const CompareProductConteiner = ({ navigation, route }: any) => {
  const mainCategoryTitle = route.params?.mainCategoryTitle;
  const [arrCompareProducts, setArrCompareProducts] = useState<
    GroceryProduct[]
  >([
    {
      mainCategoryTitle: "Groceries",
      subCategoryTitle: "Rice",
      product_imgMain: [
        {
          imgMain: images.rice,
        },
        {
          imgMain: images.rice,
        },
        {
          imgMain: images.rice,
        },
      ],
      product_img: images.rice,
      product_name: `India Gate Basmati ${"\n"}Rice`,
      product_price: "₹600",
      product_weight: "1 kg",
      product_final_price: "₹499",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: true,
      product_quantity: 1,
      product_deliverytime: "10 Min",
      product_distance: "5 km",
      product_desc:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      product_highlight: [
        {
          highlightTitle: "Grain Size",
          highlightDesc: "250",
        },
        {
          highlightTitle: "Organic",
          highlightDesc: "No",
        },
        {
          highlightTitle: "Polished",
          highlightDesc: "Yes",
        },
        {
          highlightTitle: "Brand",
          highlightDesc: "India Gate",
        },
        {
          highlightTitle: "Fssai license ",
          highlightDesc: "250",
        },
      ],
      product_inStock: true,
      product_deliveryData: [
        {
          deliveryDataImage: images.productReturn,
          deliveryDataTitle: "3 day Return/ Exchange",
        },
        {
          deliveryDataImage: images.cashOnDelivery,
          deliveryDataTitle: "Cash on Delivery",
        },
        {
          deliveryDataImage: images.fastDelivery,
          deliveryDataTitle: "Fast Delivery",
        },
      ],
      height: 88,
      width: 60,
    },
  ]);

  const onPressAddButton = () => {
    navigation.navigate(ScreenNames.addCompareProduct, {
      mainCategoryTitle,
      onSelectProduct: (selectedProduct: GroceryProduct) => {
        setArrCompareProducts((prev) => [...prev, selectedProduct]);
      },
    });
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={onPressAddButton}
        >
          <Image
            style={{ height: 24, width: 24, marginRight: 20 }}
            source={images.addCircle}
          />
        </TouchableOpacity>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return <CompareProductComponent arrCompareProducts={arrCompareProducts} />;
};

export default CompareProductConteiner;
