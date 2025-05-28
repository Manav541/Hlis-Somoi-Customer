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
import { AddressItem } from "../../constants/interfaces";

interface PropsType {
  arrManageAddress: AddressItem[];
  handleOnPressDelete: (index: number) => void;
  handleSetDefault: (index: number) => void;
  handleOnPressAddAddress: () => void;
  handleOnPressEditAddress: (index: number) => void;
  navigateFromCart: boolean;
  navigateFromHome:boolean;
  onPressAddress: () => void;
}

const ManageAddressesComponent = (props: PropsType) => {
  const renderManageAddress = ({
    item,
    index,
  }: {
    item: AddressItem;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.vwManageAddress}
        activeOpacity={activityOpacity}
        hitSlop={hitSlop}
        onPress={() => props.onPressAddress()}
        disabled={!props.navigateFromCart && !props.navigateFromHome}
      >
        <Text style={styles.lblAddressTitle}>{item.title}</Text>

        <View style={styles.vwDefaultEditDelete}>
          {/* Set Default Section */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              activeOpacity={activityOpacity}
              onPress={() => props.handleSetDefault(index)}
            >
              <Image
                source={item?.default ? images.checkfill : images.checkempty}
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
                onPress={() => props.handleOnPressEditAddress(index)}
              >
                <Image style={styles.imgEditDelete} source={images.edit} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={activityOpacity}
                hitSlop={hitSlop}
                onPress={() => props.handleOnPressDelete(index)}
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
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
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
        contentContainerStyle={{ paddingTop: 20, gap: 15 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  );
};

export default ManageAddressesComponent;
