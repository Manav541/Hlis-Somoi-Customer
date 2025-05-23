import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React, { Ref } from "react";
import { Asset } from "react-native-image-picker";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { images } from "../../constants/Images";
import { styles } from "./styles";
import GlobalButton from "../../global/GlobalButton";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { colors } from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import GlobalTextInput from "../../global/GlobalTextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PropsType {
  reportIssue: string;
  reportIssueRef: Ref<TextInput>;
  reportIssueFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnSubmit: (type: string) => void;
  onPressSubmit: () => void;

  multiImagesArray: Asset[];
  handleOnPressUploadImages: () => void;
  handleOnPressDeleteUploadedImage: (index: number) => void;
}

const ReportIssueComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderUploadImageVideo = (item: any, index: number) => {
    return (
      <View style={styles.vwUploadImageVideosItem} key={index}>
        <Image
          style={styles.imgUpload}
          source={{ uri: item?.uri }}
          resizeMode="stretch"
        />
        <TouchableOpacity
          style={styles.btnCancelImage}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={() => {
            props?.handleOnPressDeleteUploadedImage(index);
          }}
        >
          <Image style={styles.imgAdd} source={images.closeImage} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <ScrollView
        style={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lblReturnOrderDesc}>
          {getTranslation("reportTitle")}
        </Text>
        <Text style={styles.lblYourMessage}>
          {getTranslation("yourMessage")}
        </Text>
        <View style={{ marginHorizontal: 20 }}>
          <GlobalTextInput
            isDescriptionField
            value={props?.reportIssue}
            isLastField
            placeholder={getTranslation("writehere")}
            reference={props.reportIssueRef}
            onChangeText={(text) => {
              props.handleOnChangeText(text, "description");
            }}
            onBlur={() => {
              props.handleOnBlur("description");
            }}
            onFocus={() => {
              props.handleOnFocus("description");
            }}
            onSubmitEditing={() => props?.handleOnSubmit("description")}
            focusValue={props.reportIssueFocused}
          />
        </View>
        {/* Upload Image and Videos */}
        <View style={styles.vwUploadImageVideos}>
          <Text style={styles.lblUploadImageVideo}>
            {getTranslation("uploadImages")}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 9.02 }}>
              <TouchableOpacity
                style={styles.btnUploadImageVideo}
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={props?.handleOnPressUploadImages}
              >
                <Image
                  style={styles.imgAdd}
                  tintColor={colors.black13}
                  source={images.add}
                />
              </TouchableOpacity>
              {props?.multiImagesArray?.length > 0 && (
                <View style={{ flexDirection: "row", gap: 9.02 }}>
                  {props?.multiImagesArray.map(renderUploadImageVideo)}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: insets.bottom ? insets.bottom : 20,
        }}
      >
        <GlobalButton
          isOrange
          title={getTranslation("submit")}
          onPress={props?.onPressSubmit}
        />
      </View>
    </View>
  );
};

export default ReportIssueComponent;
