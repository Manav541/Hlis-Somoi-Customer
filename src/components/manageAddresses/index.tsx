import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";
import { AddressItem, LocationData } from "../../constants/interfaces";
import { colors } from "../../constants/Colors";

interface PropsType {
  arrManageAddress: LocationData[];
  handleOnPressDelete: (location_id: string) => void;
  handleSetDefault: (item: LocationData) => void;
  handleOnPressAddAddress: () => void;
  handleOnPressEditAddress: (item: LocationData) => void;
  navigateFromCart: boolean;
  navigateFromHome: boolean;
  onPressAddress: (selectedAddress: LocationData) => void;
   // Pagination
  loadMoreCategories: () => void;
  canLoadMore: boolean;
  setCanLoadMore: (value: boolean) => void;
  hasMountedOnce: { current: boolean };
}

const ManageAddressesComponent = (props: PropsType) => {
  const renderManageAddress = ({
    item,
    index,
  }: {
    item: LocationData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.vwManageAddress}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        key={index}
        onPress={() => props.onPressAddress(item)}
        disabled={!props.navigateFromCart && !props.navigateFromHome}
      >
        <Text style={styles.lblAddressTitle}>
          {item.building_details +
            " , " +
            item?.address +
            " , " +
            item?.description}
        </Text>

        <View style={styles.vwDefaultEditDelete}>
          {/* Set Default Section */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              activeOpacity={activityOpacity}
              onPress={() => props.handleSetDefault(item)}
            >
              <Image
                source={item?.is_default ? images.checkfill : images.checkempty}
                style={styles.imgSetDefault}
              />
            </TouchableOpacity>
            <Text style={styles.lblSetAsDefault}>
              {getTranslation("setAsDefault")}
            </Text>
          </View>

          {/* Separator */}
          {!props.navigateFromCart && <View style={styles.vwLine} />}

          {/* Edit/Delete Buttons */}
          {!props.navigateFromCart && (
            <View style={{ flexDirection: "row", gap: 15 }}>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={() => props.handleOnPressEditAddress(item)}
              >
                <Image style={styles.imgEditDelete} source={images.edit} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={() => props.handleOnPressDelete(item?.id)}
              >
                <Image
                  source={images.delete}
                  resizeMode="stretch"
                  style={styles.imgEditDelete}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vwMain}>
      <StatusBar
        translucent={false}
        barStyle={"dark-content"}
        backgroundColor={colors.orange1c}
      />
      <TouchableOpacity
        style={styles.btnAddAddress}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={props?.handleOnPressAddAddress}
      >
        <Image style={styles.imgAddAddress} source={images.add} />
        <Text style={styles.lblAddNewAddress}>
          {getTranslation("addaNewAddress")}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={props.arrManageAddress}
        renderItem={renderManageAddress}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          gap: props.arrManageAddress.length === 0 ? 0 : 15,
          flexGrow: 1,
          justifyContent:
            props.arrManageAddress.length === 0 ? "center" : "flex-start",
          alignItems: "center",
          paddingBottom : 40
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
         onEndReached={() => {
              if (props.canLoadMore && props.hasMountedOnce.current) {
                props.loadMoreCategories();
              }
            }}
            onEndReachedThreshold={0.4}
            onContentSizeChange={(w, h) => {
              props.setCanLoadMore(h > 600); // Adjust if needed
              props.hasMountedOnce.current = true;
            }}
        ListEmptyComponent={
          <Text style={styles.lblNoData}>
            {getTranslation("noDataFound")}
          </Text>
        }
      />
    </View>
  );
};

export default ManageAddressesComponent;
