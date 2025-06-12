import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
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
  userProfileUrl: string;
  baseImagePath: string;
}

const EditProfileComponent = (props: PropsType) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.blue4e,
        paddingHorizontal: 20,
        paddingBottom: 30,
      }}
    >
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <StatusBar
          translucent={false}
          barStyle={"dark-content"}
          backgroundColor={colors.orange1c}
        />

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              ...styles.btnProfileImage,
              borderWidth: 1.51,
              borderColor: props?.profileImage ? colors.white : colors.orange1c,
            }}
            activeOpacity={activityOpacity}
            onPress={props.handleOnPressProfileImage}
          >
            <FastImage
              style={
                props?.baseImagePath != props?.profileImage
                  ? styles.imgProfileBigIconUri
                  : styles.imgProfileBigIcon
              }
              source={
                props?.baseImagePath == props?.profileImage
                  ? images.profileIcon
                  : { uri: props.profileImage }
              }
            />
            {props?.baseImagePath != props?.profileImage && (
              <Image style={styles.imgCamera} source={images.camera} />
            )}
          </TouchableOpacity>

          <View style={{ marginTop: 30 }}>
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
              isLastField
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <GlobalButton
        title={getTranslation("update")}
        isOrange={true}
        onPress={props?.handleOnPressUpadte}
      />
    </View>
  );
};

export default EditProfileComponent;
