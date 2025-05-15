import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import AddCompareProductsComponent from "../../components/addCompareProducts";
import GlobalBackButton from "../../global/GlobalBackButton";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { useFocusEffect } from "@react-navigation/native";

const AddCompareProductsContainer = ({ navigation, route }: any) => {
  const mainCategoryTitle = route.params?.mainCategoryTitle;
  const [arrCompareProducts, setArrCompareProducts] = useState([
    {
      height: 88,
      width: 60,
      product_img: images.rice,
      product_name: "India Gate Basmati Rice",
      product_rating: "4.5",
      product_final_price: "₹499",
      product_price: "₹600",
      product_weight: "1 kg",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
    },
    {
      height: 88,
      width: 88,
      product_img: images.rice1,
      product_name: "Scotti  Arborio Rice",
      product_rating: "4.5",
      product_final_price: "₹499",
      product_price: "₹600",
      product_weight: "1 kg",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
    },
    {
      height: 88,
      width: 62,
      product_img: images.rice2,
      product_name: "Gropure Black Rice",
      product_rating: "4.5",
      product_final_price: "₹499",
      product_price: "₹600",
      product_weight: "1 kg",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
    },
    {
      height: 88,
      width: 60,
      product_img: images.rice,
      product_name: "India Gate Basmati Rice",
      product_rating: "4.5",
      product_final_price: "₹499",
      product_price: "₹600",
      product_weight: "1 kg",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
    },
    {
      height: 88,
      width: 88,
      product_img: images.rice1,
      product_name: "Scotti  Arborio Rice",
      product_rating: "4.5",
      product_final_price: "₹499",
      product_price: "₹600",
      product_weight: "1 kg",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
    },
    {
      height: 88,
      width: 62,
      product_img: images.rice2,
      product_name: "Gropure Black Rice",
      product_rating: "4.5",
      product_final_price: "₹499",
      product_price: "₹600",
      product_weight: "1 kg",
      product_desc:
        "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
    },
  ]);

  const onPressAdd = (item: any) => {
    const onSelectProduct = route.params?.onSelectProduct;
    if (onSelectProduct) {
      onSelectProduct(item);
    }
    navigation.goBack();
  };

  const header = () => {
    navigation.setOptions({
      headerLeft: () => (
        <GlobalBackButton onPress={() => navigation.goBack()} />
      ),
      headerTitle: () => (
        <Text style={styles.txtHeaderTitle}>{mainCategoryTitle}</Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, [mainCategoryTitle]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      return () => {};
    }, [navigation])
  );
  return (
    <AddCompareProductsComponent
      arrCompareProducts={arrCompareProducts}
      onPressAdd={onPressAdd}
    />
  );
};

export default AddCompareProductsContainer;
