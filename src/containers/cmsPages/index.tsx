import { View, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { styles } from "./styles";
import CMSPageComponent from "../../components/cmsPages";

interface FaqArrProps {
  faqTitle: string | null;
  faqDesc: string | null;
  isSelected: boolean;
}

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

  useLayoutEffect(() => {
    navigation.setOptions({
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
  }, [navigation, navigateFrom]);

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
