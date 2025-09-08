import React, { useState, useEffect } from "react";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import SettingComponent from "../../../components/bottomTabs/setting";
import {
  flashMessageSucess,
  flashMessageWarning,
  showConfirmForGuest,
} from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import { Share, StatusBar, Text } from "react-native";
import {
  CustomerDetails,
  SettingDataItem,
} from "../../../constants/interfaces";
import { constnatStyles } from "../../../constants/Styles";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";
import Rate, { AndroidMarket } from "react-native-rate";

const SettingContainer = ({ navigation }: any) => {
  // API Zustand Store
  const logoutApi = zustandStore.AuthStore((state) => state.logout);
  const deleteAccountApi = zustandStore.AuthStore(
    (state) => state.deleteAccount
  );
  const [isGuestUser, setIsGuestUser] = useState<boolean>(false);

  const [profileImage, setProfileImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalSignOutVisible, setIsModalSignOutVisible] = useState(false);
  const [isSharing, setIsSharing] = useState<boolean>(true);
  const baseImagePath =
    "https://hlik-deep-bhaumik.s3.amazonaws.com/somoiapp/customers_images/";

  // Constants for common values
  const ICON_SIZE = {
    height: 22,
    width: 22,
  };

  // Utility function for CMS page navigation
  const navigateToCMS = (page: string) => () =>
    navigation.navigate(ScreenNames.cmsPage, { navigateFrom: page });

  const onShareCustomerApp = async () => {
    const customerAppLink =
      "https://play.google.com/store/apps/details?id=com.somoicustomer";

    const message = `Feeling hungry? 🍕🍔 Order your favorite food with Somoi! 🚀\n\nBrowse nearby restaurants, get exclusive deals, and enjoy fast delivery right to your doorstep.\n\nDownload the Somoi app now:\n${customerAppLink}`;

    try {
      await Share.share({
        title: "Download Somoi - Order Food Online",
        message,
      });
    } catch (error) {
      console.error("Error sharing customer app:", error);
    }
  };

  const handleOnRateApp = () => {
    Rate.rate(
      {
        AppleAppID: "", // iOS Apple ID
        GooglePackageName: "", // Android package name
        openAppStoreIfInAppFails: true,
        preferInApp: true,
        preferredAndroidMarket: AndroidMarket.Google,
      },
      (success) => {
        if (success) {
          __DEV__ && console.log("SUCCESS==>", success);
        } else {
          __DEV__ &&
            console.log("IN APP RATE FAILS, REDIRECTING TO APP STORE...");
        }
      }
    );
  };

  const arrSettingData: SettingDataItem[] = [
    {
      titleMain: getTranslation("manage"),
      subArr: [
        ...(!isGuestUser
          ? [
              {
                icon: images.editProfileIcon,
                title: getTranslation("editProfile"),
                ...ICON_SIZE,
                onPress: () => navigation.navigate(ScreenNames.editProfile),
              },
            ]
          : []),
        {
          icon: images.changePasswordIcon,
          title: getTranslation("changePassword"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.changePassword, {
                navigateFromForgotPassword: false,
              });
            }
          },
        },
        {
          icon: images.changeEmailIcon,
          title: getTranslation("changeEmail"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.changeEmailPhoneNumber, {
                navigateFrom: "ChangeEmail",
              });
            }
          },
        },
        {
          icon: images.changePhoneIcon,
          title: getTranslation("changePhoneNumber"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.changeEmailPhoneNumber, {
                navigateFrom: "ChangePhoneNumber",
              });
            }
          },
        },
        {
          icon: images.managePaymentIcon,
          title: getTranslation("managePaymentMethods"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.managePaymentMethods);
            }
          },
        },
        {
          icon: images.myWishlistIcon,
          title: getTranslation("myWishlist"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.myWishlist);
            }
          },
        },
        {
          icon: images.manageAddressIcon,
          title: getTranslation("manageAddresses"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.manageAddress, {
                navigateFromCart: false,
              });
            }
          },
        },
        {
          icon: images.availableOffersIcon,
          title: getTranslation("availableOffers"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.availableOffers);
            }
          },
        },
      ],
    },
    {
      titleMain: getTranslation("general"),
      subArr: [
        {
          icon: images.rateAppIcon,
          title: getTranslation("rateApp"),
          ...ICON_SIZE,
          onPress: () => {
            handleOnRateApp();
            // flashMessageWarning(getTranslation("underDevelopment"));
          },
        },
        {
          icon: images.shareAppIcon,
          title: getTranslation("shareApp"),
          disabled: !isSharing,
          ...ICON_SIZE,
          onPress() {
            onShareCustomerApp();
          },
        },
        {
          icon: images.aboutUsIcon,
          title: getTranslation("aboutUs"),
          ...ICON_SIZE,
          onPress: navigateToCMS("aboutUs"),
        },
        {
          icon: images.contactUsIcon,
          title: getTranslation("contactUs"),
          ...ICON_SIZE,
          onPress: () => {
            if (isGuestUser) {
              showConfirmForGuest(() => {
                navigation.navigate(ScreenNames.signin);
                MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
              });
            } else {
              navigation.navigate(ScreenNames.contactUs);
            }
          },
        },
        {
          icon: images.faqIcon,
          title: getTranslation("faq"),
          ...ICON_SIZE,
          onPress: navigateToCMS("faq"),
        },
        {
          icon: images.privacyPolicyIcon,
          title: getTranslation("privacyPolicy"),
          ...ICON_SIZE,
          onPress: navigateToCMS("privacyPolicy"),
        },
        {
          icon: images.tcIcon,
          title: getTranslation("termsConditions"),
          ...ICON_SIZE,
          onPress: navigateToCMS("termsConditions"),
        },
      ],
    },
    // ✅ Conditionally include Logout/Delete section only if NOT guest user
    ...(!isGuestUser
      ? [
          {
            titleMain: getTranslation("logoutDeleteProfile"),
            subArr: [
              {
                icon: images.deleteProfileIcon,
                title: getTranslation("deleteProfile"),
                ...ICON_SIZE,
                onPress: () => setIsModalDeleteVisible(true),
              },
              {
                icon: images.logoutIcon,
                title: getTranslation("logout"),
                ...ICON_SIZE,
                onPress: () => setIsModalSignOutVisible(true),
              },
            ],
          },
        ]
      : []),
  ];

  const handleOnPressNoThanks = () => {
    setIsModalDeleteVisible(false);
    setIsModalSignOutVisible(false);
  };

  const handleOnPressYesDelete = () => {
    setIsModalDeleteVisible(false);
    handleDeleteAccountApi();
  };

  const handleDeleteAccountApi = async () => {
    try {
      const response = await deleteAccountApi({}, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("DELETE ACCOUNT RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "false");
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: ScreenNames.signup }],
            })
          );
          MmkvManager.clearAllExcept([
            MmkvManager.Keys.isOnBoardingVisisted,
            MmkvManager.Keys.fcmToken,
            MmkvManager.Keys.notificationPermission,
          ]);
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const handleOnPressYesSignOut = () => {
    setIsModalSignOutVisible(false);
    handleLogoutApi();
  };

  const handleLogoutApi = async () => {
    try {
      const response = await logoutApi({}, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ && console.log("LOGOUT RESPONSE===>", response);
        if (response.code === statusCodes.success) {
          flashMessageSucess(response.message);
          MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "false");
          MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
          MmkvManager.clearAllExcept([
            MmkvManager.Keys.isOnBoardingVisisted,
            MmkvManager.Keys.fcmToken,
            MmkvManager.Keys.notificationPermission,
          ]);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: ScreenNames.signin }],
            })
          );
        } else if (response.code === statusCodes.invaildOrFail) {
          flashMessageWarning(response.message);
        }
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      // Fetch Guest User
      MmkvManager.getData(MmkvManager.Keys.isGuestUser, (storedValue) => {
        console.log("isGuestUser=====>", Boolean(storedValue));

        setIsGuestUser(Boolean(storedValue));
      });

      // Fetch customer data
      MmkvManager.getData(
        MmkvManager.Keys.customerDetails,
        (customerDetails) => {
          if (customerDetails) {
            const customerData = JSON.parse(customerDetails) as CustomerDetails;
            setProfileImage(customerData.profile_image);
            setName(customerData.name);
          }
        }
      );

      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.settings}
        </Text>
      ),
    });
  }, []);

  return (
    <SettingComponent
      isGuestUser={isGuestUser}
      arrSettingData={arrSettingData}
      isModalDeleteVisible={isModalDeleteVisible}
      isModalSignOutVisible={isModalSignOutVisible}
      handleOnPressYesDelete={handleOnPressYesDelete}
      handleOnPressYesSignOut={handleOnPressYesSignOut}
      handleOnPressNoThanks={handleOnPressNoThanks}
      profileImage={profileImage}
      name={name}
      baseImagePath={baseImagePath}
    />
  );
};

export default SettingContainer;
