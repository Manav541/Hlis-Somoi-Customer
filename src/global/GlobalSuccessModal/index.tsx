import {
  View,
  Text,
  Modal,
  Image,
  StatusBar,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../constants/utils/Platform";
import { colors } from "../../constants/Colors";
import { images } from "../../constants/Images";
import GlobalButton from "../GlobalButton";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";

interface PropsType {
  visible: boolean;
  onPress: () => void;
  onPressSecondBtn?: (() => void) | undefined;
  title: string | null;
  subTitle: string | null;
  btnTitle: string | null;
  secondBtnTitle?: string | null;
  noConfirmationImage?: boolean;
  logoutSheet?: boolean;
  otherImage?: ImageSourcePropType | string;
  isContinueShopping?: boolean;
  title1?: string | null;
  orderNumber?: string | null;
}

const GlobalSuccessModal = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={props.visible}
      style={{ flex: 1 }}
      transparent
      animationType="slide"
    >
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
        barStyle={"dark-content"}
      />
      <View style={{ flex: 1, backgroundColor: colors.black50 }}>
        <View style={{ flex: 1 }} />
        <View
          style={[
            styles.vwModal,
            {
              paddingBottom: PlatformVersion.isIOS ? insets.bottom + 20 : 20,
              paddingTop: props?.noConfirmationImage ? 0 : 24,
            },
          ]}
        >
          {!props?.noConfirmationImage && (
            <Image
              source={props?.otherImage ? props?.otherImage : images.success}
              style={
                props?.otherImage ? styles.imgOtherImage : styles.imgSuccess
              }
            />
          )}
          {props?.isContinueShopping && (
            <Text style={styles.lblTitle}>{props.title1}</Text>
          )}
          <Text
            style={{
              ...styles.lblTitle,
              marginTop: props?.isContinueShopping ? 0 : 30,
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              ...styles.lblSubtitle,
              marginBottom: props?.isContinueShopping ? 8 : 30,
            }}
          >
            {props.subTitle}
          </Text>
          {props?.isContinueShopping && (
            <Text style={styles.lblOrderNumber}>
              {getTranslation("order") + " " + props?.orderNumber}
            </Text>
          )}
          <View style={{ gap: 10 }}>
            <GlobalButton
              isOrange
              onPress={props.onPress}
              title={props?.btnTitle}
            />
            {props?.noConfirmationImage && (
              <GlobalButton
                isOrangeWithBorder
                onPress={props.onPressSecondBtn}
                title={props?.secondBtnTitle || ""}
              />
            )}
            {props?.logoutSheet && (
              <GlobalButton
                isOrangeWithBorder
                onPress={props.onPressSecondBtn}
                title={props?.secondBtnTitle || ""}
              />
            )}
            {props?.isContinueShopping && (
              <GlobalButton
                isTransparentWithBorder
                onPress={props.onPressSecondBtn}
                title={props?.secondBtnTitle || ""}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GlobalSuccessModal;
