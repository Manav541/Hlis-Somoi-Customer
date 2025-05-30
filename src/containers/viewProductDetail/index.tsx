import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Alert,
  Share,
} from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import {
  activityOpacity,
  appName,
  flashMessageWarning,
  hitSlop,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import ViewProductDetailComponent from "../../components/viewProductDetail";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { ScreenNames } from "../../routers";
import { colors } from "../../constants/Colors";
import {
  FashionColor,
  FashionSize,
  RateProgress,
  Review,
  SimilarProduct,
} from "../../constants/interfaces";

const ViewProductDetailContainer = ({ navigation, route }: any) => {
  const itemData = route.params?.item;
  console.log("itemData", itemData);
  // const product_imgMain = itemData?.prodcut_imgMain;
  const product_imgMain = [
    {
      imgMain: images.rice,
    },
    {
      imgMain: images.rice,
    },
    {
      imgMain: images.rice,
    },
  ];
  const product_imgMainF = [
    {
      imgMain: images.fashionMainImg,
    },
    {
      imgMain: images.fashionMainImg,
    },
    {
      imgMain: images.fashionMainImg,
    },
  ];

  const product_img = itemData?.product_img;
  const mainCategoryTitle = itemData?.mainCategoryTitle;
  const subCategoryTitle = itemData?.subCategoryTitle;
  const product_inStock = itemData?.product_inStock;
  const product_name = itemData?.product_name;
  const product_weight = itemData?.product_weight;
  const product_rating = itemData?.product_rating;
  const product_review = itemData?.product_review;
  const product_final_price = itemData?.product_final_price;
  const product_price = itemData?.product_price;
  const product_distance = itemData?.product_distance;
  const product_deliverytime = itemData?.product_deliverytime;
  const product_deliveryData = itemData?.product_deliveryData;
  const product_highlight = itemData?.product_highlight;
  const product_desc = itemData?.product_desc;
  const [product_quantity, setProduct_Quantity] = useState(
    itemData?.product_quantity
  );
  const [poduct_isFavourite, setPoduct_isFavourite] = useState(
    itemData?.isFavourite
  );
  const [isSharing, setIsSharing] = useState<boolean>(true);

  const arrSimilarProduct: SimilarProduct[] = [
    {
      product_img: images.rice,
      product_final_price: "499",
      product_price: "600",
      product_weight: "1kg",
    },
    {
      product_img: images.rice,
      product_final_price: "499",
      product_price: "600",
      product_weight: "1kg",
    },
    {
      product_img: images.rice,
      product_final_price: "499",
      product_price: "600",
      product_weight: "1kg",
    },
  ];

  const [arrRateProgress, setArrRateProgress] = useState<RateProgress[]>([
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

  const [arrFashionSize, setArrFashionSize] = useState<FashionSize[]>([
    {
      size: "S",
      isSelected: false,
    },
    {
      size: "M",
      isSelected: true,
    },
    {
      size: "L",
      isSelected: false,
    },
    {
      size: "XL",
      isSelected: false,
    },
  ]);

  const [arrFashionColor, setArrFashionColor] = useState<FashionColor[]>([
    {
      color: colors.brown08,
      isSelected: false,
    },
    {
      color: colors.blue4e,
      isSelected: true,
    },
    {
      color: colors.black,
      isSelected: false,
    },
    {
      color: colors.brown46,
      isSelected: false,
    },
    {
      color: colors.green9f,
      isSelected: false,
    },
    {
      color: colors.grey72,
      isSelected: false,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const totalRate = 4.5;
  const totalReviews = "1.5k";
  const [isNavigating, setIsNavigating] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / ScreenDimensions.screenWidth);
    setCurrentIndex(index);
  };

  const onPressShare = async () => {
    if (!isSharing) return;

    setIsSharing(false);
    try {
      const result = await Share.share({
        message: `${appName} App`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }

    setTimeout(() => {
      setIsSharing(true);
    }, 1000);
  };

  const onPressGoToCompareProduct = () => {
    navigation.navigate(ScreenNames.compareProduct, {
      mainCategoryTitle: mainCategoryTitle,
    });
  };

  const onPressFavourite = () => {
    setPoduct_isFavourite((prevFavourite: boolean) => !prevFavourite);
  };

  const onPressBuyNow = (type: "add" | "remove") => {
    if (type === "add") {
      setProduct_Quantity((prevQuantity: number) => prevQuantity + 1);
    } else if (type === "remove") {
      setProduct_Quantity((prevQuantity: number) =>
        prevQuantity > 0 ? prevQuantity - 1 : 0
      );
    }
  };
  const onPressImageVideo =()=>{
    flashMessageWarning(getTranslation('underDevelopment'))
  }
  const onPressViewAll = () => {
    flashMessageWarning(getTranslation("underDevelopment"));
  };

  const onPressSize = (selectedSize: string) => {
    const updatedSizes = arrFashionSize.map((item) => ({
      ...item,
      isSelected: item.size === selectedSize,
    }));
    setArrFashionSize(updatedSizes);
  };

  const onPressColor = (selectedColor: string) => {
    const updatedColor = arrFashionColor.map((item) => ({
      ...item,
      isSelected: item.color === selectedColor,
    }));
    setArrFashionColor(updatedColor);
  };

  const onPressCartIcon = useCallback(() => {
    if (isNavigating) return;

    setIsNavigating(true);

    requestAnimationFrame(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: ScreenNames.bottomTabsNavigation,
              state: {
                index: 0,
                routes: [{ name: ScreenNames.cart }],
              },
            },
          ],
        })
      );
    });

    setTimeout(() => setIsNavigating(false), 1000); // unlock after 1 sec
  }, [isNavigating, navigation]);

  const onPressReview = () => {
    navigation.navigate(ScreenNames.review);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
      },
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerRight: () => (
        <View style={styles.vwHeaderRight}>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={onPressShare}
          >
            <Image
              style={styles.imgButton}
              source={images.shareIcon}
              tintColor={colors.blue4e}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={activityOpacity}
            hitSlop={hitSlop}
            onPress={onPressCartIcon}
            disabled={isNavigating}
          >
            <Image
              style={styles.imgButton}
              source={images.cartBagIcon}
              tintColor={colors.blue4e}
            />
            <View style={styles.vwBedge}>
              <Text style={styles.lblBedge}>2</Text>
            </View>

          </TouchableOpacity>
        </View>
      ),
    });
  }, [isNavigating, onPressCartIcon]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return (
    <ViewProductDetailComponent
      product_imgMain={product_imgMain}
      product_imgMainF={product_imgMainF}
      product_img={product_img}
      mainCategoryTitle={mainCategoryTitle}
      subCategoryTitle={subCategoryTitle}
      product_inStock={product_inStock}
      product_name={product_name}
      product_weight={product_weight}
      product_rating={product_rating}
      product_review={product_review}
      product_final_price={product_final_price}
      product_price={product_price}
      product_distance={product_distance}
      product_deliverytime={product_deliverytime}
      product_deliveryData={product_deliveryData}
      arrSimilarProduct={arrSimilarProduct}
      product_highlight={product_highlight}
      product_desc={product_desc}
      product_quantity={product_quantity}
      arrFashionSize={arrFashionSize}
      arrFashionColor={arrFashionColor}
      currentIndex={currentIndex}
      handleScroll={handleScroll}
      totalRate={totalRate}
      totalReviews={totalReviews}
      arrRateProgress={arrRateProgress}
      arrRevieews={arrRevieews}
      onPressGoToCompareProduct={onPressGoToCompareProduct}
      onPressBuyNow={onPressBuyNow}
      onPressSize={onPressSize}
      onPressColor={onPressColor}
      onPressImageVideo={onPressImageVideo}
      onPressViewAll={onPressViewAll}
      onPressFavourite={onPressFavourite}
      poduct_isFavourite={poduct_isFavourite}
      onPressReview={onPressReview}
      
    />
  );
};

export default ViewProductDetailContainer;
