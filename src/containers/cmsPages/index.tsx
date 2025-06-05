import { StatusBar, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getTranslation } from "../../localization/i18n/i18n.config";
import CMSPageComponent from "../../components/cmsPages";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { constnatStyles } from "../../constants/Styles";
import { zustandStore } from "../../store";
import { flashMessageWarning } from "../../constants/GConstant";
import { statusCodes } from "../../api/APIConstant";

const CMSPageContainer = ({ navigation, route }: any) => {
  // API
  const cmsPagesApi = zustandStore.AuthStore((state) => state.cmsPages);
  const [webViewLink, setWebViewLink] = useState("");

  const navigateFrom = route.params?.navigateFrom;

  const handleApiCMSPages = async () => {
    const dictData = {
      keyword:
        navigateFrom === "aboutUs"
          ? "about_us"
          : navigateFrom === "termsConditions"
          ? "terms_conditions"
          : navigateFrom === "faq"
          ? "faq"
          : "privacy_policy",
    };
    const response = await cmsPagesApi(dictData, navigation);
    __DEV__ && console.log("CMS PAGES RESPONSE====>", JSON.stringify(response));
    if (response.code === statusCodes.success) {
      if (response.data && typeof response.data === "object") {
        const details = response?.data as { content: string };
        setWebViewLink(details.content);
      }
    } else if (response.code === statusCodes.invaildOrFail) {
      flashMessageWarning(response.message);
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>
          {navigateFrom === "aboutUs"
            ? getTranslation("aboutUs")
            : navigateFrom === "termsConditions"
            ? getTranslation("termsConditions")
            : navigateFrom === "faq"
            ? getTranslation("faq")
            : getTranslation("privacyPolicy")}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
    handleApiCMSPages();
  }, [navigateFrom]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  return <CMSPageComponent webViewLink={webViewLink} />;
};

export default CMSPageContainer;
