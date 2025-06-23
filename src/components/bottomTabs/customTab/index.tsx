import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PlatformVersion} from '../../../constants/utils/Platform';

interface TabsArray {
  key: string;
  name: string;
  params: undefined | object;
}

interface PropsType {
  tabs: TabsArray[];
  onPressBottomTab: (route: TabsArray, index: number) => void;
}

const CustomBottomTabsComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.vwTabs,
        {paddingBottom: PlatformVersion.isIOS ? insets.bottom + 10 : 20},
      ]}>
      {props.tabs.map((route: TabsArray, index: number) => (
        props.onPressBottomTab(route, index)
      ))}
    </View>
  );
};

export default CustomBottomTabsComponent;
