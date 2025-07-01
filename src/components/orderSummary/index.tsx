import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ImageSourcePropType,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import { images } from "../../constants/Images";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
  statusTexts,
} from "../../constants/GConstant";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GlobalButton from "../../global/GlobalButton";
import { constnatStyles } from "../../constants/Styles";
import {
  OrderDetail,
  OrderDetailsData,
  OrderItem,
  OrderProduct,
  StatusTimeline,
} from "../../constants/interfaces";
import FastImage from "react-native-fast-image";

interface PropsType {
  orderDetails: OrderDetailsData;
  arrProducts: OrderItem[];
  cancelledDate: string;
  rejectedDate: string;
  arrOrderStatus: StatusTimeline[];
  onPressCancelOrder: () => void;
  cancelDisabled: boolean;
  driverProfile: ImageSourcePropType;
  onPressTrackDriver: () => void;
  onPressChatDriver: () => void;
  onPressCallDriver: () => void;
  onPressReturnOrder: () => void;
  onPressRateReview: (prodcutDetail: OrderItem) => void;
  ratingData: OrderItem;
  isEditReviewModalVisible: boolean;
  onPressOpenEditReview: (item: OrderItem) => void;
  onPressCloseEditReviewModal: () => void;
  onPressEditReview: (prodcutDetail: OrderItem) => void;
  onPressDeleteReview: (rating_id: string) => void;
  onPressReportIssue: () => void;
}

const OrderSummaryComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const rating = 4;

  const renderItemOrderStatus = (item: StatusTimeline, index: number) => {
    return (
      <View style={styles.vwOrderStatusItem} key={index}>
        <View
          style={[
            styles.line,
            {
              backgroundColor: item?.is_active
                ? colors.orange1c
                : colors.greya7,
              // hide the line for the very last item
              opacity: index === props?.arrOrderStatus.length - 1 ? 0 : 1,
            },
          ]}
        />
        <Image
          style={styles.imgOrderStatusIcon}
          source={item?.is_active ? item?.status_icon : item?.status_icon1}
          resizeMode="stretch"
        />
        <View>
          <Text
            style={{
              ...styles.lblOrderStatusTitle,
              color: item?.is_active ? colors.white : colors.greya7,
            }}
          >
            {item?.status}
          </Text>
          {item?.is_active && (
            <Text style={styles.lblOrderStatusDate}>
              <Text>{"on "}</Text>
              <Text>
                {DateFormatsManager.formatDate(
                  item?.created_at,
                  DateFormatsManager.DateFormats.ddMMMYYYY
                )}
              </Text>
              {(props?.orderDetails?.status === "Request_return" ||
                props?.orderDetails?.status === "Request_exchange") &&
                index === props?.arrOrderStatus.length - 1 && (
                  <Text>- {item?.time ?? ""}</Text>
                )}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderItemProducts = (item: OrderItem, index: number) => {
    return (
      <View style={styles.vwProductsItems} key={index}>
        <View style={styles.vwProductImage}>
          <FastImage
            style={{
              height: 61.6,
              width: 42.3,
            }}
            source={{ uri: item?.image_url }}
          />
        </View>
        <View style={styles.vwProductItemDetails}>
          <Text style={styles.lblProductName}>{item?.name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.lblProductPrice}>
                {rupeeSymbol + item?.price}
              </Text>
              <Image
                style={styles.imgDot}
                source={images.dotOrange}
                tintColor={colors.blue4e}
                resizeMode="stretch"
              />
              <Text style={styles.lblProductWeight}>{item?.unit}</Text>
            </View>
            <Text style={styles.lblQuantity}>
              <Text>{getTranslation("qty")}</Text>{" "}
              <Text style={styles.lblQuantityCount}>{item?.quantity}</Text>
            </Text>
          </View>
          {(props?.orderDetails?.status === "Order Cancelled" ||
            props?.orderDetails?.status === "Request_return" ||
            props?.orderDetails?.status === "Request_exchange" ||
            props?.orderDetails?.status === "Order Returned" ||
            props?.orderDetails?.status === "Order Delivered") && (
            <TouchableOpacity
              style={{
                ...styles.btnRateReview,
                width: item?.is_rated ? 48.2 : 99,
              }}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={() => {
                item?.is_rated
                  ? props?.onPressOpenEditReview(item)
                  : props?.onPressRateReview(item);
              }}
            >
              {item?.is_rated ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Image
                    style={styles.imgStar}
                    source={images.star}
                    resizeMode="stretch"
                  />
                  <Text style={styles.lblRateReview}>
                    {item?.rating_summary?.rating}
                  </Text>
                </View>
              ) : (
                <Text style={styles.lblRateReview}>
                  {getTranslation("rateReview")}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
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
            <Text style={styles.lblOrderNumberValue}>
              {props?.orderDetails?.order_number}
            </Text>
            <Text style={styles.lblOrderDateTime}>
              <Text>
                {DateFormatsManager.formatDate(
                  props?.orderDetails?.placed_on_date,
                  DateFormatsManager.DateFormats.DDMMYYYY_SLASH
                )}
              </Text>
              <Text>{" | "}</Text>
              <Text>
                {DateFormatsManager.formatDate(
                  props?.orderDetails?.placed_on_time,
                  DateFormatsManager.TimeFormats.hhmma
                )}
              </Text>
            </Text>
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Text style={styles.lblTotal}>{getTranslation("total")}</Text>
            <Text style={styles.lblTotalAmount}>
              {rupeeSymbol + " " + props?.orderDetails?.total_bill}
            </Text>
          </View>
        </View>

        {/* Order Status */}
        <View style={styles.vwOrderStatusMain}>
          <Text
            style={{
              ...styles.lblYourOrderisConfirmed,
              color:
                props?.orderDetails?.status === "Order Cancelled" ||
                props?.orderDetails?.status === "Order Rejected" ||
                props?.orderDetails?.status === "Order Replacement Requested"
                  ? colors.red2e
                  : colors.white,
            }}
          >
            {props?.orderDetails?.status === "Order Replacement Requested" ? (
              <Text>{getTranslation("requestReturn")}</Text>
            ) : props?.orderDetails?.status === "Request_exchange" ? (
              <Text>{getTranslation("requestExchange")}</Text>
            ) : (
              <Text>
                <Text>
                  {statusTexts[props?.orderDetails?.status] || "Status Unknown"}
                </Text>
              </Text>
            )}
          </Text>

          {/* Cancel Oreder View */}
          {props?.orderDetails?.status === "Order Cancelled" ||
          props?.orderDetails?.status === "Order Rejected" ? (
            <View style={styles.vwCancelledOrder}>
              <Image
                style={styles.imgCancel}
                source={images.orderCancel}
                resizeMode="stretch"
              />
              <View style={{ gap: 5, flex: 1 }}>
                <Text style={{ ...styles.lblReportIssueQue, marginBottom: 0 }}>
                  {props?.orderDetails?.status}
                </Text>
                <Text style={styles.lblOrderStatusDate}>
                  <Text>{"On "}</Text>
                  <Text>
                    {props?.orderDetails?.status === "Order Cancelled"
                      ? DateFormatsManager.formatDate(
                          props?.cancelledDate,
                          DateFormatsManager.DateFormats.ddMMMYYYY
                        )
                      : DateFormatsManager.formatDate(
                          props?.rejectedDate,
                          DateFormatsManager.DateFormats.ddMMMYYYY
                        )}
                  </Text>
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lblReportIssueDesc}>
                    {props?.orderDetails?.status === "Order Cancelled"
                      ? props?.orderDetails?.cancel_reason
                      : props?.orderDetails?.reject_reason}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              {props?.arrOrderStatus.map(renderItemOrderStatus)}
              {props?.orderDetails?.status === "Order Returned" && (
                <View style={styles.vwOrderReturned}>
                  <Image
                    style={styles.imgReportIssue}
                    source={images.returnIcon}
                    resizeMode="stretch"
                  />
                  <View style={{ flex: 1, marginRight: 15 }}>
                    <Text style={styles.lblReportIssueQue}>
                      {props?.orderDetails?.status}
                    </Text>
                    <Text style={styles.lblReportIssueDesc}>
                      {props?.orderDetails?.return_reason}
                    </Text>
                    <Text style={styles.lblRefundDesc}>
                      {getTranslation("refundDesc")}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.vwLine} />

        {/* Products */}
        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          {Array.isArray(props?.arrProducts) && (
            <>
              <Text style={styles.lblItemsAdded}>
                {props?.orderDetails?.total_quantity + " "}
                {props?.orderDetails?.total_quantity == "1"
                  ? getTranslation("itemadded")
                  : getTranslation("itemsadded")}
              </Text>
              <View style={{ gap: 10 }}>
                {props?.arrProducts.map(renderItemProducts)}
              </View>
            </>
          )}
        </View>
        <View style={styles.vwLine} />

        {/* Deliver To name Address */}
        <Text style={styles.lblDelivertoName}>
          <Text>{getTranslation("deliverto")}</Text>
          <Text> </Text>
          <Text>{props?.orderDetails?.delivery_details?.name}</Text>
        </Text>
        <Text style={styles.lblDelivertoAddress}>
          {props?.orderDetails?.delivery_details?.address}
        </Text>

        {props?.orderDetails?.status !== "Order Cancelled" && (
          <>
            {/* Cancel Order & Return Oreder */}
            {props?.orderDetails?.status === "Order Delivered" ? (
              <TouchableOpacity
                style={{ ...styles.btnReportIssue, marginBottom: 10 }}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressReturnOrder}
              >
                <Image
                  style={styles.imgReportIssue}
                  source={images.returnIcon}
                  resizeMode="stretch"
                />
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
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ) : !props?.cancelDisabled ? (
              <TouchableOpacity
                style={styles.btnCancelOrder}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressCancelOrder}
              >
                <Image
                  style={styles.imgCancel}
                  source={images.orderCancel}
                  resizeMode="stretch"
                />
                <View>
                  <Text style={styles.lblCancelOrderQue}>
                    {getTranslation("cancelOrderQue")}
                  </Text>
                  <Text style={styles.lblCancelOrderReason}>
                    {getTranslation("cancelOrderReason")}
                  </Text>
                  <Text style={styles.lblCancelOrderTime}>
                    {getTranslation("cancelOrderTime")}
                  </Text>
                </View>
                <Image
                  style={styles.imgRightArrowGrey}
                  source={images.rightArrowGrey}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ) : null}

            {/* Report Issue */}
            {props?.orderDetails?.status !== "Order Cancelled" &&
              props?.orderDetails?.status !== "Order Returned" && (
                <TouchableOpacity
                  style={styles.btnReportIssue}
                  activeOpacity={activityOpacity}
                  hitSlop={hitSlop}
                  onPress={props?.onPressReportIssue}
                >
                  <Image
                    style={styles.imgReportIssue}
                    source={images.reportIssue}
                    resizeMode="stretch"
                  />
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
                    resizeMode="stretch"
                  />
                </TouchableOpacity>
              )}

            {/* Driver Details */}
            {(props?.orderDetails?.status == "Order Out for Delivery" ||
              props?.orderDetails?.status == "Order Delivered") && (
              <View>
                <Text style={styles.lblDriverInfo}>
                  {getTranslation("driverInfo")}
                </Text>
                <View
                  style={
                    props?.orderDetails?.status === "Order Delivered"
                      ? styles.vwDriverDetails1
                      : styles.vwDriverDetails
                  }
                >
                  {/* Driver photo */}
                  <FastImage
                    style={styles.imgDriverProfile}
                    source={{ uri: props?.orderDetails?.driver_details?.image }}
                    resizeMode="stretch"
                  />

                  {/* Name + (optionally) actions */}
                  <View>
                    <Text style={styles.lblDriverName}>
                      {props?.orderDetails?.driver_details?.name}
                    </Text>

                    {/* 👉 Hide this row after delivery */}
                    {!(props?.orderDetails?.status === "Order Delivered") && (
                      <View style={styles.vwTrackCallChat}>
                        <TouchableOpacity
                          style={styles.btnTrack}
                          activeOpacity={activityOpacity}
                          hitSlop={hitSlop}
                          onPress={props?.onPressTrackDriver}
                        >
                          <Image
                            style={styles.imgTrackIcon}
                            source={images.trackIcon}
                            resizeMode="stretch"
                          />
                          <Text style={styles.lblTrack}>
                            {getTranslation("track")}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={activityOpacity}
                          hitSlop={hitSlop}
                          onPress={props?.onPressCallDriver}
                        >
                          <Image
                            style={styles.imgChatCall}
                            source={images.callIcon}
                            resizeMode="stretch"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={activityOpacity}
                          hitSlop={hitSlop}
                          onPress={props?.onPressChatDriver}
                        >
                          <Image
                            style={styles.imgChatCall}
                            source={images.chatIcon}
                            resizeMode="stretch"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </>
        )}

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
                  {props?.orderDetails?.total_quantity}
                </Text>
              </View>

              {/* Sub Total */}
              <View style={styles.vwOrderDetailsItem}>
                <Text style={styles.lblOrderDetailsTitle}>Sub Total</Text>
                <Text style={styles.lblOrderDetailsValue}>
                  {rupeeSymbol + " " + props?.orderDetails?.total_amount}
                </Text>
              </View>

              {/* Discount */}
              <View style={styles.vwOrderDetailsItem}>
                <Text style={styles.lblOrderDetailsTitle}>Discount</Text>
                <Text style={styles.lblOrderDetailsValue}>
                  -{rupeeSymbol + props?.orderDetails?.discount_price}
                </Text>
              </View>

              {/* Delivery */}
              <View style={styles.vwOrderDetailsItem}>
                <Text style={styles.lblOrderDetailsTitle}>Delivery</Text>
                <Text style={styles.lblOrderDetailsValue}>
                  {props?.orderDetails?.delivery_charges === "0.00"
                    ? "Free"
                    : rupeeSymbol + props?.orderDetails?.delivery_charges}
                </Text>
              </View>

              {/* Payment Type */}
              <View style={styles.vwOrderDetailsItem}>
                <Text style={styles.lblOrderDetailsTitle}>Payment Type</Text>
                <Text style={styles.lblOrderDetailsValue}>
                  {props?.orderDetails?.payment_type == "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </Text>
              </View>

              {/* {props?.arrOrderDetails?.map(renderItemOrderDetails)} */}
            </View>
            <View style={styles.vwLineFull} />
            <View style={styles.vwTotal}>
              <Text style={styles.lblTotalBold}>{getTranslation("total")}</Text>
              <Text style={styles.lblTotalBold}>
                {rupeeSymbol + " " + props?.orderDetails?.total_bill}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={props?.isEditReviewModalVisible}
        transparent
        animationType="fade"
        onRequestClose={props?.onPressCloseEditReviewModal}
      >
        <StatusBar
          translucent
          backgroundColor={colors.black50}
          barStyle={"dark-content"}
        />
        <TouchableWithoutFeedback onPress={props?.onPressCloseEditReviewModal}>
          <View style={styles.vwFilterModal}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  ...styles.vwFilterModalContainer,
                  paddingBottom: PlatformVersion.isIOS
                    ? insets.bottom + 20
                    : 20,
                }}
              >
                <Text style={styles.lblYourReview}>
                  {getTranslation("yourReview")}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  {[1, 2, 3, 4, 5].map((item: number, index: number) => (
                    <Image
                      key={index}
                      style={styles.imgStarModal}
                      source={
                        Number(item) <=
                        Number(props?.ratingData?.rating_summary?.rating)
                          ? images.starFilled
                          : images.starEmpty
                      }
                      resizeMode="stretch"
                    />
                  ))}
                </View>
                <Text style={styles.lblReviewDesc}>
                  {props?.ratingData?.rating_summary?.review}
                </Text>
                <View style={styles.vwEditDeleteReview}>
                  <GlobalButton
                    isOrange
                    title={getTranslation("edit")}
                    flex={1}
                    onPress={() => {
                      props?.onPressEditReview(props?.ratingData);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.btnDelete}
                    activeOpacity={activityOpacity}
                    hitSlop={hitSlop}
                    onPress={() => {
                      const ratingId =
                        props?.ratingData?.rating_summary?.rating_id;
                      if (ratingId) {
                        props.onPressDeleteReview(ratingId);
                      }
                    }}
                  >
                    <Image
                      style={constnatStyles.img24}
                      source={images.delete1}
                      resizeMode="stretch"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default OrderSummaryComponent;
