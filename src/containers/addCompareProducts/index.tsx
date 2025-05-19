import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import AddCompareProductsComponent from "../../components/addCompareProducts";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { useFocusEffect } from "@react-navigation/native";
import { GroceryProduct } from "../../constants/utils/interfaces";

const AddCompareProductsContainer = ({ navigation, route }: any) => {
  const mainCategoryTitle = route.params?.mainCategoryTitle;
  // Sample product data for reuse
  const SAMPLE_PRODUCT_DESC =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";
  const [arrCompareProducts, setArrCompareProducts] = useState<GroceryProduct[]>([
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
        SAMPLE_PRODUCT_DESC,
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
    {
      mainCategoryTitle: "Groceries",
      subCategoryTitle: "Rice",
      product_imgMain: [
        {
          imgMain: images.rice1,
        },
        {
          imgMain: images.rice1,
        },
        {
          imgMain: images.rice1,
        },
      ],
      product_img: images.rice1,
      product_name: "Scotti Arborio Rice",
      product_price: "₹600",
      product_weight: "1 kg",
      product_final_price: "₹499",
      product_rating: "4.5",
      isFavourite: true,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 km",
      product_desc:
      SAMPLE_PRODUCT_DESC,
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
      width: 88,
    }, {
      mainCategoryTitle: "Groceries",
      subCategoryTitle: "Rice",
      product_imgMain: [
        {
          imgMain: images.rice2,
        },
        {
          imgMain: images.rice2,
        },
        {
          imgMain: images.rice2,
        },
      ],
      product_img: images.rice2,
      product_name: "Gropure Black Rice",
      product_price: "₹600",
      product_weight: "1 kg",
      product_final_price: "₹499",
      product_rating: "4.5",
      isFavourite: true,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 km",
      product_desc:
      SAMPLE_PRODUCT_DESC,
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
      width: 62,
    },
   
  ]);

  const onPressAdd = (item: GroceryProduct) => {
    const onSelectProduct = route.params?.onSelectProduct;
    if (onSelectProduct) {
      onSelectProduct(item);
    }
    navigation.goBack();
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={styles.txtHeaderTitle}>{mainCategoryTitle}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [mainCategoryTitle]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <AddCompareProductsComponent
      arrCompareProducts={arrCompareProducts}
      onPressAdd={onPressAdd}
    />
  );
};

export default AddCompareProductsContainer;
