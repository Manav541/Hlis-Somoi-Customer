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
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { AvailableOfferItem } from "../../constants/interfaces";

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
          <Text style={styles.lblOfferTitle}>{item?.title}</Text>
          <Text style={styles.lblOffer}>{item?.offer}</Text>
          <Text style={styles.lblOfferDesc}>
            {item?.offerDesc}{" "}
            <Text style={styles.lblOfferPrice}>{item?.offerPrice}</Text>
          </Text>
        </View>
        <View style={styles.vwOfferCodeValidity}>
          <TouchableOpacity
            style={styles.btnOfferCode}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={() => props.copyToClipboard(item?.offerCode)}
          >
            <Text style={styles.lblOfferCode}>{item?.offerCode}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.lblOfferValidity}>
              {getTranslation("validUntil")}
            </Text>
            <Text style={styles.lblOfferValidityDate}>
              {item?.offerValidity}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <FlatList
        data={props.arrAvailableOffers}
        contentContainerStyle={{ gap: 15 }}
        renderItem={renderAvailableOffers}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AvailableOffersComponent;
