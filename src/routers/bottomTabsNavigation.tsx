import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyScreens, ScreeNames} from '.';
import { colors } from '../constants/Colors';
import { fontSize } from '../constants/FontSizes';
import { fontsfamily } from '../constants/FontFamily';
import CustomBottomTabsContainer from '../containers/bottomTabs/customTab';

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
          tabBarHideOnKeyboard: true,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: colors.orange1c},
          headerTitleStyle: {
            fontSize: fontSize.size18,
            fontFamily: fontsfamily.extrabold,
            color: colors.blue4e,
          },
        }}
      />
    );
  };

  return (
    <BottomTabs.Navigator
      initialRouteName={ScreeNames.home}
      tabBar={props => <CustomBottomTabsContainer {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      {handleBottomTabsScreens(
        ScreeNames.home,
        MyScreens.HomeContainer,
        false,
      )}
      {handleBottomTabsScreens(
        ScreeNames.categories,
        MyScreens.CategoriesContainer,
        true,
      )}
      {handleBottomTabsScreens(
        ScreeNames.cart,
        MyScreens.CartContainer,
        true,
      )}
      {handleBottomTabsScreens(
        ScreeNames.myOrders,
        MyScreens.MyOrdersContainer,
        true,
      )}
      {handleBottomTabsScreens(
        ScreeNames.settings,
        MyScreens.SettingContainer,
        true,
      )}
    </BottomTabs.Navigator> 
  );
};

export default BottomTabsNavigation;
