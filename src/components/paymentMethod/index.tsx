import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StatusBar,
} from "react-native";
import React from "react";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { styles } from "./styles";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { colors } from "../../constants/Colors";
import GlobalButton from "../../global/GlobalButton";
import GlobalSuccessModal from "../../global/GlobalSuccessModal";
import { CardDetails } from "../../constants/interfaces";

interface PropsType {
  onPressAddNewCard: () => void;
  arrCards: CardDetails[];
  total_bill: string;
  onPressPlaceOrder: () => void;
  isCodSelected: boolean;
  onPressSelectPaymentType: (type: string) => void;
  onPressCardSelect: (index: number) => void;
  isSuccessModalVisible: boolean;
  orderNumber: string;
  onPressTrackOrder: () => void;
  onPressContinueShopping: () => void;
  payment_type: string;
  isCodRestricted: boolean;
}

const PaymentMethodComponent = (props: PropsType) => {
  const renderItemCard = (item: CardDetails, index: number) => {
    return (
      <TouchableOpacity
        style={styles.btnCard}
        key={index}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props?.onPressCardSelect(index)}
      >
        <View>
          <Image
            style={
              item?.card_type == "visa"
                ? styles.imgCardTypeVisa
                : styles.imgCardTypeMaster
            }
            source={
              item?.card_type == "visa"
                ? images.visaIcon1
                : images.mastercardIcon1
            }
            resizeMode="stretch"
          />
          <Text style={styles.lblCardNumber}>
            <Text style={{ letterSpacing: 4 }}>•••• ••••</Text>{" "}
            {item?.card_number?.slice(-4)}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Image
            style={styles.imgCheckBox}
            source={
              item?.isSelected
                ? images.blueFillCheckbox
                : images.emptyBlackCheckBox
            }
          />
          <Text style={styles.lblCardExpiryDate}>{item?.card_expirydate}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
        barStyle={"dark-content"}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.lblPaymentMethodDesc}>
          {getTranslation("paymentMethodsDesc")}
        </Text>
        <Text style={styles.lblPaymentMethods}>
          {getTranslation("paymentMethods")}
        </Text>
        {/* razor pay */}
        <TouchableOpacity
          style={[styles.btnCOD, { marginBottom: 15 }]}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => props?.onPressSelectPaymentType("card")}
        >
          <View style={styles.vwCOD}>
            <Image
              style={styles.imgCOD}
              source={images.onlinePayment}
              resizeMode="stretch"
            />
            <Text style={styles.lblCOD}>{getTranslation("onlinePayment")}</Text>
          </View>
          <Image
            style={styles.imgCheckBox}
            source={
              props?.payment_type == "card"
                ? images.blueFillCheckbox
                : images.emptyBlackCheckBox
            }
            resizeMode="stretch"
          />
        </TouchableOpacity>

        {/* cash on delivery */}
        {!props?.isCodRestricted && (
          <TouchableOpacity
            style={styles.btnCOD}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => props?.onPressSelectPaymentType("cod")}
          >
            <View style={styles.vwCOD}>
              <Image
                style={styles.imgCOD}
                source={images.codLogo}
                resizeMode="stretch"
              />
              <Text style={styles.lblCOD}>
                {getTranslation("cashonDelivery")}
              </Text>
            </View>
            <Image
              style={styles.imgCheckBox}
              source={
                props?.payment_type == "cod"
                  ? images.blueFillCheckbox
                  : images.emptyBlackCheckBox
              }
              resizeMode="stretch"
            />
          </TouchableOpacity>
        )}

        {/* Card */}
        {/* <Text style={styles.lblCreditOrDebit}>
          {getTranslation("creditorDebitCard")}
        </Text>
        <TouchableOpacity
          style={styles.btnAddNewCard}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={props?.onPressAddNewCard}
        >
          <Image
            style={styles.imgAdd}
            source={images.add}
            resizeMode="stretch"
          />
          <Text style={styles.lblAddNewCard}>
            {getTranslation("addNewCard")}
          </Text>
        </TouchableOpacity>
        <View style={{ gap: 16, marginHorizontal: 20 }}>
          {props?.arrCards.map(renderItemCard)}
        </View> */}
      </ScrollView>
      <View style={{ gap: 15 }}>
        <View style={styles.vwLine} />
        <View style={styles.vwTotal}>
          <Text style={styles.lblTotalAmount}>
            {getTranslation("totalAmount")}
          </Text>
          <Text style={styles.lblTotalAmountValue}>
            {rupeeSymbol + " " + props?.total_bill}
          </Text>
        </View>
        {/* Place Order */}
        <View style={styles.vwPlaceOrder}>
          <GlobalButton
            isOrange
            title={getTranslation("placeOrder")}
            onPress={props?.onPressPlaceOrder}
          />
        </View>
      </View>

      {/* Success Modal */}
      <GlobalSuccessModal
        visible={props?.isSuccessModalVisible}
        btnTitle={getTranslation("trackOrder")}
        secondBtnTitle={getTranslation("continueShopping")}
        isContinueShopping
        title1={getTranslation("success")}
        title={getTranslation("yourOrderisPlaced")}
        subTitle={getTranslation("orderSuccessMSG")}
        onPress={props?.onPressTrackOrder}
        onPressSecondBtn={props?.onPressContinueShopping}
      />
    </View>
  );
};

export default PaymentMethodComponent;
