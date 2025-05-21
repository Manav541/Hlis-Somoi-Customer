import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import {
  NotificationData,
  NotificationGroup,
} from "../../constants/interfaces";

interface PropsType {
  arrNotification: NotificationGroup[];
  onPressNotification: () => void;
}

const NotificationComponent = (props: PropsType) => {
  const renderItemArrNotification = ({
    item,
    index,
  }: {
    item: NotificationData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.btnNotification}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={props?.onPressNotification}
      >
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
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <SectionList
        sections={props?.arrNotification}
        keyExtractor={(item, index) => `${item.title}_${index}`}
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
