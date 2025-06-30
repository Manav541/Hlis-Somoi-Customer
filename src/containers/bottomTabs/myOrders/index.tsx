import { StatusBar, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MyOrdersComponent from "../../../components/bottomTabs/myOrders";
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";
import GlobalBackButton from "../../../global/GlobalBackButton";
import {
  FilterDate,
  FilterOrderType,
  Order,
} from "../../../constants/interfaces";
import { constnatStyles } from "../../../constants/Styles";
import {
  flashMessageWarning,
  showConfirmForGuest,
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
  const [arrOrderList, setArrOrderList] = useState<any[]>([
    // {
    //   order_number: "#12343235",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "Confirmed",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
    // {
    //   order_number: "#12343245",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "Preparing",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
    // {
    //   order_number: "#12343246",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "On_the_way",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
    // {
    //   order_number: "#12343236",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "Delivered",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
    // {
    //   order_number: "#12343237",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "Request_return",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
    // {
    //   order_number: "#12343247",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "Request_exchange",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
    // {
    //   order_number: "#12343238",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "Returned",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
    // {
    //   order_number: "#12343239",
    //   total: "732.00",
    //   items_Count: 2,
    //   status: "Cancelled",
    //   date: "10 Mar, 2025",
    //   arrProduct: [
    //     {
    //       product_name: `Fortune Premium Mustard ${"\n"}Oil`,
    //       product_img: images.oil,
    //       price: "199",
    //       quantity: 1,
    //       unit: "500 ml",
    //       height: 46.69,
    //       width: 33.62,
    //     },
    //     {
    //       product_name: `India Gate Basmati ${"\n"}Rice`,
    //       product_img: images.rice,
    //       price: "499",
    //       quantity: 1,
    //       unit: "1 kg",
    //       height: 40.74,
    //       width: 27.98,
    //     },
    //   ],
    // },
  ]);
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

    setFilterModal(false);
    handleOrderListApi(selectOrderType, selectOrderDate);
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

  // -------------------------API Calling----------------------------
  // handleOrderListApi
  const handleOrderListApi = async (order_type: string, order_date: string) => {
    const dictData = {
      page_no: 1,
      order_type: order_type,
      order_date: order_date,
    };
    try {
      const response = await orderListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("ORDER LISTING RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          setArrOrderList(rawData);
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrOrderList([]);
        } else if (response.code === statusCodes.emptyData) {
          setArrOrderList([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
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
          handleOrderListApi(selectOrderType, selectOrderDate);
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
    />
  );
};

export default MyOrdersContainer;
