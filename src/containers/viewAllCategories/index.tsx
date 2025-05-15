import React, { useEffect } from 'react'
import GlobalBackButton from '../../global/GlobalBackButton';
import ViewAllCategoriesComponenet from '../../components/viewAllCategories';
import { images } from '../../constants/Images';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const ViewAllCategoriesContainer = ({navigation, route} : any) => {
    const [arrAllCategories, setArrAllCategories] = React.useState<any>([
        {
            image : images.groceriesC1,
            name : 'Groceries',
        },
        {
            image : images.foodC2,
            name : 'Food',
        },
        {
            image : images.fruitC3,
            name : ' Fruits & Vegetables',
        },
        {
            image : images.beautyC4,
            name : 'Beauty & Personal Care',
        },
        {
            image : images.electronicsC5,
            name : 'Electronics & Accessories ',
        },
        {
            image : images.householdC6,
            name : ' Household Essentials',
        },
    ]);

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

      useFocusEffect(
        React.useCallback(() => {
          StatusBar.setBarStyle("dark-content");
          return () => {};
        }, [navigation])
      );
      
  return (
    <ViewAllCategoriesComponenet arrAllCategories={arrAllCategories} />
  )
}

export default ViewAllCategoriesContainer