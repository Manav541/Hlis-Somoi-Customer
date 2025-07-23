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
        console.log("ADDRESS SELECTED IN CART SCREEN ===>", selectedAddress);

        const formatted = `${selectedAddress.building_details}, ${selectedAddress.address}, ${selectedAddress.description}`;
        setDeliverToAddress(formatted);
        setLocation_id(selectedAddress?.id);
      },
    });
  };

  const onPressPlaceOrder = (total_bill: string) => {
    if (deliverToAddress == "No default address found.") {
      flashMessageWarning("Please select address");
    } else {
      // handleCartListingApi();
      const isCodRestricted = cartDetails?.cart_details?.some(
        (item: any) => item?.product_data?.is_cod_available === false
      );
      console.log("isCodRestricted => ", isCodRestricted);

      navigation.navigate(ScreenNames.paymentMethod, {
        location_id: location_id,
        total_bill: total_bill,
        isCodRestricted: isCodRestricted,
        customer_details: {
          name: cartDetails?.name,
          email: cartDetails?.email,
          contact: cartDetails?.mobile_number,
        },
      });
    }
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
        const rawData = response.data as any;
        if (response.code === statusCodes.success) {
          setCartDetails(rawData);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          setCartDetails(null);
        } else if (response.code === statusCodes.cartQuantityNotFound) {
          setCartDetails(rawData);
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
              `ADDRESS LIST RESPONSE  ===>`,
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
    handleAddressListApi();
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
