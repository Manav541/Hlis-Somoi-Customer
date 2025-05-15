import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { colors } from "../../../constants/Colors";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import GlobalButton from "../../../global/GlobalButton";
import { fontsfamily } from "../../../constants/FontFamily";

interface PropsType {
  couponCode: string;
  isApplyCoupon: boolean;
  onChangeCouponCode: (text: string) => void;
  onPressApplyCoupon: () => void;
  onPressRemoveCoupon: () => void;
  arrOrderProduts: any[];
  deliverToName: string;
  deliverToAddress: string;
  approxDeliveryTime: string;
  arrOrderDetails: any[];
  totalPrice: string;
  onPressChangeDeliveryAddress: () => void;
  onPressPlaceOrder: () => void;
}

const CartComponent = (props: PropsType) => {
  const renderItemOrderProduct = (item: any, index: number) => {
    return (
      <View style={styles.vwOrderProductItem} key={index}>
        <View style={styles.vwProductImage}>
          <Image
            style={{ height: item?.height, width: item?.width }}
            source={item?.product_img}
          />
        </View>
        <View style={styles.vwOrderProductItemDetail}>
          <Text style={styles.lblProductName}>{item?.product_name}</Text>
          <View style={styles.vwProductPriceWeight}>
            <Text style={styles.lblProductPrice}>
              {item?.product_final_price}
            </Text>
            <Image style={styles.imgBlueDot} source={images.dotOrange} />
            <Text style={styles.lblProductWeight}>{item?.product_weight}</Text>
          </View>
        </View>
        <View style={styles.vwProductQuantity}>
          <TouchableOpacity activeOpacity={activityOpacity} hitSlop={hitSlop}>
            <Image
              style={styles.imgPlusMinus}
              source={images.minus}
              tintColor={colors.black35}
            />
          </TouchableOpacity>
          <Text style={styles.lblProductQuantity}>
            {item?.product_quantity}
          </Text>
          <TouchableOpacity activeOpacity={activityOpacity} hitSlop={hitSlop}>
            <Image
              style={styles.imgPlusMinus}
              source={images.add}
              tintColor={colors.black35}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItemOrderDetails = (item: any, index: number) => {
    return (
      <View style={styles.vwOrderDetailsItem} key={index}>
        <Text style={styles.lblOrderDetailsTitle}>
          {item?.orderDetailTitle}
        </Text>
        <Text style={styles.lblOrderDetailsValue}>
          {item?.orderDetailValue}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.vwMain}>
      <View style={styles.vwMainContent}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            overflow: "hidden",
          }}
        >
          <View style={styles.vwOfferDetail}>
            <Image style={styles.imgTickCircle} source={images.tickCircle} />
            <Text style={styles.lblOfferDetails}>
              <Text
                style={{
                  ...styles.lblOfferDetails,
                  color: colors.green4f,
                  fontFamily: fontsfamily.semibold,
                }}
              >
                Save $101
              </Text>{" "}
              including{" "}
              <Text
                style={{
                  ...styles.lblOfferDetails,
                  fontFamily: fontsfamily.semibold,
                }}
              >
                $5
              </Text>{" "}
              through free delivery!
            </Text>
          </View>
          <View style={styles.vwApplyCouponCode}>
            <Image
              style={styles.imgApplyCouponCode}
              source={images.discountIcon}
            />
            <Text style={styles.lbkApplyCouponCode}>
              {getTranslation("applyCouponCode")}
            </Text>
          </View>
          {/* Coupon Code */}
          {props?.isApplyCoupon ? (
            <View style={styles.vwRemoveCode}>
              <View style={styles.vwApplidCouponCodeDesc}>
                <Text style={styles.lblAppliedCouponCodeTitle}>
                  Coupon Flat-10 applied!
                </Text>
                <Text style={styles.lblAppliedCouponCodeDec}>
                  You saved{" "}
                  <Text
                    style={{
                      ...styles.lblAppliedCouponCodeDec,
                      color: colors.green86,
                    }}
                  >
                    $10
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
            {props?.arrOrderProduts?.map(renderItemOrderProduct)}
          </View>
          <View style={styles.vwDelivertoChange}>
            <Text style={styles.lblDeliverToName}>
              {getTranslation("deliverto") + " " + props?.deliverToName}
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

          <View style={styles.vwApproxTime}>
            <View style={styles.vwImgApproxTime}>
              <Image style={styles.imgBoy} source={images.boyRide} />
              <Text style={styles.lblApproxTime}>
                {getTranslation("approxDeliveryTime")}
              </Text>
            </View>
            <Text style={styles.lblApproxTimeValue}>
              {props?.approxDeliveryTime}
            </Text>
          </View>
          <View style={styles.vwOrderDetails}>
            <Text style={styles.lblOrderDetails}>
              {getTranslation("orderDetails")}
            </Text>
            <View style={styles.vwOrderDetailsItemMain}>
              <View style={{ gap: 11 }}>
                {props?.arrOrderDetails?.map(renderItemOrderDetails)}
              </View>
              <View style={styles.vwLine} />
              <View style={styles.vwTotal}>
                <Text style={styles.lblTotal}>{getTranslation("total")}</Text>
                <Text style={styles.lblTotal}>{props?.totalPrice}</Text>
              </View>
            </View>
          </View>
          {/* Place Order */}
          <View style={styles.vwPlaceOrder}>
            <GlobalButton
              isOrange
              title={getTranslation("placeOrder")}
              onPress={props?.onPressPlaceOrder}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CartComponent;
