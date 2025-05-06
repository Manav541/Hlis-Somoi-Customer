import React, { useEffect, useState } from 'react'
import GlobalBackButton from '../../global/GlobalBackButton';
import ManagePaymentMethodsComponent from '../../components/managePaymentMethods';

const ManagePaymentMethodsContainer = ({navigation }: any) => {

  const [arrCards, setArrCards] = useState<any>([
    {
      card_number : "4567 8901 2345 6789",
      card_expirydate : "12/23",
      card_holdername : "John Doe",
      card_cvv : "123",
      card_type : "visa",
    },
    {
      card_number : "4567 8901 2345 6789",
      card_expirydate : "12/23",
      card_holdername : "John Doe",
      card_cvv : "123",
      card_type : "mastercard",
    },
  ]);

  const handleOnPressAddCard = () => {
    navigation.navigate("");
  }
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

  return (
    <ManagePaymentMethodsComponent arrCards={arrCards} handleOnPressAddCard={handleOnPressAddCard} />
  )
}

export default ManagePaymentMethodsContainer