import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import React, {Ref} from 'react';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { PlaceDetailsType } from '../../../constants/interfaces';
import { activityOpacity } from '../../../constants/GConstant';
import { constnatStyles } from '../../../constants/Styles';
import GlobalTextInput from '../../../global/GlobalTextInput';
import { getTranslation } from '../../../localization/i18n/i18n.config';

interface PropsType {
  addressArr: PlaceDetailsType[] | null;
  address: string;
  placesRef: Ref<TextInput | null>;
  isLoading: boolean;
  handleOnChangeText: (text: string) => void;
  handleOnPressPlaces: (item: PlaceDetailsType) => void;
}

const GoogleSearchPlacesComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  const renderItemPlaces = ({
    item,
    index,
  }: {
    item: PlaceDetailsType;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={activityOpacity}
        style={styles.btn}
        key={index}
        onPress={() => {
          props.handleOnPressPlaces(item);
        }}>
        <Text style={styles.lblMain}>{item?.main_text}</Text>
        {item?.secondary_text && (
          <Text style={styles.lblSecondary}>{item?.secondary_text}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[constnatStyles.vwBlueBgOnly, styles.vwMain]}>
      <GlobalTextInput
        googlePlacesInput
        reference={props.placesRef}
        value={props.address}
        onFocus={() => {}}
        onBlur={() => {}}
        onChangeText={props.handleOnChangeText}
        onSubmitEditing={() => {}}
        isLastField
        maxLength={50}
        focusValue
        placeholder={getTranslation('searchaddressTitle')}
        isLoaderVisible={props.isLoading}
      />

      {/* Address Suggestions Flatlist */}
      {props?.addressArr != null && (
        <FlatList
          data={props?.addressArr}
          renderItem={renderItemPlaces}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatlistContainer,
            {paddingBottom: insets.bottom + 20},
          ]}
          ListEmptyComponent={() => (
            <Text style={constnatStyles.lblNoData}>
              {getTranslation('noAddressFound')}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default GoogleSearchPlacesComponent;
