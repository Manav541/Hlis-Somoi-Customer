import React from 'react';
import CustomBottomTabsComponent from '../../../components/bottomTabs/customTab';
import {images} from '../../../constants/Images';
import {getTranslation} from '../../../localization/i18n/i18n.config';
import {Image, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {activityOpacity, hitSlop} from '../../../constants/GConstant';

interface TabsArray {
  key: string;
  name: string;
  params: undefined | object;
}

const CustomBottomTabsContainer = ({navigation, state, descriptors}: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const bottomTabs = state.routes;

  const logosArray = [
    {
      focusImg: images.homeFocus,
      unFocusImg: images.homeUnFocus,
      tabName: getTranslation('home'),
    },
    {
      focusImg: images.categoryFocus,
      unFocusImg: images.categoryUnFocus,
      tabName: getTranslation('categories'),
    },
    {
      focusImg: images.cartFocus,
      unFocusImg: images.cartUnFocus,
      tabName: getTranslation('cart'),
    },
    {
      focusImg: images.myOrdersFocus,
      unFocusImg: images.myOrdersUnFocus,
      tabName: getTranslation('myOrders'),
    },
    {
      focusImg: images.settingsFocus,
      unFocusImg: images.settingsUnFocus,
      tabName: getTranslation('settings'),
    },
  ];

  //bottomLogosFunc
  const onPressBottomTab = (route: TabsArray, index: number) => {
    const isFocused = state.index === index;
    const onPress = () => {
      setTimeout(() => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }, 500);
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        key={index}
        style={styles.btn}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}>
        <Image
          source={
            isFocused
              ? logosArray[index].focusImg
              : logosArray[index].unFocusImg
          }
          style={{
            height: isFocused ? 25 : 24,
            width: isFocused ? 34 : 24,
          }}
        />
        <Text style={styles.lbl}>{logosArray[index].tabName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <CustomBottomTabsComponent
      tabs={bottomTabs}
      onPressBottomTab={onPressBottomTab}
    />
  );
};

export default CustomBottomTabsContainer;
