import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ReviewComponent from "../../components/review";
import GlobalBackButton from "../../global/GlobalBackButton";
import { images } from "../../constants/Images";
import { flashMessageWarning } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import { RatingSummary, Review } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";

const ReviewContainer = ({ navigation,route }: any) => {
  const totalRate = 4.5;
  const totalReviews = "1.5k";
  const storeDetail = route?.params?.storeDetail;
  console.log("storeDetail",storeDetail);
  

  const [arrRateProgress, setArrRateProgress] = useState<RatingSummary[]>([
    {
      rate_number: 5,
      rate_percentage: 60,
    },
    {
      rate_number: 4,
      rate_percentage: 34,
    },
    {
      rate_number: 3,
      rate_percentage: 20,
    },
    {
      rate_number: 2,
      rate_percentage: 10,
    },
    {
      rate_number: 1,
      rate_percentage: 0,
    },
  ]);

  const [arrRevieews, setArrReviews] = useState<Review[]>([
    {
      review_personName: "Jesus Loy",
      review_rate: "4.5",
      review_date: "12 Oct 2023",
      review_description:
        "Material is best but the overall look is too gud 😍 Test very good",
      review_image: images.rice,
      type: "image",
    },
    {
      review_personName: "Mike loy",
      review_rate: "4.5",
      review_date: "12 Oct 2023",
      review_description:
        "It is a long established fact that a reader will be distracted by the readable",
      review_image: images.rice,
      type: "video",
    },
  ]);

  const onPressImageVideo = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressViewAll = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressAddButton = () => {
    navigation.navigate(ScreenNames.rateAndReview, {
      navigateFromStoreReview : true,
      storeDetail:storeDetail
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
        headerRight: () => (
          <GlobalBackButton
            onPress={onPressAddButton}
            isRight
            rightImage={images.addCircle}
          />
        ),
      });
    };

    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
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
    />
  );
};

export default ReviewContainer;
