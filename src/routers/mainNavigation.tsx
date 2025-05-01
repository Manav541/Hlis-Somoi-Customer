import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, Text, StatusBar } from 'react-native';
import { Images } from '../constants/Images';
import { colors } from '../constants/Colors';
import { styles } from './styles';
import { MyScreens } from '.'; // Make sure `MyScreens` contains CMSPageContainer etc.

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const handleStackScreens = (
    screenName: string,
    component: React.ComponentType,
    headerShown: boolean
  ) => {
    return (
      <Stack.Screen
        key={screenName}
        name={screenName}
        component={component}
        options={({ navigation }) => ({
          headerShown,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}
              activeOpacity={0.8}
            >
              <Image
                style={styles.imgBackArrow}
                source={Images.backWhiteArrow}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.ornage1c,
          },
        })}
      />
    );
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={'dark-content'} translucent />
      <Stack.Navigator>
        {handleStackScreens('SettingContainer', MyScreens.SettingContainer, true)}
        {handleStackScreens('EditProfileContainer', MyScreens.EditProfileContainer, true)}
        {handleStackScreens('CMSPageContainer', MyScreens.CMSPageContainer, true)}
        {handleStackScreens('AvailableOffersContainer', MyScreens.AvailableOffersContainer, true)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
