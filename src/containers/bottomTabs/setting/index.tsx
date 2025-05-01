import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import SettingComponent from "../../../components/bottomTabs/setting";
import { colors } from "../../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PlatformVersion } from "../../../constants/utils/Platform";
import { styles } from "./styles";
import { Images } from "../../../constants/Images";
import { showAlert } from "../../../constants/GConstant";

const SettingContainer = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const arrSettingData = [
    {
      titleMain: getTranslation("manage"),
      subArr: [
        {
          icon: Images.editProfileIcon,
          title: getTranslation("editProfile"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('EditProfileContainer')
        },
        {
          icon: Images.changePasswordIcon,
          title: getTranslation("changePassword"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('EditProfileContainer')
        },
        {
          icon: Images.changeEmailIcon,
          title: getTranslation("changeEmail"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('EditProfileContainer')
        },
        {
          icon: Images.changePhoneIcon,
          title: getTranslation("changePhoneNumber"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('EditProfileContainer')
        },
        {
          icon: Images.managePaymentIcon,
          title: getTranslation("managePaymentMethods"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('EditProfileContainer')
        },
        {
          icon: Images.myWishlistIcon,
          title: getTranslation("myWishlist"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('EditProfileContainer')
        },
        {
          icon: Images.manageAddressIcon,
          title: getTranslation("manageAddresses"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('EditProfileContainer')
        },
        {
          icon: Images.availableOffersIcon,
          title: getTranslation("availableOffers"),
          height : 22,
          width : 22,
          onPress: () => navigation.navigate('AvailableOffersContainer')
        },
      ],
    },
    {
        titleMain: getTranslation("general"),
        subArr: [
          {
            icon: Images.rateAppIcon,
            title: getTranslation("rateApp"),
            height : 22,
            width : 22,
            onPress: () => showAlert('underDevelopment')
          },
          {
            icon: Images.shareAppIcon,
            title: getTranslation("shareApp"),
            height : 22,
            width : 22,
            onPress: () => showAlert('underDevelopment')
          },
          {
            icon: Images.aboutUsIcon,
            title: getTranslation("aboutUs"),
            height : 22,
            width : 22,
            onPress: () => navigation.navigate('CMSPageContainer',{navigateFrom : 'aboutUs'})
          },
          {
            icon: Images.contactUsIcon,
            title: getTranslation("contactUs"),
            height : 22,
            width : 22,
            onPress: () => navigation.navigate('EditProfileContainer')
          },
          {
            icon: Images.faqIcon,
            title: getTranslation("faq"),
            height : 22,
            width : 22,
            onPress: () => navigation.navigate('CMSPageContainer',{navigateFrom : 'faq'})
          },
          {
            icon: Images.privacyPolicyIcon,
            title: getTranslation("privacyPolicy"),
            height : 22,
            width : 22,
            onPress: () => navigation.navigate('CMSPageContainer',{navigateFrom : 'privacyPolicy'})
          },
          {
            icon: Images.tcIcon,
            title: getTranslation("termsConditions"),
            height : 22,
            width : 22,
            onPress: () => navigation.navigate('CMSPageContainer',{navigateFrom : 'termsConditions'})
          },
        ],
      },
      {
        titleMain: getTranslation("logoutDeleteProfile"),
        subArr: [
          {
            icon: Images.deleteProfileIcon,
            title: getTranslation("deleteProfile"),
            height : 22,
            width : 22,
            onPress: () => navigation.navigate('EditProfileContainer')
          },
          {
            icon: Images.logoutIcon,
            title: getTranslation("logout"),
            height : 22,
            width : 22,
            onPress: () => navigation.navigate('EditProfileContainer')
          },
        ],
      },
  ];

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          style={{
            ...styles.vwHeader,
            paddingTop: PlatformVersion.isIOS ? insets.top : 0,
          }}
        >
          <Text style={styles.txtHeaderTitle}>{getTranslation("setting")}</Text>
        </View>
      ),
    });
  }, []);

  return <SettingComponent arrSettingData={arrSettingData} />;
};

export default SettingContainer;
