import { StatusBar, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MyOrdersComponent from "../../../components/bottomTabs/myOrders";
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";
import GlobalBackButton from "../../../global/GlobalBackButton";
import { FilterDate, FilterOrderType } from "../../../constants/interfaces";
import { constnatStyles } from "../../../constants/Styles";
import {
  flashMessageWarning,
  showConfirmForGuest,
  toggleLoader,
} from "../../../constants/GConstant";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";
import { MmkvManager } from "../../../constants/utils/MmkvManager";

const MyOrdersContainer = ({ navigation }: any) => {
  // API zustand store
  const orderListApi = zustandStore.MyOrdersStore((state) => state.orderList);

  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const [filterModal, setFilterModal] = useState(false);
  const [selectOrderType, setSelectOrderType] = useState<string>("orders");
  const [selectOrderDate, setSelectOrderDate] =
    useState<string>("last_30_days");
  const [arrOrderList, setArrOrderList] = useState<any[]>([]);
  const [arrFilterOrderType, setArrFilterOrderType] = useState<
    FilterOrderType[]
  >([
    {
      id: 1,
      type: "Orders",
      value: "orders",
    },
    {
      id: 2,
      type: "Not Yet Delivered",
      value: "not_yet_delivered",
    },
    {
      id: 3,
      type: "Cancelled",
      value: "cancelled",
    },
  ]);
  const [arrFilterDate, setArrFilterDate] = useState<FilterDate[]>([
    {
      id: 1,
      date: "Last 30 Days",
      value: "last_30_days",
    },
    {
      id: 2,
      date: "Last 3 Months",
      value: "last_3_months",
    },
  ]);

  // Pagination state
  const [orderListPageNumber, setOrderListPageNumber] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPressFilter = () => {
    if (isGuestUser) {
      showConfirmForGuest(() => {
        navigation.navigate(ScreenNames.signin);
      });
    } else {
      setFilterModal(true);
    }
  };

  const closeFilterModal = () => {
    setFilterModal(false);
  };

  const handleSelectOrderType = (value: string) => {
    console.log("index=>", value);

    setSelectOrderType(value);
  };

  const handleSelectOrderDate = (value: string) => {
    console.log("date=>", value);

    setSelectOrderDate(value);
  };

  const handleNavigateOrderSummary = (order_id: string) => {
    navigation.navigate(ScreenNames.orderSummary, {
      order_id: order_id,
    });
  };

  const onPressApply = () => {
    if (!selectOrderType && !selectOrderDate) {
      flashMessageWarning("Please select at least one filter.");
      return;
    }
    setHasMoreData(true); // Reset pagination
    setOrderListPageNumber(1);
    setFilterModal(false);
    handleOrderListApi(selectOrderType, selectOrderDate, 1, false);
    // Apply filtering logic here if needed
  };

  const onPressReset = () => {
    // setFilterModal(false);
    setSelectOrderType("");
    setSelectOrderDate("");
  };

  const header = () => {
    navigation.setOptions({
      headerRight: () => (
        <GlobalBackButton
          onPress={() => {
            onPressFilter();
          }}
          isRight
          rightImage={images.filterIconMyOreders}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.myOrders}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    setHasMoreData(true);
    setOrderListPageNumber(1);
    handleOrderListApi(selectOrderType, selectOrderDate, 1, false);
  };

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = orderListPageNumber + 1;
      handleOrderListApi(selectOrderType, selectOrderDate, nextPage, true);
    }
  };

  // -------------------------API Calling----------------------------
  // handleOrderListApi
  const handleOrderListApi = async (
    order_type: string,
    order_date: string,
    page: number,
    isLoadMore = false
  ) => {
    if (isLoadMore && isLoadingMore) return;
    if (isLoadMore) setIsLoadingMore(true);
    const dictData = {
      page_no: page,
      order_type: order_type,
      order_date: order_date,
    };
    try {
      const response = await orderListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ORDER LISTING RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          setIsRefreshing(false);
          const rawData = response.data as any;
          if (Array.isArray(rawData) && rawData.length > 0) {
            setArrOrderList((prev) =>
              isLoadMore ? [...prev, ...rawData] : rawData
            );
            setOrderListPageNumber(page);
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrOrderList([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrOrderList([]);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrOrderList([]);
          setHasMoreData(false);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    } finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        const isGuest = Boolean(storedValue);
        console.log("isGuestUser=====>", isGuest);
        setIsGuestUser(isGuest);

        if (isGuest) {
          setArrOrderList([]); // Empty cart for guest users
        } else {
          handleOrderListApi(selectOrderType, selectOrderDate, 1, false);
        }
      });

      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <MyOrdersComponent
      arrOrderList={arrOrderList}
      filterModal={filterModal}
      onPressFilter={onPressFilter}
      closeFilterModal={closeFilterModal}
      arrFilterOrderType={arrFilterOrderType}
      arrFilterDate={arrFilterDate}
      selectOrderType={selectOrderType}
      selectOrderDate={selectOrderDate}
      handleSelectOrderType={handleSelectOrderType}
      handleSelectOrderDate={handleSelectOrderDate}
      handleNavigateOrderSummary={handleNavigateOrderSummary}
      onPressApply={onPressApply}
      onPressReset={onPressReset}
      // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default MyOrdersContainer;
