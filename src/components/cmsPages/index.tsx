import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { activityOpacity } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { FaqArrProps } from "../../constants/interfaces";

interface PropsType {
  navigateFrom: string;
  faqArr: FaqArrProps[];
  handleOnPressFaq: (index: number) => void;
}

const CMSPageComponent = (props: PropsType) => {
  const renderItemFaq = (item: FaqArrProps, index: number) => {
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
            source={images.downOrangeArrow}
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
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[styles.vwMain]}
      >
        {props?.navigateFrom === "aboutUs" ? (
          <View style={{ marginTop: 16, gap: 10, marginBottom: 10 }}>
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
    </View>
  );
};

export default CMSPageComponent;
