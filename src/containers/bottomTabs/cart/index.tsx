import { View, Text, StatusBar } from "react-native";
import React, { useState } from "react";
import CartComponent from "../../../components/bottomTabs/cart";
import { useFocusEffect } from "@react-navigation/native";
import { flashMessageWarning } from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";

const CartContainer = ({ navigation }: any) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isApplyCoupon, setIsApplyCoupon] = useState<boolean>(false);
  const [arrOrderProduts, setArrOrderProducts] = useState<any[]>([
    {
      product_img: images.rice,
      product_name: "India Gate Basmati Rice",
      product_final_price: "₹499",
      product_weight: "1 kg",
      product_quantity: 1,
      height: 61.6,
      width: 42.3,
    },
    {
      product_img: images.oil,
      product_name: "Fortune Premium Mustard Oil",
      product_final_price: "₹499",
      product_weight: "1 kg",
      product_quantity: 2,
      height: 66,
      width: 47.52,
    },
  ]);

  const [deliverToName, setDeliverToName] = useState<string>("John");
  const [deliverToAddress, setDeliverToAddress] = useState<string>(
    "3465 Hanover Street, Locust Court Burbank New York, NY 10038" 
  );
  const [approxDeliveryTime, setApproxDeliveryTime] = useState<string>("25 min");

  const [arrOrderDetails, setArrOrderDetails] = useState<any[]>([
    {
      orderDetailTitle : getTranslation('itemTotal'),
      orderDetailValue : "2",
    },
    {
      orderDetailTitle : getTranslation('subTotal'),
      orderDetailValue : "₹698",
    },
    {
      orderDetailTitle : getTranslation('tax'),
      orderDetailValue : "₹34",
    },
    {
      orderDetailTitle : getTranslation('discount'),
      orderDetailValue : "-₹10.00",
    },
    {
      orderDetailTitle : getTranslation('delivery'),
      orderDetailValue : "Free",
    },
    {
      orderDetailTitle : getTranslation('paymentType'),
      orderDetailValue : "Cash on Delivery",
    },
  ]);
  const [totalPrice, setTotalPrice] = useState<string>("₹723");

  const onChangeCouponCode = (text: string) => {
    setCouponCode(text);
  };
  const onPressApplyCoupon = () => {
    if (couponCode === "") {
      flashMessageWarning(getTranslation("coupon_code_required"));
    } else {
      setCouponCode("");
      setIsApplyCoupon(true);
    }
  };

  const onPressRemoveCoupon = () => {
    setCouponCode("");
    setIsApplyCoupon(false);
  };

  const onPressChangeDeliveryAddress = () => {
    navigation.navigate(ScreenNames.manageAddress,{navigateFromCart : true});
  };

  const onPressPlaceOrder = () => {
    navigation.navigate(ScreenNames.paymentMethod);
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <CartComponent
      couponCode={couponCode}
      isApplyCoupon={isApplyCoupon}
      onChangeCouponCode={onChangeCouponCode}
      onPressApplyCoupon={onPressApplyCoupon}
      onPressRemoveCoupon={onPressRemoveCoupon}
      arrOrderProduts={arrOrderProduts}
      deliverToName={deliverToName}
      deliverToAddress={deliverToAddress}
      approxDeliveryTime={approxDeliveryTime}
      arrOrderDetails={arrOrderDetails}
      totalPrice={totalPrice}
      onPressChangeDeliveryAddress={onPressChangeDeliveryAddress}
      onPressPlaceOrder={onPressPlaceOrder}
    />
  );
};

export default CartContainer;
