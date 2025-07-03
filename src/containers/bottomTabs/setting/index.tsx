import React, { useState, useEffect } from "react";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import SettingComponent from "../../../components/bottomTabs/setting";
import {
  appName,
  flashMessageSucess,
  flashMessageWarning,
  showConfirmAlert,
  showConfirmForGuest,
  toggleLoader,
} from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import {
  Alert,
  ImageSourcePropType,
  Share,
  StatusBar,
  Text,
} from "react-native";
import {
  CustomerDetails,
  SettingDataItem,
  SignupResponse,
} from "../../../constants/interfaces";
import { constnatStyles } from "../../../constants/Styles";
import { zustandStore } from "../../../store";
import { statusCodes } from "../../../api/APIConstant";
import LocationManager from "../../../constants/utils/LocationManager";

const SettingContainer = ({ navigation, route }: any) => {
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
  const [currentLatLong, setCurrentLatLong] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Constants for common values
  const ICON_SIZE = {
    height: 22,
    width: 22,
  };

  // Utility function for CMS page navigation
  const navigateToCMS = (page: string) => () =>
    navigation.navigate(ScreenNames.cmsPage, { navigateFrom: page });

  // Utility function for change navigation
  const navigateToChange = (type: string) => () => {
    navigation.navigate(ScreenNames.changeEmailPhoneNumber, {
      navigateFrom: type,
    });
  };

  const handleOnShareApp = async () => {
    if (!isSharing) return;

    setIsSharing(false);
    try {
      const result = await Share.share({
        message: `${appName} App`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }

    setTimeout(() => {
      setIsSharing(true);
    }, 1000);
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
              });
            } else {
              navigation.navigate(ScreenNames.myWishlist, {
                currentLatLong: currentLatLong,
              });
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
          onPress: () =>
            flashMessageWarning(getTranslation("underDevelopment")),
        },
        {
          icon: images.shareAppIcon,
          title: getTranslation("shareApp"),
          disabled: !isSharing,
          ...ICON_SIZE,
          onPress() {
            handleOnShareApp();
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
          onPress: () => navigation.navigate(ScreenNames.contactUs),
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

  // useEffect(() => {
  //   if (route.params?.profileImage && route.params?.name) {
  //     setProfileImage(route.params?.profileImage);
  //     setName(route.params?.name);
  //   }
  //   {
  //   }
  // }, [route.params]);

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

  // Current Location
  const handleCurrentLocation = async () => {
    toggleLoader(true);
    const current = await LocationManager.getCurrentLocation();
    if (current) {
      setCurrentLatLong(current);
    }
    toggleLoader(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleCurrentLocation();
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
