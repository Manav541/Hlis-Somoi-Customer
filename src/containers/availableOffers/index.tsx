import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { getTranslation } from "../../localization/i18n/i18n.config";
import AvailableOffersComponent from "../../components/availableOffers";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { AvailableOfferItem } from "../../constants/interfaces";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";
import Clipboard from "@react-native-clipboard/clipboard";
import {
  flashMessageSucess,
  toggleLoader,
} from "../../constants/GConstant";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";

const AvailableOffersContainer = ({ navigation }: any) => {
  // API Zustand Store
  const availableOffersApi = zustandStore.AvailableOffersStore(
    (state) => state.availableOffers
  );
  const [arrAvailableOffers, setArrAvailableOffers] = useState<
    AvailableOfferItem[]
  >([]);

  // Pagination state
  const [availableOffersPageNumber, setAvailableOffersPageNumber] =
    useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const hasMountedOnce = useRef(false);
  const [canLoadMore, setCanLoadMore] = useState(false);

  const copyToClipboard = (offerCode: string) => {
    Clipboard.setString(offerCode);
    flashMessageSucess(getTranslation("offerCodeCopySuccess"));
  };

  const loadMoreCategories = () => {
    if (hasMoreData && !isLoadingMore) {
      const nextPage = availableOffersPageNumber + 1;
      handleAvailableOffersApi(nextPage, true);
    }
  };

  // -------------------------API Calling----------------------------
  // handleAvailableOffersApi
  const handleAvailableOffersApi = async (page: number, isLoadMore = false) => {
    if (isLoadMore && isLoadingMore) return;

    if (!isLoadMore) toggleLoader(true);
    else setIsLoadingMore(true);
    const dictData = {
      page_no: page,
    };
    try {
      const response = await availableOffersApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "AVAILABLE OFFERS RESPONSE===>",
            JSON.stringify(response)
          );
        if (response.code === statusCodes.success) {
          const rawData = response.data as AvailableOfferItem[];
          if (Array.isArray(rawData) && rawData.length > 0) {
            setArrAvailableOffers((prev) =>
              isLoadMore ? [...prev, ...rawData] : rawData
            );
            setAvailableOffersPageNumber(page);
            setHasMoreData(true);
          } else {
            if (!isLoadMore) setArrAvailableOffers([]);
            setHasMoreData(false);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          setArrAvailableOffers([]);
        } else if (response.code === statusCodes.emptyData) {
          if (!isLoadMore) setArrAvailableOffers([]);
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
          {ScreenNames.availableOffers}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleAvailableOffersApi(1, false);
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <AvailableOffersComponent
      arrAvailableOffers={arrAvailableOffers}
      copyToClipboard={copyToClipboard}
      // pagination
      loadMoreCategories={loadMoreCategories}
      canLoadMore={canLoadMore}
      setCanLoadMore={setCanLoadMore}
      hasMountedOnce={hasMountedOnce}
    />
  );
};

export default AvailableOffersContainer;
