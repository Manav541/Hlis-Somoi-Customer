import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { RateProgress, Review } from "../../constants/interfaces";

interface PropsType {
  totalRate: number;
  totalReviews: string;
  arrRateProgress: RateProgress[];
  arrRevieews: Review[];
  onPressViewAll: () => void;
  onPressImageVideo: () => void;
}

const ReviewComponent = (props: PropsType) => {
  const renderItemArrRateProgress = (item: RateProgress, index: number) => {
    return (
      <View style={styles.vwRateProgressItem} key={index}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={styles.vwRateNumber}>
            <Image style={styles.imgMainStar} source={images.star} />
            <Text style={styles.lblRateNumber}>{item?.rate_number}</Text>
          </View>

          <View style={styles.vwProgressBar}>
            <View
              style={[
                styles.vwProgressBarFill,
                {
                  width: `${item?.rate_percentage}%`,
                },
              ]}
            />
          </View>
        </View>
        <View style={{ width: 30, flexDirection: "row-reverse" }}>
          <Text style={styles.lblRatePercentage}>{item?.rate_percentage}%</Text>
        </View>
      </View>
    );
  };

  const renderItemArrReviews = (item: Review, index: number) => {
    return (
      <View style={styles.vwReviewItem} key={index}>
        <Text style={styles.lblReviewName}>{item?.review_personName}</Text>
        <View style={styles.vwReviewRateDate}>
          <View style={styles.vwRateNumber}>
            <Image
              style={styles.imgMainStar}
              source={images.star}
              resizeMode="stretch"
            />
            <Text style={styles.lblReviewRateNumber}>{item?.review_rate}</Text>
          </View>
          <Text style={styles.lblReviewDate}>{item?.review_date}</Text>
        </View>
        <Text style={styles.lblReviewDesc}>{item?.review_description}</Text>
        <View style={styles.vwImgeVideo}>
          <TouchableOpacity
            style={styles.vwReviewImage}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.onPressImageVideo}
          >
            <Image
              style={styles.imgReview}
              source={item?.review_image}
              resizeMode="stretch"
            />
          </TouchableOpacity>
          {item?.type === "video" && (
            <TouchableOpacity
              style={styles.vwReviewVideo}
              activeOpacity={activityOpacity}
              hitSlop={hitSlop}
              onPress={props?.onPressImageVideo}
            >
              <Image style={styles.imgVideo} source={images.videocircle} />
            </TouchableOpacity>
          )}
        </View>
        {index !== props?.arrRevieews.length - 1 && (
          <View style={styles.vwLine} />
        )}
      </View>
    );
  };
  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.lblReviews}>{getTranslation("reviews")}</Text>
        <View style={styles.vwRateProgress}>
          <View>
            <View
              style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
            >
              <Text style={styles.lblReviews}>{props?.totalRate}</Text>
              <Image
                style={styles.imgMainStar}
                source={images.star}
                resizeMode="stretch"
              />
            </View>
            <Text style={styles.lblReviewsCount}>
              {props?.totalReviews + " " + getTranslation("reviews1")}
            </Text>
          </View>
          <View style={styles.vwVerticalLine} />
          <View style={{ gap: 8, flex: 1 }}>
            {props?.arrRateProgress.map(renderItemArrRateProgress)}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {props?.arrRevieews.map(renderItemArrReviews)}
        </View>
        <TouchableOpacity
          style={styles.btnViewAll}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          onPress={props?.onPressViewAll}
        >
          <Text style={styles.lblViewAll}>{getTranslation("viewAll")}</Text>
          <Image
            style={styles.imgRightOrangeArrow}
            source={images.rightArrowOrange}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReviewComponent;
