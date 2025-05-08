import React, { useState, useEffect } from "react";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import SettingComponent from "../../../components/bottomTabs/setting";
import {
  flashMessageSucess,
  flashMessageWarning,
  showAlert,
} from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { MmkvManager } from "../../../constants/utils/MmkvManager";
import { CommonActions } from "@react-navigation/native";
import { ScreeNames } from "../../../routers";

const SettingContainer = ({ navigation, route }: any) => {
  console.log("route ==>>> ", route?.params?.name);
  const [profileImage, setProfileImage] = useState<any>(images.profileIcon);
  const [name, setName] = useState<string>("Jhon Doe");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<"delete" | "logout">(
    "logout"
  );

  useEffect(() => {
    if (route.params?.profileImage && route.params?.name) {
      setProfileImage(route.params?.profileImage);
      setName(route.params?.name);
    }
    {
    }
  }, [route.params]);

  const handleOnPressNoThanks = () => {
    setIsModalVisible(false);
  };

  const handleOnPressYesDelete = () => {
    setIsModalVisible(false);
    if (selectedType === "delete") {
      MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "false");
      MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
      flashMessageSucess(getTranslation("profileDeleted"));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: ScreeNames.signup }],
        })
      );
    } else {
      MmkvManager.setData(MmkvManager.Keys.isLoggedIn, "false");
      MmkvManager.setData(MmkvManager.Keys.isGuestUser, "false");
      flashMessageSucess(getTranslation("logoutSuccess"));
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: ScreeNames.signin }],
        })
      );
    }
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
          onPress: () => navigation.navigate("Edit Profile"),
        },
        {
          icon: images.changePasswordIcon,
          title: getTranslation("changePassword"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate("Change Password", {
              navigateFromForgotPassword: false,
            }),
        },
        {
          icon: images.changeEmailIcon,
          title: getTranslation("changeEmail"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate("ChangeEmailPhoneNumberContainer", {
              navigateFrom: "ChangeEmail",
            }),
        },
        {
          icon: images.changePhoneIcon,
          title: getTranslation("changePhoneNumber"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate("ChangeEmailPhoneNumberContainer", {
              navigateFrom: "ChangePhoneNumber",
            }),
        },
        {
          icon: images.managePaymentIcon,
          title: getTranslation("managePaymentMethods"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate("Manage Payment Methods"),
        },
        {
          icon: images.myWishlistIcon,
          title: getTranslation("myWishlist"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate("My Wishlist"),
        },
        {
          icon: images.manageAddressIcon,
          title: getTranslation("manageAddresses"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate("Manage Address"),
        },
        {
          icon: images.availableOffersIcon,
          title: getTranslation("availableOffers"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate("Available Offers"),
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
            navigation.navigate("CMSPageContainer", {
              navigateFrom: "aboutUs",
            }),
        },
        {
          icon: images.contactUsIcon,
          title: getTranslation("contactUs"),
          height: 22,
          width: 22,
          onPress: () => navigation.navigate("Contact Us"),
        },
        {
          icon: images.faqIcon,
          title: getTranslation("faq"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate("CMSPageContainer", { navigateFrom: "faq" }),
        },
        {
          icon: images.privacyPolicyIcon,
          title: getTranslation("privacyPolicy"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate("CMSPageContainer", {
              navigateFrom: "privacyPolicy",
            }),
        },
        {
          icon: images.tcIcon,
          title: getTranslation("termsConditions"),
          height: 22,
          width: 22,
          onPress: () =>
            navigation.navigate("CMSPageContainer", {
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
            setSelectedType("delete");
            setIsModalVisible(true);
          },
        },
        {
          icon: images.logoutIcon,
          title: getTranslation("logout"),
          height: 22,
          width: 22,
          onPress: () => {
            setSelectedType("logout");
            setIsModalVisible(true);
          },
        },
      ],
    },
  ];

  return (
    <SettingComponent
      arrSettingData={arrSettingData}
      isModalVisible={isModalVisible}
      selectedType={selectedType}
      handleOnPressYesDelete={handleOnPressYesDelete}
      handleOnPressNoThanks={handleOnPressNoThanks}
      profileImage={profileImage}
      name={name}
    />
  );
};

export default SettingContainer;
