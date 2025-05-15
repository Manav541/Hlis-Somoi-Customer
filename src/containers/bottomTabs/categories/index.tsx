import { StatusBar } from "react-native";
import React from "react";
import CategoriesComponent from "../../../components/bottomTabs/categories";
import { images } from "../../../constants/Images";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";

const CategoriesContainer = ({ navigation }: any) => {
  const [arrAllCategories, setArrAllCategories] = React.useState<any>([
    {
      image: images.groceriesC1,
      name: "Groceries",
      arrSubCategory: [
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
          ],
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          product_review: 250,
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Cooking Oil",
          product_imgMain: [
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
          ],
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 100,
          width: 72,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
          ],
          product_img: images.rice1,
          product_name: "Scotti Arborio Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 88,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Flour",
          product_imgMain: [
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
          ],
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
          ],
          product_img: images.rice2,
          product_name: "Gropure Black Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 62,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Milk",
          product_imgMain: [
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
          ],
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
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
              imgMain: images.restaurantImage,
            },
            {
              imgMain: images.restaurantImage1,
            },
            {
              imgMain: images.restaurantImage2,
            },
          ],
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
              imgMain: images.restaurantImage1,
            },
            {
              imgMain: images.restaurantImage2,
            },
            {
              imgMain: images.restaurantImage,
            },
          ],
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
              imgMain: images.restaurantImage2,
            },
            {
              imgMain: images.restaurantImage1,
            },
            {
              imgMain: images.restaurantImage,
            },
          ],
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
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
          ],
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          product_review: 250,
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Cooking Oil",
          product_imgMain: [
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
          ],
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 100,
          width: 72,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
          ],
          product_img: images.rice1,
          product_name: "Scotti Arborio Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 88,
        },
        {
          subCategoryTitle: "Flour",
          product_imgMain: [
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
          ],
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
          ],
          product_img: images.rice2,
          product_name: "Gropure Black Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 62,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Milk",
          product_imgMain: [
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
          ],
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
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
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
          ],
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          product_review: 250,
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Cooking Oil",
          product_imgMain: [
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
          ],
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 100,
          width: 72,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
          ],
          product_img: images.rice1,
          product_name: "Scotti Arborio Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 88,
        },
        {
          subCategoryTitle: "Flour",
          product_imgMain: [
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
          ],
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
          ],
          product_img: images.rice2,
          product_name: "Gropure Black Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 62,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Milk",
          product_imgMain: [
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
          ],
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
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
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
          ],
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          product_review: 250,
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Cooking Oil",
          product_imgMain: [
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
          ],
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 100,
          width: 72,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
          ],
          product_img: images.rice1,
          product_name: "Scotti Arborio Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 88,
        },
        {
          subCategoryTitle: "Flour",
          product_imgMain: [
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
          ],
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
          ],
          product_img: images.rice2,
          product_name: "Gropure Black Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 62,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Milk",
          product_imgMain: [
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
          ],
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
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
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
            {
              imgMain: images.rice,
            },
          ],
          product_img: images.rice,
          product_name: "India Gate Basmati Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          product_review: 250,
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Cooking Oil",
          product_imgMain: [
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
            {
              imgMain: images.oil,
            },
          ],
          product_img: images.oil,
          product_name: "Fortune Premium Mustard Oil",
          product_price: "₹600",
          product_weight: "500 ml",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 100,
          width: 72,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
            {
              imgMain: images.rice1,
            },
          ],
          product_img: images.rice1,
          product_name: "Scotti Arborio Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 88,
        },
        {
          subCategoryTitle: "Flour",
          product_imgMain: [
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
            {
              imgMain: images.atta,
            },
          ],
          product_img: images.atta,
          product_name: "Aashirvaad Superior MP Atta",
          product_price: "₹120",
          product_weight: "500 g",
          product_final_price: "₹99",
          product_rating: "4.5",
          isFavourite: false,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Rice",
          product_imgMain: [
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
            {
              imgMain: images.rice2,
            },
          ],
          product_img: images.rice2,
          product_name: "Gropure Black Rice",
          product_price: "₹600",
          product_weight: "1 kg",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 62,
        },
        {
          mainCategoryTitle: "Groceries",
          subCategoryTitle: "Milk",
          product_imgMain: [
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
            {
              imgMain: images.milk,
            },
          ],
          product_img: images.milk,
          product_name: "IA2 Cow Milk",
          product_price: "₹600",
          product_weight: "1 L",
          product_final_price: "₹499",
          product_rating: "4.5",
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
          product_highlight: [
            {
              highlightTitle: "Grain Size",
              highlightDesc: "250",
            },
            {
              highlightTitle: "Organic",
              highlightDesc: "No",
            },
            {
              highlightTitle: "Polished",
              highlightDesc: "Yes",
            },
            {
              highlightTitle: "Brand",
              highlightDesc: "India Gate",
            },
            {
              highlightTitle: "Fssai license ",
              highlightDesc: "250",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.productReturn,
              deliveryDataTitle: "3 day Return/ Exchange",
            },
            {
              deliveryDataImage: images.cashOnDelivery,
              deliveryDataTitle: "Cash on Delivery",
            },
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 91.79,
          width: 72,
        },
      ],
    },
    {
      image: images.fashionC7,
      name: "Fashion",
      arrSubCategory: [
        {
          mainCategoryTitle: "Fashion",
          subCategoryTitle: "T-shirt",
          product_imgMain: [
            {
              imgMain: images.fashionMainImg,
            },
            {
              imgMain: images.fashionMainImg,
            },
            {
              imgMain: images.fashionMainImg,
            },
          ],
          product_img: images.fashionMainImg,
          product_name: "Dennis Lingo",
          product_price: "₹500",
          product_final_price: "₹299",
          product_rating: "4.5",
          product_review: 250,
          isFavourite: true,
          product_quantity: 0,
          product_deliverytime: "10 Min",
          product_distance: "5 km",
          product_desc:
            "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
          product_highlight: [
            {
              highlightTitle: "GSize & Fit",
              highlightDesc: "Regular Fit",
            },
            {
              highlightTitle: "Material & Care",
              highlightDesc: "Cotton ,Mashine Wash",
            },
            {
              highlightTitle: "Main Trend",
              highlightDesc: "Monochrome",
            },
            {
              highlightTitle: "Neck",
              highlightDesc: "Polo Collar",
            },
          ],
          product_inStock: true,
          product_deliveryData: [
            {
              deliveryDataImage: images.fastDelivery,
              deliveryDataTitle: "Fast Delivery",
            },
          ],
          height: 88,
          width: 60,
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

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      return () => {};
    }, [navigation])
  );

  return (
    <CategoriesComponent
      arrAllCategories={arrAllCategories}
      onPressMainCategories={onPressMainCategories}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
    />
  );
};

export default CategoriesContainer;
