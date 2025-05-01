import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity } from "../../constants/GConstant";

interface PropsType {
  arrAvailableOffers: any;
}

const AvailableOffersComponent = (props: PropsType) => {
  const renderAvailableOffers = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={styles.btnOffersData}
        activeOpacity={activityOpacity}
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
          <TouchableOpacity style={styles.btnOfferCode}>
            <Text style={styles.lblOfferCode}>{item?.offerCode}</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.lblOfferValidity}>{getTranslation("validUntil")}</Text>
            <Text style={styles.lblOfferValidityDate}>{item?.offerValidity}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
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
