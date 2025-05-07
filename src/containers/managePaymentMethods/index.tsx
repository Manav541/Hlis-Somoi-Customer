import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import ManagePaymentMethodsComponent from "../../components/managePaymentMethods";
import {
  flashMessageSucess,
  showConfirmAlert,
} from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";

const ManagePaymentMethodsContainer = ({ navigation, route }: any) => {
  const [arrCards, setArrCards] = useState<any>([
    {
      card_number: "4567890123456789",
      card_expirydate: "12/23",
      card_holdername: "John Doe",
      card_cvv: "123",
      card_type: "visa",
    },
    {
      card_number: "4567890123456789",
      card_expirydate: "12/23",
      card_holdername: "John Doe",
      card_cvv: "123",
      card_type: "mastercard",
    },
  ]);

  const handleOnPressAddCard = () => {
    navigation.navigate("Add New Card");
  };
  const handleDelete = (index: number) => {
    showConfirmAlert("Are you sure want to delete this card?", () => {
      const updatedData = [...arrCards];
      updatedData.splice(index, 1);
      setArrCards(updatedData);
      flashMessageSucess(getTranslation("deleteCardSuccess"));
    });
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
    });
  };

  useEffect(() => {
    header();
  }, []);

  useEffect(() => {
    if (route?.params?.newCardData) {
      setArrCards((prevCards: any) => [...prevCards, route.params.newCardData]);
    }
  }, [route?.params?.newCardData]);

  return (
    <ManagePaymentMethodsComponent
      arrCards={arrCards}
      handleOnPressAddCard={handleOnPressAddCard}
      handleDelete={handleDelete}
    />
  );
};

export default ManagePaymentMethodsContainer;
