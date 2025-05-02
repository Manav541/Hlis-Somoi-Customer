import { View, Text, Platform, StatusBar, Dimensions } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { ScreenDimensions } from "../../constants/utils/Dimensions";
import { styles } from "./styles";

interface PropsType {
  sheetRef: any;
  confirmationMsg: string;
  btnTitleYes: string | '';
  btnTitleNo: string | '';
  onPressDeleteYes: () => void;
  onPressDeleteNo: () => void;
}

const GlobalDeleteAccBottomSheet = (props: PropsType) => {
  const insets = useSafeAreaInsets();

  return (
    <RBSheet
      height={
        Platform.OS == "android"
          ? ScreenDimensions.screenHeight / 4.35
          : insets.bottom > 0
          ? ScreenDimensions.screenHeight / 3.8
          : ScreenDimensions.screenHeight / 3.6
      }
      ref={props?.sheetRef}
      draggable
      customStyles={{
        container: styles.container,
        // draggableIcon: styles.draggableIcon,
      }}
    >
      <StatusBar backgroundColor={'transparent'} />
      <View style={{ gap: 20 ,height : 500}}>
        {/* <Text style={styles.lblTitle}>{props.confirmationMsg}</Text>

        <View style={styles.vwTitleBtns}> */}
          
        {/* </View> */}
      </View>
    </RBSheet>
  );
};

export default GlobalDeleteAccBottomSheet;
