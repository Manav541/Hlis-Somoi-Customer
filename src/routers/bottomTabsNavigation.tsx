import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyScreens, ScreenNames} from '.';
import { colors } from '../constants/Colors';
import { fontSize } from '../constants/FontSizes';
import { fontsfamily } from '../constants/FontFamily';
import CustomBottomTabsContainer from '../containers/bottomTabs/customTab';
import { Platform } from 'react-native';

const BottomTabsNavigation = () => {
  const BottomTabs = createBottomTabNavigator();

  //handleTabsScreens
  const handleBottomTabsScreens = (
    screenName: string,
    screenComponent: any,
    headerShown: boolean,
  ) => {
    return (
      <BottomTabs.Screen
        name={screenName}
        component={screenComponent}
        options={{
          headerShown: headerShown,
          headerShadowVisible: false,
          // tabBarHideOnKeyboard: true,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: colors.orange1c},
          headerTitleStyle: {
            fontSize: fontSize.size18,
            fontFamily: fontsfamily.bold,
            color: colors.blue4e,
          },
        }}
      />
    );
  };

  return (
    <BottomTabs.Navigator
      initialRouteName={ScreenNames.home}
      tabBar={props => <CustomBottomTabsContainer {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      {handleBottomTabsScreens(
        ScreenNames.home,
        MyScreens.HomeContainer,
        false,
      )}
      {handleBottomTabsScreens(
        ScreenNames.categories,
        MyScreens.CategoriesContainer,
        false,
      )}
      {handleBottomTabsScreens(
        ScreenNames.cart,
        MyScreens.CartContainer,
        true,
      )}
      {handleBottomTabsScreens(
        ScreenNames.myOrders,
        MyScreens.MyOrdersContainer,
        true,
      )}
      {handleBottomTabsScreens(
        ScreenNames.settings,
        MyScreens.SettingContainer,
        true,
      )}
    </BottomTabs.Navigator> 
  );
};

export default BottomTabsNavigation;
