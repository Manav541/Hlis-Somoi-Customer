import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { activityOpacity } from "../../../constants/GConstant";
import GlobalSuccessModal from "../../../global/GlobalSuccessModal";
import { SettingDataItem } from "../../../constants/interfaces";

interface PropsType {
  arrSettingData: SettingDataItem[];
  isModalDeleteVisible: boolean;
  isModalSignOutVisible: boolean;
  handleOnPressYesDelete: () => void;
  handleOnPressYesSignOut:()=>void;
  handleOnPressNoThanks: () => void;
  profileImage: ImageSourcePropType;
  name: string;
}

const SettingComponent = (props: PropsType) => {
  const renderArrSettingData = (item: any, index: number) => {
    return (
      <View key={index}>
        <Text style={styles.lblTitleMain}>{item?.titleMain}</Text>

        <View style={styles.vwSubArrayData}>
          {item?.subArr?.map((subItem: any, subIndex: number) => (
            <TouchableOpacity
              key={subIndex}
              activeOpacity={activityOpacity}
              style={[
                styles.btnSubArrayData,
                {
                  borderBottomWidth: subIndex !== item.subArr.length - 1 ? 1 : 0,
                },
              ]}
              onPress={subItem?.onPress}
            >
              <View>
                <Image
                  style={{ height: subItem?.height, width: subItem?.width }}
                  source={subItem?.icon}
                />
              </View>
              <Text style={styles.lblSettingTitle}>{subItem?.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.vwMain}>
      <View style={styles.vwSettingView}>
        <ScrollView
        style={{borderBottomLeftRadius : 10, borderBottomRightRadius : 10}}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 27, 
            flexGrow: 1,

          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.vwProfileData}>
            <View style={styles.vwProfileImage}>
              <Image
                style={styles.imgProfileIcon}
                source={props?.profileImage}
              />
            </View>
            <View style={styles.vwHelloName}>
              <Text style={styles.lblHello}>{getTranslation("hello")}</Text>
              <Text style={styles.lblName}>{props?.name}</Text>
            </View>
          </View>

          <View style={{}}>
            {props?.arrSettingData.map((item, index) =>
              renderArrSettingData(item, index)
            )}
          </View>
        </ScrollView>
      </View>

      {/* Delete Modal */}
      <GlobalSuccessModal
      logoutSheet
      otherImage={images.logoTitle}
      visible={props?.isModalDeleteVisible}
      title={getTranslation("deleteProfileTitle")}
      subTitle={getTranslation("deleteProfileDescription")}
      btnTitle={getTranslation("yesDelete")}
      secondBtnTitle={getTranslation("noThanks")}
      onPress={props?.handleOnPressYesDelete}
      onPressSecondBtn={props?.handleOnPressNoThanks}
       />

      {/* Signout Modal */}
      <GlobalSuccessModal
      logoutSheet
      otherImage={images.logoTitle}
      visible={props?.isModalSignOutVisible}
      title={getTranslation("signOutProfileTitle")}
      subTitle={getTranslation("signOutProfileDescription")}
      btnTitle={getTranslation("yesSignOut")}
      secondBtnTitle={getTranslation("noThanks")}
      onPress={props?.handleOnPressYesSignOut}
      onPressSecondBtn={props?.handleOnPressNoThanks}
       />
    </View>
  );
};

export default SettingComponent;
