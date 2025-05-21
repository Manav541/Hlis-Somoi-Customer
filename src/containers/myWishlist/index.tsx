import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import MyWishlistComponent from "../../components/myWishlist";
import { images } from "../../constants/Images";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { WishlistItem } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";

const MyWishlistContainer = ({ navigation }: any) => {
  const [search, setSearch] = useState<string>("");
  const [arrMyWhislist, setArrMyWishlist] = useState<WishlistItem[]>([
    {
      product_img: images.rice,
      product_name: "India Gate Basmati Rice",
      product_price: "$600",
      product_weight: "1 kg",
      product_final_price: "$499",
      product_rating: "4.5",
      favourite: true,
      height: 88,
      width: 60,
    },
    {
      product_img: images.oil,
      product_name: "Fortune Premium Mustard Oil",
      product_price: "$600",
      product_weight: "500 ml",
      product_final_price: "$499",
      product_rating: "4.5",
      favourite: true,
      height: 100,
      width: 72,
    },
    {
      product_img: images.atta,
      product_name: "Aashirvaad Superior MP Atta",
      product_price: "$120",
      product_weight: "500 g",
      product_final_price: "$99",
      product_rating: "4.5",
      favourite: true,
      height: 88,
      width: 60,
    },
    {
      product_img: images.milk,
      product_name: "IA2 Cow Milk",
      product_price: "$600",
      product_weight: "1 L",
      product_final_price: "$499",
      product_rating: "4.5",
      favourite: true,
      height: 91.79,
      width: 72,
    },
    {
      product_img: images.rice,
      product_name: "India Gate Basmati Rice",
      product_price: "$600",
      product_weight: "1 kg",
      product_final_price: "$499",
      product_rating: "4.5",
      favourite: true,
      height: 88,
      width: 60,
    },
    {
      product_img: images.oil,
      product_name: "Fortune Premium Mustard Oil",
      product_price: "$600",
      product_weight: "500 ml",
      product_final_price: "$499",
      product_rating: "4.5",
      favourite: true,
      height: 100,
      width: 72,
    },
    {
      product_img: images.atta,
      product_name: "Aashirvaad Superior MP Atta",
      product_price: "$120",
      product_weight: "500 g",
      product_final_price: "$99",
      product_rating: "4.5",
      favourite: true,
      height: 88,
      width: 60,
    },
    {
      product_img: images.milk,
      product_name: "IA2 Cow Milk",
      product_price: "$600",
      product_weight: "1 L",
      product_final_price: "$499",
      product_rating: "4.5",
      favourite: true,
      height: 91.79,
      width: 72,
    },
  ]);

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  // Filter logic
  const filteredWishlist = arrMyWhislist.filter((item: WishlistItem) =>
    item.product_name.toLowerCase().includes(search.toLowerCase())
  );

  //   Remove from wishlist
  const handleRemoveFromWishlist = (indexToRemove: number) => {
    setArrMyWishlist((prev: WishlistItem[]) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
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
        <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.myWishlist}</Text>
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
    <MyWishlistComponent
      arrMyWhislist={filteredWishlist}
      search={search}
      onChangeSearch={onChangeSearch}
      handleRemoveFromWishlist={handleRemoveFromWishlist}
    />
  );
};

export default MyWishlistContainer;
