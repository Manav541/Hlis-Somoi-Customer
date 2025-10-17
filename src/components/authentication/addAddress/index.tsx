import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  Dimensions,
} from "react-native";
import React, { Ref, useState, useRef, useEffect } from "react";
import { styles } from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getTranslation } from "../../../localization/i18n/i18n.config";
import GlobalTextInput from "../../../global/GlobalTextInput";
import GlobalButton from "../../../global/GlobalButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { activityOpacity, hitSlop } from "../../../constants/GConstant";
import { images } from "../../../constants/Images";
import { colors } from "../../../constants/Colors";
import MapView, { Marker } from "react-native-maps";
import { constnatStyles } from "../../../constants/Styles";

interface PropsType {
  address: string;
  house: string;
  additionalDescription: string;

  addressRef: Ref<TextInput>;
  houseRef: Ref<TextInput>;
  additionalDescriptionRef: Ref<TextInput>;

  addressFocused: boolean;
  houseFocused: boolean;
  additionalDescriptionFocused: boolean;

  handleOnChangeText: (text: string, type: string) => void;
  handleOnSubmit: (type: string) => void;
  handleOnFocus: (type: string) => void;
  handleOnBlur: (type: string) => void;
  handleOnPressAdd: () => void;
  isDefault: boolean;
  handleSetDefault: () => void;
  isNavigateFromManageAddress: boolean;
  isEditAddress: boolean;
  isAddressInitialized: boolean;
  latitude: number;
  longitude: number;
  fullAddress: string;
  mapRef: Ref<MapView>;
  isModalVisible: boolean;
  handleCloseModal: () => void;
  handleConfirmLocation: () => void;
  handleCurrentLocation: () => void; // New prop for current location handling
  handleMapPress: (event: any) => void;
  handleOnPressStoreLocation: () => void;
  searchLocation: string;
}

const AddAddressComponent = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
      <View style={{ flex: 1 }}>
        <MapView
          ref={props?.mapRef}
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          onPress={props.handleMapPress}
        >
          {(props.latitude && props.longitude) || props.isEditAddress ? (
            <Marker
              coordinate={{
                latitude: props.latitude,
                longitude: props.longitude,
              }}
              onDragEnd={props.handleMapPress}
              pinColor={colors.orange1c}
              draggable
            />
          ) : null}
        </MapView>
        {/* Current Location Button (moved outside MapView) */}
        <TouchableOpacity
          style={styles.btnCurrentLocation}
          onPress={props.handleCurrentLocation}
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
        >
          <Image
            source={images.currentLocation}
            style={constnatStyles.img24}
            tintColor={colors.blue4e}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          activeOpacity={activityOpacity}
          hitSlop={hitSlop}
          style={styles.googlePlacesContainer}
          onPress={() => {
            props.handleOnPressStoreLocation();
          }}
        >
          <Text style={styles.input}>
            {props?.searchLocation == "" ? "Search Location" : props?.searchLocation}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.vwSearchAddress,
          { paddingBottom: insets.bottom ? insets.bottom : 20 },
        ]}
      >
        <Text style={styles.lblDeliverAddHeading}>
          DELIVERING YOUR ORDER TO
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image
            source={images.locationIconOrange}
            style={constnatStyles.img24}
          />
          <Text style={styles.lblDeliverAddress}>{props?.fullAddress}</Text>
        </View>
        <GlobalButton
          isOrange
          title="Confirm Location"
          onPress={() => props?.handleConfirmLocation()}
        />
      </View>
      <Modal
        visible={props?.isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={props?.handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.bottomScrollContent}
              bounces={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 20,
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.lblAddress}>
                  {"Enter Complete Location"}
                </Text>
                <TouchableOpacity
                  activeOpacity={activityOpacity}
                  hitSlop={hitSlop}
                  onPress={() => props?.handleCloseModal()}
                >
                  <Image
                    style={constnatStyles.img24}
                    source={images.closeSearch}
                    tintColor={colors.orange1c}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, gap: 10 }}>
                <GlobalTextInput
                  placeholder={getTranslation("address")}
                  value={props?.address}
                  reference={props.addressRef}
                  secureTextEntry={false}
                  onChangeText={(text) => {
                    props.handleOnChangeText(text, "address");
                  }}
                  onSubmitEditing={() => {
                    props.handleOnSubmit("address");
                  }}
                  onBlur={() => {
                    props.handleOnBlur("address");
                  }}
                  onFocus={() => {
                    props.handleOnFocus("address");
                  }}
                  focusValue={props.addressFocused}
                />
                <GlobalTextInput
                  placeholder={getTranslation("HousenoBuildingsreetarea")}
                  value={props?.house}
                  reference={props.houseRef}
                  secureTextEntry={false}
                  onChangeText={(text) => {
                    props.handleOnChangeText(text, "house");
                  }}
                  onSubmitEditing={() => {
                    props.handleOnSubmit("house");
                  }}
                  onBlur={() => {
                    props.handleOnBlur("house");
                  }}
                  onFocus={() => {
                    props.handleOnFocus("house");
                  }}
                  focusValue={props.houseFocused}
                />
                <GlobalTextInput
                  placeholder={getTranslation("additionalDescription")}
                  isDescriptionField
                  isLastField
                  value={props?.additionalDescription}
                  reference={props.additionalDescriptionRef}
                  secureTextEntry={false}
                  onChangeText={(text) => {
                    props.handleOnChangeText(text, "description");
                  }}
                  onSubmitEditing={() => {
                    props.handleOnSubmit("description");
                  }}
                  onBlur={() => {
                    props.handleOnBlur("description");
                  }}
                  onFocus={() => {
                    props.handleOnFocus("description");
                  }}
                  focusValue={props.additionalDescriptionFocused}
                />
                {/* set as default */}
                {props?.isNavigateFromManageAddress === true && (
                  <View style={styles.vwSetAsDefault}>
                    <TouchableOpacity
                      activeOpacity={activityOpacity}
                      hitSlop={hitSlop}
                      onPress={props?.handleSetDefault}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 24,
                        gap: 10,
                      }}
                      disabled={props?.isDefault}
                    >
                      <Image
                        source={
                          props?.isDefault
                            ? images.checkfill
                            : images.checkempty
                        }
                        style={styles.imgCheck}
                      />
                      <Text style={styles.lblSetAsDefault}>
                        {getTranslation("setAsDefault")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </KeyboardAwareScrollView>
            <View style={styles.bottomButtonContainer}>
              <GlobalButton
                isOrange
                title={
                  props?.isNavigateFromManageAddress
                    ? props?.isEditAddress
                      ? getTranslation("update")
                      : getTranslation("add")
                    : getTranslation("add")
                }
                onPress={() => props.handleOnPressAdd()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddAddressComponent;
