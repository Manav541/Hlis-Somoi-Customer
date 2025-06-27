import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import {
  activityOpacity,
  hitSlop,
  rupeeSymbol,
} from "../../constants/GConstant";
import { AvailableOfferItem } from "../../constants/interfaces";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrAvailableOffers: AvailableOfferItem[];
  copyToClipboard: (offerCode: string) => void;
}

const AvailableOffersComponent = (props: PropsType) => {
  const renderAvailableOffers = ({
    item,
    index,
  }: {
    item: AvailableOfferItem;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnOffersData}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
      >
        <View style={{ gap: 4 }}>
          <Text style={styles.lblOfferTitle}>{item?.name}</Text>
          <Text style={styles.lblOffer}>
            {item?.type == "flat"
              ? "Flat"
              : "Extra" +
                " " +
                parseInt(item?.discount_percentage) +
                (item?.type === "flat" ? rupeeSymbol : "%") +
                " Off"}
          </Text>
          <Text style={styles.lblOfferDesc}>
            {item?.description}{" "}
            {/* <Text style={styles.lblOfferPrice}>
              {rupeeSymbol + item?.minimum_price}
            </Text> */}
          </Text>
        </View>
        <View style={styles.vwOfferCodeValidity}>
          <TouchableOpacity
            style={styles.btnOfferCode}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => props.copyToClipboard(item?.coupon_code)}
          >
            <Text style={styles.lblOfferCode}>{item?.coupon_code}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.lblOfferValidity}>
              {getTranslation("validUntil")}
            </Text>
            <Text style={styles.lblOfferValidityDate}>
              {DateFormatsManager.formatDate(
                item?.end_date,
                DateFormatsManager.DateFormats.DDMMYYYY_SLASH
              )}
            </Text>
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
      <FlatList
        data={props.arrAvailableOffers}
        contentContainerStyle={{
          gap: 15,
          flexGrow: 1,
          justifyContent:
            props.arrAvailableOffers.length === 0 ? "center" : undefined,
          alignItems:
            props.arrAvailableOffers.length === 0 ? "center" : undefined,
        }}
        renderItem={renderAvailableOffers}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.lblNoData}>{getTranslation("noDataFound")}</Text>
        }
      />
    </View>
  );
};

export default AvailableOffersComponent;
