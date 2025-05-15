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
import { StatusBar } from "react-native";

const SettingContainer = ({ navigation, route }: any) => {
  console.log("route ==>>> ", route?.params?.name);
  const [profileImage, setProfileImage] = useState<any>(images.profileIcon);
  const [name, setName] = useState<string>("Jhon Doe");
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalSignOutVisible, setIsModalSignOutVisible] = useState(false);
 

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

  const arrSettingData = [
    {
      titleMain: getTranslation("manage"),
      subArr: [
        {
          icon: images.editProfileIcon,
          title: getTranslation("editProfile"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate(ScreenNames.editProfile),
        },
        {
          icon: images.changePasswordIcon,
          title: getTranslation("changePassword"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate(ScreenNames.changePassword, {
              navigateFromForgotPassword: false,
            }),
        },
        {
          icon: images.changeEmailIcon,
          title: getTranslation("changeEmail"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate(ScreenNames.changeEmailPhoneNumber, {
              navigateFrom: "ChangeEmail",
            }),
        },
        {
          icon: images.changePhoneIcon,
          title: getTranslation("changePhoneNumber"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate(ScreenNames.changeEmailPhoneNumber, {
              navigateFrom: "ChangePhoneNumber",
            }),
        },
        {
          icon: images.managePaymentIcon,
          title: getTranslation("managePaymentMethods"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate(ScreenNames.managePaymentMethods),
        },
        {
          icon: images.myWishlistIcon,
          title: getTranslation("myWishlist"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate(ScreenNames.myWishlist),
        },
        {
          icon: images.manageAddressIcon,
          title: getTranslation("manageAddresses"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate(ScreenNames.manageAddress,{navigateFromCart : false}),
        },
        {
          icon: images.availableOffersIcon,
          title: getTranslation("availableOffers"),
          height: 22,
          width: 22,
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
          height: 22,
          width: 22,
          onPress: () =>
            flashMessageWarning(getTranslation("underDevelopment")),
        },
        {
          icon: images.shareAppIcon,
          title: getTranslation("shareApp"),
          height: 22,
          width: 22,
          onPress: () =>
            flashMessageWarning(getTranslation("underDevelopment")),
        },
        {
          icon: images.aboutUsIcon,
          title: getTranslation("aboutUs"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate(ScreenNames.cmsPage, {
              navigateFrom: "aboutUs",
            }),
        },
        {
          icon: images.contactUsIcon,
          title: getTranslation("contactUs"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate(ScreenNames.contactUs),
        },
        {
          icon: images.faqIcon,
          title: getTranslation("faq"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate(ScreenNames.cmsPage, { navigateFrom: "faq" }),
        },
        {
          icon: images.privacyPolicyIcon,
          title: getTranslation("privacyPolicy"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate(ScreenNames.cmsPage, {
              navigateFrom: "privacyPolicy",
            }),
        },
        {
          icon: images.tcIcon,
          title: getTranslation("termsConditions"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate(ScreenNames.cmsPage, {
              navigateFrom: "termsConditions",
            }),
        },
      ],
    },
    {
      titleMain: getTranslation("logoutDeleteProfile"),
      subArr: [
        {
          icon: images.deleteProfileIcon,
          title: getTranslation("deleteProfile"),
          height: 22,
          width: 22,
          onPress: () => {
            setIsModalDeleteVisible(true);
          },
        },
        {
          icon: images.logoutIcon,
          title: getTranslation("logout"),
          height: 22,
          width: 22,
          onPress: () => {
            setIsModalSignOutVisible(true);
          },
        },
      ],
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

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
