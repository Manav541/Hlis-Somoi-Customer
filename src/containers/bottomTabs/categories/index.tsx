import { View, Text } from "react-native";
import React from "react";
import CategoriesComponent from "../../../components/bottomTabs/categories";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";

const CategoriesContainer = ({ navigation }: any) => {
  const [arrAllCategories, setArrAllCategories] = React.useState<any>([
    {
      image: images.groceriesC1,
      name: "Groceries",
      arrSubCategory: [
        {
          subCategoryTitle: "Rice",
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Cooking Oil",
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 100,
          width: 72,
        },
        {
          subCategoryTitle: "Rice",
          product_img: images.rice1,
          product_name: "Scotti Arborio Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 88,
        },
        {
          subCategoryTitle: "Flour",
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Rice",
          product_img: images.rice2,
          product_name: "Gropure Black Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 62,
        },
        {
          subCategoryTitle: "Milk",
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 91.79,
          width: 72,
        },
      ],
    },
    {
      image: images.foodC2,
      name: "Food",
      arrSubCategory: [
        {
          restaurant_imgMain: [
            {
              imgMain: images.restaurantImage
            },
            {
              imgMain: images.restaurantImage1
            },
            {
              imgMain: images.restaurantImage2
            },
          ] ,
          subCategoryTitle: "Fast Food & Snacks",
          restaurant_img: images.bs1,
          restaurant_logo: images.burgerKingLogo,
          restaurant_name: "Burger King",
          restaurant_address: "Denver Church, California, USA",
          restaurant_time: "10:00-18:00",
          restaurant_deliverytime: "1 hour",
          restaurant_distance: "1 km",
          restaurant_ratings: 4.5,
          restaurant_reviews: 250,
          isFavourite: true,
        },
        {
          restaurant_imgMain: [
            {
              imgMain: images.restaurantImage1
            },
            {
              imgMain: images.restaurantImage2
            },
            {
              imgMain: images.restaurantImage
            },
          ] ,
          subCategoryTitle: "Fast Food & Snacks",
          restaurant_img: images.bs2,
          restaurant_logo: images.macdonaldsLogo,
          restaurant_name: "Macdonalds",
          restaurant_address: "Denver Church, California, USA",
          restaurant_time: "10:00-18:00",
          restaurant_deliverytime: "1 hour",
          restaurant_distance: "1.2 km",
          restaurant_ratings: 4.5,
          restaurant_reviews: 200,
          isFavourite: false,
        },
        {
          restaurant_imgMain: [
            {
              imgMain: images.restaurantImage2
            },
            {
              imgMain: images.restaurantImage1
            },
            {
              imgMain: images.restaurantImage
            },
          ] ,
          subCategoryTitle: "Local & Regional Cuisine",
          restaurant_img: images.bs3,
          restaurant_logo: images.subwayLogo,
          restaurant_name: "Subway",
          restaurant_address: "Denver Church, California, USA",
          restaurant_time: "10:00-18:00",
          restaurant_deliverytime: "1 hour",
          restaurant_distance: "3 km",
          restaurant_ratings: 4.5,
          restaurant_reviews: 200,
          isFavourite: false,
        },
      ],
    },
    {
      image: images.fruitC3,
      name: " Fruits & Vegetables",
      arrSubCategory: [
        {
          subCategoryTitle: "Rice",
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Cooking Oil",
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 100,
          width: 72,
        },
        {
          subCategoryTitle: "Flour",
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Milk",
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 91.79,
          width: 72,
        },
      ],
    },
    {
      image: images.beautyC4,
      name: "Beauty & Personal Care",
      arrSubCategory: [
        {
          subCategoryTitle: "Rice",
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Cooking Oil",
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 100,
          width: 72,
        },
        {
          subCategoryTitle: "Flour",
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Milk",
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 91.79,
          width: 72,
        },
      ],
    },
    {
      image: images.electronicsC5,
      name: "Electronics & Accessories ",
      arrSubCategory: [
        {
          subCategoryTitle: "Rice",
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Cooking Oil",
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 100,
          width: 72,
        },
        {
          subCategoryTitle: "Flour",
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Milk",
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 91.79,
          width: 72,
        },
      ],
    },
    {
      image: images.householdC6,
      name: " Household Essentials",
      arrSubCategory: [
        {
          subCategoryTitle: "Rice",
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Cooking Oil",
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 100,
          width: 72,
        },
        {
          subCategoryTitle: "Flour",
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 88,
          width: 60,
        },
        {
          subCategoryTitle: "Milk",
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          favourite: true,
          product_quantity: 0,
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          height: 91.79,
          width: 72,
        },
      ],
    },
  ]);

  const onPressMainCategories = (
    mainCategoryName: string,
    arrSubCategory: any
  ) => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryName: mainCategoryName,
      arrSubCategory: arrSubCategory,
    });
  };
  // handleOnPressNotifaicationIcon
  const handleOnPressNotifaicationIcon = () => {
    navigation.navigate(ScreenNames.notification);
  };
  return (
    <CategoriesComponent
      arrAllCategories={arrAllCategories}
      onPressMainCategories={onPressMainCategories}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
    />
  );
};

export default CategoriesContainer;
