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
  NotificationOtherData,
} from "../../constants/interfaces";
import { colors } from "../../constants/Colors";
import { getTranslation } from "../../localization/i18n/i18n.config";

interface PropsType {
  arrNotificationList: NotificationGroup[];
  onPressNotification: (tag: string, other_data: NotificationOtherData) => void;
  // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
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
        onPress={() => props.onPressNotification(item.tag, item.other_data)}
      >
        <Image
          source={images.notificationBell}
          style={styles.imgNotificationBell}
          resizeMode="stretch"
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
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
      <SectionList
        sections={props?.arrNotificationList}
        keyExtractor={(item, index) => `${item.title}_${index}`}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemArrNotification}
        renderSectionHeader={({ section: { titleMain } }) => (
          <Text style={styles.lblTitleMain}>{titleMain}</Text>
        )}
        contentContainerStyle={{ paddingTop: 20, gap: 20 }}
        ListEmptyComponent={
          <Text style={styles.lblNoData}>{getTranslation("noDataFound")}</Text>
        }
      />
    </View>
  );
};

export default NotificationComponent;
