import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import AvailableOffersComponent from "../../components/availableOffers";

const AvailableOffersContainer = ({ navigation }: any) => {
  const arrAvailableOffers = [
    {
      title: "Welcome Offer",
      offer: "Extra 7% Off",
      offerDesc: "Your first order above",
      offerPrice : '$150',
      offerCode: "SOMOIoff07",
      offerValidity: "8/31/2025",
    },
    {
      title: "Summer Offer",
      offer: "Flat 10% Off",
      offerDesc: "Your first order above",
      offerPrice : '$250',
      offerCode: "SOMOIoff10",
      offerValidity: "8/31/2025",
    },
    {
      title: "Festive Offer",
      offer: "Extra 70% Off",
      offerDesc: "Your first order above",
      offerPrice : '$1550',
      offerCode: "SOMOIoff70",
      offerValidity: "8/31/2025",
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.txtHeaderTitle}>
          {getTranslation("availableOffers")}
        </Text>
      ),
    });
  }, [navigation]);
  return <AvailableOffersComponent arrAvailableOffers={arrAvailableOffers} />;
};

export default AvailableOffersContainer;
