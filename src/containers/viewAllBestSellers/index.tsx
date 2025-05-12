import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ViewAllBestSellersComponent from "../../components/viewAllBestSellers";
import GlobalBackButton from "../../global/GlobalBackButton";

const ViewAllBestSellersContainer = ({ navigation, route }: any) => {
  const [arrAllBestSellers, setArrAllBestSellers] = useState(route?.params?.arrBestSellers || []);

  const onPressFavourite = (index: number) => {
    const updatedList = [...arrAllBestSellers];
    updatedList[index].isFavourite = !updatedList[index].isFavourite;
    setArrAllBestSellers(updatedList);
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
  return (
    <ViewAllBestSellersComponent
      arrAllBestSellers={arrAllBestSellers}
      onPressFavourite={onPressFavourite}
    />
  );
};

export default ViewAllBestSellersContainer;
