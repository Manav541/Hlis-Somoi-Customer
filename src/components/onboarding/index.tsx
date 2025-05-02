import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
} from 'react-native';
import React, {RefObject} from 'react';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { PlatformVersion } from '../../constants/utils/Platform';
import { ScreenDimensions } from '../../constants/utils/Dimensions';
import { colors } from '../../constants/Colors';
import { activityOpacity } from '../../constants/GConstant';
import { images } from '../../constants/Images';
import GlobalButton from '../../global/GlobalButton';
import { getTranslation } from '../../localization/i18n/i18n.config';

interface OnboardingItem {
  image: ImageSourcePropType;
  title: string | null;
  desc: string | null;
}

interface PropsType {
  onboardingData: OnboardingItem[];
  currentIndex: number;
  handleOnPressGo: () => void;
  onboardingRef: RefObject<FlatList | null>;
  handleOnScrollOnboarding: (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => void;
  handleOnPressGetStarted: () => void;
}

const OnboardingComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.vwMain,
        {
          paddingBottom: PlatformVersion.isIOS
            ? insets.bottom + 10
            : insets.bottom + 25,
        },
      ]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={[
          styles.vwFlatlistMain,
          {paddingTop: PlatformVersion.isIOS ? insets.top : insets.top + 20},
        ]}>
        {/* View Onbording Flatlist */}
        <View>
          <FlatList
            data={props.onboardingData}
            horizontal={true}
            scrollEnabled={false}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={props.handleOnScrollOnboarding}
            ref={props.onboardingRef}
            renderItem={({item, index}) => (
              <View style={{width: ScreenDimensions.screenWidth}} key={index}>
                <Image source={item?.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.desc}</Text>
              </View>
            )}
          />
        </View>

        {/* View Dots */}
        <View style={styles.vwDotsMain}>
          {props.onboardingData.map((_, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.vwDots,
                  {
                    backgroundColor:
                      index == props.currentIndex
                        ? colors.white
                        : colors.greya7,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Go Button */}
        <TouchableOpacity
          activeOpacity={activityOpacity}
          style={{alignSelf: 'center'}}
          onPress={props.handleOnPressGo}>
          <Image source={images.goBtn} style={styles.imageGo} />
        </TouchableOpacity>
      </View>

      {/* View Next Button */}
      <View style={{marginHorizontal: 20}}>
        <GlobalButton 
          title={getTranslation('getStarted')}
          onPress={props.handleOnPressGetStarted}
        />
      </View>
    </View>
  );
};

export default OnboardingComponent;
