import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { activityOpacity } from "../../constants/GConstant";
import { Images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";

interface PropsType {
  navigateFrom: string;
  faqArr: any[];
  handleOnPressFaq: (index: number) => void;
}

const CMSPageComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemFaq = (item: any, index: number) => {
    return (
      <View key={index} style={styles.vwFaq}>
        <TouchableOpacity
          activeOpacity={activityOpacity}
          style={styles.btnTitle}
          onPress={() => props.handleOnPressFaq(index)}
        >
          <Text numberOfLines={2} style={styles.lblTitle}>
            {item.faqTitle}
          </Text>
          <Image
            source={Images.downOrangeArrow}
            style={[
              styles.imgDropdown,
              {
                transform: item.isSelected
                  ? [{ rotate: "180deg" }]
                  : [{ rotate: "0deg" }],
              },
            ]}
          />
        </TouchableOpacity>

        {item.isSelected && (
          <>
            {/* Description Text */}
            <Text style={styles.lblDesc}>{item.faqDesc}</Text>
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={[
        styles.vwMain,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 20,
        },
      ]}
    >
      {props?.navigateFrom === "aboutUs" ? (
        <View style={{ marginTop: 16, gap: 10 }}>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
        </View>
      ) : props?.navigateFrom === "termsConditions" ? (
        <View style={{ marginTop: 16, gap: 10 }}>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
        </View>
      ) : props?.navigateFrom === "faq" ? (
        <View>{props.faqArr.map(renderItemFaq)}</View>
      ) : (
        <View style={{ marginTop: 16, gap: 10 }}>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
          <Text style={styles.lblCMSData}>
            {getTranslation("faqDescription")}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CMSPageComponent;
