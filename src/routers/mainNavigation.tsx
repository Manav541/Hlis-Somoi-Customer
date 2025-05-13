import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyScreens, ScreenNames } from ".";
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
        initialRouteName={ScreenNames.review}
      >
        {/* Auth */}
        {handleStackScreens(ScreenNames.onboarding, MyScreens.OnboardingContainer, false)}
        {handleStackScreens(ScreenNames.signup, MyScreens.SignupContainer, true)}
        {handleStackScreens(ScreenNames.signin, MyScreens.SignInContainer, true)}
        {handleStackScreens(
          ScreenNames.verification,
          MyScreens.VerificationContainer,
          true
        )}
        {handleStackScreens(
          ScreenNames.forgotPassword,
          MyScreens.ForgotPasswordContainer,
          true
        )}
        {handleStackScreens(
          ScreenNames.changePassword,
          MyScreens.ChangePasswordContainer,
          true,
          false
        )}
        {handleStackScreens(ScreenNames.addAddress, MyScreens.AddAddressContainer, true)}

        {/* Bottom Tabs */}
        {handleStackScreens(
          ScreenNames.bottomTabsNavigation,
          MyScreens.BottomTabsNavigation,
          false,
        )}

        {/* Home */}
        {handleStackScreens(
          ScreenNames.search,
          MyScreens.SearchContainer,
          true
        )}
        {handleStackScreens(
          ScreenNames.allCategories,
          MyScreens.ViewAllCategoriesContainer,
          true
        )}
         {handleStackScreens(
          ScreenNames.allBestSellers,
          MyScreens.ViewAllBestSellersContainer,
          true
        )}
        {handleStackScreens(
          ScreenNames.notification,
          MyScreens.NotificationContainer,
          true
        )}

        {/* Food Detail */}
        {handleStackScreens(
          ScreenNames.productDetail,
          MyScreens.ViewProductDetailContainer,
          true
        )}
        {handleStackScreens(
          ScreenNames.restaurantDetail,
          MyScreens.ViewRestaurantDetailContainer,
          true
        )}
        {handleStackScreens(
          ScreenNames.review,
          MyScreens.ReviewContainer,
          true
        )}
       

        {/* Categories */}
        {handleStackScreens(
          ScreenNames.productListing,
          MyScreens.ProductListingContainer,
          true
        )}

        {/* Setting */}
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
