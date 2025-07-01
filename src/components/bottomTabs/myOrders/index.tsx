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
  statusColors,
  statusTexts,
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
import { DateFormatsManager } from "../../../constants/utils/DateFormats";

interface PropsType {
  arrOrderList: any[];
  filterModal: boolean;
  selectOrderType: string;
  selectOrderDate: string;
  onPressFilter: () => void;
  closeFilterModal: () => void;
  arrFilterDate: FilterDate[];
  arrFilterOrderType: FilterOrderType[];
  handleSelectOrderType: (value: string) => void;
  handleSelectOrderDate: (value: string) => void;
  handleNavigateOrderSummary: (order_id: string) => void;
  onPressApply: () => void;
  onPressReset: () => void;
  // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
}

const MyOrdersComponent = (props: PropsType) => {
  const renderItemOrderList = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={activityOpacity}
        style={styles.btnOrderItems}
        onPress={() => {
          props.handleNavigateOrderSummary(item?.order_id);
        }}
      >
        {/* Oreder Number Total Price */}
        <View style={styles.vwOrderNumberHeader}>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={styles.lblOrderNumber}>
              {getTranslation("orderNumber")}
            </Text>
            <Text style={styles.lblOrderNumberValue}>#{item.order_number}</Text>
          </View>
          <View style={{ justifyContent: "space-between" }}>
            <Text style={styles.lblTotal}>{getTranslation("total")}</Text>
            <Text style={styles.lblTotalValue}>
              {rupeeSymbol + " " + parseFloat(item?.total_price).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Order Item Details */}
        <View style={styles.vwWhiteBox}>
          <Text style={styles.lblItemLength}>{item.items?.length} items</Text>
          <View style={styles.vwProductlist}>
            {item.items?.map((product: any, productIndex: number) => (
              <View style={styles.vwProductData} key={productIndex}>
                <View style={styles.vwLeftProductData}>
                  <View style={styles.vwProductImage}>
                    <Image
                      source={{ uri: product.image }}
                      style={{
                        height: 40.74,
                        width: 27.98,
                      }}
                      resizeMode="stretch"
                    />
                  </View>
                  <View style={styles.vwProductName}>
                    <Text style={styles.lblProductName}>{product.name}</Text>
                    <View style={styles.vwPrice}>
                      <Text style={styles.lblPrice}>
                        {rupeeSymbol + parseFloat(product.price).toFixed(2)}
                      </Text>
                      {product?.weight && (
                        <>
                          <View style={styles.vwDot} />
                          <Text style={styles.lblUnit}>{product.weight}</Text>
                        </>
                      )}
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
            ))}
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

              <Text style={styles.lblOrderDate}>
                on{" "}
                {DateFormatsManager.formatDate(
                  item?.date,
                  DateFormatsManager.DateFormats.ddMMMYYYY
                )}
              </Text>
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
      {props?.arrOrderList.length > 0 ? (
        <View style={styles.vwMainContainer}>
          <FlatList
            data={props.arrOrderList}
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: 20,
              gap: 12,
            }}
            keyExtractor={(item, index) =>
              item.order_number?.toString() ?? index.toString()
            }
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={renderItemOrderList}
            onEndReached={() => {
              if (props.canLoadMore && props.hasMountedOnce.current) {
                props.loadMoreCategories();
              }
            }}
            onEndReachedThreshold={0.4}
            onContentSizeChange={(w, h) => {
              props.setCanLoadMore(h > 600); // Adjust if needed
              props.hasMountedOnce.current = true;
            }}
          />
        </View>
      ) : (
        <View style={styles.vwMainEmpty}>
          <Text style={styles.lblEmptyCart}>{getTranslation("noOrder")}</Text>
        </View>
      )}

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
                        props.handleSelectOrderType(item?.value);
                      }}
                    >
                      <Image
                        style={styles.imgRadioButton}
                        source={
                          props.selectOrderType == item?.value
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
                      props.handleSelectOrderDate(item?.value);
                    }}
                  >
                    <Image
                      style={styles.imgRadioButton}
                      source={
                        props.selectOrderDate == item?.value
                          ? images.radioButtonSelected
                          : images.radioButtonUnSelected
                      }
                      resizeMode="stretch"
                    />
                    <Text style={styles.lblRadioLabel}>{item?.date}</Text>
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
