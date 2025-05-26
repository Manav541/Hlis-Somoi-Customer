import { View, Text, TextInput, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AddNewCardComponent from "../../components/addNewCard";
import GlobalBackButton from "../../global/GlobalBackButton";
import { regex } from "../../constants/Regex";
import {
  flashMessageSucess,
  flashMessageWarning,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { constnatStyles } from "../../constants/Styles";

const AddNewCardContainer = ({ navigation }: any) => {
  const [cardNumebr, setCardNumber] = useState<string>("");
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const cardNumebrRef = useRef<TextInput>(null);
  const cardHolderNameRef = useRef<TextInput>(null);
  const expiryDateRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  const [cardNumebrFocused, setCardNumebrFocused] = useState(false);
  const [cardHolderNameFocused, setCardHolderNameFocused] = useState(false);
  const [expiryDateFocused, setExpiryDateFocused] = useState(false);
  const [cvvFocused, setCvvFocused] = useState(false);

  const handleOnSubmit = (type: string) => {
    if (type === "cardNumber") {
      cardHolderNameRef?.current?.focus();
    } else if (type === "cardHolderName") {
      expiryDateRef?.current?.focus();
    } else {
      cvvRef?.current?.focus();
    }
  };

  const formatExpiryDate = (text: string): string => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleOnChangeText = (text: string, type: string) => {
    if (type === "cardNumber") {
      const cleaned = text.replace(/\D/g, '');
      if (cleaned.length <= 16) {
        setCardNumber(cleaned); 
      }
    } else if (type === "cardHolderName") {
      const cleaned = text.replace(/[^A-Za-z\s]/g, '').trim();
      setCardHolderName(cleaned);
    } else if (type === "expiryDate") {
      const cleaned = text.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        setExpiryDate(formatExpiryDate(cleaned));
      }
    } else {
      const cleaned = text.replace(/\D/g, '');
      if (cleaned.length <= 3) {
        setCvv(cleaned);
      }
    }
  };

  const handleOnFocus = (type: string) => {
    if (type === "cardNumber") {
      setCardNumebrFocused(true);
    } else if (type === "cardHolderName") {
      setCardHolderNameFocused(true);
    } else if (type === "expiryDate") {
      setExpiryDateFocused(true);
    } else {
      setCvvFocused(true);
    }
  };

  const handleOnBlur = (type: string) => {
    if (type === "cardNumber") {
      setCardNumebrFocused(false);
    } else if (type === "cardHolderName") {
      setCardHolderNameFocused(false);
    } else if (type === "expiryDate") {
      setExpiryDateFocused(false);
    } else {
      setCvvFocused(false);
    }
  };

  const handleOnPressAdd = () => {
    if (cardNumebr.trim() === "") {
      flashMessageWarning(getTranslation("emptyCardNumber"));
    } else if (cardNumebr.length !== 16) {
      flashMessageWarning(getTranslation('invalidCardNumber'));
    } else if (cardHolderName.trim() === "") {
      flashMessageWarning(getTranslation("emptyCardHolderName"));
    }  else if (expiryDate.trim() === "") {
      flashMessageWarning(getTranslation("emptyExpiryDate"));
    } else if (cvv.trim() === "") {
      flashMessageWarning(getTranslation("emptyCvv"));
    } else if (cvv.length !== 3) {
      flashMessageWarning(getTranslation('invalidCvv'));
    } else {
      const newCard = {
        card_number: cardNumebr,
        card_expirydate: expiryDate,
        card_holdername: cardHolderName,
        card_cvv: cvv,
        card_type: "visa"
      };
      
      navigation.goBack("Manage Payment Methods", {
        newCardData: newCard
      });
      flashMessageSucess(getTranslation("successAddNewCard"));
    }
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.addNewCard}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <AddNewCardComponent
      cardNumber={cardNumebr}
      cardHolderName={cardHolderName}
      expiryDate={expiryDate}
      cvv={cvv}
      cardNumberRef={cardNumebrRef}
      cardHolderNameRef={cardHolderNameRef}
      expiryDateRef={expiryDateRef}
      cvvRef={cvvRef}
      cardNumberFocused={cardNumebrFocused}
      cardHolderNameFocused={cardHolderNameFocused}
      expiryDateFocused={expiryDateFocused}
      cvvFocused={cvvFocused}
      handleOnChangeText={handleOnChangeText}
      handleOnSubmit={handleOnSubmit}
      handleOnPressAdd={handleOnPressAdd}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
    />
  );
};

export default AddNewCardContainer;
