import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AddAddressComponent from '../../components/addAddress'
import GlobalBackButton from '../../global/GlobalBackButton';

const AddAddressContainer = ({navigation} : any) => {

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
    <AddAddressComponent />
  )
}

export default AddAddressContainer