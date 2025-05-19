import { StatusBar, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { styles } from "./styles";
import CMSPageComponent from "../../components/cmsPages";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { FaqArrProps } from "../../constants/utils/interfaces";



const CMSPageContainer = ({ navigation, route }: any) => {
  const navigateFrom = route.params?.navigateFrom;

  const [faqArr, setFarArr] = useState<FaqArrProps[]>([
    {
      faqTitle: getTranslation("faqTitle1"),
      faqDesc: getTranslation("faqDescription"),
      isSelected: true,
    },
    {
      faqTitle: getTranslation("faqTitle2"),
      faqDesc: getTranslation("faqDescription"),
      isSelected: false,
    },
    {
      faqTitle: getTranslation("faqTitle3"),
      faqDesc: getTranslation("faqDescription"),
      isSelected: false,
    },
    {
      faqTitle: getTranslation("faqTitle4"),
      faqDesc: getTranslation("faqDescription"),
      isSelected: false,
    },
    {
      faqTitle: getTranslation("faqTitle5"),
      faqDesc: getTranslation("faqDescription"),
      isSelected: false,
    },
  ]);

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={styles.txtHeaderTitle}>
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
  }, [navigateFrom]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );

  const handleOnPressFaq = (index: number) => {
    const updatedFaqArr = faqArr.map((faq, i) =>
      i === index
        ? { ...faq, isSelected: !faq.isSelected }
        : { ...faq, isSelected: false }
    );
    setFarArr(updatedFaqArr);
  };

  return (
    <CMSPageComponent
      navigateFrom={navigateFrom}
      faqArr={faqArr}
      handleOnPressFaq={handleOnPressFaq}
    />
  );
};

export default CMSPageContainer;
