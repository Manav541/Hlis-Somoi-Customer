import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { styles } from "./styles";
import { images } from "../../constants/Images";
import { activityOpacity, hitSlop } from "../../constants/GConstant";
import { getTranslation } from "../../localization/i18n/i18n.config";

interface PropsType {
  arrManageAddress: any[];
  handleDelete: (index: number) => void;
  handleSetDefault: (index: number) => void;
  handleOnPressAddAddress: () => void;
}

const ManageAddressesComponent = (props: PropsType) => {
  const renderManageAddress = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    return (
      <View style={styles.vwManageAddress}>
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
          <View style={styles.vwLine} />

          {/* Edit/Delete Buttons */}
          <View style={{ flexDirection: "row", gap: 15 }}>
            <TouchableOpacity activeOpacity={activityOpacity}>
              <Image style={styles.imgEditDelete} source={images.edit} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={activityOpacity}
              onPress={() => props.handleDelete(index)}
            >
              <Image
                source={images.delete}
                resizeMode="stretch"
                style={styles.imgEditDelete}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.vwMain}>
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
