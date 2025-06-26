import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ReviewComponent from "../../components/review";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { flashMessageWarning } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import {
  Media,
  RatingSummary,
  RestaurantInfo,
  Review,
  ReviewData,
} from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { zustandStore } from "../../store";
import { statusCodes } from "../../api/APIConstant";

const ReviewContainer = ({ navigation, route }: any) => {
  // API Zustand store
  const rateAndReviewListApi = zustandStore.RateAndReviewStore(
    (state) => state.rateAndReviewList
  );

  const storeDetail: RestaurantInfo = route?.params?.storeDetail;
  console.log("storeDetail", storeDetail);
  const type = route?.params?.type;
  const vendor_id = storeDetail?.id;
  const product_id = route?.params?.product_id;

  const [totalRate, setTotalRate] = useState<string>("");
  const [totalReviews, setTotalReviews] = useState<string>("");

  const [arrRateProgress, setArrRateProgress] = useState<RatingSummary[]>([]);

  const [arrRevieews, setArrReviews] = useState<Review[]>([]);
  const [mediaModalVisible, setMediaModalVisible] = useState(false);
  const [allMedia, setAllMedia] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<{
    link: string;
    type: "image" | "video";
  } | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onPressImageVideo = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressViewAll = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const handleSelectMedia = (
    mediaList: { link: string; type: "image" | "video" }[],
    index: number
  ) => {
    setAllMedia(mediaList);
    setSelectedIndex(index);
    setMediaModalVisible(true);
  };

  const handleCloseMediaModal = () => {
    setMediaModalVisible(false);
    // setSelectedMedia(null);
    // setAllMedia([]);
  };

  const onPressAddButton = () => {
    navigation.navigate(ScreenNames.rateAndReview, {
      navigateFromStoreReview: true,
      storeDetail: storeDetail,
    });
  };

  useEffect(() => {
    const header = () => {
      navigation.setOptions({
        headerLeft: () => (
          <GlobalBackButton onPress={() => navigation.goBack()} />
        ),
        headerTitle: () => (
          <Text style={constnatStyles.lblHeaderTitle}>
            {ScreenNames.review}
          </Text>
        ),
        ...(type === "vendor" && {
          headerRight: () => (
            <GlobalBackButton
              onPress={onPressAddButton}
              isRight
              rightImage={images.addCircle}
            />
          ),
        }),
      });
    };

    header();
  }, []);

  // handleRateAndReviewListApi
  const handleRateAndReviewListApi = async (
    type: string,
    page_no: number,
    product_id?: string,
    vendor_id?: string
  ) => {
    const dictData: any = {
      type: type,
      page_no: page_no,
    };

    if (type === "vendor") {
      dictData.vendor_id = vendor_id;
    }
    if (type === "product") {
      dictData.product_id = product_id;
    }

    try {
      const response = await rateAndReviewListApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log(
            "RATE AND REVIEW LIST RESPONSE===>",
            JSON.stringify(response)
          );
        const data = response.data as ReviewData;
        if (response.code === statusCodes.success) {
          setTotalRate(data?.average_rating);
          setTotalReviews(data?.total_reviews);
          setArrRateProgress(data?.rating_summary);
          // ✅ Format media in each review
          const formattedReviews: Review[] = (data.reviews || []).map(
            (review: any) => ({
              ...review,
              media: Array.isArray(review.media)
                ? review.media.map((url: string) => {
                    const isVideo =
                      url.endsWith(".mp4") ||
                      url.endsWith(".mov") ||
                      url.includes("video");
                    return {
                      link: url,
                      type: isVideo ? "video" : "image",
                    };
                  })
                : [],
            })
          );

          setArrReviews(formattedReviews);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        } else if (response.code === statusCodes.emptyData) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRateAndReviewListApi(
        type,
        1,
        type === "product" ? product_id : undefined,
        type === "vendor" ? vendor_id : undefined
      );
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ReviewComponent
      totalRate={totalRate}
      totalReviews={totalReviews}
      arrRateProgress={arrRateProgress}
      arrRevieews={arrRevieews}
      onPressViewAll={onPressViewAll}
      onPressImageVideo={onPressImageVideo}
      mediaModalVisible={mediaModalVisible}
      handleCloseMediaModal={handleCloseMediaModal}
      selectedMedia={selectedMedia}
      handleSelectMedia={handleSelectMedia}
      allMedia={allMedia}
      selectedIndex={selectedIndex}
    />
  );
};

export default ReviewContainer;
