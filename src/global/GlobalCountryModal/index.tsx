import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { activityOpacity } from "../../constants/GConstant";
import { PlatformVersion } from "../../constants/utils/Platform";
import { ScrollView } from "react-native-gesture-handler";
import GlobalBackButton from "../GlobalBackButton";
import { colors } from "../../constants/Colors";
import { styles } from "./styles";
import { CountryDataType } from "../../constants/interfaces";

interface PropsType {
  countryArray: CountryDataType[];
  visible: boolean;
  onPressBack: () => void;
  onPressData: (item: CountryDataType) => void;
  searchVal: string;
  onChangeText: (text: string) => void;
}

const GlobalCountryModal = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      style={{ flex: 1 }}
    >
    
      <View
        style={[
          styles.vwMain,
          { paddingTop: PlatformVersion.isIOS ? insets.top + 10 : 10 },
        ]}
      >
         <StatusBar
          translucent
          backgroundColor={colors.black50}
          barStyle={"dark-content"}
        /> 
        {/* Back Button - Search Input */}
        <View style={styles.vwInner}>
          <GlobalBackButton onPress={props.onPressBack} />
          <TextInput
            style={styles.searchInput}
            value={props.searchVal}
            onChangeText={props.onChangeText}
            returnKeyType="search"
            selectionColor={colors.blue4e}
            cursorColor={colors.blue4e}
            placeholder="Search"
            placeholderTextColor={colors.greya7}
          />
        </View>

        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.vwDataMap}
          data={props?.countryArray}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => props.onPressData(item)}
              key={index}
              activeOpacity={activityOpacity}
              style={styles.btnCountry}
            >
              <Text style={{ fontSize: 24 }}>{item.flag}</Text>
              <Text style={styles.lblCountryName}>{item.dial_code}</Text>
              <Text style={[styles.lblCountryName, { flex: 1 }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default GlobalCountryModal;
