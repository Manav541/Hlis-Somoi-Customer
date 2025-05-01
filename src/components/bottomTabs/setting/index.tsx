import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { activityOpacity } from "../../../constants/GConstant";

interface PropsType {
  arrSettingData: any[];
}

const SettingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderArrSettingData = (item: any, index: number) => {
    return (
      <View key={index}>
        <Text style={styles.lblTitleMain}>{item?.titleMain}</Text>

        <View style={styles.vwSubArrayData}>
          {item?.subArr?.map((subItem: any, subIndex: number) => (
            <TouchableOpacity
            key={subIndex}
            activeOpacity={activityOpacity}
            style={{
              ...styles.btnSubArrayData,
              borderBottomWidth: subIndex !== item.subArr.length - 1 ? 1 : 0,
            }}
            onPress={
              subItem?.onPress 
            }
          
          >
            <View>
              <Image
                style={{height : subItem?.height,width : subItem?.width}}
                source={subItem?.icon}/>
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
      <View
        style={{
          ...styles.vwSettingView,
          // marginBottom: PlatformVersion.isIOS ? insets.bottom + 81 : 0,
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingTop: 20, flexGrow : 1, paddingBottom :20}}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.vwProfileData}>
            <View style={styles.vwProfileImage}>
              <Image
                style={styles.imgProfileIcon}
                source={Images.profileIcon}
              />
            </View>
            <View style={styles.vwHelloName}>
              <Text style={styles.lblHello}>{getTranslation("hello")}</Text>
              <Text style={styles.lblName}>{getTranslation("johnDoe")}</Text>
            </View>
          </View>

          <View>
            {props?.arrSettingData.map((item, index) =>
              renderArrSettingData(item, index)
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingComponent;
