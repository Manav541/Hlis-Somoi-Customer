import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { Ref } from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { activityOpacity } from "../../constants/GConstant";
import { colors } from "../../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GlobalButton from "../../global/GlobalButton";
import GlobalTextInput from "../../global/GlobalTextInput";
import FastImage from "react-native-fast-image";

interface PropsType {
  name: string;
  nameRef: Ref<TextInput>;
  handleOnPressUpadte: () => void;
  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  nameFocused: boolean;
  profileImage: string;
  handleOnPressProfileImage: () => void;
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
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            ...styles.btnProfileImage,
            borderWidth: props?.profileImage ? 4 : 1.51,
            borderColor:  props?.profileImage ?colors.orange1c: colors.white,
          }}
          activeOpacity={activityOpacity}
          onPress={props.handleOnPressProfileImage}
        >
          <FastImage
            style={
              props?.profileImage
                ? styles.imgProfileBigIconUri
                : styles.imgProfileBigIcon
            }
            source={
              props?.profileImage
                ? { uri: props?.profileImage }
                : images.profileBigIcon
            }
          />
          {props?.profileImage && <Image style={styles.imgCamera} source={images.camera}/>}
        </TouchableOpacity>
        <View style={{marginTop : 30}}>
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
            onSubmitEditing={() => {}}
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
