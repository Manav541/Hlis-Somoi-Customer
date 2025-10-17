import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, TextInput} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import { zustandStore } from '../../../store';
import { debounceQuery } from '../../../constants/utils/Debounce';
import { statusCodes } from '../../../api/APIConstant';
import { flashMessageWarning } from '../../../constants/GConstant';
import GlobalBackButton from '../../../global/GlobalBackButton';
import { constnatStyles } from '../../../constants/Styles';
import { getTranslation } from '../../../localization/i18n/i18n.config';
import GoogleSearchPlacesComponent from '../../../components/authentication/googleSearchPlaces';
import { PlaceDetailsType } from '../../../constants/interfaces';

const GoogleSearchPlacesContainer = ({navigation, route}: any) => {
  const [addressArr, setAddressArr] = useState<PlaceDetailsType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [debounce, resetDebounce] = debounceQuery(address, 300);
  const placesRef = useRef<TextInput | null>(null);

  const handleSetStoreAddress = route?.params?.handleSetStoreAddress;
  const storeLocation = route?.params?.storeLocation;

  // API
  const searchPlacesApi = zustandStore.MyOrdersStore(state => state.searchPlaces);

  const handleOnChangeText = (text: string) => {
    if (text.length === 0) {
      setAddressArr(null);
      setAddress('');
      setIsLoading(false);
      resetDebounce();
      return;
    }
    setAddress(text);
  };

  const handleApiSearchPlaces = async (input: string) => {
    setIsLoading(true);

    try {
      const response = await searchPlacesApi({search_text: input}, navigation);
      __DEV__ &&
        console.log('SEARCH PLACES RESPONSE===>', JSON.stringify(response));

      if (response.code === statusCodes.success) {
        setIsLoading(false);
        const placesData = response.data as PlaceDetailsType[];
        setAddressArr(placesData);
      } else if (response.code === statusCodes.invaildOrFail) {
        flashMessageWarning(response.message);
        setIsLoading(false);
      } else if (response.code === statusCodes.emptyData) {
        setIsLoading(false);
        setAddressArr([]);
      }
    } catch (error) {
      console.log('Error===>', error);
    }
  };

  const handleOnPressPlaces = (item: PlaceDetailsType) => {
    if (item) {
      const placesData = {
        latitude: item?.latitude,
        longitude: item?.longitude,
        mainText: item?.main_text,
        secondaryText: item?.secondary_text,
      };
      handleSetStoreAddress(placesData);
      navigation.goBack();
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
          {getTranslation('searchAddressTitle')}
        </Text>
      ),
    });
  };

  useEffect(() => {
    header();
  }, []);

  useEffect(() => {
    if (storeLocation) {
      setAddress(storeLocation);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Call your API function here
      if (debounce) {
        console.log('Search Text==>', debounce);
        handleApiSearchPlaces(debounce);
      }

      // Cleanup interval on component unmount or dependency change
      return () => {};
    }, [debounce]),
  );

  return (
    <GoogleSearchPlacesComponent
      addressArr={addressArr}
      address={address}
      placesRef={placesRef}
      isLoading={isLoading}
      handleOnChangeText={handleOnChangeText}
      handleOnPressPlaces={handleOnPressPlaces}
    />
  );
};

export default GoogleSearchPlacesContainer;
