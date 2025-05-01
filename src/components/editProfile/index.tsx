import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity } from "../../constants/GConstant";
import { colors } from "../../constants/Colors";
import { fontsfamily } from "../../constants/FontFamily";
import { fontSize } from "../../constants/FontSizes";
import CustomOrangeButton from "../../global/customOrangeButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface PropsType {}

const EditProfileComponent = (props: PropsType) => {
  return (
      <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 20,
          paddingBottom: 38,
          backgroundColor : colors.blue4e
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.btnProfileImage}
            activeOpacity={activityOpacity}
          >
            <Image
              style={styles.imgProfileBigIcon}
              source={Images.profileBigIcon}
            />
          </TouchableOpacity>
          <Text style={styles.lblName}>{getTranslation("johnDoe")}</Text>
          <View
            style={{
              height: 52,
              borderColor: colors.white,
              borderRadius: 100,
              borderWidth: 1,
              paddingHorizontal: 16,
              marginTop: 30,
            }}
          >
            <TextInput
              placeholder="Name"
              selectionColor={colors.white}
              placeholderTextColor={colors.graya7}
              style={{
                height: 52,
                flex: 1,
                fontFamily: fontsfamily.semibold,
                color: colors.white,
                fontSize: fontSize.size14,
              }}
            />
          </View>
        </View>
        <CustomOrangeButton title={getTranslation("update")} />
      </KeyboardAwareScrollView>
  );
};

export default EditProfileComponent;
