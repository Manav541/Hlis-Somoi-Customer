import React, { useState, useEffect } from "react";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import SettingComponent from "../../../components/bottomTabs/setting";
import {
  flashMessageSucess,
  flashMessageWarning,
} from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../../routers";
import { Alert, ImageSourcePropType, Share, StatusBar, Text } from "react-native";
import { SettingDataItem } from "../../../constants/interfaces";
import { constnatStyles } from "../../../constants/Styles";

const SettingContainer = ({ navigation, route }: any) => {
  console.log("route ==>>> ", route?.params?.name);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(images.profileIcon);
  const [name, setName] = useState<string>("Jhon Doe");
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalSignOutVisible, setIsModalSignOutVisible] = useState(false);
  const [isGuestUser, setIsGuestUser] = useState(false); 

  useEffect(() => {
    MmkvManager.getData(MmkvManager.Keys.isGuestUser, (guestUser) => {
      console.log("guestUser ==>>> ", guestUser);
      if (guestUser === "true") {
        setIsGuestUser(true);
      }
    });
  }, []);

  console.log("isGuestUser ==>>> ", isGuestUser);

  // Constants for common values
  const ICON_SIZE = {
    height: 22,
    width: 22
  };

  // Utility function for CMS page navigation
  const navigateToCMS = (page: string) => () => 
    navigation.navigate(ScreenNames.cmsPage, { navigateFrom: page });

  // Utility function for change navigation
  const navigateToChange = (type: string) => () =>
    navigation.navigate(ScreenNames.changeEmailPhoneNumber, { navigateFrom: type });

  const handleOnShareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Somoi',
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
  };

  const arrSettingData: SettingDataItem[] = [
    {
      titleMain: getTranslation("manage"),
      subArr: [
        {
          icon: images.editProfileIcon,
          title: getTranslation("editProfile"),
          ...ICON_SIZE,
          onPress: () => navigation.navigate(ScreenNames.editProfile),
        },
        {
          icon: images.changePasswordIcon,
          title: getTranslation("changePassword"),
          ...ICON_SIZE,
          onPress: () => navigation.navigate(ScreenNames.changePassword, {
            navigateFromForgotPassword: false,
          }),
        },
        {
          icon: images.changeEmailIcon,
          title: getTranslation("changeEmail"),
          ...ICON_SIZE,
          onPress: navigateToChange("ChangeEmail"),
        },
        {
          icon: images.changePhoneIcon,
          title: getTranslation("changePhoneNumber"),
          ...ICON_SIZE,
          onPress: navigateToChange("ChangePhoneNumber"),
        },
        {
          icon: images.managePaymentIcon,
          title: getTranslation("managePaymentMethods"),
          ...ICON_SIZE,
          onPress: () => navigation.navigate(ScreenNames.managePaymentMethods),
        },
        {
          icon: images.myWishlistIcon,
          title: getTranslation("myWishlist"),
          ...ICON_SIZE,
          onPress: () => navigation.navigate(ScreenNames.myWishlist),
        },
        {
          icon: images.manageAddressIcon,
          title: getTranslation("manageAddresses"),
          ...ICON_SIZE,
          onPress: () => navigation.navigate(ScreenNames.manageAddress, { navigateFromCart: false }),
        },
        {
          icon: images.availableOffersIcon,
          title: getTranslation("availableOffers"),
          ...ICON_SIZE,
          onPress: () => navigation.navigate(ScreenNames.availableOffers),
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
          onPress: () => flashMessageWarning(getTranslation("underDevelopment")),
        },
        {
          icon: images.shareAppIcon,
          title: getTranslation("shareApp"),
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
  ];
 
  useEffect(() => {
    if (route.params?.profileImage && route.params?.name) {
      setProfileImage(route.params?.profileImage);
      setName(route.params?.name);
    }
    {
    }
  }, [route.params]);

  const handleOnPressNoThanks = () => {
    setIsModalDeleteVisible(false);
    setIsModalSignOutVisible(false);
  };

  const handleOnPressYesDelete = () => {
    setIsModalDeleteVisible(false);
    MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "false");
    MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
    flashMessageSucess(getTranslation("profileDeleted"));
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: ScreenNames.signup }],
      })
    );
  }

  const handleOnPressYesSignOut = () => {
    setIsModalSignOutVisible(false);
    MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "false");
      MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
      flashMessageSucess(getTranslation("logoutSuccess"));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: ScreenNames.signin }],
        })
      );
    
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.settings}</Text>
      ),
    });
  }, []);

  return (
    <SettingComponent
      arrSettingData={arrSettingData}
      isModalDeleteVisible={isModalDeleteVisible}
      isModalSignOutVisible={isModalSignOutVisible}
      handleOnPressYesDelete={handleOnPressYesDelete}
      handleOnPressYesSignOut={handleOnPressYesSignOut}
      handleOnPressNoThanks={handleOnPressNoThanks}
      profileImage={profileImage}
      name={name}
    />
  );
};

export default SettingContainer;
