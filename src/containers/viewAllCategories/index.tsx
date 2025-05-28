import React, { useEffect, useState } from 'react'
import GlobalBackButton from '../../global/GlobalBackButton';
import ViewAllCategoriesComponenet from '../../components/viewAllCategories';
import { images } from '../../constants/Images';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Text } from 'react-native';
import { SubCategory } from '../../constants/interfaces';
import { constnatStyles } from '../../constants/Styles';
import { ScreenNames } from '../../routers';
import { flashMessageWarning } from '../../constants/GConstant';
import { getTranslation } from '../../localization/i18n/i18n.config';

const ViewAllCategoriesContainer = ({navigation, route} : any) => {
    const [arrAllCategories, setArrAllCategories] = useState<SubCategory[]>([
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

    const onPressCategory =()=>{
      flashMessageWarning(getTranslation('underDevelopment'))
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
            <Text style={constnatStyles.lblHeaderTitle}>{ScreenNames.allCategories}</Text>
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
    <ViewAllCategoriesComponenet arrAllCategories={arrAllCategories} onPressCategory={onPressCategory} />
  )
}

export default ViewAllCategoriesContainer