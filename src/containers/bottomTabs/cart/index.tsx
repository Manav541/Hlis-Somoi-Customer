import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import CartComponent from "../../../components/bottomTabs/cart";
import { useFocusEffect } from "@react-navigation/native";
import { flashMessageWarning, rupeeSymbol } from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";
import { GroceryProduct, OrderDetail } from "../../../constants/interfaces";
import { constnatStyles } from "../../../constants/Styles";

const CartContainer = ({ navigation }: any) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isApplyCoupon, setIsApplyCoupon] = useState<boolean>(false);
  const [arrOrderProduts, setArrOrderProducts] = useState<GroceryProduct[]>([
    {
      mainCategoryTitle: "Groceries",
      subCategoryTitle: "Rice",
      product_imgMain: [
        {
          imgMain: images.rice,
        },
        {
          imgMain: images.rice,
        },
        {
          imgMain: images.rice,
        },
      ],
      product_img: images.rice,
      product_name: `India Gate Basmati ${"\n"}Rice`,
      product_price: "600",
      product_weight: "1 kg",
      product_final_price: "499",
      product_rating: "4.5",
      product_review: 250,
      isFavourite: true,
      product_quantity: 1,
      product_deliverytime: "10 Min",
      product_distance: "5 km",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
      product_highlight: [
        {
          highlightTitle: "Grain Size",
          highlightDesc: "250",
        },
        {
          highlightTitle: "Organic",
          highlightDesc: "No",
        },
        {
          highlightTitle: "Polished",
          highlightDesc: "Yes",
        },
        {
          highlightTitle: "Brand",
          highlightDesc: "India Gate",
        },
        {
          highlightTitle: "Fssai license ",
          highlightDesc: "250",
        },
      ],
      product_inStock: true,
      product_deliveryData: [
        {
          deliveryDataImage: images.productReturn,
          deliveryDataTitle: "3 day Return/ Exchange",
        },
        {
          deliveryDataImage: images.cashOnDelivery,
          deliveryDataTitle: "Cash on Delivery",
        },
        {
          deliveryDataImage: images.fastDelivery,
          deliveryDataTitle: "Fast Delivery",
        },
      ],
      height: 61.6,
      width: 42.3,
    },
    {
      mainCategoryTitle: "Groceries",
      subCategoryTitle: "Cooking Oil",
      product_imgMain: [
        {
          imgMain: images.oil,
        },
        {
          imgMain: images.oil,
        },
        {
          imgMain: images.oil,
        },
      ],
      product_img: images.oil,
      product_name: "Fortune Premium Mustard Oil",
      product_price: "600",
      product_weight: "500 ml",
      product_final_price: "499",
      product_rating: "4.5",
      isFavourite: false,
      product_quantity: 2,
      product_deliverytime: "10 Min",
      product_distance: "5 km",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
      product_highlight: [
        {
          highlightTitle: "Grain Size",
          highlightDesc: "250",
        },
        {
          highlightTitle: "Organic",
          highlightDesc: "No",
        },
        {
          highlightTitle: "Polished",
          highlightDesc: "Yes",
        },
        {
          highlightTitle: "Brand",
          highlightDesc: "India Gate",
        },
        {
          highlightTitle: "Fssai license ",
          highlightDesc: "250",
        },
      ],
      product_inStock: true,
      product_deliveryData: [
        {
          deliveryDataImage: images.productReturn,
          deliveryDataTitle: "3 day Return/ Exchange",
        },
        {
          deliveryDataImage: images.cashOnDelivery,
          deliveryDataTitle: "Cash on Delivery",
        },
        {
          deliveryDataImage: images.fastDelivery,
          deliveryDataTitle: "Fast Delivery",
        },
      ],
      height: 66,
      width: 47.52,
    },
  ]);

  const [deliverToName, setDeliverToName] = useState<string>("John");
  const [deliverToAddress, setDeliverToAddress] = useState<string>(
    "3465 Hanover Street, Locust Court Burbank New York, NY 10038"
  );
  const [approxDeliveryTime, setApproxDeliveryTime] =
    useState<string>("25 min");

  const [arrOrderDetails, setArrOrderDetails] = useState<OrderDetail[]>([
    {
      orderDetailTitle: getTranslation("itemTotal"),
      orderDetailValue: "2",
    },
    {
      orderDetailTitle: getTranslation("subTotal"),
      orderDetailValue: rupeeSymbol+"698",
    },
    {
      orderDetailTitle: getTranslation("tax"),
      orderDetailValue: rupeeSymbol+"34",
    },
    {
      orderDetailTitle: getTranslation("discount"),
      orderDetailValue: "-"+rupeeSymbol+"10.00",
    },
    {
      orderDetailTitle: getTranslation("delivery"),
      orderDetailValue: "Free",
    },
    {
      orderDetailTitle: getTranslation("paymentType"),
      orderDetailValue: "Cash on Delivery",
    },
  ]);

  const [totalPrice, setTotalPrice] = useState<string>("723");

  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const updated = [...arrOrderProduts];

    if (type === "add") {
      updated[index].product_quantity += 1;
    } else if (type === "remove") {
      if (updated[index].product_quantity > 1) {
        updated[index].product_quantity -= 1;
      } else {
        updated.splice(index, 1);
      }
    }

    setArrOrderProducts(updated);
  };

  const onChangeCouponCode = (text: string) => {
    setCouponCode(text.replace(/\s/g, ""));
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
    navigation.navigate(ScreenNames.manageAddress, { navigateFromCart: true });
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

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.cart}</Text>
      ),
    });
  }, []);

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
      handleQuantityChange={handleQuantityChange}
    />
  );
};

export default CartContainer;
