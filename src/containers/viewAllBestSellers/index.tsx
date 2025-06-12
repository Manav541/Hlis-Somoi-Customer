import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ViewAllBestSellersComponent from "../../components/viewAllBestSellers";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { BestProductSellerData, Restaurant } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { statusCodes } from "../../api/APIConstant";
import { flashMessageWarning, toggleLoader } from "../../constants/GConstant";
import { zustandStore } from "../../store";

const ViewAllBestSellersContainer = ({ navigation, route }: any) => {
  const bestProductsSellerListApi = zustandStore.HomeStore(
    (state) => state.bestProductsSellerList
  );
  const [arrAllBestSellers, setArrAllBestSellers] = useState(
    route?.params?.arrBestSellers || []
  );
  const [arrBestProductsSellers, setArrBestProductsSellers] = useState<
    BestProductSellerData[]
  >([]);
  const [bestProductsSellerPageNumber, setBestProductsSellerPageNumber] =
    useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const mainCategoryId = route.params.mainCategoryId;

  const onPressFavourite = (index: number) => {
    const updatedList = [...arrAllBestSellers];
    updatedList[index].isFavourite = !updatedList[index].isFavourite;
    setArrAllBestSellers(updatedList);
  };

  const onPressRestaurant = (item: Restaurant) => {
    navigation.navigate(ScreenNames.restaurantDetail, { item: item });
  };

  // handleSubCategoryListApi
  const handleBestProductsSellerListApi = async ( page: number,
    isLoadMore: boolean) => {

      if (isLoadMore && isLoadingMore) return;

      if (!isLoadMore) toggleLoader(true);
      else setIsLoadingMore(true);
    const dictData = {
      category_id: mainCategoryId,
      page_number: page,
    };
    try {
      const response = await bestProductsSellerListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "BEST PRODUCTS SELLERS LIST RESPONSE===>",
            JSON.stringify(response)
          );
          if (response.code === statusCodes.success) {
          const data = response.data as BestProductSellerData[];
          if (Array.isArray(data) && data.length > 0) {
            setArrAllBestSellers((prev: BestProductSellerData[]) =>
              isLoadMore ? [...prev, ...data] : data
            );
  
            // Only update the page number if data exists
            setBestProductsSellerPageNumber(page);
          } else {
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
    finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.allBestSellers}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = bestProductsSellerPageNumber + 1;
      handleBestProductsSellerListApi(nextPage, true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setBestProductsSellerPageNumber(1);
      setHasMoreData(true);
      setArrAllBestSellers([]);
      handleBestProductsSellerListApi(1, false);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <ViewAllBestSellersComponent
      arrAllBestSellers={arrAllBestSellers}
      onPressFavourite={onPressFavourite}
      onPressRestaurant={onPressRestaurant}
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default ViewAllBestSellersContainer;
