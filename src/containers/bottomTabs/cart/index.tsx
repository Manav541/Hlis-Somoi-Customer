import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import CartComponent from "../../../components/bottomTabs/cart";
import { useFocusEffect } from "@react-navigation/native";
import { flashMessageWarning, rupeeSymbol } from "../../../constants/GConstant";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";
import {
  AddToCartDictData,
  ApplyCouponResponseData,
  CustomerDetails,
  GroceryProduct,
} from "../../../constants/interfaces";
import { constnatStyles } from "../../../constants/Styles";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";
import { MmkvManager } from "../../../constants/utils/MmkvManager";

const CartContainer = ({ navigation }: any) => {
  // API zustand store
  const cartListingApi = zustandStore.CartStore((state) => state.cartListing);
  const applyCouponCodeApi = zustandStore.CartStore(
    (state) => state.applyCouponCode
  );
  const removeCouponCodeApi = zustandStore.CartStore(
    (state) => state.removeCouponCode
  );
  const addressListApi = zustandStore.AddressStore(
    (state) => state.addressList
  );
  const updateCartQuantityApi = zustandStore.ProductListingStore(
    (state) => state.updateCartQuantity
  );
  const removeFromCartApi = zustandStore.ProductListingStore(
    (state) => state.removeFromCart
  );
  const decrementCartItemCount = zustandStore.CartItemCountStore(
    (state) => state.decrementCartItemCount
  );
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const current_date = new Date().toISOString().split("T")[0];
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
  const [cartDetails, setCartDetails] = useState<any>(null);
  const [deliverToName, setDeliverToName] = useState<string>("");
  const [deliverToAddress, setDeliverToAddress] = useState<string>("");
  const hasSelectedAddressRef = React.useRef(false);
  const [approxDeliveryTime, setApproxDeliveryTime] =
    useState<string>("25 mins");
  const [offerResponse, setOfferResponse] = useState<ApplyCouponResponseData>();
  const [location_id, setLocation_id] = useState<string>("");

  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const cartArray = [...cartDetails?.cart_details];
    const item = cartArray[index];

    const currentQty = Number(item.quantity) || 0;

    if (type === "add") {
      handleUpdateCartQuantityApi(
        item.product_id,
        currentQty + 1,
        index,
        cartArray,
        item.variation_id,
        item?.product_data?.is_variation
      );
    } else if (type === "remove") {
      if (currentQty > 1) {
        handleUpdateCartQuantityApi(
          item.product_id,
          currentQty - 1,
          index,
          cartArray,
          item.variation_id,
          item?.product_data?.is_variation
        );
      } else {
        handleRemoveFromCartApi(
          item.product_id,
          index,
          cartArray,
          item.variation_id,
          item?.product_data?.is_variation
        );
      }
    }
  };

  const onChangeCouponCode = (text: string) => {
    setCouponCode(text.replace(/\s/g, ""));
  };

  const onPressApplyCoupon = () => {
    if (couponCode === "") {
      flashMessageWarning(getTranslation("coupon_code_required"));
    } else {
      handleApplyCouponCodeApi(couponCode);
    }
  };

  const onPressRemoveCoupon = () => {
    setCouponCode("");
    handleRemoveCouponCodeApi();
  };

  const onPressChangeDeliveryAddress = () => {
    navigation.navigate(ScreenNames.manageAddress, {
      navigateFromCart: true,
      onSelectAddress: (selectedAddress: any) => {
        console.log("ADDRESS SELECTED IN CART SCREEN ===>", selectedAddress); // ✅ Log the full selected address

        const formatted = `${selectedAddress.building_details}, ${selectedAddress.address}, ${selectedAddress.description}`;
        setDeliverToAddress(formatted);
        setLocation_id(selectedAddress?.id);
        hasSelectedAddressRef.current = true;
      },
    });
  };

  const onPressPlaceOrder = (total_bill: string) => {
    navigation.navigate(ScreenNames.paymentMethod, {
      location_id: location_id,
      total_bill: total_bill,
    });
  };

  // ----------------------- API Calling -------------------------
  // handleCartListingApi
  const handleCartListingApi = async () => {
    const dictData = {};
    try {
      const response = await cartListingApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("CART LISTING RESPONSE===>", JSON.stringify(response));
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          setCartDetails(rawData);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          setCartDetails(null);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleApplyCouponCodeApi
  const handleApplyCouponCodeApi = async (offer_code: String) => {
    const dictData = {
      offer_code: offer_code,
      current_date: current_date,
    };
    try {
      const response = await applyCouponCodeApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "APPLY COUPON CODE RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          setIsApplyCoupon(true);
          setCouponCode("");
          setCartDetails(rawData);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleRemoveCouponCodeApi
  const handleRemoveCouponCodeApi = async () => {
    const dictData = {};
    try {
      const response = await removeCouponCodeApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "REMOVE COUPON CODE RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          setIsApplyCoupon(false);
          setCartDetails(rawData);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  // handleAddressListApi
  const handleAddressListApi = async () => {
    let page = 1;
    let foundDefault = false;

    try {
      while (!foundDefault) {
        const dictData = {
          page_no: page,
        };

        const response = await addressListApi(dictData, navigation);

        if (response !== undefined && response !== null) {
          __DEV__ &&
            console.log(
              `ADDRESS LIST RESPONSE (page ${page}) ===>`,
              JSON.stringify(response)
            );

          if (response.code === statusCodes.success) {
            const locationData = response.data;

            if (Array.isArray(locationData) && locationData.length > 0) {
              const defaultAddress = locationData.find(
                (item) => item.is_default === true
              );

              if (defaultAddress) {
                console.log("defaultAddress => ", defaultAddress);

                const formattedAddress = `${defaultAddress.building_details}, ${defaultAddress.address}, ${defaultAddress.description}`;
                setDeliverToAddress(formattedAddress);
                setLocation_id(defaultAddress?.id);
                foundDefault = true;
                break; // ✅ Stop pagination once found
              } else {
                page++; // ✅ Go to next page
              }
            } else {
              break; // ✅ No more pages
            }
          } else if (
            response.code === statusCodes.invaildOrFail ||
            response.code === statusCodes.emptyData
          ) {
            setDeliverToAddress("");
            break;
          }
        } else {
          break;
        }
      }

      if (!foundDefault) {
        setDeliverToAddress("No default address found.");
      }
    } catch (error) {
      __DEV__ && console.log("ADDRESS LIST API Error:", error);
    }
  };

  // handleUpdateCartQuantityApi
  const handleUpdateCartQuantityApi = async (
    product_id: string,
    quantity: number,
    index: number,
    cartArray: any[],
    variation_id?: string,
    is_variation?: boolean
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
      quantity: quantity,
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await updateCartQuantityApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "UPDATE CART QUANTITY RESPONSE===>",
            JSON.stringify(response)
          );

        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          // ✅ Update quantity only after success
          const updated = [...cartArray];
          updated[index].quantity = quantity;
          setCartDetails((prev: any) => ({
            ...prev,
            cart_details: updated,
          }));

          setCartDetails(rawData);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Update Cart API Error:", error);
    }
  };

  // handleRemoveFromCartApi
  const handleRemoveFromCartApi = async (
    product_id: string,
    index: number,
    cartArray: any[],
    variation_id?: string,
    is_variation?: boolean
  ) => {
    const dictData: AddToCartDictData = {
      product_id: product_id,
    };

    if (is_variation == true) {
      dictData.variation_id = variation_id;
    }

    try {
      const response = await removeFromCartApi(dictData, navigation);

      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "REMOVE FROM CART RESPONSE===>",
            JSON.stringify(response)
          );

        if (response.code === statusCodes.success) {
          const rawData = response.data as any;
          // ✅ Remove item only after success
          const updated = [...cartArray];
          updated.splice(index, 1);
          setCartDetails((prev: any) => ({
            ...prev,
            cart_details: updated,
          }));
          setCartDetails(rawData);
          decrementCartItemCount(1);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Remove From Cart API Error:", error);
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
          setCartDetails(null); // Empty cart for guest users
        } else {
          handleCartListingApi(); // Only call if not guest
          if (!hasSelectedAddressRef.current) {
            handleAddressListApi(); // Only call if not guest and address not selected
          }
        }
      });

      StatusBar.setBarStyle("dark-content");

      // Fetch customer data
      MmkvManager.getData(
        MmkvManager.Keys.customerDetails,
        (customerDetails) => {
          if (customerDetails) {
            const customerData = JSON.parse(customerDetails) as CustomerDetails;
            setDeliverToName(customerData.name);
          }
        }
      );

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
      cartDetails={cartDetails}
      couponCode={couponCode}
      isApplyCoupon={isApplyCoupon}
      onChangeCouponCode={onChangeCouponCode}
      onPressApplyCoupon={onPressApplyCoupon}
      onPressRemoveCoupon={onPressRemoveCoupon}
      arrOrderProduts={arrOrderProduts}
      deliverToName={deliverToName}
      deliverToAddress={deliverToAddress}
      approxDeliveryTime={approxDeliveryTime}
      onPressChangeDeliveryAddress={onPressChangeDeliveryAddress}
      onPressPlaceOrder={onPressPlaceOrder}
      handleQuantityChange={handleQuantityChange}
      offerResponse={offerResponse || ({} as ApplyCouponResponseData)}
    />
  );
};

export default CartContainer;
