import {
  View,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SearchComponent from "../../components/search";
import GlobalBackButton from "../../global/GlobalBackButton";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { constnatStyles } from "../../constants/Styles";
import { debounceQuery } from "../../constants/utils/Debounce";
import { MmkvManager } from "../../constants/utils/MmkvManager";

const SearchContainer = ({ navigation, route }: any) => {
  // API zustand store
  const searchProductApi = zustandStore.HomeStore(
    (state) => state.searchProduct
  );
  const currentLatLong = route.params.currentLatLong;
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState<string>("");
  const debounce = debounceQuery(search, 300);
  const [arrProducts, setArrProducts] = useState([]);

  const onChangeSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      setArrProducts([]); // Immediately clear the list
      return;
    }
  };

  const onPressCloseSearch = () => {
    setSearch("");
    setArrProducts([]);
  };

  const onPressProduct = (
    product_id: string,
    variation_id?: string,
    size_id?: string,
    color_id?: string,
    is_variation?: boolean,
    is_color?: boolean,
    is_size?: boolean,
    category_id?: string,
    vendor_id?: string
  ) => {
    setSearch("");
    if (category_id == "2") {
      navigation.navigate(ScreenNames.restaurantDetail, {
        vendor_id: vendor_id,
        customer_latitude: currentLatLong?.latitude,
        customer_longitude: currentLatLong?.longitude,
      });
    } else {
      navigation.navigate(ScreenNames.productDetail, {
        product_id: product_id,
        variation_id: variation_id,
        size_id: size_id,
        color_id: color_id,
        is_variation: is_variation,
        is_color: is_color,
        is_size: is_size,
        customer_latitude: currentLatLong?.latitude,
        customer_longitude: currentLatLong?.longitude,
      });
    }
  };

  // handleSubCategoryListApi
  const handleSearchProductApi = async (text: String) => {
    const dictData = {
      search_text: text,
    };
    try {
      const response = await searchProductApi(
        dictData,
        isGuestUser,
        navigation
      );
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("SEARCH PRODUCT RESPONSE===>", JSON.stringify(response));
        const data = response.data as any;
        if (response.code === statusCodes.success) {
          setArrProducts(data);
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrProducts([]);
        } else if (response.code === statusCodes.emptyData) {
          setArrProducts([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const header = () => {
    navigation.setOptions({
      title: "",
      header: () => (
        <View
          style={[constnatStyles.vwHeader, { paddingTop: insets.top + 10 }]}
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
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });
      if (debounce) {
        console.log("Search Text==>", debounce);
        handleSearchProductApi(debounce);
      }
      setArrProducts([]);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation, debounce])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <SearchComponent
          arrProducts={arrProducts}
          onPressProduct={onPressProduct}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchContainer;
