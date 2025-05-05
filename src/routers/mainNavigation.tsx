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
    headerShown: boolean,
    gestureEnabled?: boolean
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
          gestureEnabled: gestureEnabled,
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
      <Stack.Navigator
        screenOptions={{ animation: "slide_from_right" }}
        initialRouteName="Setting"
      >
        {/* Auth */}
        {handleStackScreens("Onboarding", MyScreens.OnboardingContainer, false)}
        {handleStackScreens("Sign Up", MyScreens.SignupContainer, true)}
        {handleStackScreens("Sign In", MyScreens.SignInContainer, true)}
        {handleStackScreens(
          "Verification",
          MyScreens.VerificationContainer,
          true
        )}
        {handleStackScreens(
          "Forgot Password",
          MyScreens.ForgotPasswordContainer,
          true
        )}
        {handleStackScreens(
          "Change Password",
          MyScreens.ChangePasswordContainer,
          true,
          false
        )}
        {handleStackScreens("Add Address", MyScreens.AddAddressContainer, true)}

        {/* Setting */}
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
        {handleStackScreens("Contact Us", MyScreens.ContactUsContainer, true)}
        {handleStackScreens(
          "Manage Address",
          MyScreens.ManageAddressesContainer,
          true
        )}
        {handleStackScreens(
          "My Wishlist",
          MyScreens.MyWishlistContainer,
          true
        )}
        {handleStackScreens(
          "ChangeEmailPhoneNumberContainer",
          MyScreens.ChangeEmailPhoneNumberContainer,
          true
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
