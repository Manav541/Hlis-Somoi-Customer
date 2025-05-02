import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyScreens } from ".";
import { StatusBar } from "react-native";
import { colors } from "../constants/Colors";
import { fontSize } from "../constants/FontSizes";
import { fontsfamily } from "../constants/FontFamily";
import { createStackNavigator } from "@react-navigation/stack";

const MainNavigation = () => {
  const Stack = createStackNavigator();

  const handleStackScreens = (
    screenName: string,
    component: React.ComponentType,
    headerShown: boolean
  ) => {
    return (
      <Stack.Screen
        name={screenName}
        component={component}
        options={{
          headerShown: headerShown,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.orange1c },
          headerTitleStyle: {
            fontSize: fontSize.size18,
            fontFamily: fontsfamily.extrabold,
            color: colors.blue4e,
          },
          headerShadowVisible: false,
        }}
      />
    );
  };

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <Stack.Navigator>
        {/* {handleStackScreens('Onboarding', MyScreens.OnboardingContainer, false)} */}
        {handleStackScreens("Setting", MyScreens.SettingContainer, true)}
        {handleStackScreens(
          "Edit Profile",
          MyScreens.EditProfileContainer,
          true
        )}
        {handleStackScreens(
          "CMSPageContainer",
          MyScreens.CMSPageContainer,
          true
        )}
        {handleStackScreens(
          "Available Offers",
          MyScreens.AvailableOffersContainer,
          true
        )}
        {handleStackScreens(
          "Contact Us",
          MyScreens.ContactUsContainer,
          true
        )}
        {handleStackScreens(
          "Manage Address",
          MyScreens.ManageAddressesContainer,
          true
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
