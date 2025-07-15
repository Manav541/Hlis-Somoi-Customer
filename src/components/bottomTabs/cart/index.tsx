import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { colors } from "../../../constants/Colors";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../../constants/GConstant";
import GlobalButton from "../../../global/GlobalButton";
import { fontsfamily } from "../../../constants/FontFamily";
import {
  ApplyCouponResponseData,
  GroceryProduct,
} from "../../../constants/interfaces";
import FastImage from "react-native-fast-image";

interface PropsType {
  cartDetails: any;
  couponCode: string;
  isApplyCoupon: boolean;
  onChangeCouponCode: (text: string) => void;
  onPressApplyCoupon: () => void;
  onPressRemoveCoupon: () => void;
  arrOrderProduts: GroceryProduct[];
  deliverToName: string;
  deliverToAddress: string;
  approxDeliveryTime: string;
  onPressChangeDeliveryAddress: () => void;
  onPressPlaceOrder: (total_bill: string) => void;
  handleQuantityChange: (index: number, type: "add" | "remove") => void;
  offerResponse: ApplyCouponResponseData;
}

const CartComponent = (props: PropsType) => {
  const renderItemOrderProduct = (item: any, index: number) => {
    return (
      <View style={styles.vwOrderProductItem} key={index}>
        <View style={styles.vwProductImage}>
          <FastImage
            style={{ height: 61.6, width: 42.3 }}
            source={{ uri: item?.product_data?.image }}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.vwOrderProductItemDetail}>
          <Text style={styles.lblProductName}>{item?.product_data?.name}</Text>
          <View style={styles.vwProductPriceWeight}>
            <Text style={styles.lblProductPrice}>
              {rupeeSymbol + item?.per_product_price}
            </Text>
            {item?.product_data?.variation_data && (
              <>
                <Image
                  style={styles.imgBlueDot}
                  source={images.dotOrange}
                  resizeMode="stretch"
                  tintColor={colors.blue4e}
                />
                <Text style={styles.lblProductWeight}>
                  {item?.product_data?.is_variation &&
                  !item?.product_data?.is_color &&
                  !item?.product_data?.is_size
                    ? `${item?.product_data?.variation_data?.amount} ${item?.product_data?.variation_data?.unit}`
                    : item?.product_data?.is_color &&
                      !item?.product_data?.is_size &&
                      item?.product_data?.is_variation
                    ? item?.product_data?.variation_data?.name ||
                      item?.product_data?.variation_data?.color_name
                    : item?.product_data?.is_size &&
                      !item?.product_data?.is_color &&
                      item?.product_data?.is_variation
                    ? item?.product_data?.variation_data?.size
                    : item?.product_data?.is_color &&
                      item?.product_data?.is_size &&
                      !item?.product_data?.is_variation
                    ? `${item?.product_data?.variation_data?.size} - ${
                        item?.product_data?.variation_data?.name ||
                        item?.product_data?.variation_data?.color_name
                      }`
                    : item?.product_data?.is_variation &&
                      item?.product_data?.is_color &&
                      item?.product_data?.is_size
                    ? `${item?.product_data?.variation_data?.size} - ${
                        item?.product_data?.variation_data?.color_name
                      }`
                    : ""}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.vwProductQuantity}>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => props?.handleQuantityChange(index, "remove")}
          >
            <Image
              style={styles.imgPlusMinus}
              source={images.minus}
              tintColor={colors.black35}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          <Text style={styles.lblProductQuantity}>{item?.quantity}</Text>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => props?.handleQuantityChange(index, "add")}
          >
            <Image
              style={styles.imgPlusMinus}
              source={images.add}
              tintColor={colors.black35}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Empty Cart
  if (!props?.cartDetails) {
    return (
      <View style={styles.vwMainEmpty}>
        <StatusBar
          translucent={false}
          backgroundColor={colors.orange1c}
          barStyle={"dark-content"}
        />
        <Text style={styles.lblEmptyCart}>
          {getTranslation("yourCartIsEmpty")}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
        barStyle={"dark-content"}
      />
      <View style={styles.vwMainContent}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            overflow: "hidden",
          }}
        >
          {/* <View style={styles.vwOfferDetail}>
            <Image
              style={styles.imgTickCircle}
              source={images.tickCircle}
              resizeMode="stretch"
            />
            <Text style={styles.lblOfferDetails}>
              <Text
                style={{
                  ...styles.lblOfferDetails,
                  color: colors.green4f,
                  fontFamily: fontsfamily.semibold,
                }}
              >
                Save {rupeeSymbol}101
              </Text>{" "}
              including{" "}
              <Text
                style={{
                  ...styles.lblOfferDetails,
                  fontFamily: fontsfamily.semibold,
                }}
              >
                {rupeeSymbol}5
              </Text>{" "}
              through free delivery!
            </Text>
          </View> */}
          {/* Coupon Code */}
          <View style={styles.vwApplyCouponCode}>
            <Image
              style={styles.imgApplyCouponCode}
              source={images.discountIcon}
              resizeMode="stretch"
            />
            <Text style={styles.lbkApplyCouponCode}>
              {getTranslation("applyCouponCode")}
            </Text>
          </View>
          {/* Coupon Code Apply */}
          {props?.cartDetails?.is_offer_applied == true ? (
            <View style={styles.vwRemoveCode}>
              <View style={styles.vwApplidCouponCodeDesc}>
                <Text style={styles.lblAppliedCouponCodeTitle}>
                  Coupon{" "}
                  {props?.cartDetails?.offer_data?.type == "flat"
                    ? "Flat"
                    : "Extra" +
                      "-" +
                      parseInt(
                        props?.cartDetails?.offer_data?.discount_percentage
                      ).toFixed()}
                  {props?.cartDetails?.offer_data?.type == "percentage" && "%"}{" "}
                  applied!
                </Text>
                <Text style={styles.lblAppliedCouponCodeDec}>
                  You saved{" "}
                  <Text
                    style={{
                      ...styles.lblAppliedCouponCodeDec,
                      color: colors.green86,
                    }}
                  >
                    {rupeeSymbol +
                      parseInt(props?.cartDetails?.discount_price).toFixed()}
                  </Text>{" "}
                  on your order.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnRemove}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressRemoveCoupon}
              >
                <Text style={styles.lblRemove}>{getTranslation("remove")}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.vwCoponCodeInputApplyButton}>
              <View style={styles.vwCoponCodeInputApply}>
                <TextInput
                  style={styles.txtInputCouponCode}
                  placeholder={getTranslation("enterCouponCode") || ""}
                  placeholderTextColor={colors.greya7}
                  value={props?.couponCode}
                  selectionColor={colors.blue4e}
                  onChangeText={props?.onChangeCouponCode}
                  keyboardType="default"
                  autoCapitalize="characters"
                />
              </View>
              <TouchableOpacity
                style={styles.btnApplyCouponCode}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressApplyCoupon}
              >
                <Text style={styles.lblApply}>{getTranslation("apply")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Order Product Listing */}
          <View style={styles.vwArrOrderProducts}>
            {props?.cartDetails?.cart_details?.map(renderItemOrderProduct)}
          </View>

          {/* Delivert To Name */}
          <View style={styles.vwDelivertoChange}>
            <Text style={styles.lblDeliverToName}>
              {getTranslation("deliverto1") + " " + props?.deliverToName}
            </Text>
            <TouchableOpacity
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={props?.onPressChangeDeliveryAddress}
            >
              <Text style={styles.lblChange}>{getTranslation("change")}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.lblDeliverToAddress}>
            {props?.deliverToAddress}
          </Text>

          {/* Order Details */}
          <View style={styles.vwOrderDetails}>
            <Text style={styles.lblOrderDetails}>
              {getTranslation("orderDetails")}
            </Text>
            <View style={styles.vwOrderDetailsItemMain}>
              <View style={{ gap: 11 }}>
                {/* Item Total */}
                <View style={styles.vwOrderDetailsItem}>
                  <Text style={styles.lblOrderDetailsTitle}>Item total</Text>
                  <Text style={styles.lblOrderDetailsValue}>
                    {props?.cartDetails?.total_quantity}
                  </Text>
                </View>

                {/* Sub Total */}
                <View style={styles.vwOrderDetailsItem}>
                  <Text style={styles.lblOrderDetailsTitle}>Sub Total</Text>
                  <Text style={styles.lblOrderDetailsValue}>
                    {rupeeSymbol + " " + props?.cartDetails?.total_amount}
                  </Text>
                </View>

                {/* Discount */}
                <View style={styles.vwOrderDetailsItem}>
                  <Text style={styles.lblOrderDetailsTitle}>Discount</Text>
                  <Text style={styles.lblOrderDetailsValue}>
                    -{rupeeSymbol + props?.cartDetails?.discount_price}
                  </Text>
                </View>

                {/* Delivery */}
                <View style={styles.vwOrderDetailsItem}>
                  <Text style={styles.lblOrderDetailsTitle}>Delivery</Text>
                  <Text style={styles.lblOrderDetailsValue}>
                    {props?.cartDetails?.delivery_charges === "0.00"
                      ? "Free"
                      : rupeeSymbol + props?.cartDetails?.delivery_charges}
                  </Text>
                </View>

                {/* Payment Type */}
                <View style={styles.vwOrderDetailsItem}>
                  <Text style={styles.lblOrderDetailsTitle}>Payment Type</Text>
                  <Text style={styles.lblOrderDetailsValue}>
                    {props?.cartDetails?.payment_type == "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </Text>
                </View>

                {/* {props?.arrOrderDetails?.map(renderItemOrderDetails)} */}
              </View>
              <View style={styles.vwLine} />
              <View style={styles.vwTotal}>
                <Text style={styles.lblTotal}>{getTranslation("total")}</Text>
                <Text style={styles.lblTotal}>
                  {rupeeSymbol + " " + props?.cartDetails?.total_bill}
                </Text>
              </View>
            </View>
          </View>
          {/* Place Order */}
          <View style={styles.vwPlaceOrder}>
            <GlobalButton
              isOrange
              title={getTranslation("placeOrder")}
              onPress={() => {
                props?.onPressPlaceOrder(props?.cartDetails?.total_bill);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CartComponent;
