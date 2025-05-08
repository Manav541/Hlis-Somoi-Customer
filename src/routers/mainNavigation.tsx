import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyScreens, ScreeNames } from ".";
import { StatusBar } from "react-native";
import { colors } from "../constants/Colors";
import { fontSize } from "../constants/FontSizes";
import { fontsfamily } from "../constants/FontFamily";
import { createStackNavigator } from "@react-navigation/stack";

interface PropsType {
  initialRoute: string;
}

const MainNavigation = (props: PropsType) => {
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
        initialRouteName={props.initialRoute}
      >
        {/* Auth */}
        {handleStackScreens(ScreeNames.onboarding, MyScreens.OnboardingContainer, false)}
        {handleStackScreens(ScreeNames.signup, MyScreens.SignupContainer, true)}
        {handleStackScreens(ScreeNames.signin, MyScreens.SignInContainer, true)}
        {handleStackScreens(
          ScreeNames.verification,
          MyScreens.VerificationContainer,
          true
        )}
        {handleStackScreens(
          ScreeNames.forgotPassword,
          MyScreens.ForgotPasswordContainer,
          true
        )}
        {handleStackScreens(
          ScreeNames.changePassword,
          MyScreens.ChangePasswordContainer,
          true,
          false
        )}
        {handleStackScreens(ScreeNames.addAddress, MyScreens.AddAddressContainer, true)}

        {/* Bottom Tabs */}
        {handleStackScreens(
          ScreeNames.bottomTabsNavigation,
          MyScreens.BottomTabsNavigation,
          false,
        )}

        {/* Setting */}
        {/* {handleStackScreens("Setting", MyScreens.SettingContainer, true)} */}
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
        {handleStackScreens(
          "Manage Payment Methods",
          MyScreens.ManagePaymentMethodsContainer,
          true
        )}
        {handleStackScreens(
          "Add New Card",
          MyScreens.AddNewCardContainer,
          true
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
