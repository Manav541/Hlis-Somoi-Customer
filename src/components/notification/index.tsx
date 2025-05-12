import { View, Text, SectionList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";

interface PropsType {
  arrNotification: any[];
  onPressNotification: () => void;
}

const NotificationComponent = (props: PropsType) => {
  const renderItemArrNotification = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.btnNotification}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={props?.onPressNotification}
      >
        <View style={styles.vwNotification}>
          <Image
            source={images.notificationBell}
            style={styles.imgNotificationBell}
          />
          <View style={styles.vwNotificationDetails}>
            <View style={styles.vwNotificationTitleTime}>
              <Text style={styles.lblNotificationTitle}>{item?.title}</Text>
              <Text style={styles.lblNotificationTime}>{item?.time}</Text>
            </View>
            <Text style={styles.lblNotificationDesc}>{item?.desc}</Text>    
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.vwMain}>
      <SectionList
        sections={props?.arrNotification}
        keyExtractor={(item, index) => index.toString()}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemArrNotification}
        renderSectionHeader={({ section: { titleMain } }) => (
          <Text style={styles.lblTitleMain}>{titleMain}</Text>
        )}
        contentContainerStyle={{ paddingTop: 20, gap: 20 }}
      />
    </View>
  );
};

export default NotificationComponent;
