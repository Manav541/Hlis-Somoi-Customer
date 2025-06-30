import React, { useEffect, useRef, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { SubCategoryListItem } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { flashMessageWarning, toggleLoader } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import ViewAllSubCategoriesComponent from "../../components/viewAllSubCategories";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";

const ViewAllSubCategoriesContainer = ({ navigation, route }: any) => {
  const subCategoryListApi = zustandStore.HomeStore(
    (state) => state.subCategoryList
  );

  const [arrSubCategory, setArrSubCategory] = useState<SubCategoryListItem[]>(
    []
  );
  const [subCategoryPageNumber, setSubCategoryPageNumber] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const mainCategoryId = route.params.mainCategoryId;
  const mainCategoryName = route.params.mainCategoryName;
  const currentLatLong = route.params.currentLatLong;
  console.log("mainCategoryName sub", mainCategoryName);

  const onPressCategory = (
    sub_category_id: string,
    subCategoryName: string
  ) => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryId: mainCategoryId,
      mainCategoryName: mainCategoryName,
      sub_category_id: sub_category_id,
      subCategoryName: subCategoryName,
      currentLatLong: currentLatLong,
    });
  };

  const handleSubCategoryListApi = async (
    page: number,
    isLoadMore: boolean
  ) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);

    const dictData = {
      category_id: mainCategoryId,
      page_number: page,
    };

    try {
      const response = await subCategoryListApi(dictData, navigation);

      if (response?.code === statusCodes.success) {
        const data = response.data as SubCategoryListItem[];

        if (Array.isArray(data) && data.length > 0) {
          setArrSubCategory((prev) => (isLoadMore ? [...prev, ...data] : data));

          // Only update the page number if data exists
          setSubCategoryPageNumber(page);
        } else {
          setHasMoreData(false);
        }
      } else if (response?.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
      }
    } catch (error) {
      __DEV__ && console.log("SubCategory Error:", error);
    } finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = subCategoryPageNumber + 1;
      handleSubCategoryListApi(nextPage, true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setSubCategoryPageNumber(1);
      setHasMoreData(true);
      setArrSubCategory([]);
      handleSubCategoryListApi(1, false);
      StatusBar.setBarStyle("dark-content");
    }, [navigation])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.allCategories}
        </Text>
      ),
    });
  }, []);

  return (
    <ViewAllSubCategoriesComponent
      arrSubCategory={arrSubCategory}
      onPressCategory={onPressCategory}
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default ViewAllSubCategoriesContainer;
