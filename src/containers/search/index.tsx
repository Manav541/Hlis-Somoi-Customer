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

const SearchContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState<string>("");
  const [arrProducts, setArrProducts] = useState<any>([
    {
      product_img: images.rice,
      product_name: "India Gate Basmati Rice",
      product_price: "₹600",
      product_weight: "1 kg",
      product_final_price: "₹499",
      product_rating: "4.5",
      favourite: true,
    },
    {
      product_img: images.oil,
      product_name: "Fortune Premium Mustard Oil",
      product_price: "₹600",
      product_weight: "500 ml",
      product_final_price: "₹499",
      product_rating: "4.5",
      favourite: true,
    },
    {
      product_img: images.atta,
      product_name: "Aashirvaad Superior MP Atta",
      product_price: "₹120",
      product_weight: "500 g",
      product_final_price: "₹99",
      product_rating: "4.5",
      favourite: true,
    },
    {
      product_img: images.milk,
      product_name: "IA2 Cow Milk",
      product_price: "₹600",
      product_weight: "1 L",
      product_final_price: "₹499",
      product_rating: "4.5",
      favourite: true,
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

  const renderHeader = () => {
    return (
      <View style={{ ...styles.vwHeader, paddingTop: insets.top }}>
        <View style={styles.vwLeftHeader}>
          <GlobalBackButton onPress={() => navigation.goBack()} />
          <TextInput
            placeholder={getTranslation("searchPlaceholder") || ""}
            placeholderTextColor={colors.grey62}
            style={styles.txtSearchInput}
            selectionColor={colors.blue4e}
            value={search}
            onChangeText={onChangeSearch}
            keyboardType="default"
          />
        </View>
        <TouchableOpacity
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={onPressCloseSearch}
        >
          <Image style={styles.imgClose} source={images.closeSearch} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: "",
      header: () => renderHeader(),
    });
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
    />
  );
};

export default SearchContainer;
