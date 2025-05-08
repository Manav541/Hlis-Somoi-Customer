import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { activityOpacity } from "../../../constants/GConstant";
import { colors } from "../../../constants/Colors";
import GlobalButton from "../../../global/GlobalButton";

interface PropsType {
  arrSettingData: any[];
  isModalVisible: boolean;
  selectedType: string;
  handleOnPressYesDelete: () => void;
  handleOnPressNoThanks: () => void;
  profileImage: any;
  name: string;
}

const SettingComponent = (props: PropsType) => {
  console.log("props", props?.isModalVisible);
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
      <Modal visible={props?.isModalVisible} transparent animationType="fade">
        <View
          style={styles.vwDeleteLogoutView}
        >
          <View
            style={styles.vwDeleteLogoutModal}
          >
            <Image
              style={styles.imgModalLogo}
              source={images.logoTitle}
            />
            <Text style={styles.lblDeleteLogoutTitle}>
              {props?.selectedType === "delete" ?  getTranslation("deleteProfileTitle") : getTranslation("signOutProfileTitle")
               }
            </Text>
            <Text style={styles.lblDeleteLogoutDecs}>
              {props?.selectedType === "delete" ? getTranslation("deleteProfileDescription") : getTranslation("signOutProfileDescription")}
            </Text>

            <View style={{ width: "100%", marginTop: 24 }}>
              <GlobalButton
                title={props?.selectedType === 'delete' ? getTranslation("yesDelete") : getTranslation("yesSignOut")
                    
                }
                isOrange={true}
                onPress={props?.handleOnPressYesDelete}
              />
            </View>

            <View style={{ width: "100%", marginTop: 13 }}>
              <GlobalButton
                title={getTranslation("noThanks")}
                onPress={props?.handleOnPressNoThanks}
                isOrangeWithBorder={true}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingComponent;
