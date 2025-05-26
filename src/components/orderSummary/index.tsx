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
} from "../../constants/GConstant";
import { PlatformVersion } from "../../constants/utils/Platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GlobalButton from "../../global/GlobalButton";
import { constnatStyles } from "../../constants/Styles";
import {
  OrderDetail,
  OrderReviewProduct,
  OrderStatus,
} from "../../constants/interfaces";

interface PropsType {
  orderNumber: string;
  orderPlacedDate: string;
  orderPlacedTime: string;
  totalAmount: string;
  delivertoName: string;
  delivertoAddress: string;
  arrOrderStatus: OrderStatus[];
  arrProducts: OrderReviewProduct[];
  arrOrderDetails: OrderDetail[];
  onPressCancelOrder: () => void;
  currentStatus: string;
  cancelDisabled: boolean;
  driverProfile: ImageSourcePropType;
  driverName: string;
  onPressTrackDriver: () => void;
  onPressChatDriver: () => void;
  onPressCallDriver: () => void;
  orderMainStatus: string;
  cancelReason: string;
  cancelOrderDate: string;
  onPressReturnOrder: () => void;
  onPressRateReview: (item: OrderReviewProduct) => void;
  isEditReviewModalVisible: boolean;
  onPressOpenEditReview: () => void;
  onPressCloseEditReviewModal: () => void;
  onPressEditReview: () => void;
  onPressDeleteReview: () => void;
  onPressReportIssue: () => void;
  status_title: string;
}

const OrderSummaryComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const rating = 4;
  const totalItems = props?.arrProducts?.length;
  const renderItemOrderStatus = (item: OrderStatus, index: number) => {
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
          resizeMode="stretch"
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
              <Text>{"on "}</Text>
              <Text>
                {DateFormatsManager.formatDate(
                  item?.status_date,
                  DateFormatsManager.DateFormats.ddMMMYYYY,
                  DateFormatsManager.DateFormats.DDMMYYYY_SLASH
                )}
              </Text>
              {props?.orderMainStatus === "Request_return" ||
                (props?.orderMainStatus === "Request_exchange" &&
                  index === props?.arrOrderStatus.length - 1 && (
                    <Text>- {item?.status_time ?? ""}</Text>
                  ))}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderItemProducts = (item: OrderReviewProduct, index: number) => {
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
                  {rupeeSymbol + item?.product_price}
                </Text>
                <Image
                  style={styles.imgDot}
                  source={images.dotOrange}
                  tintColor={colors.blue4e}
                  resizeMode="stretch"
                />
                <Text style={styles.lblProductWeight}>
                  {item?.product_weight}
                </Text>
              </View>
              <Text style={styles.lblQuantity}>
                <Text>{getTranslation("qty")}</Text>{" "}
                <Text style={styles.lblQuantityCount}>
                  {item?.product_quantity}
                </Text>
              </Text>
            </View>
            {(props?.currentStatus === "Order Delivered" ||
              props?.orderMainStatus === "Cancelled" ||
              props?.orderMainStatus === "Request_return" ||
              props?.orderMainStatus === "Request_exchange" ||
              props?.orderMainStatus === "Returned" ||
              props?.orderMainStatus === "Delivered") && (
              <TouchableOpacity
                style={{
                  ...styles.btnRateReview,
                  width: item?.isRateReview ? 48.2 : 99,
                }}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={() => {
                  item?.isRateReview
                    ? props?.onPressOpenEditReview()
                    : props?.onPressRateReview(item);
                }}
              >
                {item?.isRateReview ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Image style={styles.imgStar} source={images.star} resizeMode="stretch"/>
                    <Text style={styles.lblRateReview}>
                      {item?.product_rating}
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
      </View>
    );
  };

  const renderItemOrderDetails = (item: OrderDetail, index: number) => {
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
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
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
            <Text style={styles.lblOrderNumberValue}>{props?.orderNumber}</Text>
            <Text style={styles.lblOrderDateTime}>
              <Text>{props?.orderPlacedDate}</Text>
              <Text>{" | "}</Text>
              <Text>{props?.orderPlacedTime}</Text>
            </Text>
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Text style={styles.lblTotal}>{getTranslation("total")}</Text>
            <Text style={styles.lblTotalAmount}>
              {rupeeSymbol + " " + props?.totalAmount}
            </Text>
          </View>
        </View>

        {/* Order Status */}
        <View style={styles.vwOrderStatusMain}>
          <Text
            style={{
              ...styles.lblYourOrderisConfirmed,
              color:
                props?.orderMainStatus === "Cancelled" ||
                props?.orderMainStatus === "Request_return" ||
                props?.orderMainStatus === "Request_exchange"
                  ? colors.red2e
                  : colors.white,
            }}
          >
            {props?.orderMainStatus === "Request_return" ? (
              <Text>{getTranslation("requestReturn")}</Text>
            ) : props?.orderMainStatus === "Request_exchange" ? (
              <Text>{getTranslation("requestExchange")}</Text>
            ) : (
              <Text>
                <Text>{getTranslation("yourOrderis")}</Text>
                <Text>{props?.status_title}</Text>
              </Text>
            )}
          </Text>
          {props?.orderMainStatus === "Cancelled" ? (
            <View style={styles.vwCancelledOrder}>
              <Image style={styles.imgCancel} source={images.orderCancel} resizeMode="stretch"/>
              <View style={{ gap: 5, flex: 1 }}>
                <Text style={{ ...styles.lblReportIssueQue, marginBottom: 0 }}>
                  {getTranslation("orderCancelled")}
                </Text>
                <Text style={styles.lblOrderStatusDate}>
                  <Text>{"On "}</Text>
                  <Text>
                    {DateFormatsManager.formatDate(
                      props?.cancelOrderDate,
                      DateFormatsManager.DateFormats.ddMMMYYYY,
                      DateFormatsManager.DateFormats.DDMMYYYY_SLASH
                    )}
                  </Text>
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.lblReportIssueDesc}>
                    {props?.cancelReason}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View>
              {props?.arrOrderStatus.map(renderItemOrderStatus)}
              {props?.orderMainStatus === "Returned" && (
                <View style={styles.vwOrderReturned}>
                  <Image
                    style={styles.imgReportIssue}
                    source={images.returnIcon}
                    resizeMode="stretch"
                  />
                  <View style={{ flex: 1, marginRight: 15 }}>
                    <Text style={styles.lblReportIssueQue}>
                      {getTranslation("orderReturned")}
                    </Text>
                    <Text style={styles.lblReportIssueDesc}>
                      {getTranslation("returnReason")}
                    </Text>
                    <Text style={styles.lblRefundDesc}>
                      {getTranslation("refundDesc")}
                    </Text>
                  </View>
                  <Image
                    style={styles.imgRightArrowGrey}
                    source={images.rightArrowGrey}
                    resizeMode="stretch"
                  />
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.vwLine} />

        {/* Products */}
        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <Text style={styles.lblItemsAdded}>
            <Text>{totalItems}</Text>
            <Text> </Text>
            <Text>{getTranslation("itemsadded")}</Text>
          </Text>
          <View style={{ gap: 10 }}>
            {props?.arrProducts.map(renderItemProducts)}
          </View>
        </View>
        <View style={styles.vwLine} />

        {/* Deliver To name Address */}
        <Text style={styles.lblDelivertoName}>
          <Text>{getTranslation("deliverto")}</Text>
          <Text> </Text>
          <Text>{props?.delivertoName}</Text>
        </Text>
        <Text style={styles.lblDelivertoAddress}>
          {props?.delivertoAddress}
        </Text>

        {props?.orderMainStatus !== "Cancelled" && (
          <>
            {/* Cancel Order & Return Oreder */}
            {props?.currentStatus === "Order Delivered" ||
            props?.orderMainStatus === "Delivered" ? (
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
            ) : !props?.cancelDisabled &&
              props?.orderMainStatus === "Confirmed" ? (
              <TouchableOpacity
                style={styles.btnCancelOrder}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.onPressCancelOrder}
              >
                <Image style={styles.imgCancel} source={images.orderCancel} resizeMode="stretch" />
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
            {props?.orderMainStatus !== "Request_return" &&
              props?.orderMainStatus !== "Request_exchange" &&
              props?.orderMainStatus !== "Returned" && (
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
            {(props?.currentStatus === "On The Way" ||
              props?.currentStatus === "Order Delivered" ||
              props?.orderMainStatus === "Delivered" ||
              props?.orderMainStatus === "On_the_way") && (
              <View>
                <Text style={styles.lblDriverInfo}>
                  {getTranslation("driverInfo")}
                </Text>

                <View
                  style={
                    props?.currentStatus === "Order Delivered" ||
                    props?.orderMainStatus === "Delivered"
                      ? styles.vwDriverDetails1
                      : styles.vwDriverDetails
                  }
                >
                  {/* Driver photo */}
                  <Image
                    style={styles.imgDriverProfile}
                    source={props?.driverProfile}
                    resizeMode="stretch"
                  />

                  {/* Name + (optionally) actions */}
                  <View>
                    <Text style={styles.lblDriverName}>
                      {props?.driverName}
                    </Text>

                    {/* 👉 Hide this row after delivery */}
                    {!(
                      props?.currentStatus === "Order Delivered" ||
                      props?.orderMainStatus === "Delivered"
                    ) && (
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

                  <Image
                    style={styles.imgRightArrowGrey}
                    source={images.rightArrowGrey}
                    resizeMode="stretch"
                  />
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
              {props?.arrOrderDetails?.map(renderItemOrderDetails)}
            </View>
            <View style={styles.vwLineFull} />
            <View style={styles.vwTotal}>
              <Text style={styles.lblTotalBold}>{getTranslation("total")}</Text>
              <Text style={styles.lblTotalBold}>
                {rupeeSymbol + " " + props?.totalAmount}
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
                        item <= rating ? images.starFilled : images.starEmpty
                      }
                      resizeMode="stretch"
                    />
                  ))}
                </View>
                <Text style={styles.lblReviewDesc}>
                  {getTranslation("reviewDesc")}
                </Text>
                <View style={styles.vwEditDeleteReview}>
                  <GlobalButton
                    isOrange
                    title={getTranslation("edit")}
                    flex={1}
                    onPress={props?.onPressEditReview}
                  />
                  <TouchableOpacity
                    style={styles.btnDelete}
                    activeOpacity={activityOpacity}
                    hitSlop={hitSlop}
                    onPress={props?.onPressDeleteReview}
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
