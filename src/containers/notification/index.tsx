import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import NotificationComponent from "../../components/notification";
import GlobalBackButton from "../../global/GlobalBackButton";
import {
  flashMessageWarning,
  formatNotifications,
  NotificationTypes,
  toggleLoader,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import {
  NotificationGroup,
  NotificationOtherData,
} from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";
import { MmkvManager } from "../../constants/utils/MmkvManager";

const NotificationContainer = ({ navigation }: any) => {
  // API Zustand Store
  const notificationListApi = zustandStore.NotificationListStore(
    (state) => state.notificationList
  );
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);
  const [arrNotificationList, setArrNotificationList] = useState<
    NotificationGroup[]
  >([]);

  // Pagination state
  const [notificationListPageNumber, setNotificationListPageNumber] =
    useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const onPressNotification = (
    tag: string,
    other_data: NotificationOtherData
  ) => {
    switch (tag) {
      case NotificationTypes.ADMIN_NOTIFICATION:
        navigation.navigate(ScreenNames.home);
        break;
      case NotificationTypes.ORDER_PLACED:
      case NotificationTypes.ORDER_ACCEPTED:
      case NotificationTypes.ORDER_PREPARING:
      case NotificationTypes.ORDER_PREPARED:
      case NotificationTypes.ORDER_PACKAGING:
      case NotificationTypes.ORDER_OUT_FOR_DELIVERY:
      case NotificationTypes.ORDER_DELIVERED:
      case NotificationTypes.ORDER_CANCELLED:
      case NotificationTypes.ORDER_REJECTED:
      case NotificationTypes.ORDER_RETURN_REQUESTED:
      case NotificationTypes.ORDER_RETURN_ACCEPTED:
      case NotificationTypes.ORDER_RETURNED:
      case NotificationTypes.DELIVERY_PERSON_NOT_AVAILABLE:
        navigation.navigate(ScreenNames.orderSummary, {
          order_id: other_data?.order_id,
        });
        break;

      case NotificationTypes.NEW_CHAT_RECEIVED:
        navigation.navigate(ScreenNames.chat, {
          driver_id: other_data?.sender_id,
          customer_id: other_data?.receiver_id,
        });
        break;

      default:
        console.log("Unhandled notification tag:", tag);
        break;
    }
  };

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = notificationListPageNumber + 1;
      handleNotificationListApi(nextPage, true);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.notification}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  // -------------------------API Calling----------------------------
  // handleNotificationListApi
  const handleNotificationListApi = async (
    page: number,
    isLoadMore = false
  ) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);
    const dictData = {
      page_no: page,
    };
    try {
      const response = await notificationListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "NOTIFICATION LIST RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          const rawData = response.data as NotificationGroup[];
          const formattedSections = formatNotifications(rawData);
          if (formattedSections.length > 0) {
            setArrNotificationList((prev) =>
              isLoadMore ? [...prev, ...formattedSections] : formattedSections
            );
            setNotificationListPageNumber(page);
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrNotificationList([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrNotificationList([]);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrNotificationList([]);
          setHasMoreData(false);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    } finally {
      if (!isLoadMore) toggleLoader(false);
      else setIsLoadingMore(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        const isGuest = Boolean(storedValue);
        console.log("isGuestUser=====>", isGuest);
        setIsGuestUser(isGuest);

        if (isGuest) {
          setArrNotificationList([]); // Empty cart for guest users
        } else {
          handleNotificationListApi(1, false);
        }
        });
      
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <NotificationComponent
      arrNotificationList={arrNotificationList}
      onPressNotification={onPressNotification}
      // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default NotificationContainer;
