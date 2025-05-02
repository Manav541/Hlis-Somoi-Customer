import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity } from "../../constants/GConstant";
import { colors } from "../../constants/Colors";
import { fontsfamily } from "../../constants/FontFamily";
import { fontSize } from "../../constants/FontSizes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GlobalButton from "../../global/GlobalButton";
import GlobalTextInput from "../../global/GlobalTextInput";

interface PropsType {
  name: string;
  nameRef: any;
  handleOnPressUpadte: () => void;
  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  nameFocused: boolean;
}

const EditProfileComponent = (props: PropsType) => {
  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 38,
        backgroundColor: colors.blue4e,
      }}
    >
      <View style={{flex:1}}>
        <TouchableOpacity
          style={styles.btnProfileImage}
          activeOpacity={activityOpacity}
        >
          <Image
            style={styles.imgProfileBigIcon}
            source={images.profileBigIcon}
          />
        </TouchableOpacity>
        <Text style={styles.lblName}>{getTranslation("johnDoe")}</Text>
        <View>
          <GlobalTextInput
            placeholder={getTranslation("name")}
            value={props.name}
            reference={props.nameRef}
            secureTextEntry={false}
            onChangeText={(text) => {
              props.handleOnChangeText(text, "name");
            }}
            onBlur={() => {
              props.handleOnBlur("name");
            }}
            onFocus={() => {
              props.handleOnFocus("name");
            }}
            focusValue={props.nameFocused}
          />
        </View>
      </View>
      <GlobalButton
        title={getTranslation("update")}
        isOrange={true}
        onPress={props?.handleOnPressUpadte}
      />
      {/* <CustomOrangeButton title={getTranslation("update")} /> */}
    </KeyboardAwareScrollView>
  );
};

export default EditProfileComponent;
