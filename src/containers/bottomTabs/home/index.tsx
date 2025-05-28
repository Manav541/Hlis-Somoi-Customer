import React, {useState } from "react";
import HomeComponent from "../../../components/bottomTabs/home";
import { images } from "../../../constants/Images";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import { ScreenNames } from "../../../routers";
import { useFocusEffect } from "@react-navigation/native";
import {
  StatusBar,
} from "react-native";
import {
  AdItem,
  BestProduct,
  GroceriesFoodItem,
  Restaurant,
  SubCategory,
} from "../../../constants/interfaces";

const HomeContainer = ({ navigation }: any) => {
  const [arrGroceriesFood, setArrGroceriesFood] = useState<GroceriesFoodItem[]>(
    [
      {
        type: getTranslation("groceries"),
        image: images.g1,
      },
      {
        type: getTranslation("food"),
        image: images.f1,
      },
    ]
  );
  const [arrAds, setArrAds] = useState<AdItem[]>([
    {
      image: images.banner,
    },
    {
      image: images.banner,
    },
    {
      image: images.banner,
    },
  ]);
  const [arrSubCategoryGroceries, setArrSubCategoryGroceries] = useState<
    SubCategory[]
  >([
    {
      image: images.riceG,
      name: "Rice",
    },
    {
      image: images.pulsesG,
      name: "Pulses",
    },
    {
      image: images.flourG,
      name: "Flour",
    },
    {
      image: images.cookingOilG,
      name: "Cooking Oil",
    },
    {
      image: images.dairyG,
      name: "Dairy",
    },
    {
      image: images.spicesG,
      name: "Spices",
    },
    {
      image: images.snacksG,
      name: "Snacks",
    },
    {
      image: images.beveragesG,
      name: "Beverages",
    },
  ]);
  const arrSubCategory = [
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
      product_price: "600",
      product_weight: "1 kg",
      product_final_price: "499",
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
      product_price: "600",
      product_weight: "500 ml",
      product_final_price: "499",
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
      product_price: "600",
      product_weight: "1 kg",
      product_final_price: "499",
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
      product_price: "120",
      product_weight: "500 g",
      product_final_price: "99",
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
      product_price: "600",
      product_weight: "1 kg",
      product_final_price: "499",
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
      product_price: "600",
      product_weight: "1 L",
      product_final_price: "499",
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
  ];
  const [arrSubCategoryFood, setArrSubCategoryFood] = useState<SubCategory[]>([
    {
      image: images.food1,
      name: "Local & Regional ",
    },
    {
      image: images.food2,
      name: "Fast Food & Snacks",
    },
    {
      image: images.food3,
      name: "Indian & Asian",
    },
    {
      image: images.food4,
      name: "Non-Vegetarian ",
    },
    {
      image: images.food5,
      name: "Vegetarian & Healthy",
    },
    {
      image: images.food6,
      name: "Desserts & Beverages",
    },
    {
      image: images.food7,
      name: "Special Diet & Organic",
    },
    {
      image: images.food8,
      name: "Combo Meals & Family Packs",
    },
  ]);
  const [arrBestProducts, setArrBestProducts] = useState<BestProduct[]>([
    {
      image: images.milkBP,
      name: "Dairy",
      used: "+13 More",
      height: 102,
      width: 102,
    },
    {
      image: images.rice,
      name: "Rice",
      used: "+13 More",
      height: 102.4,
      width: 70.31,
    },
    {
      image: images.spicesBP,
      name: "Spices",
      used: "+13 More",
      height: 129.33,
      width: 103.41,
    },
    {
      image: images.snackBP,
      name: "Snacks",
      used: "+13 More",
      height: 87.24,
      width: 65.98,
    },
  ]);
  const [arrBestSellers, setArrBestSellers] = useState<Restaurant[]>([
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
  ]);

  const [isGroceriesFoodSelected, setIsGroceriesFoodSelected] =
    useState<string>("Groceries");

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const handleSetBannerIndex = (index: number) => {
    setCurrentBannerIndex(index);
  };

  const onPressSearch = () => {
    navigation.navigate(ScreenNames.search);
  };

  const onPressLocation = () => {
    navigation.navigate(ScreenNames.manageAddress,{ navigateFromHome: true });
  };

  const onPressGroceriesFood = (type: string) => {
    setIsGroceriesFoodSelected(type);
  };

  // handleSellAllCategories
  const handleSellAllCategories = () => {
    navigation.navigate(ScreenNames.allCategories);
  };

  // handleSellAllBestSellers
  const handleSellAllBestSellers = () => {
    navigation.navigate(ScreenNames.allBestSellers, {
      arrBestSellers: arrBestSellers,
    });
  };

  const onPressRestaurant = (item: Restaurant) => {
    navigation.navigate(ScreenNames.restaurantDetail, { item: item });
  };

  const onPressSubCategories = () => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryName: isGroceriesFoodSelected,
      arrSubCategory:
        isGroceriesFoodSelected === "Groceries"
          ? arrSubCategory
          : arrBestSellers,
    });
  };

  const onPressBestProducts = () => {
    navigation.navigate(ScreenNames.productListing, {
      mainCategoryName: isGroceriesFoodSelected,
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
    <HomeComponent
      arrGroceriesFood={arrGroceriesFood}
      onPressGroceriesFood={onPressGroceriesFood}
      isGroceriesFoodSelected={isGroceriesFoodSelected}
      arrAds={arrAds}
      handleSetBannerIndex={handleSetBannerIndex}
      currentBannerIndex={currentBannerIndex}
      arrSubCategoryGroceries={arrSubCategoryGroceries}
      arrBestProducts={arrBestProducts}
      arrSubCategoryFood={arrSubCategoryFood}
      arrBestSellers={arrBestSellers}
      handleSellAllCategories={handleSellAllCategories}
      handleSellAllBestSellers={handleSellAllBestSellers}
      onPressSearch={onPressSearch}
      handleOnPressNotifaicationIcon={handleOnPressNotifaicationIcon}
      onPressLocation={onPressLocation}
      onPressRestaurant={onPressRestaurant}
      onPressSubCategories={onPressSubCategories}
      onPressBestProducts={onPressBestProducts}
    />
  );
};

export default HomeContainer;
