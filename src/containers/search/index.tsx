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

const SearchContainer = ({ navigation }: any) => {
  // API zustand store
  const searchProductApi = zustandStore.HomeStore(
    (state) => state.searchProduct
  );

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

  const onPressProduct = (item: any) => {
    setSearch("");
    navigation.navigate(ScreenNames.productDetail, { item });
  };

  // handleSubCategoryListApi
  const handleSearchProductApi = async (text: String) => {
    const dictData = {
      search_text: text,
    };
    try {
      const response = await searchProductApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("SEARCH PRODUCT RESPONSE===>", JSON.stringify(response));
        const data = response.data as any;
        if (response.code === statusCodes.success) {
          setArrProducts(data);
        } else if (response.code === statusCodes.invaildOrFail) {
          // flashMessageWarning(response.message);
          setArrProducts([]);
        } else if (response.code === statusCodes.emptyData) {
          // flashMessageWarning(response.message);
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
    useCallback(() => {
      // Call your API function here
      if (debounce) {
        console.log("Search Text==>", debounce);
        handleSearchProductApi(debounce);
      }
      // Cleanup interval on component unmount or dependency change
      return () => {};
    }, [debounce])
  );

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
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
