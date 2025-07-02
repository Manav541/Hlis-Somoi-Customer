import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Modal,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { Media, RatingSummary, Review } from "../../constants/interfaces";
import { colors } from "../../constants/Colors";
import { DateFormatsManager } from "../../constants/utils/DateFormats";
import Video from "react-native-video";
import { FlatList } from "react-native-gesture-handler";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PropsType {
  totalRate: string;
  totalReviews: string;
  arrRateProgress: RatingSummary[];
  arrRevieews: Review[];
  onPressViewAll: () => void;
  onPressImageVideo: () => void;
  mediaModalVisible: boolean;
  handleCloseMediaModal: () => void;
  selectedMedia: { link: string; type: "image" | "video" } | null;
  handleSelectMedia: (
    mediaList: { link: string; type: "image" | "video" }[],
    index: number
  ) => void;
  allMedia: Media[];
  selectedIndex: number;
  // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
  hasMoreData: boolean;
}

const ReviewComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const renderItemArrRateProgress = (item: RatingSummary, index: number) => {
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
        <View style={{ width: 35, flexDirection: "row-reverse" }}>
          <Text style={styles.lblRatePercentage}>{item?.rate_percentage}%</Text>
        </View>
      </View>
    );
  };

  const renderItemArrReviews = (item: Review, index: number) => {
    return (
      <View style={styles.vwReviewItem} key={index}>
        <Text style={styles.lblReviewName}>{item?.name}</Text>
        <View style={styles.vwReviewRateDate}>
          <View style={styles.vwRateNumber}>
            <Image
              style={styles.imgMainStar}
              source={images.star}
              resizeMode="stretch"
            />
            <Text style={styles.lblReviewRateNumber}>
              {parseFloat(item?.rating).toFixed(1)}
            </Text>
          </View>
          <Text style={styles.lblReviewDate}>
            {" "}
            {DateFormatsManager.formatDate(
              item?.date,
              DateFormatsManager.DateFormats.DD_MM_YYYY
            )}
          </Text>
        </View>
        <Text style={styles.lblReviewDesc}>{item?.comment}</Text>
        {item?.media.length > 0 && (
          <FlatList
            data={item?.media}
            horizontal
            bounces={false}
            contentContainerStyle={{ gap: 20 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: itemMedia, index }) => (
              <>
                <TouchableOpacity
                  style={styles.btnReviewImage}
                  activeOpacity={activityOpacity}
                  hitSlop={hitSlop}
                  onPress={() => props?.handleSelectMedia(item?.media, index)}
                >
                  {itemMedia.type === "image" ? (
                    <Image
                      source={{ uri: itemMedia.link }}
                      style={styles.imgReview}
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      source={{ uri: itemMedia.link }}
                      style={styles.imgReview}
                      paused={true} // Don't autoplay
                      controls={true} // Native play/pause buttons
                      resizeMode="cover"
                      repeat={false}
                    />
                  )}
                </TouchableOpacity>
                {itemMedia?.type === "video" && (
                  <TouchableOpacity
                    style={styles.btnReviewVideo}
                    activeOpacity={activityOpacity}
                    hitSlop={hitSlop}
                    onPress={() => props?.handleSelectMedia(item?.media, index)}
                  >
                    <Image
                      style={styles.imgVideo}
                      source={images.videocircle}
                    />
                  </TouchableOpacity>
                )}
              </>
            )}
          />
        )}

        {index !== props?.arrRevieews.length - 1 && (
          <View style={styles.vwLine} />
        )}
      </View>
    );
  };
  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.orange1c}
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
        {props?.hasMoreData && (
          <TouchableOpacity
            style={styles.btnViewAll}
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={props?.loadMoreCategories} 
          >
            <Text style={styles.lblViewAll}>{getTranslation("viewMore")}</Text>
            <Image
              style={styles.imgRightOrangeArrow}
              source={images.rightArrowOrange}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Media Modal */}
      <Modal
        visible={props?.mediaModalVisible}
        transparent
        animationType="fade"
        onRequestClose={props?.handleCloseMediaModal}
      >
        <View style={styles.modalOverlay}>
          {/* Close Button */}
          <TouchableOpacity
            style={[styles.btnClose, { top: insets.top + 20 }]}
            onPress={props?.handleCloseMediaModal}
            hitSlop={hitSlop}
            activeOpacity={activityOpacity}
          >
            <Image
              source={images.closeImage}
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>

          {/* Media Gallery of Review */}
          <FlatList
            data={props?.allMedia || []} // ✅ full media array
            horizontal
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            initialScrollIndex={props?.selectedIndex || 0} // start at tapped index
            getItemLayout={(_, index) => ({
              length: ScreenDimensions.screenWidth,
              offset: ScreenDimensions.screenWidth * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={styles.mediaItem}>
                {item?.type === "image" ? (
                  <Image
                    source={{ uri: item.link }}
                    style={styles.fullScreenMedia}
                    resizeMode="contain"
                  />
                ) : (
                  <Video
                    source={{ uri: item.link }}
                    style={styles.fullScreenMedia}
                    resizeMode="contain"
                    controls
                    paused={false}
                    fullscreen={false}
                  />
                )}
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ReviewComponent;
