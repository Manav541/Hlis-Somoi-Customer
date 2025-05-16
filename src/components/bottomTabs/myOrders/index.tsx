import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { colors } from "../../../constants/Colors";
import { activityOpacity, hitSlop, rupeeSymbol } from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import GlobalButton from "../../../global/GlobalButton";
import { fontSize } from "../../../constants/FontSizes";
import { fontsfamily } from "../../../constants/FontFamily";

interface PropsType {
  arrOrderList: any[];
  filterModal: boolean;
  selectOrderType: number;
  selectOrderDate: number;
  onPressFilter: () => void;
  closeFilterModal: () => void;
  arrFilterDate: any;
  arrFilterOrderType: any;
  handleSelectOrderType: (index: number) => void;
  handleSelectOrderDate: (index: number) => void;
  handleNavigateOrderSummary: () => void;
  onPressApply: () => void;
  onPressReset: () => void;
}

const statusColors: { [key: string]: string } = {
  Confirm: colors.black35,
  Delivered: colors.green4f,
  Order_return: colors.green4f,
  Request_return: colors.orange1c,
  Canceled: colors.red2e,
};

const statusTexts: { [key: string]: string } = {
  Confirm: "Your Order Confirmed",
  Delivered: "Your Order Delivered",
  Request_return: "Requested for Returned",
  Order_return: "Your Order is Returned",
  Canceled: "Your Order is Cancelled",
};

const MyOrdersComponent = (props: PropsType) => {
  const renderItemOrderList = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={activityOpacity}
        style={styles.btnOrderItems}
        onPress={()=>{
          props.handleNavigateOrderSummary()
        }}
        >
          {/* Oreder Number Total Price */}
        <View style={styles.vwOrderNumberHeader}>
          <View style={{justifyContent : 'space-between'}}>
            <Text style={styles.lblOrderNumber}>{getTranslation('orderNumber')}</Text>
            <Text style={styles.lblOrderNumberValue}>
              {item.order_number}
            </Text>
          </View>
          <View style={{justifyContent : 'space-between'}}>
            <Text style={styles.lblTotal}>{getTranslation('total')}</Text>
            <Text style={styles.lblTotalValue}>{item.total}</Text>
          </View>
        </View>

        {/* Order Item Details */}
        <View style={styles.vwWhiteBox}>
          <Text style={styles.lblItemLength}>
            {item.arrProduct?.length} items
          </Text>
          <View style={styles.vwProductlist}>
            {item.arrProduct?.map((product: any, productIndex: any) => (
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
                        {product.price}
                      </Text>
                      <View style={styles.vwDot} />
                      <Text style={styles.lblUnit}>{product.unit}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.lblQuantity}>
                  QTY{' '}
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
                }}>
                {statusTexts[item.status] || 'Status Unknown'}
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
    )
  }
  return (
    <View style={styles.vwMain}>
      <View style={styles.vwMainContainer}>

      <FlatList
          data={props.arrOrderList}
          contentContainerStyle={{ paddingTop: 20,paddingBottom : 20, gap : 12}}
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
                />
              </TouchableOpacity>
            </View>

            <View style={styles.vwFilterData}>
              <Text style={styles.lblFilterOrderTypeDate}>
                {getTranslation("filterbyOrderType")}
              </Text>
              <View style={{ gap: 16.5 }}>
                {props.arrFilterOrderType?.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.btnArrItems}
                    activeOpacity={activityOpacity}
                    onPress={() => {
                      props.handleSelectOrderType(index);
                    }}
                  >
                    <Image
                      style={styles.imgRadioButton}
                      source={
                        props.selectOrderType == index
                          ? images.radioButtonSelected
                          : images.radioButtonUnSelected
                      }
                    />
                    <Text style={styles.lblRadioLabel}>{item.type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ ...styles.vwFilterData, marginBottom: 30 }}>
              <Text style={styles.lblFilterOrderTypeDate}>
                {getTranslation("filterbyOrderDate")}
              </Text>
              <View style={{ gap: 16.5 }}>
                {props.arrFilterDate?.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.btnArrItems}
                    activeOpacity={activityOpacity}
                    onPress={() => {
                      props.handleSelectOrderDate(index);
                    }}
                  >
                    <Image
                      style={styles.imgRadioButton}
                      source={
                        props.selectOrderDate == index
                          ? images.radioButtonSelected
                          : images.radioButtonUnSelected
                      }
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
