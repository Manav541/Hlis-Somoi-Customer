import {  StatusBar,  } from "react-native";
import React, { useEffect, useState } from "react";
import MyOrdersComponent from "../../../components/bottomTabs/myOrders";
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";
import GlobalBackButton from "../../../global/GlobalBackButton";
import { FilterDate, FilterOrderType, Order } from "../../../constants/utils/interfaces";

const MyOrdersContainer = ({ navigation }: any) => {
  const [filterModal, setFilterModal] = useState(false);
  const [selectOrderType, setSelectOrderType] = useState<number>(0);
  const [selectOrderDate, setSelectOrderDate] = useState<number>(0);
  const [arrOrderList, setArrOrderList] = useState<Order[]>([
    {
      order_number: "#12343235",
      total: "₹ 732.00",
      items_Count: 2,
      status: "Confirmed",
      date: "10 Mar, 2025",
      arrProduct: [
        {
          product_name: `Fortune Premium Mustard ${"\n"}Oil`,
          product_img: images.oil,
          price: "₹199",
          quantity: 1,
          unit: "500 ml",
          height: 46.69,
          width: 33.62,
        },
        {
          product_name: `India Gate Basmati ${"\n"}Rice`,
          product_img: images.rice,
          price: "₹499",
          quantity: 1,
          unit: "1 kg",
          height: 40.74,
          width: 27.98,
        },
      ],
    },
    {
      order_number: "#12343236",
      total: "₹ 732.00",
      items_Count: 2,
      status: "Delivered",
      date: "10 Mar, 2025",
      arrProduct: [
        {
          product_name: `Fortune Premium Mustard ${"\n"}Oil`,
          product_img: images.oil,
          price: "₹199",
          quantity: 1,
          unit: "500 ml",
          height: 46.69,
          width: 33.62,
        },
        {
          product_name: `India Gate Basmati ${"\n"}Rice`,
          product_img: images.rice,
          price: "₹499",
          quantity: 1,
          unit: "1 kg",
          height: 40.74,
          width: 27.98,
        },
      ],
    },
    {
      order_number: "#12343237",
      total: "₹ 732.00",
      items_Count: 2,
      status: "Request_return",
      date: "10 Mar, 2025",
      arrProduct: [
        {
          product_name: `Fortune Premium Mustard ${"\n"}Oil`,
          product_img: images.oil,
          price: "₹199",
          quantity: 1,
          unit: "500 ml",
          height: 46.69,
          width: 33.62,
        },
        {
          product_name: `India Gate Basmati ${"\n"}Rice`,
          product_img: images.rice,
          price: "₹499",
          quantity: 1,
          unit: "1 kg",
          height: 40.74,
          width: 27.98,
        },
      ],
    },
    {
      order_number: "#12343238",
      total: "₹ 732.00",
      items_Count: 2,
      status: "Returned",
      date: "10 Mar, 2025",
      arrProduct: [
        {
          product_name: `Fortune Premium Mustard ${"\n"}Oil`,
          product_img: images.oil,
          price: "₹199",
          quantity: 1,
          unit: "500 ml",
          height: 46.69,
          width: 33.62,
        },
        {
          product_name: `India Gate Basmati ${"\n"}Rice`,
          product_img: images.rice,
          price: "₹499",
          quantity: 1,
          unit: "1 kg",
          height: 40.74,
          width: 27.98,
        },
      ],
    },
    {
      order_number: "#12343239",
      total: "₹ 732.00",
      items_Count: 2,
      status: "Cancelled",
      date: "10 Mar, 2025",
      arrProduct: [
        {
          product_name: `Fortune Premium Mustard ${"\n"}Oil`,
          product_img: images.oil,
          price: "₹199",
          quantity: 1,
          unit: "500 ml",
          height: 46.69,
          width: 33.62,
        },
        {
          product_name: `India Gate Basmati ${"\n"}Rice`,
          product_img: images.rice,
          price: "₹499",
          quantity: 1,
          unit: "1 kg",
          height: 40.74,
          width: 27.98,
        },
      ],
    },
  ]);
  const [arrFilterOrderType, setArrFilterOrderType] = useState<FilterOrderType[]>([
    {
      id: 1,
      type: "Orders",
    },
    {
      id: 2,
      type: "Not Yet Delivered",
    },
    {
      id: 3,
      type: "Cancelled",
    },
  ]);
  const [arrFilterDate, setArrFilterDate] = useState<FilterDate[]>([
    {
      id: 1,
      date: "Last 30 Days",
    },
    {
      id: 2,
      date: "Last 3 Months",
    },
  ]);

  const onPressFilter = () => {
    setFilterModal(true);
  };

  const closeFilterModal=()=>{
    setFilterModal(false)
  }

  const handleSelectOrderType=(index:number)=>{
    console.log("index=>",index);
    
    setSelectOrderType(index)
  }

  const handleSelectOrderDate=(index:number)=>{
    console.log("index=>",index);
    
    setSelectOrderDate(index)
  }

  const handleNavigateOrderSummary=(status : string)=>{
   navigation.navigate(ScreenNames.orderSummary,{
    orderMainStatus:status
   })
  } 

  const onPressApply = () => {
    setFilterModal(false);
  }

  const onPressReset = () => {
    setFilterModal(false);
  }

  const header = () => {
    navigation.setOptions({
      headerRight: () => (
        <GlobalBackButton
          onPress={onPressFilter}
          isRight
          rightImage={images.filterIconMyOreders}
        />
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
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
