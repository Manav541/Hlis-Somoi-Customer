import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { colors } from "../../../constants/Colors";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import GlobalButton from "../../../global/GlobalButton";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";
import {
  FilterDate,
  FilterOrderType,
  Order,
  OrderProduct,
} from "../../../constants/interfaces";

interface PropsType {
  arrOrderList: Order[];
  filterModal: boolean;
  selectOrderType: string;
  selectOrderDate: string;
  onPressFilter: () => void;
  closeFilterModal: () => void;
  arrFilterDate: FilterDate[];
  arrFilterOrderType: FilterOrderType[];
  handleSelectOrderType: (type: string) => void;
  handleSelectOrderDate: (date: string) => void;
  handleNavigateOrderSummary: (status: string) => void;
  onPressApply: () => void;
  onPressReset: () => void;
}

const statusColors: { [key: string]: string } = {
  Confirmed: colors.black35,
  Preparing: colors.black35,
  On_the_way: colors.black35,
  Delivered: colors.green4f,
  Returned: colors.green4f,
  Request_return: colors.orange1c,
  Request_exchange: colors.orange1c,
  Cancelled: colors.red2e,
};

const statusTexts: { [key: string]: string } = {
  Confirmed: "Your Order Confirmed",
  Preparing: "Your Order is Preparing",
  On_the_way: "Your Order is On The Way",
  Delivered: "Your Order Delivered",
  Request_return: "Requested for Returned",
  Request_exchange: "Requested for Exchange",
  Returned: "Your Order is Returned",
  Cancelled: "Your Order is Cancelled",
};

const MyOrdersComponent = (props: PropsType) => {
  const renderItemOrderList = ({
    item,
    index,
  }: {
    item: Order;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={activityOpacity}
        style={styles.btnOrderItems}
        onPress={() => {
          props.handleNavigateOrderSummary(item?.status);
        }}
      >
        {/* Oreder Number Total Price */}
        <View style={styles.vwOrderNumberHeader}>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={styles.lblOrderNumber}>
              {getTranslation("orderNumber")}
            </Text>
            <Text style={styles.lblOrderNumberValue}>{item.order_number}</Text>
          </View>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={styles.lblTotal}>{getTranslation("total")}</Text>
            <Text style={styles.lblTotalValue}>
              {rupeeSymbol + " " + item.total}
            </Text>
          </View>
        </View>

        {/* Order Item Details */}
        <View style={styles.vwWhiteBox}>
          <Text style={styles.lblItemLength}>
            {item.arrProduct?.length} items
          </Text>
          <View style={styles.vwProductlist}>
            {item.arrProduct?.map(
              (product: OrderProduct, productIndex: number) => (
                <View style={styles.vwProductData} key={productIndex}>
                  <View style={styles.vwLeftProductData}>
                    <View style={styles.vwProductImage}>
                      <Image
                        source={product.product_img}
                        style={{
                          height: product.height,
                          width: product.width,
                        }}
                        resizeMode="stretch"
                      />
                    </View>
                    <View style={styles.vwProductName}>
                      <Text style={styles.lblProductName}>
                        {product.product_name}
                      </Text>
                      <View style={styles.vwPrice}>
                        <Text style={styles.lblPrice}>
                          {rupeeSymbol + product.price}
                        </Text>
                        <View style={styles.vwDot} />
                        <Text style={styles.lblUnit}>{product.unit}</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.lblQuantity}>
                    QTY{" "}
                    <Text style={styles.lblQuantityCount}>
                      {product.quantity}
                    </Text>
                  </Text>
                </View>
              )
            )}
          </View>
          <View style={styles.vwStatusDate}>
            <View>
              <Text
                style={{
                  color: statusColors[item.status] || colors.black35,
                  fontSize: fontSize.size14,
                  fontFamily: fontsfamily.semibold,
                }}
              >
                {statusTexts[item.status] || "Status Unknown"}
              </Text>

              <Text style={styles.lblOrderDate}>on {item.date}</Text>
            </View>
            <Image
              source={images.rightarrowBlue}
              style={styles.imgArrowRight}
              tintColor={colors.black35}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
      <View style={styles.vwMainContainer}>
        <FlatList
          data={props.arrOrderList}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 20, gap: 12 }}
          keyExtractor={(item, index) =>
            item.order_number?.toString() ?? index.toString()
          }
          showsVerticalScrollIndicator={false}
          bounces={false}
          renderItem={renderItemOrderList}
        />
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={props?.filterModal}
        onRequestClose={props.closeFilterModal}
      >
        <StatusBar
          translucent={false}
          backgroundColor={colors.orange1c}
          barStyle={"dark-content"}
        />
        <View style={styles.vwFilterModal}>
          <View style={styles.vwFilterModalContainer}>
            <View style={styles.vwFilterClose}>
              <Text style={styles.lblFilter}>Filters</Text>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props.closeFilterModal}
              >
                <Image
                  source={images.closeSearch}
                  style={styles.imgClose}
                  tintColor={colors.orange1c}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.vwFilterData}>
              <Text style={styles.lblFilterOrderTypeDate}>
                {getTranslation("filterbyOrderType")}
              </Text>
              <View style={{ gap: 16.5 }}>
                {props.arrFilterOrderType?.map(
                  (item: FilterOrderType, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.btnArrItems}
                      activeOpacity={activityOpacity}
                      onPress={() => {
                        props.handleSelectOrderType(item.type);
                      }}
                    >
                      <Image
                        style={styles.imgRadioButton}
                        source={
                          props.selectOrderType == item.type
                            ? images.radioButtonSelected
                            : images.radioButtonUnSelected
                        }
                        resizeMode="stretch"
                      />
                      <Text style={styles.lblRadioLabel}>{item.type}</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            <View style={{ ...styles.vwFilterData, marginBottom: 30 }}>
              <Text style={styles.lblFilterOrderTypeDate}>
                {getTranslation("filterbyOrderDate")}
              </Text>
              <View style={{ gap: 16.5 }}>
                {props.arrFilterDate?.map((item: FilterDate, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.btnArrItems}
                    activeOpacity={activityOpacity}
                    onPress={() => {
                      props.handleSelectOrderDate(item.date);
                    }}
                  >
                    <Image
                      style={styles.imgRadioButton}
                      source={
                        props.selectOrderDate == item.date
                          ? images.radioButtonSelected
                          : images.radioButtonUnSelected
                      }
                      resizeMode="stretch"
                    />
                    <Text style={styles.lblRadioLabel}>{item.date}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.vwApplyResetButton}>
              <GlobalButton
                title={getTranslation("apply")}
                isOrange
                flex={1}
                onPress={props?.onPressApply}
              />
              <GlobalButton
                title={getTranslation("reset")}
                isTransparentWithBorder
                flex={1}
                onPress={props?.onPressReset}
              />
            </View>

            {/* <GlobalButton title={getTranslation('apply')} isOrange flex={1}/>
                 <GlobalButton title={getTranslation('reset')} isTransparentWithBorder flex={1}/> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyOrdersComponent;
