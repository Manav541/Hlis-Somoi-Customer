import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import GlobalBackButton from "../../global/GlobalBackButton";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { GroceryProduct } from "../../constants/interfaces";

const SearchContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState<string>("");
  const [arrProducts, setArrProducts] = useState<GroceryProduct[]>([
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
      product_name: "India Gate Basmati Rice",
      product_price: "600",
      product_weight: "1 kg",
      product_final_price: "499",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: true,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 KM",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
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
      subCategoryTitle: "Cooking Oil",
      product_imgMain: [
        {
          imgMain: images.oil,
        },
        {
          imgMain: images.oil,
        },
        {
          imgMain: images.oil,
        },
      ],
      product_img: images.oil,
      product_name: "Fortune Premium Mustard Oil",
      product_price: "600",
      product_weight: "500 ml",
      product_final_price: "499",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: false,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 KM",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
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
      height: 100,
      width: 72,
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
      product_price: "600",
      product_weight: "1 kg",
      product_final_price: "499",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: true,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 KM",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
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
    },
    {
      mainCategoryTitle: "Groceries",
      subCategoryTitle: "Flour",
      product_imgMain: [
        {
          imgMain: images.atta,
        },
        {
          imgMain: images.atta,
        },
        {
          imgMain: images.atta,
        },
      ],
      product_img: images.atta,
      product_name: "Aashirvaad Superior MP Atta",
      product_price: "120",
      product_weight: "500 g",
      product_final_price: "99",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: false,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 KM",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
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
      product_price: "600",
      product_weight: "1 kg",
      product_final_price: "499",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: true,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 KM",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
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
    {
      mainCategoryTitle: "Groceries",
      subCategoryTitle: "Milk",
      product_imgMain: [
        {
          imgMain: images.milk,
        },
        {
          imgMain: images.milk,
        },
        {
          imgMain: images.milk,
        },
      ],
      product_img: images.milk,
      product_name: "IA2 Cow Milk",
      product_price: "600",
      product_weight: "1 L",
      product_final_price: "499",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: true,
      product_quantity: 0,
      product_deliverytime: "10 Min",
      product_distance: "5 KM",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
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
      height: 91.79,
      width: 72,
    },
  ]);

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  const onPressCloseSearch = () => {
    setSearch("");
  };

  const filteredProducts = search
    ? arrProducts.filter((item: any) =>
        item.product_name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const onPressProduct = (item: any) => {
    setSearch("");
    navigation.navigate(ScreenNames.productDetail, { item });
  };

  // console.log('instsets.top', insets.top, )

  const header = () => {
    navigation.setOptions({
      title : "",
      header: () => (
        <View
          style={{
            paddingTop: insets.top +10,
            backgroundColor: colors.orange1c,
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 14,
          }}
        >
          <GlobalBackButton
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 0 }}
          />

          <TextInput
            placeholder={getTranslation("searchPlaceholder") || ""}
            placeholderTextColor={colors.grey62}
            style={styles.txtSearchInput}
            selectionColor={colors.blue4e}
            value={search}
            onChangeText={onChangeSearch}
            keyboardType="default"
          />

          <GlobalBackButton
            isRight
            onPress={onPressCloseSearch}
            rightImage={images.closeSearch}
            style={{ marginBottom: 0 }}
          />
        </View>
      ),
    
    });
  };

  useEffect(() => {
    header();
  }, [search]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <SearchComponent
      arrProducts={arrProducts}
      filteredProducts={filteredProducts}
      onPressProduct={onPressProduct}
    />
  );
};

export default SearchContainer;
