import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import ViewAllBestSellersComponent from "../../components/viewAllBestSellers";
import GlobalBackButton from "../../global/GlobalBackButton";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenNames } from "../../routers";
import { Restaurant } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";

const ViewAllBestSellersContainer = ({ navigation, route }: any) => {
  const [arrAllBestSellers, setArrAllBestSellers] = useState(route?.params?.arrBestSellers || []);

  const onPressFavourite = (index: number) => {
    const updatedList = [...arrAllBestSellers];
    updatedList[index].isFavourite = !updatedList[index].isFavourite;
    setArrAllBestSellers(updatedList);
  };

  const onPressRestaurant =(item: Restaurant)=>{
    navigation.navigate(ScreenNames.restaurantDetail,{item:item})
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
      headerTitle: () => (
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.allBestSellers}</Text>
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
    <ViewAllBestSellersComponent
      arrAllBestSellers={arrAllBestSellers}
      onPressFavourite={onPressFavourite}
      onPressRestaurant={onPressRestaurant}
    />
  );
};

export default ViewAllBestSellersContainer;
