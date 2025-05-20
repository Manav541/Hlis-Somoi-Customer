import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { styles } from "./styles";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { CardDetails } from "../../constants/interfaces";

interface PropsType {
  arrCards: CardDetails[];
  handleOnPressAddCard: () => void;
  handleDelete: (index: number) => void;
}

const ManagePaymentMethodsComponent = (props: PropsType) => {
  const renderArrCards = ({ item, index }: any) => {
    return (
      <View style={styles.vwCardDetail}>
        <View style={styles.vwCardTypeNumber}>
          <View style={styles.vwCardType}>
            <Image
              style={
                item?.card_type == "visa"
                  ? styles.imgCardTypeVisa
                  : styles.imgCardTypeMaster
              }
              source={
                item?.card_type == "visa"
                  ? images.visaIcon
                  : images.mastercardIcon
              }
            />
          </View>
          <Text style={styles.lblCardNumber}>
            •••• {item?.card_number?.slice(-8, -4)}{" "}
            {item?.card_number?.slice(-4)}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={activityOpacity} hitSlop={hitSlop} onPress={() =>{props?.handleDelete(index)}}>
          <Image style={styles.imgDeleteCard} source={images.deleteWhiteBg} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.vwMain}>
      <TouchableOpacity
        style={styles.btnAddCard}
        activeOpacity={activityOpacity}        
        hitSlop={hitSlop}
        onPress={props?.handleOnPressAddCard}
      >
        <Image style={styles.imgAdd} source={images.add} />
        <Text style={styles.lblAddNewCard}>{getTranslation("addNewCard")}</Text>
      </TouchableOpacity>
      <FlatList
        data={props?.arrCards}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderArrCards}
        contentContainerStyle={{ paddingTop: 20, gap: 16 }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default ManagePaymentMethodsComponent;
