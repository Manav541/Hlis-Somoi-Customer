import React, {useRef, useState} from 'react';
import OnboardingComponent from '../../../components/authentication/onboarding';
import {images} from '../../../constants/Images';
import {getTranslation} from '../../../localization/i18n/i18n.config';
import {ScreenDimensions} from '../../../constants/utils/Dimensions';
import {
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {AsyncManager} from '../../../constants/utils/AsyncManager';
import { MmkvManager } from '../../../constants/utils/MmkvManager';

interface OnboardingItem {
  image: ImageSourcePropType;
  title: string | null;
  desc: string | null;
}

const OnboardingContainer = ({navigation}: any) => {
  const onboardingData: OnboardingItem[] = [
    {
      image: images.onboarding1,
      title: getTranslation('onboardingTitle1'),
      desc: getTranslation('onboardingDesc1'),
    },
    {
      image: images.onboarding2,
      title: getTranslation('onboardingTitle2'),
      desc: getTranslation('onboardingDesc2'),
    },
    {
      image: images.onboarding3,
      title: getTranslation('onboardingTitle3'),
      desc: getTranslation('onboardingDesc3'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const onboardingRef = useRef<FlatList>(null);

  //handleOnScrollOnboarding
  const handleOnScrollOnboarding = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.ceil(offset / ScreenDimensions.screenWidth);
    setCurrentIndex(index);
  };

  const handleOnPressGetStarted = () => {
    MmkvManager.setData(MmkvManager.Keys.isOnBoardingVisisted, 'true');
    navigation.replace('Sign Up');
  };

  //handleOnPressGo
  const handleOnPressGo = () => {
    if (currentIndex < onboardingData.length - 1) {
      onboardingRef?.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      handleOnPressGetStarted();
    }
  };

  return (
    <OnboardingComponent
      onboardingData={onboardingData}
      currentIndex={currentIndex}
      onboardingRef={onboardingRef}
      handleOnPressGo={handleOnPressGo}
      handleOnScrollOnboarding={handleOnScrollOnboarding}
      handleOnPressGetStarted={handleOnPressGetStarted}
    />
  );
};

export default OnboardingContainer;
