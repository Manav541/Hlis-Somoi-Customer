import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { activityOpacity } from "../../constants/GConstant";
import { fontsfamily } from "../../constants/FontFamily";
import { colors } from "../../constants/Colors";
import { fontSize } from "../../constants/FontSizes";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { styles } from "./styles";

interface PropsType {
    title : string | null
}

const CustomOrangeButton = (props: PropsType) => {
  return (
    <TouchableOpacity
      style={{ ...styles.btnCustomOrange }}
      activeOpacity={activityOpacity}
    >
      <Text style={styles.lblButtonTitle}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomOrangeButton;
