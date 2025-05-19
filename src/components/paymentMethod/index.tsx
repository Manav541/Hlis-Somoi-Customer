import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React from "react";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { styles } from "./styles";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { colors } from "../../constants/Colors";
import GlobalButton from "../../global/GlobalButton";
import GlobalSuccessModal from "../../global/GlobalSuccessModal";
import { CardDetails } from "../../constants/utils/interfaces";

interface PropsType {
  onPressAddNewCard: () => void;
  arrCards: CardDetails[];
  total: string;
  onPressPlaceOrder: () => void;
  isCodSelected: boolean;
  onPressCodSelect: () => void;
  onPressCardSelect: (index: number) => void;
  isSuccessModalVisible: boolean;
  orderNumber: string;
  onPressTrackOrder:()=>void;
  onPressContinueShopping:()=>void;
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
          />
          <Text style={styles.lblCardNumber}>
            <Text style={{ letterSpacing: 4 }}>•••• ••••</Text>{" "}
            {item?.card_number?.slice(-4)}
          </Text>
        </View>
        <View>
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
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Text style={styles.lblPaymentMethodDesc}>
          {getTranslation("paymentMethodsDesc")}
        </Text>
        <Text style={styles.lblPaymentMethods}>
          {getTranslation("paymentMethods")}
        </Text>
        {/* Google pay */}
        <TouchableOpacity
          style={styles.btnGPay}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
        >
          <Image style={styles.imgGpay} source={images.gPayLogo} />
        </TouchableOpacity>

        {/* cash on delivery */}
        <TouchableOpacity
          style={styles.btnCOD}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={props?.onPressCodSelect}
        >
          <View style={styles.vwCOD}>
            <Image style={styles.imgCOD} source={images.codLogo} />
            <Text style={styles.lblCOD}>
              {getTranslation("cashonDelivery")}
            </Text>
          </View>
          <Image
            style={styles.imgCheckBox}
            source={
              props?.isCodSelected
                ? images.blueFillCheckbox
                : images.emptyBlackCheckBox
            }
          />
        </TouchableOpacity>

        {/* Card */}
        <Text style={styles.lblCreditOrDebit}>
          {getTranslation("creditorDebitCard")}
        </Text>
        <TouchableOpacity
          style={styles.btnAddNewCard}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={props?.onPressAddNewCard}
        >
          <Image style={styles.imgAdd} source={images.add} />
          <Text style={styles.lblAddNewCard}>
            {getTranslation("addNewCard")}
          </Text>
        </TouchableOpacity>
        <View style={{ gap: 16, marginHorizontal: 20 }}>
          {props?.arrCards.map(renderItemCard)}
        </View>
      </ScrollView>
      <View style={{ gap: 15 }}>
        <View style={styles.vwLine} />
        <View style={styles.vwTotal}>
          <Text style={styles.lblTotalAmount}>
            {getTranslation("totalAmount")}
          </Text>
          <Text style={styles.lblTotalAmountValue}>{props?.total}</Text>
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
      btnTitle={getTranslation('trackOrder')}
      secondBtnTitle={getTranslation('continueShopping')}
      isContinueShopping
      title1={getTranslation('success')}
      title={getTranslation('yourOrderisPlaced')}
      subTitle={getTranslation('orderSuccessMSG')}
      onPress={props?.onPressTrackOrder}
      onPressSecondBtn={props?.onPressContinueShopping}
      orderNumber={props?.orderNumber}
       />
    </View>
  );
};

export default PaymentMethodComponent;
