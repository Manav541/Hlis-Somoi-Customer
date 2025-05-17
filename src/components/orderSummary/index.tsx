import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";

interface PropsType {
  orderNumber: string;
  orderPlacedDate: string;
  orderPlacedTime: string;
  totalAmount: string;
  delivertoName: string;
  delivertoAddress: string;
  arrOrderStatus: any[];
  arrProducts: any[];
  arrOrderDetails: any[];
  onPressCancelOrder: () => void;
  currentStatus: string;
  cancelDisabled: boolean;
  driverProfile: any;
  driverName: string;
}

const OrderSummaryComponent = (props: PropsType) => {
  const totalItems = props?.arrProducts?.length;
  const renderItemOrderStatus = (item: any, index: number) => {
    return (
      <View style={styles.vwOrderStatusItem} key={index}>
        <View
          style={[
            styles.line,
            {
              backgroundColor: item?.status_isdone
                ? colors.orange1c
                : colors.greya7,
              // hide the line for the very last item
              opacity: index === props?.arrOrderStatus.length - 1 ? 0 : 1,
            },
          ]}
        />
        <Image
          style={styles.imgOrderStatusIcon}
          source={item?.status_isdone ? item?.status_icon : item?.status_icon1}
        />
        <View>
          <Text
            style={{
              ...styles.lblOrderStatusTitle,
              color: item?.status_isdone ? colors.white : colors.greya7,
            }}
          >
            {item?.status_title}
          </Text>
          {item?.status_isdone && (
            <Text style={styles.lblOrderStatusDate}>
              on{" "}
              {DateFormatsManager.formatDate(
                item?.status_date,
                DateFormatsManager.DateFormats.DMMM_COMMA_YYYY,
                DateFormatsManager.DateFormats.DDMMYYYY_SLASH
              )}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderItemProducts = (item: any, index: number) => {
    return (
      <View style={styles.vwProductsItems} key={index}>
        <View style={styles.vwProductImage}>
          <Image
            style={{ height: item?.height, width: item?.width }}
            source={item?.product_img}
          />
        </View>
        <View style={styles.vwProductItemDetails}>
          <View style={{ flex: 1 }}>
            <Text style={styles.lblProductName}>{item?.product_name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.lblProductPrice}>
                  {item?.product_price}
                </Text>
                <Image
                  style={styles.imgDot}
                  source={images.dotOrange}
                  tintColor={colors.blue4e}
                />
                <Text style={styles.lblProductWeight}>
                  {item?.product_weight}
                </Text>
              </View>
              <Text style={styles.lblQuantity}>
                {getTranslation("qty") + " "}
                <Text style={styles.lblQuantityCount}>
                  {item?.product_quantity}
                </Text>
              </Text>
            </View>
            {props?.currentStatus === "Order Delivered" && (
              <TouchableOpacity
                style={{
                  ...styles.btnRateReview,
                  width: item?.isRateReview ? 48.2 : 99,
                }}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
              >
                {item?.isRateReview ?
                <View style={{flexDirection : 'row',alignItems : 'center'}}>
                  <Image style={styles.imgStar} source={images.star}/>
                  <Text style={styles.lblRateReview}>{item?.product_rating}</Text>
                </View> : <Text style={styles.lblRateReview}>
                  {getTranslation("rateReview")}
                </Text> }
                
              </TouchableOpacity>
            )}
          </View>
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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Number Date Time Total Amount */}
        <View style={styles.vwOrderNumDateTimeTotal}>
          <View>
            <Text style={styles.lblOrderNumber}>
              {getTranslation("orderNumber")}
            </Text>
            <Text style={styles.lblOrderNumberValue}>{props?.orderNumber}</Text>
            <Text style={styles.lblOrderDateTime}>
              {props?.orderPlacedDate} | {props?.orderPlacedTime}
            </Text>
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Text style={styles.lblTotal}>{getTranslation("total")}</Text>
            <Text style={styles.lblTotalAmount}>{props?.totalAmount}</Text>
          </View>
        </View>

        {/* Order Status */}
        <View style={styles.vwOrderStatusMain}>
          <Text style={styles.lblYourOrderisConfirmed}>
            {getTranslation("yourOrderisConfirmed")}
          </Text>
          <View>{props?.arrOrderStatus.map(renderItemOrderStatus)}</View>
        </View>
        <View style={styles.vwLine} />

        {/* Products */}
        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Text style={styles.lblItemsAdded}>
            {totalItems + " " + getTranslation("itemsadded")}
          </Text>
          <View style={{ gap: 10 }}>
            {props?.arrProducts.map(renderItemProducts)}
          </View>
        </View>
        <View style={styles.vwLine} />
        <Text style={styles.lblDelivertoName}>
          {getTranslation("deliverto") + " " + props?.delivertoName}
        </Text>
        <Text style={styles.lblDelivertoAddress}>
          {props?.delivertoAddress}
        </Text>

        {/* Cancel Order & Return Oreder */}
        {props?.currentStatus === "Order Delivered" ? (
          <TouchableOpacity
            style={{ ...styles.btnReportIssue, marginBottom: 10 }}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
          >
            <Image style={styles.imgReportIssue} source={images.reportIssue} />
            <View>
              <Text style={styles.lblReportIssueQue}>
                {getTranslation("requestforReturnQue")}
              </Text>
              <Text style={styles.lblReportIssueDesc}>
                {getTranslation("requestforReturnDesc")}
              </Text>
            </View>
            <Image
              style={styles.imgRightArrowGrey}
              source={images.rightArrowGrey}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnCancelOrder}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.onPressCancelOrder}
          >
            <Image style={styles.imgCancel} source={images.orderCancel} />
            <View>
              <Text style={styles.lblCancelOrderQue}>
                {getTranslation("cancelOrderQue")}
              </Text>
              <Text style={styles.lblCancelOrderReason}>
                {getTranslation("cancelOrderReason")}
              </Text>
              {!props?.cancelDisabled && (
                <Text style={styles.lblCancelOrderTime}>
                  {getTranslation("cancelOrderTime")}
                </Text>
              )}
            </View>
            <Image
              style={styles.imgRightArrowGrey}
              source={images.rightArrowGrey}
            />
          </TouchableOpacity>
        )}

        {/* Report Issue */}
        <TouchableOpacity
          style={styles.btnReportIssue}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
        >
          <Image style={styles.imgReportIssue} source={images.reportIssue} />
          <View>
            <Text style={styles.lblReportIssueQue}>
              {getTranslation("reportIssueQue")}
            </Text>
            <Text style={styles.lblReportIssueDesc}>
              {getTranslation("reportIssueDesc")}
            </Text>
          </View>
          <Image
            style={styles.imgRightArrowGrey}
            source={images.rightArrowGrey}
          />
        </TouchableOpacity>

        {/* Driver Details */}
        {(props?.currentStatus === "On The Way" ||
          props?.currentStatus === "Order Delivered") && (
          <View>
            <Text style={styles.lblDriverInfo}>
              {getTranslation("driverInfo")}
            </Text>

            <View
              style={
                props?.currentStatus === "Order Delivered"
                  ? styles.vwDriverDetails1
                  : styles.vwDriverDetails
              }
            >
              {/* Driver photo */}
              <Image
                style={styles.imgDriverProfile}
                source={props?.driverProfile}
              />

              {/* Name + (optionally) actions */}
              <View>
                <Text style={styles.lblDriverName}>{props?.driverName}</Text>

                {/* 👉 Hide this row after delivery */}
                {props?.currentStatus !== "Order Delivered" && (
                  <View style={styles.vwTrackCallChat}>
                    <TouchableOpacity
                      style={styles.btnTrack}
                      activeOpacity={activityOpacity}
                      hitSlop={hitSlop}
                    >
                      <Image
                        style={styles.imgTrackIcon}
                        source={images.trackIcon}
                      />
                      <Text style={styles.lblTrack}>
                        {getTranslation("track")}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={activityOpacity}
                      hitSlop={hitSlop}
                    >
                      <Image
                        style={styles.imgChatCall}
                        source={images.callIcon}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={activityOpacity}
                      hitSlop={hitSlop}
                    >
                      <Image
                        style={styles.imgChatCall}
                        source={images.chatIcon}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <Image
                style={styles.imgRightArrowGrey}
                source={images.rightArrowGrey}
              />
            </View>
          </View>
        )}

        {/* Order Details */}
        <View style={styles.vwOrderDetails}>
          <Text style={styles.lblOrderDetails}>
            {getTranslation("orderDetails")}
          </Text>
          <View style={styles.vwOrderDetailsItemMain}>
            <View style={{ gap: 11 }}>
              {props?.arrOrderDetails?.map(renderItemOrderDetails)}
            </View>
            <View style={styles.vwLineFull} />
            <View style={styles.vwTotal}>
              <Text style={styles.lblTotalBold}>{getTranslation("total")}</Text>
              <Text style={styles.lblTotalBold}>{props?.totalAmount}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderSummaryComponent;
