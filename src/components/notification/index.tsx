import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Image,
  StatusBar,
  RefreshControl,
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
import { fontsfamily } from "../../constants/FontFamily";

interface PropsType {
  arrNotificationList: NotificationGroup[];
  onPressNotification: (tag: string, other_data: NotificationOtherData) => void;
  showMoreNotification: { [reviewId: string]: boolean };
  toggleShowMoreNotification: (reviewId: string) => void;
  // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
  isRefreshing: boolean;
  onRefresh: () => void;
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
        disabled
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
          <Text
            style={styles.lblNotificationDesc}
            numberOfLines={
              props?.showMoreNotification[item.id] ? undefined : 3
            }
          >
            {item?.desc}
          </Text>
          {item?.desc?.length > 150 && (
            <TouchableOpacity
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={() => props?.toggleShowMoreNotification(item.id)}
            >
              <Text
                style={{
                  ...styles.lblNotificationDesc,
                  fontFamily: fontsfamily.semibold,
                  marginTop : 5
                }}
              >
                {props?.showMoreNotification[item.id] ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
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
        bounces={true}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemArrNotification}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { titleMain } }) => (
          <Text style={styles.lblTitleMain}>{titleMain}</Text>
        )}
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
        }}
        onEndReached={() => {
          if (
            props.canLoadMore &&
            props.hasMountedOnce.current &&
            !props.isRefreshing
          ) {
            props.loadMoreCategories();
          }
        }}
        onEndReachedThreshold={0.4}
        refreshControl={
          <RefreshControl
            refreshing={props.isRefreshing}
            onRefresh={props.onRefresh}
            colors={[colors.orange1c]}
            tintColor={colors.orange1c}
          />
        }
        ListEmptyComponent={
          <View style={styles.vwNoData}>
            <Text style={styles.lblNoData}>
              {getTranslation("noDataFound")}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationComponent;
