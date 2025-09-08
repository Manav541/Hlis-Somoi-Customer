import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyScreens, ScreenNames } from ".";
import { Platform, StatusBar, View } from "react-native";
import { colors } from "../constants/Colors";
import { fontSize } from "../constants/FontSizes";
import { fontsfamily } from "../constants/FontFamily";
import { enableScreens } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "../constants/utils/Notification/notificationNavigation";

enableScreens();

interface PropsType {
  initialRoute: string;
  linkingUrl:any;
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
            fontFamily: fontsfamily.bold,
            color: colors.blue4e,
          },
          headerShadowVisible: false,
          gestureEnabled: gestureEnabled,
        }}
      />
    );
  };

  return (
    <View style={{ backgroundColor: colors.blue4e, flex: 1 }}>
      <NavigationContainer ref={navigationRef} linking={props?.linkingUrl}>
        <Stack.Navigator
          screenOptions={{ animation: "slide_from_right" }}
          initialRouteName={props?.initialRoute}
          // initialRouteName={ScreenNames.chat}
        >
          {/* Auth */}
          {handleStackScreens(
            ScreenNames.onboarding,
            MyScreens.OnboardingContainer,
            false
          )}
          {handleStackScreens(
            ScreenNames.signup,
            MyScreens.SignupContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.signin,
            MyScreens.SignInContainer,
            true
          )}
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
          {handleStackScreens(
            ScreenNames.addAddress,
            MyScreens.AddAddressContainer,
            true
          )}

          {/* Bottom Tabs */}
          {handleStackScreens(
            ScreenNames.bottomTabsNavigation,
            MyScreens.BottomTabsNavigation,
            false
          )}

          {/* Home */}
          {handleStackScreens(
            ScreenNames.search,
            MyScreens.SearchContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.allCategories,
            MyScreens.ViewAllSubCategoriesContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.allBestProducts,
            MyScreens.ViewAllBestProductsContainer,
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
          {handleStackScreens(
            ScreenNames.compareProduct,
            MyScreens.CompareProductConteiner,
            true
          )}
          {handleStackScreens(
            ScreenNames.addCompareProduct,
            MyScreens.AddCompareProductsContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.paymentMethod,
            MyScreens.PaymentMethodContainer,
            true
          )}

          {/* Categories */}
          {handleStackScreens(
            ScreenNames.productListing,
            MyScreens.ProductListingContainer,
            true
          )}

          {/* My Orders */}
          {handleStackScreens(
            ScreenNames.orderSummary,
            MyScreens.OrderSummaryContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.cancelOrder,
            MyScreens.CancelOrderContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.returnExchangeItemList,
            MyScreens.ReturnExchangeItemListContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.returnOrder,
            MyScreens.ReturnOrderContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.rateAndReview,
            MyScreens.RateAndReviewContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.reportIssue,
            MyScreens.ReportIssueContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.driverTracking,
            MyScreens.DriverTrackingContainer,
            true
          )}
          {handleStackScreens(ScreenNames.chat, MyScreens.ChatContainer, true)}

          {/* Setting */}
          {handleStackScreens(
            ScreenNames.editProfile,
            MyScreens.EditProfileContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.cmsPage,
            MyScreens.CMSPageContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.availableOffers,
            MyScreens.AvailableOffersContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.contactUs,
            MyScreens.ContactUsContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.manageAddress,
            MyScreens.ManageAddressesContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.myWishlist,
            MyScreens.MyWishlistContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.changeEmailPhoneNumber,
            MyScreens.ChangeEmailPhoneNumberContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.managePaymentMethods,
            MyScreens.ManagePaymentMethodsContainer,
            true
          )}
          {handleStackScreens(
            ScreenNames.addNewCard,
            MyScreens.AddNewCardContainer,
            true
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MainNavigation;
