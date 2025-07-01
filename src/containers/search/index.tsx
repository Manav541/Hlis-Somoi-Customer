import {
  View,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { toggleLoader } from "../../constants/GConstant";

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
  const [arrProducts, setArrProducts] = useState<any[]>([]);

  // Pagination state
  const [searchProductListPageNumber, setSearchProductListPageNumber] =
    useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

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

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = searchProductListPageNumber + 1;
      handleSearchProductApi(search, nextPage, true);
    }
  };

  // handleSubCategoryListApi
  const handleSearchProductApi = async (
    text: String,
    page: number,
    isLoadMore = false
  ) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);
    const dictData = {
      search_text: text,
      page_no: page,
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
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          if (Array.isArray(rawData) && rawData.length > 0) {
            setArrProducts((prev) =>
              isLoadMore ? [...prev, ...rawData] : rawData
            );
            setSearchProductListPageNumber(page);
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrProducts([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrProducts([]);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrProducts([]);
          setHasMoreData(false);
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
        handleSearchProductApi(debounce, 1, false);
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
           // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchContainer;
