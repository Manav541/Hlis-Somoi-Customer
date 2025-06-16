import React, { useEffect, useState } from "react";
import GlobalBackButton from "../../global/GlobalBackButton";
import MyWishlistComponent from "../../components/myWishlist";
import { images } from "../../constants/Images";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { GroceryProduct } from "../../constants/interfaces";
import { constnatStyles } from "../../constants/Styles";
import { ScreenNames } from "../../routers";
import { flashMessageWarning } from "../../constants/GConstant";
import { statusCodes } from "../../api/APIConstant";
import { zustandStore } from "../../store";

const MyWishlistContainer = ({ navigation }: any) => {
  // API Zustand store
  const myWhilistApi = zustandStore.MyWishlistStore(
    (state) => state.myWishlist
  );

  const [search, setSearch] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("Product");
  const [arrMyWhislist, setArrMyWishlist] = useState<GroceryProduct[]>([
    // {
    //   mainCategoryTitle: "Groceries",
    //   subCategoryTitle: "Rice",
    //   product_imgMain: [
    //     {
    //       imgMain: images.rice,
    //     },
    //     {
    //       imgMain: images.rice,
    //     },
    //     {
    //       imgMain: images.rice,
    //     },
    //   ],
    //   product_img: images.rice,
    //   product_name: "India Gate Basmati Rice",
    //   product_price: "600",
    //   product_weight: "1 kg",
    //   product_final_price: "499",
    //   product_rating: "4.5",
    //   product_review: 250,
    //   isFavourite: true,
    //   product_quantity: 0,
    //   product_deliverytime: "10 Min",
    //   product_distance: "5 KM",
    //   product_desc:
    //     "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  using Lorem Ipsum is that it has a more-or-less normal distribution of  letters, as opposed to using 'Content here, content here', making it  look like readable English.",
    //   product_highlight: [
    //     {
    //       highlightTitle: "Grain Size",
    //       highlightDesc: "250",
    //     },
    //     {
    //       highlightTitle: "Organic",
    //       highlightDesc: "No",
    //     },
    //     {
    //       highlightTitle: "Polished",
    //       highlightDesc: "Yes",
    //     },
    //     {
    //       highlightTitle: "Brand",
    //       highlightDesc: "India Gate",
    //     },
    //     {
    //       highlightTitle: "Fssai license ",
    //       highlightDesc: "250",
    //     },
    //   ],
    //   product_inStock: true,
    //   product_deliveryData: [
    //     {
    //       deliveryDataImage: images.productReturn,
    //       deliveryDataTitle: "3 day Return/ Exchange",
    //     },
    //     {
    //       deliveryDataImage: images.cashOnDelivery,
    //       deliveryDataTitle: "Cash on Delivery",
    //     },
    //     {
    //       deliveryDataImage: images.fastDelivery,
    //       deliveryDataTitle: "Fast Delivery",
    //     },
    //   ],
    //   height: 88,
    //   width: 60,
    // },
    // {
    //   mainCategoryTitle: "Groceries",
    //   subCategoryTitle: "Cooking Oil",
    //   product_imgMain: [
    //     {
    //       imgMain: images.oil,
    //     },
    //     {
    //       imgMain: images.oil,
    //     },
    //     {
    //       imgMain: images.oil,
    //     },
    //   ],
    //   product_img: images.oil,
    //   product_name: "Fortune Premium Mustard Oil",
    //   product_price: "600",
    //   product_weight: "500 ml",
    //   product_final_price: "499",
    //   product_rating: "4.5",
    //   product_review: 250,
    //   isFavourite: false,
    //   product_quantity: 0,
    //   product_deliverytime: "10 Min",
    //   product_distance: "5 KM",
    //   product_desc:
    //     "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
    //   product_highlight: [
    //     {
    //       highlightTitle: "Grain Size",
    //       highlightDesc: "250",
    //     },
    //     {
    //       highlightTitle: "Organic",
    //       highlightDesc: "No",
    //     },
    //     {
    //       highlightTitle: "Polished",
    //       highlightDesc: "Yes",
    //     },
    //     {
    //       highlightTitle: "Brand",
    //       highlightDesc: "India Gate",
    //     },
    //     {
    //       highlightTitle: "Fssai license ",
    //       highlightDesc: "250",
    //     },
    //   ],
    //   product_inStock: true,
    //   product_deliveryData: [
    //     {
    //       deliveryDataImage: images.productReturn,
    //       deliveryDataTitle: "3 day Return/ Exchange",
    //     },
    //     {
    //       deliveryDataImage: images.cashOnDelivery,
    //       deliveryDataTitle: "Cash on Delivery",
    //     },
    //     {
    //       deliveryDataImage: images.fastDelivery,
    //       deliveryDataTitle: "Fast Delivery",
    //     },
    //   ],
    //   height: 100,
    //   width: 72,
    // },
    // {
    //   mainCategoryTitle: "Groceries",
    //   subCategoryTitle: "Rice",
    //   product_imgMain: [
    //     {
    //       imgMain: images.rice1,
    //     },
    //     {
    //       imgMain: images.rice1,
    //     },
    //     {
    //       imgMain: images.rice1,
    //     },
    //   ],
    //   product_img: images.rice1,
    //   product_name: "Scotti Arborio Rice",
    //   product_price: "600",
    //   product_weight: "1 kg",
    //   product_final_price: "499",
    //   product_rating: "4.5",
    //   product_review: 250,
    //   isFavourite: true,
    //   product_quantity: 0,
    //   product_deliverytime: "10 Min",
    //   product_distance: "5 KM",
    //   product_desc:
    //     "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
    //   product_highlight: [
    //     {
    //       highlightTitle: "Grain Size",
    //       highlightDesc: "250",
    //     },
    //     {
    //       highlightTitle: "Organic",
    //       highlightDesc: "No",
    //     },
    //     {
    //       highlightTitle: "Polished",
    //       highlightDesc: "Yes",
    //     },
    //     {
    //       highlightTitle: "Brand",
    //       highlightDesc: "India Gate",
    //     },
    //     {
    //       highlightTitle: "Fssai license ",
    //       highlightDesc: "250",
    //     },
    //   ],
    //   product_inStock: true,
    //   product_deliveryData: [
    //     {
    //       deliveryDataImage: images.productReturn,
    //       deliveryDataTitle: "3 day Return/ Exchange",
    //     },
    //     {
    //       deliveryDataImage: images.cashOnDelivery,
    //       deliveryDataTitle: "Cash on Delivery",
    //     },
    //     {
    //       deliveryDataImage: images.fastDelivery,
    //       deliveryDataTitle: "Fast Delivery",
    //     },
    //   ],
    //   height: 88,
    //   width: 88,
    // },
    // {
    //   mainCategoryTitle: "Groceries",
    //   subCategoryTitle: "Flour",
    //   product_imgMain: [
    //     {
    //       imgMain: images.atta,
    //     },
    //     {
    //       imgMain: images.atta,
    //     },
    //     {
    //       imgMain: images.atta,
    //     },
    //   ],
    //   product_img: images.atta,
    //   product_name: "Aashirvaad Superior MP Atta",
    //   product_price: "120",
    //   product_weight: "500 g",
    //   product_final_price: "99",
    //   product_rating: "4.5",
    //   product_review: 250,
    //   isFavourite: false,
    //   product_quantity: 0,
    //   product_deliverytime: "10 Min",
    //   product_distance: "5 KM",
    //   product_desc:
    //     "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
    //   product_highlight: [
    //     {
    //       highlightTitle: "Grain Size",
    //       highlightDesc: "250",
    //     },
    //     {
    //       highlightTitle: "Organic",
    //       highlightDesc: "No",
    //     },
    //     {
    //       highlightTitle: "Polished",
    //       highlightDesc: "Yes",
    //     },
    //     {
    //       highlightTitle: "Brand",
    //       highlightDesc: "India Gate",
    //     },
    //     {
    //       highlightTitle: "Fssai license ",
    //       highlightDesc: "250",
    //     },
    //   ],
    //   product_inStock: true,
    //   product_deliveryData: [
    //     {
    //       deliveryDataImage: images.productReturn,
    //       deliveryDataTitle: "3 day Return/ Exchange",
    //     },
    //     {
    //       deliveryDataImage: images.cashOnDelivery,
    //       deliveryDataTitle: "Cash on Delivery",
    //     },
    //     {
    //       deliveryDataImage: images.fastDelivery,
    //       deliveryDataTitle: "Fast Delivery",
    //     },
    //   ],
    //   height: 88,
    //   width: 60,
    // },
    // {
    //   mainCategoryTitle: "Groceries",
    //   subCategoryTitle: "Rice",
    //   product_imgMain: [
    //     {
    //       imgMain: images.rice2,
    //     },
    //     {
    //       imgMain: images.rice2,
    //     },
    //     {
    //       imgMain: images.rice2,
    //     },
    //   ],
    //   product_img: images.rice2,
    //   product_name: "Gropure Black Rice",
    //   product_price: "600",
    //   product_weight: "1 kg",
    //   product_final_price: "499",
    //   product_rating: "4.5",
    //   product_review: 250,
    //   isFavourite: true,
    //   product_quantity: 0,
    //   product_deliverytime: "10 Min",
    //   product_distance: "5 KM",
    //   product_desc:
    //     "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
    //   product_highlight: [
    //     {
    //       highlightTitle: "Grain Size",
    //       highlightDesc: "250",
    //     },
    //     {
    //       highlightTitle: "Organic",
    //       highlightDesc: "No",
    //     },
    //     {
    //       highlightTitle: "Polished",
    //       highlightDesc: "Yes",
    //     },
    //     {
    //       highlightTitle: "Brand",
    //       highlightDesc: "India Gate",
    //     },
    //     {
    //       highlightTitle: "Fssai license ",
    //       highlightDesc: "250",
    //     },
    //   ],
    //   product_inStock: true,
    //   product_deliveryData: [
    //     {
    //       deliveryDataImage: images.productReturn,
    //       deliveryDataTitle: "3 day Return/ Exchange",
    //     },
    //     {
    //       deliveryDataImage: images.cashOnDelivery,
    //       deliveryDataTitle: "Cash on Delivery",
    //     },
    //     {
    //       deliveryDataImage: images.fastDelivery,
    //       deliveryDataTitle: "Fast Delivery",
    //     },
    //   ],
    //   height: 88,
    //   width: 62,
    // },
    // {
    //   mainCategoryTitle: "Groceries",
    //   subCategoryTitle: "Milk",
    //   product_imgMain: [
    //     {
    //       imgMain: images.milk,
    //     },
    //     {
    //       imgMain: images.milk,
    //     },
    //     {
    //       imgMain: images.milk,
    //     },
    //   ],
    //   product_img: images.milk,
    //   product_name: "IA2 Cow Milk",
    //   product_price: "600",
    //   product_weight: "1 L",
    //   product_final_price: "499",
    //   product_rating: "4.5",
    //   product_review: 250,
    //   isFavourite: true,
    //   product_quantity: 0,
    //   product_deliverytime: "10 Min",
    //   product_distance: "5 KM",
    //   product_desc:
    //     "It is a long established fact that a reader will be distracted by the  readable content of a page when looking at its layout. The point of  ",
    //   product_highlight: [
    //     {
    //       highlightTitle: "Grain Size",
    //       highlightDesc: "250",
    //     },
    //     {
    //       highlightTitle: "Organic",
    //       highlightDesc: "No",
    //     },
    //     {
    //       highlightTitle: "Polished",
    //       highlightDesc: "Yes",
    //     },
    //     {
    //       highlightTitle: "Brand",
    //       highlightDesc: "India Gate",
    //     },
    //     {
    //       highlightTitle: "Fssai license ",
    //       highlightDesc: "250",
    //     },
    //   ],
    //   product_inStock: true,
    //   product_deliveryData: [
    //     {
    //       deliveryDataImage: images.productReturn,
    //       deliveryDataTitle: "3 day Return/ Exchange",
    //     },
    //     {
    //       deliveryDataImage: images.cashOnDelivery,
    //       deliveryDataTitle: "Cash on Delivery",
    //     },
    //     {
    //       deliveryDataImage: images.fastDelivery,
    //       deliveryDataTitle: "Fast Delivery",
    //     },
    //   ],
    //   height: 91.79,
    //   width: 72,
    // },
  ]);

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };

  // Filter logic
  const filteredWishlist = arrMyWhislist.filter((item: GroceryProduct) =>
    item.product_name.toLowerCase().includes(search.toLowerCase())
  );

  // Add to cart
  const handleQuantityChange = (index: number, type: "add" | "remove") => {
    const updated = [...arrMyWhislist];
    if (type === "add") {
      updated[index].product_quantity += 1;
    } else if (type === "remove" && updated[index].product_quantity > 0) {
      updated[index].product_quantity -= 1;
    }
    setArrMyWishlist(updated);
  };

  // On Press Product
  const onPressProduct = (item: any) => {
    navigation.navigate(ScreenNames.productDetail, { item: item });
  };

  //   Remove from wishlist
  const handleRemoveFromWishlist = (indexToRemove: number) => {
    setArrMyWishlist((prev: GroceryProduct[]) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleMyWhilistApi = async () => {
    const dictData = {
      search_text: search,
      page_number:1,
      type:selectedTab.toLowerCase()
    };
    try {
      const response = await myWhilistApi(dictData, navigation);
      if (response !== undefined && response !== null) {
        __DEV__ &&
          console.log("MY WISHLIST RESPONSE===>", JSON.stringify(response));

        if (response.code === statusCodes.success) {
          const wishlistData = response.data;
          if (Array.isArray(wishlistData)) {
            setArrMyWishlist(wishlistData as GroceryProduct[]);
          }
        } else if (response.code === statusCodes.invaildOrFail) {
          // flashMessageWarning(response.message);
          setArrMyWishlist([]);
        }
        else if (response.code === statusCodes.emptyData) {
          // flashMessageWarning(response.message);
          setArrMyWishlist([]);
        }
      }
    } catch (error) {
      __DEV__ && console.log("Customer Detail API Error:", error);
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
        <Text style={constnatStyles.lblHeaderTitle}>
          {ScreenNames.myWishlist}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleMyWhilistApi();
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
      handleQuantityChange={handleQuantityChange}
      onPressProduct={onPressProduct}
      selectedTab={selectedTab}
      handleTabPress={handleTabPress}
    />
  );
};

export default MyWishlistContainer;
